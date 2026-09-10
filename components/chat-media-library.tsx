"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import { animatedEmoji, emojiMediaUrl, mediaCategories, normalizeMediaSearch, reactionGifs } from "@/lib/chat-media-library";
import type { ChatAttachment } from "@/lib/chat-store";

export type MediaLibraryTab = "gif" | "animated" | "sticker";

export function ChatMediaImage({ src, alt, emoji }: { src: string; alt: string; emoji?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="chat-media-image-error"><span role="img" aria-label={alt}>{emoji || "🖼️"}</span><small>Ảnh chưa tải được</small></span>;
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}

export function ChatMediaLibrary({ initialTab, onPick, onClose }: { initialTab: MediaLibraryTab; onPick: (attachment: ChatAttachment) => void; onClose: () => void }) {
  const [tab, setTab] = useState(initialTab);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [limit, setLimit] = useState(24);
  const words = normalizeMediaSearch(query).trim().split(/\s+/).filter(Boolean);
  const items = tab === "gif" ? [...reactionGifs, ...animatedEmoji] : animatedEmoji;
  const matches = items.filter((item) => (category === "all" || item.category === category) && words.every((word) => item.search.includes(word)));
  return <section className="chat-library" aria-label="Kho GIF và sticker" onKeyDown={(event) => {
    if (event.key === "Escape") { event.stopPropagation(); onClose(); }
  }}>
    <header className="chat-library-header"><div><strong>Thêm chút cảm xúc</strong><span>{animatedEmoji.length} mẫu · GIF & sticker động</span></div><button type="button" aria-label="Đóng kho GIF và sticker" onClick={onClose}><X size={17} /></button></header>
    <div className="chat-library-tabs" aria-label="Loại nội dung">{([["gif", "GIF"], ["animated", "Sticker động"], ["sticker", "Sticker"]] as const).map(([value, label]) => <button type="button" key={value} aria-pressed={tab === value} onClick={() => { setTab(value); setLimit(24); }}>{label}</button>)}</div>
    <label className="chat-library-search"><Search size={15} /><input type="search" aria-label="Tìm GIF hoặc sticker" placeholder="Tìm: vui, yêu, mèo, chúc mừng…" value={query} onChange={(event) => { setQuery(event.target.value); setLimit(24); }} /></label>
    <div className="chat-library-categories" aria-label="Chủ đề">{mediaCategories.map(([id, label]) => <button type="button" key={id} aria-pressed={category === id} onClick={() => { setCategory(id); setLimit(24); }}>{label}</button>)}</div>
    <div className="chat-library-results" key={`${query}-${category}-${tab}`}>
      <div className={`chat-library-grid is-${tab}`}>{matches.slice(0, limit).map((item) => <button type="button" key={`${tab}-${item.codepoint}`} title={item.label} aria-label={`Chọn ${item.label}`} onClick={() => onPick({
        kind: tab === "gif" ? "gif" : "sticker",
        url: tab === "sticker" ? item.emoji : item.gifUrl || emojiMediaUrl(item.codepoint, tab === "gif" ? "gif" : "webp"),
        name: item.label, animated: tab !== "sticker", emoji: item.emoji,
      })}>{tab === "sticker" ? <span className="chat-library-emoji">{item.emoji}</span> : <ChatMediaImage src={item.gifUrl || emojiMediaUrl(item.codepoint, "webp")} alt={item.label} emoji={item.emoji} />}<small>{item.label}</small></button>)}</div>
      {!matches.length && <div className="chat-library-empty">Không tìm thấy mẫu phù hợp.<br />Thử từ khác hoặc chọn “Tất cả”.</div>}
      {matches.length > limit && <button type="button" className="chat-library-more" onClick={() => setLimit(limit + 24)}>Xem thêm · còn {matches.length - limit} mẫu</button>}
    </div>
    <footer className="chat-library-footer"><span>{matches.length} kết quả</span>{tab === "gif" && <a href="https://giphy.com/" target="_blank" rel="noreferrer">GIPHY ↗</a>}<a href="https://googlefonts.github.io/noto-emoji-animation/" target="_blank" rel="noreferrer">Noto Emoji · Google ↗</a></footer>
  </section>;
}
