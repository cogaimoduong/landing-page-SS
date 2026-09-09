"use client";

import { MessageCircle, Minus, Send, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { chatSuggestions, getDemoReply, type ChatMessage } from "@/lib/chat-demo";

export function SupportChat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome", sender: "admin", text: "Chào bạn 👋 DevDes đây! Bạn đang có ý tưởng website nào? Nhắn mình cùng trao đổi nhé." },
  ]);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const isOpen = useRef(false);

  useEffect(() => () => {
    if (replyTimer.current) clearTimeout(replyTimer.current);
  }, []);

  useEffect(() => {
    if (open && log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [open, messages, typing]);

  useEffect(() => {
    if (open) input.current?.focus({ preventScroll: true });
  }, [open]);

  function toggleChat(nextOpen: boolean) {
    isOpen.current = nextOpen;
    setOpen(nextOpen);
    if (nextOpen) setUnread(false);
    else launcher.current?.focus({ preventScroll: true });
  }

  function sendMessage(text: string) {
    const value = text.trim();
    if (!value || replyTimer.current || value.length > 1000) return;
    setMessages((previous) => [...previous, { id: crypto.randomUUID(), sender: "user", text: value }]);
    setDraft("");
    setTyping(true);
    input.current?.focus({ preventScroll: true });
    replyTimer.current = setTimeout(() => {
      setMessages((previous) => [...previous, { id: crypto.randomUUID(), sender: "admin", text: getDemoReply(value) }]);
      setTyping(false);
      if (!isOpen.current) setUnread(true);
      replyTimer.current = null;
    }, 1100);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(draft);
  }

  // Keep live template previews free of the storefront's chat widget.
  if (pathname.startsWith("/mau/")) return null;

  return (
    <aside className="support-chat" aria-label="Hỗ trợ DevDes">
      {open && (
        <section
          className="support-chat-panel"
          id="support-chat-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="support-chat-title"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.stopPropagation();
              toggleChat(false);
            }
          }}
        >
          <header className="support-chat-header">
            <span className="support-chat-avatar"><Image src="/images/devdes-mark.png" alt="" width={20} height={33} /></span>
            <div><h2 id="support-chat-title">Chat với DevDes</h2><span><i /> Admin · Trò chuyện mẫu</span></div>
            <button type="button" onClick={() => toggleChat(false)} aria-label="Thu gọn chat"><Minus size={19} /></button>
          </header>
          <div className="support-chat-log" ref={log} role="log" aria-label="Tin nhắn" aria-live="polite" aria-relevant="additions text">
            <p className="support-chat-note">Cùng bắt đầu từ một lời chào.</p>
            {messages.map((message) => (
              <div className={`support-chat-message is-${message.sender}`} key={message.id}>
                <span>{message.sender === "admin" ? "Admin DevDes" : "Bạn"}</span>
                <p>{message.text}</p>
              </div>
            ))}
            {typing && <div className="support-chat-typing" role="status"><i /><i /><i /><span>Admin đang trả lời…</span></div>}
          </div>
          {messages.length === 1 && (
            <div className="support-chat-suggestions" aria-label="Gợi ý tin nhắn">
              {chatSuggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => sendMessage(suggestion)}>{suggestion}<ArrowUpRight size={12} /></button>)}
            </div>
          )}
          <form className="support-chat-form" onSubmit={submit}>
            <input ref={input} aria-label="Nội dung tin nhắn" placeholder="Nhắn DevDes một chút…" value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={1000} autoComplete="off" />
            <button type="submit" disabled={!draft.trim() || typing} aria-label="Gửi tin nhắn"><Send size={17} /></button>
          </form>
          <div className="support-chat-footnote"><span>Demo · Phản hồi tự động</span><Link href="/giao-dien">Xem giao diện <ArrowUpRight size={11} /></Link></div>
        </section>
      )}
      <button ref={launcher} type="button" className={`support-chat-launcher${open ? " is-open" : ""}`} aria-label={open ? "Thu gọn chat" : unread ? "Mở chat, có tin nhắn mới" : "Chat với DevDes"} aria-expanded={open} aria-controls={open ? "support-chat-panel" : undefined} onClick={() => toggleChat(!open)}>
        {open ? <Minus size={21} /> : <MessageCircle size={21} />}<span>{open ? "Thu gọn" : "Chat với mình"}</span>
        {!open && unread && <i className="support-chat-unread" />}
      </button>
    </aside>
  );
}
