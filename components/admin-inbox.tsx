"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { ChatReactions } from "./chat-reactions";
import { ChatComposer, ChatMessageBody } from "./chat-media";
import { chatRequest, ChatRequestError, type ChatSummary } from "@/lib/chat-store";
import { useChatSession } from "./use-chat-session";

export function AdminInbox() {
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [items, setItems] = useState<ChatSummary[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState("");
  const log = useRef<HTMLDivElement>(null);
  const listVersion = useRef(0);
  const chat = useChatSession(authorized && selected ? `/api/chat/admin/${selected}` : null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const refresh = useCallback(async () => {
    const version = ++listVersion.current;
    try {
      const result = await chatRequest<{ conversations: ChatSummary[]; hasMore: boolean }>(`/api/chat/admin?offset=${offset}`);
      if (version !== listVersion.current) return;
      setItems(result.conversations); setHasMore(result.hasMore); setAuthorized(true); setError("");
      setSelected(current => current && result.conversations.some(item => item.id === current) ? current : result.conversations[0]?.id || null);
    } catch (reason) {
      if (version !== listVersion.current) return;
      if (reason instanceof ChatRequestError && reason.status === 401) { setAuthorized(false); setItems([]); setSelected(null); setDrafts({}); }
      else setError(reason instanceof Error ? reason.message : "Không kết nối được hộp thư");
    } finally { if (version === listVersion.current) setChecking(false); }
  }, [offset]);
  useEffect(() => {
    void refresh();
    return () => { listVersion.current++; };
  }, [refresh]);
  useEffect(() => {
    if (!authorized) return;
    const timer = setInterval(() => { if (document.visibilityState === "visible") void refresh(); }, 5000);
    return () => clearInterval(timer);
  }, [authorized, refresh]);
  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight }); }, [chat.session?.id, chat.session?.messages.length]);
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoggingIn(true);
    try { await chatRequest("/api/chat/admin/login", { password }); setPassword(""); await refresh(); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Không đăng nhập được"); }
    finally { setLoggingIn(false); }
  }
  async function logout() {
    try {
      await chatRequest("/api/chat/admin/login", undefined, "DELETE"); listVersion.current++;
      setAuthorized(false); setSelected(null); setItems([]); setDrafts({}); setError("");
    } catch { setError("Chưa đăng xuất được, vui lòng thử lại"); }
  }
  const session = chat.session;
  return <main className="admin-inbox">
    <header className="admin-inbox-header"><Link href="/" className="admin-back"><ArrowLeft size={17} /> Về landing page</Link><div><span className="admin-kicker">DevDes · Khu vực quản trị</span><h1>Hộp thư hỗ trợ</h1></div>{authorized && <button className="admin-demo-badge" onClick={() => void logout()}>Đăng xuất</button>}</header>
    {checking ? <p className="chat-session-note">Đang mở hộp thư…</p> : !authorized ? <form className="chat-email-form admin-login" onSubmit={login}><h2>Đăng nhập quản trị</h2><label htmlFor="admin-password">Mật khẩu hộp thư</label><input id="admin-password" type="password" required autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} /><button disabled={loggingIn}>{loggingIn ? "Đang đăng nhập…" : "Mở hộp thư"}</button></form> : <section className="admin-inbox-workspace" aria-label="Hộp thư chat">
      <aside className="admin-conversations"><div className="admin-conversations-title"><span>Hội thoại</span><b>{items.length}</b></div>{items.map(item => <button key={item.id} className={`admin-conversation ${selected === item.id ? "is-active" : ""}`} onClick={() => setSelected(item.id)}><span className="admin-avatar">{item.email.slice(0, 1).toUpperCase()}</span><span><strong>{item.email}</strong><small>{item.status === "ended" ? "Đã kết thúc" : "Đang mở"} · {new Date(item.lastMessageAt).toLocaleString("vi-VN")}</small></span></button>)}{!items.length && <p>Chưa có cuộc trò chuyện</p>}<div className="admin-pagination"><button disabled={!offset} onClick={() => setOffset(value => Math.max(0, value - 50))}>Trước</button><button disabled={!hasMore} onClick={() => setOffset(value => value + 50)}>Tiếp</button></div></aside>
      <section className="admin-chat">{session ? <><header className="admin-chat-header"><div><strong>{session.email}</strong><small>{chat.ended ? "Phiên đã kết thúc" : "Đang mở hội thoại"} · Email do khách cung cấp, chưa xác minh</small></div></header><div className="admin-chat-log" ref={log} role="log" aria-live="polite">{session.messages.map(message => <article className={`admin-message is-${message.sender}`} key={message.id}><span>{message.sender === "admin" ? "Admin" : "Khách"}</span><ChatMessageBody message={message} /><ChatReactions message={message} actor="admin" onReact={chat.react} disabled={chat.ended} /></article>)}</div>{chat.ended ? <p className="chat-ended">Phiên trò chuyện đã kết thúc · Xóa lúc {new Date(session.deleteAt).toLocaleString("vi-VN")}</p> : <ChatComposer key={session.id} draft={drafts[session.id] || ""} onDraftChange={value => setDrafts(current => ({ ...current, [session.id]: value }))} onSend={chat.send} inputId="admin-reply" placeholder="Nhập tin nhắn trả lời…" className="admin-chat-composer" />}</> : <p className="chat-session-note">{chat.loading ? "Đang tải tin nhắn…" : "Chọn cuộc trò chuyện để trả lời"}</p>}{chat.error && <p className="chat-session-error" role="alert">{chat.error}</p>}</section>
    </section>}
    {error && <p className="chat-session-error" role="alert">{error}</p>}
    <footer className="admin-inbox-footer">Phiên kết thúc sau 48 giờ không có tin nhắn từ cả hai bên · Tự xóa 12 giờ sau</footer>
  </main>;
}
