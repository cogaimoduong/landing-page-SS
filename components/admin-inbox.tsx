"use client";

import Link from "next/link";
import { ArrowLeft, Check, MessageCircle, Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { chatChangedEvent, getStoredChatMessages, initialChatMessages, makeChatMessage, saveChatMessages, type StoredChatMessage } from "@/lib/chat-store";

export function AdminInbox() {
  const [messages, setMessages] = useState<StoredChatMessage[]>(initialChatMessages);
  const [draft, setDraft] = useState("");
  const log = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const syncMessages = () => setMessages(getStoredChatMessages());
    syncMessages(); window.addEventListener("storage", syncMessages); window.addEventListener(chatChangedEvent, syncMessages);
    return () => { window.removeEventListener("storage", syncMessages); window.removeEventListener(chatChangedEvent, syncMessages); };
  }, []);
  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight }); }, [messages]);
  function sendReply(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const text = draft.trim(); if (!text) return; saveChatMessages([...messages, makeChatMessage("admin", text)]); setDraft(""); }
  const visitorMessages = messages.filter((message) => message.sender === "user").length;
  return <main className="admin-inbox"><header className="admin-inbox-header"><Link href="/" className="admin-back"><ArrowLeft size={17} /> Về landing page</Link><div><span className="admin-kicker">DevDes · Khu vực quản trị</span><h1>Hộp thư hỗ trợ</h1></div><span className="admin-demo-badge">Bản demo trên trình duyệt</span></header><section className="admin-inbox-workspace" aria-label="Hộp thư chat"><aside className="admin-conversations"><div className="admin-conversations-title"><span>Hội thoại</span><b>1</b></div><button type="button" className="admin-conversation is-active"><span className="admin-avatar">K</span><span><strong>Khách từ landing page</strong><small>{visitorMessages ? `${visitorMessages} tin nhắn từ khách` : "Chưa có tin nhắn"}</small></span><i /></button><p>Ở bản thật, danh sách này sẽ có tất cả khách, tìm kiếm, trạng thái và người phụ trách.</p></aside><section className="admin-chat"><header className="admin-chat-header"><span className="admin-avatar">K</span><div><strong>Khách từ landing page</strong><small><i /> Đang mở hội thoại</small></div><button type="button"><Check size={15} /> Đánh dấu xong</button></header><div className="admin-chat-log" ref={log}><p className="admin-chat-note">Các tin nhắn được lưu tạm trong trình duyệt này.</p>{messages.map((message) => <article className={`admin-message is-${message.sender}`} key={message.id}><span>{message.sender === "admin" ? "Bạn (Admin)" : "Khách"}</span><p>{message.text}</p></article>)}</div><form className="admin-reply-form" onSubmit={sendReply}><label htmlFor="admin-reply">Trả lời khách</label><div><input id="admin-reply" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Nhập tin nhắn trả lời…" maxLength={1000} autoComplete="off" /><button type="submit" disabled={!draft.trim()}><Send size={17} /> Gửi</button></div></form></section></section><footer className="admin-inbox-footer"><MessageCircle size={15} /> Khi có cơ sở dữ liệu, trang này sẽ nhận tin từ mọi thiết bị và yêu cầu đăng nhập admin.</footer></main>;
}
