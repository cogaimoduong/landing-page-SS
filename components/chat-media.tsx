"use client";

import { CirclePlus, Gift, ImageIcon, LayoutTemplate, Mic, Send, Smile, Square, Sticker, ThumbsUp, X } from "lucide-react";
import EmojiPicker, { type EmojiClickData, Theme } from "emoji-picker-react";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import type { ChatAttachment, StoredChatMessage } from "@/lib/chat-store";
import { templates } from "@/lib/templates";

const maxMediaSize = 2.5 * 1024 * 1024;
const gifOptions = [
  { label: "Vui quá", url: "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif" },
  { label: "Xin chào", url: "https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif" },
  { label: "Tuyệt vời", url: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif" },
];
const stickerOptions = ["✨", "🎉", "🔥", "❤️", "🙌", "😎"];

function TemplateReview({ attachment }: { attachment: ChatAttachment }) {
  const [showDemo, setShowDemo] = useState(false);
  return <div className="chat-template-card"><div className="chat-template-cover" style={{ backgroundColor: attachment.tone || "#e8e5de" }}>{attachment.url ? <img src={attachment.url} alt={`Xem trước ${attachment.name}`} /> : <span>{attachment.name}</span>}</div><div><small>MẪU GIAO DIỆN</small><strong>{attachment.name}</strong><button type="button" onClick={() => setShowDemo((value) => !value)}>{showDemo ? "Thu gọn xem trước" : "Xem demo trong chat"}</button><a href={attachment.href || "/giao-dien"} target="_blank" rel="noreferrer">Mở trang riêng</a></div>{showDemo && attachment.href && <iframe title={`Xem trước ${attachment.name}`} src={attachment.href} loading="lazy" />}</div>;
}

export function ChatMessageBody({ message }: { message: StoredChatMessage }) {
  const attachment = message.attachment;
  return <>{attachment && <div className={`chat-attachment is-${attachment.kind}`}>{attachment.kind === "image" || attachment.kind === "gif" ? <img src={attachment.url} alt={attachment.name || "Ảnh đính kèm"} /> : attachment.kind === "video" ? <video src={attachment.url} controls preload="metadata" /> : attachment.kind === "audio" ? <audio src={attachment.url} controls /> : attachment.kind === "template" ? <TemplateReview attachment={attachment} /> : <span role="img" aria-label="Sticker">{attachment.url}</span>}</div>}{message.text && <p>{message.text}</p>}</>;
}

type ChatComposerProps = {
  draft: string;
  onDraftChange: (value: string) => void;
  onSend: (text: string, attachment?: ChatAttachment) => void;
  inputId: string;
  placeholder: string;
  className?: string;
};

export function ChatComposer({ draft, onDraftChange, onSend, inputId, placeholder, className = "" }: ChatComposerProps) {
  const [panel, setPanel] = useState<"tools" | "emoji" | "gif" | "sticker" | "template" | null>(null);
  const [attachment, setAttachment] = useState<ChatAttachment>();
  const [notice, setNotice] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const recorder = useRef<MediaRecorder | null>(null);

  function focusInput() { input.current?.focus({ preventScroll: true }); }
  function addEmoji(emoji: EmojiClickData) { onDraftChange(`${draft}${emoji.emoji}`); focusInput(); }
  function pickFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) { setNotice("Chỉ hỗ trợ ảnh hoặc video."); return; }
    if (file.size > maxMediaSize) { setNotice("Tệp tối đa 2,5 MB trong bản demo này."); return; }
    const reader = new FileReader();
    reader.onload = () => { setAttachment({ kind: file.type.startsWith("video/") ? "video" : "image", url: String(reader.result), name: file.name }); setNotice(""); setPanel(null); };
    reader.readAsDataURL(file);
  }
  function toggleRecording() {
    if (isRecording) { recorder.current?.stop(); return; }
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) { setNotice("Trình duyệt này chưa hỗ trợ ghi âm."); return; }
    navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } }).then((stream) => {
      const chunks: BlobPart[] = [];
      const mediaRecorder = new MediaRecorder(stream);
      recorder.current = mediaRecorder;
      mediaRecorder.ondataavailable = (event) => chunks.push(event.data);
      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        const blob = new Blob(chunks, { type: mediaRecorder.mimeType || "audio/webm" });
        if (blob.size > maxMediaSize) setNotice("Bản ghi quá lớn (tối đa 2,5 MB).");
        else { const reader = new FileReader(); reader.onload = () => setAttachment({ kind: "audio", url: String(reader.result), name: "Ghi âm" }); reader.readAsDataURL(blob); }
        setIsRecording(false); recorder.current = null;
      };
      mediaRecorder.start(); setIsRecording(true); setNotice("Đang ghi âm — nhấn lại để dừng.");
    }).catch((error: unknown) => {
      const name = error instanceof DOMException ? error.name : "UnknownError";
      if (name === "NotAllowedError" || name === "SecurityError") setNotice("Chrome hoặc Windows đang chặn micro. Kiểm tra Quyền riêng tư > Microphone của Windows.");
      else if (name === "NotFoundError") setNotice("Không tìm thấy micro. Hãy kết nối/chọn micro trong cài đặt âm thanh Windows.");
      else if (name === "NotReadableError") setNotice("Micro đang được ứng dụng khác sử dụng. Hãy đóng Zoom, Teams hoặc ứng dụng ghi âm rồi thử lại.");
      else setNotice(`Không thể khởi động micro (${name}). Hãy thử lại sau.`);
    });
  }
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (!draft.trim() && !attachment) return; onSend(draft, attachment); onDraftChange(""); setAttachment(undefined); setNotice(""); setPanel(null); focusInput(); }
  const setSelectedAttachment = (next: ChatAttachment) => { setAttachment(next); setPanel(null); setNotice(""); focusInput(); };
  return <div className={`chat-media-composer ${className}`}>
    <input ref={fileInput} className="chat-file-input" type="file" accept="image/*,video/*" onChange={pickFile} />
    {attachment && <div className="chat-media-preview"><span>{attachment.kind === "image" ? <img src={attachment.url} alt="Xem trước ảnh" /> : attachment.kind === "video" ? <video src={attachment.url} muted /> : attachment.kind === "audio" ? <audio src={attachment.url} controls /> : attachment.kind === "gif" ? <img src={attachment.url} alt="Xem trước GIF" /> : attachment.url}</span><button type="button" onClick={() => setAttachment(undefined)} aria-label="Bỏ tệp đính kèm"><X size={15} /></button></div>}
    {notice && <p className="chat-media-notice">{notice}</p>}
    {panel === "tools" && <div className="chat-media-tools" aria-label="Công cụ nhắn tin"><button type="button" onClick={() => fileInput.current?.click()}><ImageIcon size={17} /><span>Ảnh/video</span></button><button type="button" onClick={() => setPanel("gif")}><Gift size={17} /><span>GIF</span></button><button type="button" onClick={() => setPanel("sticker")}><Sticker size={17} /><span>Sticker</span></button><button type="button" onClick={() => setPanel("template")}><LayoutTemplate size={17} /><span>Mẫu web</span></button><button type="button" className={isRecording ? "is-recording" : ""} onClick={toggleRecording}>{isRecording ? <Square size={15} fill="currentColor" /> : <Mic size={17} />}<span>{isRecording ? "Dừng" : "Ghi âm"}</span></button></div>}
    {panel === "gif" && <div className="chat-media-gallery" aria-label="Chọn GIF">{gifOptions.map((gif) => <button type="button" key={gif.url} onClick={() => setSelectedAttachment({ kind: "gif", url: gif.url, name: gif.label })}><img src={gif.url} alt={gif.label} /></button>)}</div>}
    {panel === "sticker" && <div className="chat-sticker-gallery" aria-label="Chọn sticker">{stickerOptions.map((sticker) => <button type="button" key={sticker} onClick={() => setSelectedAttachment({ kind: "sticker", url: sticker })}>{sticker}</button>)}</div>}
    {panel === "template" && <div className="chat-template-gallery" aria-label="Chọn mẫu giao diện">{templates.map((template) => <button type="button" key={template.slug} onClick={() => setSelectedAttachment({ kind: "template", url: template.image, name: template.name, href: `/giao-dien/${template.slug}`, tone: template.tone })}><span style={{ background: template.tone }}>{template.image && <img src={template.image} alt="" />}</span><strong>{template.name}</strong><small>{template.categoryLabel}</small></button>)}</div>}
    {panel === "emoji" && <div className="chat-media-emoji-picker"><EmojiPicker theme={Theme.LIGHT} width="100%" height={320} onEmojiClick={addEmoji} searchPlaceHolder="Tìm emoji" previewConfig={{ showPreview: false }} /></div>}
    <form className="chat-media-form" onSubmit={submit}><button type="button" className={panel === "tools" ? "is-active" : ""} onClick={() => setPanel(panel === "tools" ? null : "tools")} aria-label="Thêm công cụ"><CirclePlus size={21} /></button><input ref={input} id={inputId} aria-label="Nội dung tin nhắn" placeholder={placeholder} value={draft} onChange={(event) => onDraftChange(event.target.value)} maxLength={1000} autoComplete="off" /><button type="button" className={panel === "emoji" ? "is-active" : ""} onClick={() => setPanel(panel === "emoji" ? null : "emoji")} aria-label="Chọn emoji"><Smile size={20} /></button>{draft.trim() || attachment ? <button type="submit" className="chat-media-send" aria-label="Gửi tin nhắn"><Send size={17} /></button> : <button type="button" className="chat-media-like" onClick={() => onSend("👍")} aria-label="Gửi lượt thích"><ThumbsUp size={20} fill="currentColor" /></button>}</form>
  </div>;
}
