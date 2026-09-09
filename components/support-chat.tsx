"use client";

import { ArrowUpRight, MessageCircle, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChatComposer, ChatMessageBody } from "@/components/chat-media";
import { chatSuggestions } from "@/lib/chat-demo";
import { chatChangedEvent, getStoredChatMessages, initialChatMessages, makeChatMessage, saveChatMessages, type ChatAttachment, type StoredChatMessage } from "@/lib/chat-store";

export function SupportChat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [unread, setUnread] = useState(false);
  const [messages, setMessages] = useState<StoredChatMessage[]>(initialChatMessages);
  const launcher = useRef<HTMLButtonElement>(null);
  const log = useRef<HTMLDivElement>(null);
  useEffect(() => { const syncMessages = () => setMessages(getStoredChatMessages()); syncMessages(); window.addEventListener("storage", syncMessages); window.addEventListener(chatChangedEvent, syncMessages); return () => { window.removeEventListener("storage", syncMessages); window.removeEventListener(chatChangedEvent, syncMessages); }; }, []);
  useEffect(() => { if (open && log.current) log.current.scrollTop = log.current.scrollHeight; }, [open, messages]);
  function toggleChat(nextOpen: boolean) { setOpen(nextOpen); if (nextOpen) setUnread(false); else launcher.current?.focus({ preventScroll: true }); }
  function sendMessage(text: string, attachment?: ChatAttachment) { const value = text.trim(); if ((!value && !attachment) || value.length > 1000) return; saveChatMessages([...messages, makeChatMessage("user", value, attachment)]); if (!open) setUnread(true); }
  if (pathname.startsWith("/mau/") || pathname.startsWith("/admin")) return null;
  return <aside className="support-chat" aria-label="Hỗ trợ DevDes">{open && <section className="support-chat-panel" id="support-chat-panel" role="dialog" aria-modal="false" aria-labelledby="support-chat-title" onKeyDown={(event) => { if (event.key === "Escape") toggleChat(false); }}><header className="support-chat-header"><span className="support-chat-avatar"><Image src="/images/devdes-mark.png" alt="" width={20} height={33} /></span><div><h2 id="support-chat-title">Chat với DevDes</h2><span><i /> Admin · Phản hồi qua Inbox</span></div><button type="button" onClick={() => toggleChat(false)} aria-label="Thu gọn chat"><Minus size={19} /></button></header><div className="support-chat-log" ref={log} role="log" aria-label="Tin nhắn" aria-live="polite" aria-relevant="additions text"><p className="support-chat-note">Cùng bắt đầu từ một lời chào.</p>{messages.map((message) => <div className={`support-chat-message is-${message.sender}`} key={message.id}><span>{message.sender === "admin" ? "Admin DevDes" : "Bạn"}</span><ChatMessageBody message={message} /></div>)}</div>{messages.length === 1 && <div className="support-chat-suggestions" aria-label="Gợi ý tin nhắn">{chatSuggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => sendMessage(suggestion)}>{suggestion}<ArrowUpRight size={12} /></button>)}</div>}<ChatComposer draft={draft} onDraftChange={setDraft} onSend={sendMessage} inputId="support-chat-input" placeholder="Nhắn DevDes một chút…" /><div className="support-chat-footnote"><span>Demo · Media lưu trong trình duyệt</span><Link href="/giao-dien">Xem giao diện <ArrowUpRight size={11} /></Link></div></section>}<button ref={launcher} type="button" className={`support-chat-launcher${open ? " is-open" : ""}`} aria-label={open ? "Thu gọn chat" : unread ? "Mở chat, có tin nhắn mới" : "Chat với DevDes"} aria-expanded={open} aria-controls={open ? "support-chat-panel" : undefined} onClick={() => toggleChat(!open)}>{open ? <Minus size={21} /> : <MessageCircle size={21} />}<span>{open ? "Thu gọn" : "Chat với mình"}</span>{!open && unread && <i className="support-chat-unread" />}</button></aside>;
}
