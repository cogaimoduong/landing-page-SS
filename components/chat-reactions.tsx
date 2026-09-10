"use client";

import EmojiPicker, { Theme } from "emoji-picker-react";
import { SmilePlus, X } from "lucide-react";
import { useState } from "react";
import { toggleChatReaction, type ChatActor, type StoredChatMessage } from "@/lib/chat-store";

const quickReactions = ["❤️", "👍", "😂", "😮", "😢", "😡", "🎉", "🔥"];

export function ChatReactions({ message, actor }: { message: StoredChatMessage; actor: ChatActor }) {
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState("");
  const reactions = message.reactions || {};
  const emojis = [...new Set(Object.values(reactions).filter((emoji): emoji is string => Boolean(emoji)))];
  function react(emoji: string) {
    try {
      toggleChatReaction(message.id, actor, emoji);
      setOpen(false); setShowAll(false); setError("");
    } catch { setError("Chưa lưu được cảm xúc. Hãy thử lại."); }
  }
  return <div className="chat-reactions" onKeyDown={(event) => {
    if (event.key === "Escape" && open) { event.stopPropagation(); setOpen(false); setShowAll(false); }
  }}>
    <div className="chat-reaction-summary">
      {emojis.map((emoji) => {
        const people = (Object.keys(reactions) as ChatActor[]).filter((person) => reactions[person] === emoji);
        const names = people.map((person) => person === actor ? "Bạn" : person === "admin" ? "Admin DevDes" : "Khách").join(", ");
        return <button type="button" className="chat-reaction-chip" key={emoji} aria-pressed={reactions[actor] === emoji} aria-label={`${emoji} · ${names}. Bấm để đổi hoặc gỡ cảm xúc`} title={names} onClick={() => react(emoji)}><span>{emoji}</span><small>{people.length}</small></button>;
      })}
      <button type="button" className="chat-reaction-add" aria-label="Thả cảm xúc" aria-expanded={open} title="Thả cảm xúc" onClick={() => { setOpen(!open); setShowAll(false); }}><SmilePlus size={15} /></button>
    </div>
    {open && <div className="chat-reaction-picker" aria-label="Chọn cảm xúc cho tin nhắn">
      <div className="chat-reaction-quick">{quickReactions.map((emoji) => <button type="button" key={emoji} aria-label={`Thả ${emoji}`} aria-pressed={reactions[actor] === emoji} onClick={() => react(emoji)}>{emoji}</button>)}<button type="button" aria-label="Đóng chọn cảm xúc" onClick={() => setOpen(false)}><X size={14} /></button></div>
      <button className="chat-reaction-more" type="button" onClick={() => setShowAll(!showAll)} aria-expanded={showAll}>{showAll ? "Thu gọn" : "Tất cả cảm xúc"}</button>
      {showAll && <EmojiPicker theme={Theme.LIGHT} width="100%" height={300} onEmojiClick={({ emoji }) => react(emoji)} searchPlaceHolder="Tìm emoji" previewConfig={{ showPreview: false }} lazyLoadEmojis />}
    </div>}
    {error && <span className="chat-reaction-error" role="alert">{error}</span>}
  </div>;
}
