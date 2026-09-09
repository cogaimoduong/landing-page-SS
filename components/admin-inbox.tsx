"use client";

import Link from "next/link";
import { ArrowLeft, Check, CirclePlus, Gift, ImageIcon, MessageCircle, Mic, Send, Smile, Sticker, ThumbsUp } from "lucide-react";
import EmojiPicker, { type EmojiClickData, Theme } from "emoji-picker-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { chatChangedEvent, getStoredChatMessages, initialChatMessages, makeChatMessage, saveChatMessages, type StoredChatMessage } from "@/lib/chat-store";

export function AdminInbox() {
  const [messages, setMessages] = useState<StoredChatMessage[]>(initialChatMessages);
  const [draft, setDraft] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMoreTools, setShowMoreTools] = useState(false);
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const syncMessages = () => setMessages(getStoredChatMessages());
    syncMessages(); window.addEventListener("storage", syncMessages); window.addEventListener(chatChangedEvent, syncMessages);
    return () => { window.removeEventListener("storage", syncMessages); window.removeEventListener(chatChangedEvent, syncMessages); };
  }, []);
  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight }); }, [messages]);
  function sendReply(event?: FormEvent<HTMLFormElement>, text = draft) { event?.preventDefault(); const value = text.trim(); if (!value) return; saveChatMessages([...messages, makeChatMessage("admin", value)]); setDraft(""); input.current?.focus({ preventScroll: true }); }
  function addEmoji(emoji: EmojiClickData) { setDraft((value) => `${value}${emoji.emoji}`); input.current?.focus({ preventScroll: true }); }
  const visitorMessages = messages.filter((message) => message.sender === "user").length;
  return <main className="admin-inbox"><header className="admin-inbox-header"><Link href="/" className="admin-back"><ArrowLeft size={17} /> Về landing page</Link><div><span className="admin-kicker">DevDes · Khu vực quản trị</span><h1>Hộp thư hỗ trợ</h1></div><span className="admin-demo-badge">Bản demo trên trình duyệt</span></header><section className="admin-inbox-workspace" aria-label="Hộp thư chat"><aside className="admin-conversations"><div className="admin-conversations-title"><span>Hội thoại</span><b>1</b></div><button type="button" className="admin-conversation is-active"><span className="admin-avatar">K</span><span><strong>Khách từ landing page</strong><small>{visitorMessages ? `${visitorMessages} tin nhắn từ khách` : "Chưa có tin nhắn"}</small></span><i /></button><p>Ở bản thật, danh sách này sẽ có tất cả khách, tìm kiếm, trạng thái và người phụ trách.</p></aside><section className="admin-chat"><header className="admin-chat-header"><span className="admin-avatar">K</span><div><strong>Khách từ landing page</strong><small><i /> Đang mở hội thoại</small></div><button type="button"><Check size={15} /> Đánh dấu xong</button></header><div className="admin-chat-log" ref={log}><p className="admin-chat-note">Các tin nhắn được lưu tạm trong trình duyệt này.</p>{messages.map((message) => <article className={`admin-message is-${message.sender}`} key={message.id}><span>{message.sender === "admin" ? "Bạn (Admin)" : "Khách"}</span><p>{message.text}</p></article>)}</div><div className="admin-reply-composer">{showMoreTools && <div className="admin-more-tools" aria-label="Công cụ nhắn tin"><button type="button" title="Ảnh"><ImageIcon size={17} /></button><button type="button" title="GIF"><Gift size={17} /></button><button type="button" title="Sticker"><Sticker size={17} /></button><button type="button" title="Ghi âm"><Mic size={17} /></button></div>}{showEmojiPicker && <div className="admin-emoji-picker"><EmojiPicker theme={Theme.LIGHT} width="100%" height={340} onEmojiClick={addEmoji} searchPlaceHolder="Tìm emoji" previewConfig={{ showPreview: false }} /></div>}<form className="admin-reply-form" onSubmit={sendReply}><label htmlFor="admin-reply">Trả lời khách</label><div><button type="button" className={`admin-chat-tool${showMoreTools ? " is-active" : ""}`} onClick={() => { setShowMoreTools((value) => !value); setShowEmojiPicker(false); }} aria-label="Thêm công cụ"><CirclePlus size={20} /></button><input ref={input} id="admin-reply" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Nhập tin nhắn trả lời…" maxLength={1000} autoComplete="off" /><button type="button" className={`admin-chat-tool${showEmojiPicker ? " is-active" : ""}`} onClick={() => { setShowEmojiPicker((value) => !value); setShowMoreTools(false); }} aria-label="Chọn emoji"><Smile size={19} /></button>{draft.trim() ? <button type="submit" className="admin-chat-send" aria-label="Gửi tin nhắn"><Send size={17} /> Gửi</button> : <button type="button" className="admin-chat-like" onClick={() => sendReply(undefined, "👍")} aria-label="Gửi lượt thích"><ThumbsUp size={19} fill="currentColor" /></button>}</div></form></div></section></section><footer className="admin-inbox-footer"><MessageCircle size={15} /> Khi có cơ sở dữ liệu, trang này sẽ nhận tin từ mọi thiết bị và yêu cầu đăng nhập admin.</footer></main>;
}
