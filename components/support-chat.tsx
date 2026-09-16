"use client";
import { ArrowUpRight, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ChatReactions } from "@/components/chat-reactions";
import { ChatComposer, ChatMessageBody } from "@/components/chat-media";
import { chatSuggestions } from "@/lib/chat-demo";
import { useChatSession } from "./use-chat-session";

export function SupportChat() {
  const pathname = usePathname();
  const hidden = pathname.startsWith("/mau/") || pathname.startsWith("/admin");
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [email, setEmail] = useState("");
  const [starting, setStarting] = useState(false);
  const [newSession, setNewSession] = useState(false);
  const chat = useChatSession(hidden ? null : "/api/chat", open && !hidden);
  const log = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Retire the previous browser-only demo; do not retain message copies locally.
    try { localStorage.removeItem("devdes-demo-chat-messages"); } catch {}
    const launch = () => setOpen(true);
    window.addEventListener("devdes-open-chat", launch);
    return () => window.removeEventListener("devdes-open-chat", launch);
  }, []);
  useEffect(() => { if (open && log.current) log.current.scrollTop = log.current.scrollHeight; }, [open, chat.session?.messages.length]);
  async function start(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStarting(true);
    if (await chat.start(email)) { setNewSession(false); setEmail(""); setDraft(""); }
    setStarting(false);
  }
  if (hidden) return null;
  const session = chat.session;
  return <aside className="support-chat" aria-label="Hỗ trợ DevDes">
    {open && <section className="support-chat-panel" id="support-chat-panel" role="dialog" aria-modal="false" aria-labelledby="support-chat-title" onKeyDown={event => { if (event.key === "Escape") setOpen(false); }}>
      <header className="support-chat-header"><span className="support-chat-avatar"><Image src="/images/devdes-mark.png" alt="" width={20} height={33} /></span><div><h2 id="support-chat-title">Chat với DevDes</h2><span>Trao đổi trực tiếp với đội ngũ</span></div><button type="button" onClick={() => setOpen(false)} aria-label="Thu gọn chat"><Minus size={19} /></button></header>
      {chat.loading ? <p className="chat-session-note">Đang mở cuộc trò chuyện…</p> : !session || newSession ? <form className="chat-email-form" onSubmit={start}>
        <h3>Bắt đầu từ một lời chào</h3><p>Nhập email để đội ngũ có thể liên hệ với bạn</p>
        <label htmlFor="chat-email">Email của bạn</label><input id="chat-email" type="email" maxLength={254} autoComplete="email" placeholder="ban@example.com" required value={email} onChange={event => setEmail(event.target.value)} />
        <button type="submit" disabled={starting}>{starting ? "Đang mở…" : "Bắt đầu chat"}</button>
        <small>Không cần tài khoản · Thiết bị này nhớ phiên chat<br />Phiên kết thúc sau 48 giờ không có tin nhắn mới và được xóa 12 giờ sau</small>
        {newSession && <button className="chat-secondary" type="button" onClick={() => setNewSession(false)}>Quay lại phiên cũ</button>}
      </form> : <>
        <div className="support-chat-log" ref={log} role="log" aria-label="Tin nhắn" aria-live="polite" aria-relevant="additions text"><p className="support-chat-note">{session.email}</p>{session.messages.map(message => <div className={`support-chat-message is-${message.sender}`} key={message.id}><span>{message.sender === "admin" ? "Admin DevDes" : "Bạn"}</span><ChatMessageBody message={message} /><ChatReactions message={message} actor="user" onReact={chat.react} disabled={chat.ended} /></div>)}</div>
        {chat.ended ? <div className="chat-ended" role="status"><strong>Phiên trò chuyện đã kết thúc</strong><p>Lịch sử sẽ được xóa lúc {new Date(session.deleteAt).toLocaleString("vi-VN")}</p><button type="button" onClick={() => { setNewSession(true); setEmail(""); }}>Bắt đầu cuộc trò chuyện mới</button></div> : <>
          {session.messages.length === 1 && <div className="support-chat-suggestions" aria-label="Gợi ý tin nhắn">{chatSuggestions.map(suggestion => <button type="button" key={suggestion} onClick={() => void chat.send(suggestion)}>{suggestion}<ArrowUpRight size={12} /></button>)}</div>}
          <ChatComposer key={session.id} draft={draft} onDraftChange={setDraft} onSend={chat.send} inputId="support-chat-input" placeholder="Nhắn DevDes một chút…" />
        </>}
      </>}
      {chat.error && <div className="chat-session-error" role="alert">{chat.error} <button type="button" onClick={() => void chat.refresh()}>Thử kết nối lại</button></div>}
      <div className="support-chat-footnote"><span>Phiên gắn với trình duyệt này</span><Link href="/giao-dien">Xem giao diện <ArrowUpRight size={11} /></Link></div>
    </section>}
    <button className="support-chat-launcher" type="button" onClick={() => setOpen(true)} aria-label="Mở chat với DevDes" aria-expanded={open} aria-controls={open ? "support-chat-panel" : undefined} aria-haspopup="dialog" title="Chat với DevDes"><Image src="/images/devdes-mark.png" alt="" width={24} height={40} /></button>
  </aside>;
}
