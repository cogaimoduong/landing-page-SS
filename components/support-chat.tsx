"use client";

import { ArrowUpRight, Minus } from "lucide-react";
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
  const [messages, setMessages] = useState<StoredChatMessage[]>(initialChatMessages);
  const log = useRef<HTMLDivElement>(null);
  useEffect(() => { const syncMessages = () => setMessages(getStoredChatMessages()); syncMessages(); window.addEventListener("storage", syncMessages); window.addEventListener(chatChangedEvent, syncMessages); return () => { window.removeEventListener("storage", syncMessages); window.removeEventListener(chatChangedEvent, syncMessages); }; }, []);
  useEffect(() => { const openFromBrand = () => setOpen(true); window.addEventListener("devdes-open-chat", openFromBrand); return () => window.removeEventListener("devdes-open-chat", openFromBrand); }, []);
  useEffect(() => { if (open && log.current) log.current.scrollTop = log.current.scrollHeight; }, [open, messages]);
  function sendMessage(text: string, attachment?: ChatAttachment) { const value = text.trim(); if ((!value && !attachment) || value.length > 1000) return; saveChatMessages([...messages, makeChatMessage("user", value, attachment)]); }
  if (pathname.startsWith("/mau/") || pathname.startsWith("/admin")) return null;
  return <aside className="support-chat" aria-label="Hỗ trợ DevDes">{open && <section className="support-chat-panel" id="support-chat-panel" role="dialog" aria-modal="false" aria-labelledby="support-chat-title" onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }}><header className="support-chat-header"><span className="support-chat-avatar"><Image src="/images/devdes-mark.png" alt="" width={20} height={33} /></span><div><h2 id="support-chat-title">Chat với DevDes</h2><span><i /> Admin · Phản hồi qua Inbox</span></div><button type="button" onClick={() => setOpen(false)} aria-label="Thu gọn chat"><Minus size={19} /></button></header><div className="support-chat-log" ref={log} role="log" aria-label="Tin nhắn" aria-live="polite" aria-relevant="additions text"><p className="support-chat-note">Cùng bắt đầu từ một lời chào.</p>{messages.map((message) => <div className={`support-chat-message is-${message.sender}`} key={message.id}><span>{message.sender === "admin" ? "Admin DevDes" : "Bạn"}</span><ChatMessageBody message={message} /></div>)}</div>{messages.length === 1 && <div className="support-chat-suggestions" aria-label="Gợi ý tin nhắn">{chatSuggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => sendMessage(suggestion)}>{suggestion}<ArrowUpRight size={12} /></button>)}</div>}<ChatComposer draft={draft} onDraftChange={setDraft} onSend={sendMessage} inputId="support-chat-input" placeholder="Nhắn DevDes một chút…" /><div className="support-chat-footnote"><span>Demo · Media lưu trong trình duyệt</span><Link href="/giao-dien">Xem giao diện <ArrowUpRight size={11} /></Link></div></section>}<button className="support-chat-launcher" type="button" onClick={() => setOpen(true)} aria-label="Mở chat với DevDes" aria-expanded={open} aria-controls={open ? "support-chat-panel" : undefined} aria-haspopup="dialog" title="Chat với DevDes"><Image src="/images/devdes-mark.png" alt="" width={24} height={40} /></button></aside>;
}
