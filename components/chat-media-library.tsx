"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import {
  animatedEmoji,
  emojiMediaUrl,
  mediaCategories,
  normalizeMediaSearch,
  reactionGifs,
} from "@/lib/chat-media-library";
import type { ChatAttachment } from "@/lib/chat-store";
import { useLocale } from "@/components/locale-provider";

export type MediaLibraryTab = "gif" | "animated" | "sticker";

const categoryLabels: Record<string, { en: string; vi: string }> = {
  all: { en: "All", vi: "Tất cả" },
  "Smileys and emotions": { en: "Smileys & emotions", vi: "Cảm xúc" },
  People: { en: "People", vi: "Con người" },
  "Animals and nature": { en: "Animals & nature", vi: "Động vật" },
  "Food and drink": { en: "Food & drink", vi: "Đồ ăn" },
  "Travel and places": { en: "Travel & places", vi: "Du lịch" },
  "Activities and events": { en: "Activities & events", vi: "Hoạt động" },
  Objects: { en: "Objects", vi: "Đồ vật" },
  Symbols: { en: "Symbols", vi: "Biểu tượng" },
  Flags: { en: "Flags", vi: "Cờ" },
};

const reactionLabels: Record<string, { en: string; vi: string }> = {
  "3o7btPCcdNniyf0ArS": { en: "So happy", vi: "Vui quá" },
  l0MYt5jPR6QX5pnqM: { en: "Celebrate", vi: "Ăn mừng" },
  "26gsjCZpPolPr3sBy": { en: "Thank you", vi: "Cảm ơn" },
  "111ebonMs90YLu": { en: "Awesome", vi: "Tuyệt vời" },
  xT9IgG50Fb7Mi0prBC: { en: "Hello", vi: "Xin chào" },
  MDJ9IbxxvDUQM: { en: "Cute cat", vi: "Mèo dễ thương" },
  JIX9t2j0ZTN9S: { en: "Working cat", vi: "Mèo làm việc" },
  mlvseq9yvZhba: { en: "Cat stare", vi: "Ánh nhìn của mèo" },
  "13CoXDiaCcCoyk": { en: "Playful cat", vi: "Mèo tinh nghịch" },
};

export function ChatMediaImage({
  src,
  alt,
  emoji,
}: {
  src: string;
  alt: string;
  emoji?: string;
}) {
  const { locale } = useLocale();
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="chat-media-image-error">
        <span role="img" aria-label={alt}>{emoji || "🖼️"}</span>
        <small>{locale === "en" ? "Image could not load" : "Ảnh chưa tải được"}</small>
      </span>
    );
  }

  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}

export function ChatMediaLibrary({
  initialTab,
  onPick,
  onClose,
}: {
  initialTab: MediaLibraryTab;
  onPick: (attachment: ChatAttachment) => void;
  onClose: () => void;
}) {
  const { locale } = useLocale();
  const [tab, setTab] = useState(initialTab);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [limit, setLimit] = useState(24);
  const copy = locale === "en"
    ? {
        library: "GIF and sticker library",
        heading: "Add a little feeling",
        samples: "items · GIFs & animated stickers",
        close: "Close GIF and sticker library",
        contentType: "Content type",
        animated: "Animated stickers",
        search: "Search GIFs or stickers",
        placeholder: "Search: happy, love, cat, celebrate…",
        categories: "Topics",
        choose: "Choose",
        noResults: "No matching items found.",
        noResultsHint: "Try another keyword or choose “All”.",
        showMore: "Show more",
        remaining: "items left",
        results: "results",
      }
    : {
        library: "Kho GIF và sticker",
        heading: "Thêm chút cảm xúc",
        samples: "mẫu · GIF & sticker động",
        close: "Đóng kho GIF và sticker",
        contentType: "Loại nội dung",
        animated: "Sticker động",
        search: "Tìm GIF hoặc sticker",
        placeholder: "Tìm: vui, yêu, mèo, chúc mừng…",
        categories: "Chủ đề",
        choose: "Chọn",
        noResults: "Không tìm thấy mẫu phù hợp.",
        noResultsHint: "Thử từ khóa khác hoặc chọn “Tất cả”.",
        showMore: "Xem thêm",
        remaining: "mẫu còn lại",
        results: "kết quả",
      };
  const words = normalizeMediaSearch(query).trim().split(/\s+/).filter(Boolean);
  const items = tab === "gif" ? [...reactionGifs, ...animatedEmoji] : animatedEmoji;
  const matches = items.filter(
    (item) =>
      (category === "all" || item.category === category) &&
      words.every((word) => item.search.includes(word)),
  );
  const itemLabel = (codepoint: string, fallback: string) =>
    reactionLabels[codepoint]?.[locale] || fallback;

  return (
    <section
      className="chat-library"
      aria-label={copy.library}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          onClose();
        }
      }}
    >
      <header className="chat-library-header">
        <div>
          <strong>{copy.heading}</strong>
          <span>{animatedEmoji.length} {copy.samples}</span>
        </div>
        <button type="button" aria-label={copy.close} onClick={onClose}>
          <X size={17} />
        </button>
      </header>

      <div className="chat-library-tabs" aria-label={copy.contentType}>
        {(["gif", "animated", "sticker"] as const).map((value) => (
          <button
            type="button"
            key={value}
            aria-pressed={tab === value}
            onClick={() => {
              setTab(value);
              setLimit(24);
            }}
          >
            {value === "gif" ? "GIF" : value === "animated" ? copy.animated : "Sticker"}
          </button>
        ))}
      </div>

      <label className="chat-library-search">
        <Search size={15} />
        <input
          type="search"
          aria-label={copy.search}
          placeholder={copy.placeholder}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setLimit(24);
          }}
        />
      </label>

      <div className="chat-library-categories" aria-label={copy.categories}>
        {mediaCategories.map(([id, fallback]) => (
          <button
            type="button"
            key={id}
            aria-pressed={category === id}
            onClick={() => {
              setCategory(id);
              setLimit(24);
            }}
          >
            {categoryLabels[id]?.[locale] || fallback}
          </button>
        ))}
      </div>

      <div className="chat-library-results" key={`${query}-${category}-${tab}`}>
        <div className={`chat-library-grid is-${tab}`}>
          {matches.slice(0, limit).map((item) => {
            const label = itemLabel(item.codepoint, item.label);
            return (
              <button
                type="button"
                key={`${tab}-${item.codepoint}`}
                title={label}
                aria-label={`${copy.choose} ${label}`}
                onClick={() => onPick({
                  kind: tab === "gif" ? "gif" : "sticker",
                  url: tab === "sticker"
                    ? item.emoji
                    : item.gifUrl || emojiMediaUrl(item.codepoint, tab === "gif" ? "gif" : "webp"),
                  name: label,
                  animated: tab !== "sticker",
                  emoji: item.emoji,
                })}
              >
                {tab === "sticker" ? (
                  <span className="chat-library-emoji">{item.emoji}</span>
                ) : (
                  <ChatMediaImage
                    src={item.gifUrl || emojiMediaUrl(item.codepoint, "webp")}
                    alt={label}
                    emoji={item.emoji}
                  />
                )}
                <small>{label}</small>
              </button>
            );
          })}
        </div>
        {!matches.length && (
          <div className="chat-library-empty">
            {copy.noResults}<br />{copy.noResultsHint}
          </div>
        )}
        {matches.length > limit && (
          <button
            type="button"
            className="chat-library-more"
            onClick={() => setLimit((current) => current + 24)}
          >
            {copy.showMore} · {matches.length - limit} {copy.remaining}
          </button>
        )}
      </div>

      <footer className="chat-library-footer">
        <span>{matches.length} {copy.results}</span>
        {tab === "gif" && <a href="https://giphy.com/" target="_blank" rel="noreferrer">GIPHY ↗</a>}
        <a href="https://googlefonts.github.io/noto-emoji-animation/" target="_blank" rel="noreferrer">Noto Emoji · Google ↗</a>
      </footer>
    </section>
  );
}
