"use client";

import { ArrowUpRight, MessageCircle, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ChatReactions } from "@/components/chat-reactions";
import { ChatComposer, ChatMessageBody } from "@/components/chat-media";
import { useLocale } from "@/components/locale-provider";
import { getChatSuggestions } from "@/lib/chat-demo";
import { useChatSession } from "./use-chat-session";

export function SupportChat() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const hidden = pathname.startsWith("/mau/") || pathname.startsWith("/admin");
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [email, setEmail] = useState("");
  const [starting, setStarting] = useState(false);
  const [newSession, setNewSession] = useState(false);
  const chat = useChatSession(hidden ? null : "/api/chat", open && !hidden);
  const log = useRef<HTMLDivElement>(null);
  const copy = locale === "en"
    ? {
        support: "DevDes support",
        title: "Chat with DevDes",
        subtitle: "Talk directly with our team",
        minimize: "Minimize chat",
        loading: "Opening your conversation…",
        startTitle: "Start with a hello",
        startDescription: "Enter your email so our team can get in touch with you.",
        email: "Your email",
        starting: "Opening…",
        start: "Start chat",
        privacy: "No account needed · This device remembers your chat session",
        expiry: "The session ends after 48 hours without a new message and is deleted 12 hours later.",
        returnToSession: "Return to the previous session",
        messages: "Messages",
        you: "You",
        endedTitle: "This conversation has ended",
        deletedAt: "History will be deleted at",
        newConversation: "Start a new conversation",
        suggestions: "Message suggestions",
        placeholder: "Send DevDes a message…",
        reconnect: "Try connecting again",
        browserSession: "Session tied to this browser",
        templates: "View templates",
        openChat: "Open chat with DevDes",
      }
    : {
        support: "Hỗ trợ DevDes",
        title: "Chat với DevDes",
        subtitle: "Trao đổi trực tiếp với đội ngũ",
        minimize: "Thu gọn chat",
        loading: "Đang mở cuộc trò chuyện…",
        startTitle: "Bắt đầu từ một lời chào",
        startDescription: "Nhập email để đội ngũ có thể liên hệ với bạn.",
        email: "Email của bạn",
        starting: "Đang mở…",
        start: "Bắt đầu chat",
        privacy: "Không cần tài khoản · Thiết bị này nhớ phiên chat",
        expiry: "Phiên kết thúc sau 48 giờ không có tin nhắn mới và được xóa 12 giờ sau.",
        returnToSession: "Quay lại phiên cũ",
        messages: "Tin nhắn",
        you: "Bạn",
        endedTitle: "Phiên trò chuyện đã kết thúc",
        deletedAt: "Lịch sử sẽ được xóa lúc",
        newConversation: "Bắt đầu cuộc trò chuyện mới",
        suggestions: "Gợi ý tin nhắn",
        placeholder: "Nhắn DevDes một chút…",
        reconnect: "Thử kết nối lại",
        browserSession: "Phiên gắn với trình duyệt này",
        templates: "Xem giao diện",
        openChat: "Mở chat với DevDes",
      };
  const suggestions = getChatSuggestions(locale);

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
    if (await chat.start(email, locale)) { setNewSession(false); setEmail(""); setDraft(""); }
    setStarting(false);
  }
  if (hidden) return null;
  const session = chat.session;
  const dateLocale = locale === "en" ? "en-US" : "vi-VN";

  return <aside className="support-chat" aria-label={copy.support}>
    {open && <section className="support-chat-panel" id="support-chat-panel" role="dialog" aria-modal="false" aria-labelledby="support-chat-title" onKeyDown={event => { if (event.key === "Escape") setOpen(false); }}>
      <header className="support-chat-header"><span className="support-chat-avatar"><Image src="/images/devdes-mark.png" alt="" width={20} height={33} /></span><div><h2 id="support-chat-title">{copy.title}</h2><span>{copy.subtitle}</span></div><button type="button" onClick={() => setOpen(false)} aria-label={copy.minimize}><Minus size={19} /></button></header>
      {chat.loading ? <p className="chat-session-note">{copy.loading}</p> : !session || newSession ? <form className="chat-email-form" onSubmit={start}>
        <h3>{copy.startTitle}</h3><p>{copy.startDescription}</p>
        <label htmlFor="chat-email">{copy.email}</label><input id="chat-email" type="email" maxLength={254} autoComplete="email" placeholder="you@example.com" required value={email} onChange={event => setEmail(event.target.value)} />
        <button type="submit" disabled={starting}>{starting ? copy.starting : copy.start}</button>
        <small>{copy.privacy}<br />{copy.expiry}</small>
        {newSession && <button className="chat-secondary" type="button" onClick={() => setNewSession(false)}>{copy.returnToSession}</button>}
      </form> : <>
        <div className="support-chat-log" ref={log} role="log" aria-label={copy.messages} aria-live="polite" aria-relevant="additions text"><p className="support-chat-note">{session.email}</p>{session.messages.map(message => <div className={`support-chat-message is-${message.sender}`} key={message.id}><span>{message.sender === "admin" ? message.senderName || "DevDes AI" : copy.you}</span><ChatMessageBody message={message} /><ChatReactions message={message} actor="user" onReact={chat.react} disabled={chat.ended} /></div>)}</div>
        {chat.ended ? <div className="chat-ended" role="status"><strong>{copy.endedTitle}</strong><p>{copy.deletedAt} {new Date(session.deleteAt).toLocaleString(dateLocale)}</p><button type="button" onClick={() => { setNewSession(true); setEmail(""); }}>{copy.newConversation}</button></div> : <>
          {session.messages.length === 1 && <div className="support-chat-suggestions" aria-label={copy.suggestions}>{suggestions.map(suggestion => <button type="button" key={suggestion} onClick={() => void chat.send(suggestion)}>{suggestion}<ArrowUpRight size={12} /></button>)}</div>}
          <ChatComposer key={session.id} draft={draft} onDraftChange={setDraft} onSend={chat.send} inputId="support-chat-input" placeholder={copy.placeholder} />
        </>}
      </>}
      {chat.error && <div className="chat-session-error" role="alert">{chat.error} <button type="button" onClick={() => void chat.refresh()}>{copy.reconnect}</button></div>}
      <div className="support-chat-footnote"><span>{copy.browserSession}</span><Link href="/giao-dien">{copy.templates} <ArrowUpRight size={11} /></Link></div>
    </section>}
    <button className="support-chat-launcher" type="button" onClick={() => setOpen(true)} aria-label={copy.openChat} aria-expanded={open} aria-controls={open ? "support-chat-panel" : undefined} aria-haspopup="dialog" title={copy.title}><MessageCircle size={42} strokeWidth={1.55} /><Image src="/images/devdes-mark.png" alt="" width={10} height={16} /></button>
  </aside>;
}
