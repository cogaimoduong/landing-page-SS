"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { chatRequest, ChatRequestError, type ChatAttachment, type ChatSession } from "@/lib/chat-store";

export function useChatSession(endpoint: string | null, polling = true) {
  const [session, setSession] = useState<ChatSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [now, setNow] = useState(0);
  const generation = useRef(0);
  const refreshing = useRef(false);
  const mutating = useRef(false);
  const requestNumber = useRef(0);
  const pendingMessage = useRef<{ signature: string; id: string } | null>(null);
  const accept = useCallback((value: ChatSession | null) => {
    setNow(Date.now());
    setSession(value && Date.parse(value.deleteAt) > Date.now() ? value : null);
  }, []);
  const refresh = useCallback(async () => {
    // Do not let slow requests continuously invalidate each other. That can
    // otherwise leave a chat stale until the page is reloaded.
    if (!endpoint || refreshing.current || mutating.current) return;
    const current = generation.current, ticket = ++requestNumber.current;
    refreshing.current = true;
    try {
      const data = await chatRequest<{ session: ChatSession | null }>(endpoint);
      if (current !== generation.current || ticket !== requestNumber.current) return;
      accept(data.session); setError("");
    } catch (reason) {
      if (current !== generation.current || ticket !== requestNumber.current) return;
      if (reason instanceof ChatRequestError && [401, 404].includes(reason.status)) accept(null);
      setError(reason instanceof Error ? reason.message : "Không kết nối được chat");
    } finally {
      if (current === generation.current) {
        refreshing.current = false;
        setLoading(false);
      }
    }
  }, [endpoint, accept]);
  useEffect(() => {
    generation.current++; requestNumber.current++; refreshing.current = false; mutating.current = false;
    setSession(null); setLoading(Boolean(endpoint)); setError(""); pendingMessage.current = null;
    return () => { generation.current++; };
  }, [endpoint]);
  useEffect(() => {
    if (!endpoint || !polling) return;
    void refresh();
    const timer = setInterval(() => { if (document.visibilityState === "visible") void refresh(); }, 2000);
    const wake = () => { if (document.visibilityState === "visible") void refresh(); };
    window.addEventListener("focus", wake); document.addEventListener("visibilitychange", wake);
    return () => { clearInterval(timer); window.removeEventListener("focus", wake); document.removeEventListener("visibilitychange", wake); };
  }, [endpoint, polling, refresh]);
  useEffect(() => {
    const timer = setInterval(() => {
      const time = Date.now(); setNow(time);
      setSession(current => current && Date.parse(current.deleteAt) <= time ? null : current);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  async function mutate(body: unknown) {
    if (!endpoint || mutating.current) return false;
    const current = generation.current;
    mutating.current = true; requestNumber.current++;
    try {
      const data = await chatRequest<{ session: ChatSession }>(endpoint, body);
      if (current !== generation.current) return false;
      accept(data.session); setError(""); setLoading(false); return true;
    } catch (reason) {
      if (current === generation.current) {
        setError(reason instanceof Error ? reason.message : "Chưa gửi được tin nhắn");
        if (reason instanceof ChatRequestError && [401, 404].includes(reason.status)) accept(null);
        if (reason instanceof ChatRequestError && reason.status === 409) setSession(value => value ? { ...value, status: "ended" } : null);
      }
      return false;
    } finally { if (current === generation.current) mutating.current = false; }
  }
  async function send(text: string, attachment?: ChatAttachment) {
    const signature = JSON.stringify([text, attachment]);
    if (pendingMessage.current?.signature !== signature) pendingMessage.current = { signature, id: crypto.randomUUID() };
    const ok = await mutate({ action: "send", id: pendingMessage.current.id, text, attachment });
    if (ok) pendingMessage.current = null;
    return ok;
  }
  const ended = session ? session.status === "ended" || (now > 0 && now >= Date.parse(session.expiresAt)) : false;
  return { session, loading, error, ended, refresh, send, start: (email: string) => mutate({ action: "start", email }), react: async (messageId: string, emoji: string) => {
    if (!await mutate({ action: "react", messageId, emoji })) throw new Error("Chưa lưu được cảm xúc");
  } };
}
