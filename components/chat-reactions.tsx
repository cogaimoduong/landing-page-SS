"use client";

import EmojiPicker, { Theme } from "emoji-picker-react";
import { SmilePlus, X } from "lucide-react";
import { useState } from "react";
import { type ChatActor, type StoredChatMessage } from "@/lib/chat-store";
import { useLocale } from "@/components/locale-provider";

const quickReactions = ["❤️", "👍", "😂", "😮", "😢", "😡", "🎉", "🔥"];

export function ChatReactions({ message, actor, onReact, disabled = false }: { message: StoredChatMessage; actor: ChatActor; onReact: (id: string, emoji: string) => Promise<void>; disabled?: boolean }) {
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState("");
  const reactions = message.reactions || {};
  const emojis = [...new Set(Object.values(reactions).filter((emoji): emoji is string => Boolean(emoji)))];
  const copy = locale === "en"
    ? { you: "You", admin: "DevDes admin", visitor: "Visitor", change: "Click to change or remove reaction", add: "Add reaction", choose: "Choose a reaction for this message", close: "Close reaction picker", collapse: "Show less", all: "All reactions", search: "Search emoji", error: "Could not save reaction. Please try again." }
    : { you: "Bạn", admin: "Admin DevDes", visitor: "Khách", change: "Bấm để đổi hoặc gỡ cảm xúc", add: "Thả cảm xúc", choose: "Chọn cảm xúc cho tin nhắn", close: "Đóng chọn cảm xúc", collapse: "Thu gọn", all: "Tất cả cảm xúc", search: "Tìm emoji", error: "Chưa lưu được cảm xúc. Hãy thử lại." };
  async function react(emoji: string) {
    if (disabled) return;
    try {
      await onReact(message.id, reactions[actor] === emoji ? "" : emoji);
      setOpen(false); setShowAll(false); setError("");
    } catch { setError(copy.error); }
  }
  return <div className="chat-reactions" onKeyDown={(event) => {
    if (event.key === "Escape" && open) { event.stopPropagation(); setOpen(false); setShowAll(false); }
  }}>
    <div className="chat-reaction-summary">
      {emojis.map((emoji) => {
        const people = (Object.keys(reactions) as ChatActor[]).filter((person) => reactions[person] === emoji);
        const names = people.map((person) => person === actor ? copy.you : person === "admin" ? copy.admin : copy.visitor).join(", ");
        return <button type="button" className="chat-reaction-chip" key={emoji} aria-pressed={reactions[actor] === emoji} aria-label={`${emoji} · ${names}. ${copy.change}`} title={names} onClick={() => react(emoji)}><span>{emoji}</span><small>{people.length}</small></button>;
      })}
      {!disabled && <button type="button" className="chat-reaction-add" aria-label={copy.add} aria-expanded={open} title={copy.add} onClick={() => { setOpen(!open); setShowAll(false); }}><SmilePlus size={15} /></button>}
    </div>
    {open && !disabled && <div className="chat-reaction-picker" aria-label={copy.choose}>
      <div className="chat-reaction-quick">{quickReactions.map((emoji) => <button type="button" key={emoji} aria-label={`${copy.add} ${emoji}`} aria-pressed={reactions[actor] === emoji} onClick={() => react(emoji)}>{emoji}</button>)}<button type="button" aria-label={copy.close} onClick={() => setOpen(false)}><X size={14} /></button></div>
      <button className="chat-reaction-more" type="button" onClick={() => setShowAll(!showAll)} aria-expanded={showAll}>{showAll ? copy.collapse : copy.all}</button>
      {showAll && <EmojiPicker theme={Theme.LIGHT} width="100%" height={300} onEmojiClick={({ emoji }) => react(emoji)} searchPlaceHolder={copy.search} previewConfig={{ showPreview: false }} lazyLoadEmojis />}
    </div>}
    {error && <span className="chat-reaction-error" role="alert">{error}</span>}
  </div>;
}
