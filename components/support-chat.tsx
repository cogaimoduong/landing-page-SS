"use client";

import { ArrowUpRight, CirclePlus, Gift, ImageIcon, MessageCircle, Mic, Minus, Send, Smile, Sticker, ThumbsUp } from "lucide-react";
import EmojiPicker, { type EmojiClickData, Theme } from "emoji-picker-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { chatSuggestions } from "@/lib/chat-demo";
import { chatChangedEvent, getStoredChatMessages, initialChatMessages, makeChatMessage, saveChatMessages, type StoredChatMessage } from "@/lib/chat-store";

export function SupportChat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [unread, setUnread] = useState(false);
  const [messages, setMessages] = useState<StoredChatMessage[]>(initialChatMessages);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMoreTools, setShowMoreTools] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncMessages = () => setMessages(getStoredChatMessages());
    syncMessages();
    window.addEventListener("storage", syncMessages);
    window.addEventListener(chatChangedEvent, syncMessages);
    return () => { window.removeEventListener("storage", syncMessages); window.removeEventListener(chatChangedEvent, syncMessages); };
  }, []);
  useEffect(() => { if (open && log.current) log.current.scrollTop = log.current.scrollHeight; }, [open, messages]);
  useEffect(() => { if (open) input.current?.focus({ preventScroll: true }); }, [open]);

  function toggleChat(nextOpen: boolean) { setOpen(nextOpen); if (nextOpen) setUnread(false); else { setShowEmojiPicker(false); setShowMoreTools(false); launcher.current?.focus({ preventScroll: true }); } }
  function sendMessage(text: string) { const value = text.trim(); if (!value || value.length > 1000) return; saveChatMessages([...messages, makeChatMessage("user", value)]); setDraft(""); input.current?.focus({ preventScroll: true }); if (!open) setUnread(true); }
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); sendMessage(draft); }
  function addEmoji(emoji: EmojiClickData) { setDraft((value) => `${value}${emoji.emoji}`); input.current?.focus({ preventScroll: true }); }
  if (pathname.startsWith("/mau/") || pathname.startsWith("/admin")) return null;

  return <aside className="support-chat" aria-label="Hỗ trợ DevDes">
    {open && <section className="support-chat-panel" id="support-chat-panel" role="dialog" aria-modal="false" aria-labelledby="support-chat-title" onKeyDown={(event) => { if (event.key === "Escape") toggleChat(false); }}>
      <header className="support-chat-header"><span className="support-chat-avatar"><Image src="/images/devdes-mark.png" alt="" width={20} height={33} /></span><div><h2 id="support-chat-title">Chat với DevDes</h2><span><i /> Admin · Phản hồi qua Inbox</span></div><button type="button" onClick={() => toggleChat(false)} aria-label="Thu gọn chat"><Minus size={19} /></button></header>
      <div className="support-chat-log" ref={log} role="log" aria-label="Tin nhắn" aria-live="polite" aria-relevant="additions text"><p className="support-chat-note">Cùng bắt đầu từ một lời chào.</p>{messages.map((message) => <div className={`support-chat-message is-${message.sender}`} key={message.id}><span>{message.sender === "admin" ? "Admin DevDes" : "Bạn"}</span><p>{message.text}</p></div>)}</div>
      {messages.length === 1 && <div className="support-chat-suggestions" aria-label="Gợi ý tin nhắn">{chatSuggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => sendMessage(suggestion)}>{suggestion}<ArrowUpRight size={12} /></button>)}</div>}
      <div className="support-chat-composer">
        {showMoreTools && <div className="support-chat-more-tools" aria-label="Công cụ nhắn tin"><button type="button" title="Ảnh"><ImageIcon size={17} /></button><button type="button" title="GIF"><Gift size={17} /></button><button type="button" title="Sticker"><Sticker size={17} /></button><button type="button" title="Ghi âm"><Mic size={17} /></button></div>}
        {showEmojiPicker && <div className="support-chat-emoji-picker"><EmojiPicker theme={Theme.LIGHT} width="100%" height={320} onEmojiClick={addEmoji} searchPlaceHolder="Tìm emoji" previewConfig={{ showPreview: false }} /></div>}
        <form className="support-chat-form" onSubmit={submit}><button type="button" className={`support-chat-tool${showMoreTools ? " is-active" : ""}`} onClick={() => { setShowMoreTools((value) => !value); setShowEmojiPicker(false); }} aria-label="Thêm công cụ"><CirclePlus size={21} /></button><input ref={input} aria-label="Nội dung tin nhắn" placeholder="Nhắn DevDes một chút…" value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={1000} autoComplete="off" /><button type="button" className={`support-chat-tool${showEmojiPicker ? " is-active" : ""}`} onClick={() => { setShowEmojiPicker((value) => !value); setShowMoreTools(false); }} aria-label="Chọn emoji"><Smile size={20} /></button>{draft.trim() ? <button type="submit" className="support-chat-send" aria-label="Gửi tin nhắn"><Send size={17} /></button> : <button type="button" className="support-chat-like" onClick={() => sendMessage("👍")} aria-label="Gửi lượt thích"><ThumbsUp size={20} fill="currentColor" /></button>}</form>
      </div>
      <div className="support-chat-footnote"><span>Demo · Admin trả lời từ Inbox</span><Link href="/giao-dien">Xem giao diện <ArrowUpRight size={11} /></Link></div>
    </section>}
    <button ref={launcher} type="button" className={`support-chat-launcher${open ? " is-open" : ""}`} aria-label={open ? "Thu gọn chat" : unread ? "Mở chat, có tin nhắn mới" : "Chat với DevDes"} aria-expanded={open} aria-controls={open ? "support-chat-panel" : undefined} onClick={() => toggleChat(!open)}>{open ? <Minus size={21} /> : <MessageCircle size={21} />}<span>{open ? "Thu gọn" : "Chat với mình"}</span>{!open && unread && <i className="support-chat-unread" />}</button>
  </aside>;
}
