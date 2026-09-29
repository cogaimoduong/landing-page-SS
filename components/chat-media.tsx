"use client";

import { CirclePlus, Gift, ImageIcon, LayoutTemplate, Mic, Send, Smile, Square, Sticker, ThumbsUp, X } from "lucide-react";
import EmojiPicker, { type EmojiClickData, Theme } from "emoji-picker-react";
import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import type { ChatAttachment, StoredChatMessage } from "@/lib/chat-store";
import { getTemplate, getTemplates } from "@/lib/templates";
import { ChatMediaImage, ChatMediaLibrary } from "@/components/chat-media-library";
import { useLocale } from "@/components/locale-provider";

const maxMediaSize = 2.5 * 1024 * 1024;
const emailPattern = /[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+/gi;

function MessageText({ text, emailTitle }: { text: string; emailTitle: string }) {
  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(emailPattern)) {
    const email = match[0];
    const index = match.index ?? 0;
    if (index > cursor) parts.push(text.slice(cursor, index));
    parts.push(<a className="chat-email-link" href={`mailto:${email}`} key={`${index}-${email}`} title={`${emailTitle} ${email}`}>{email}</a>);
    cursor = index + email.length;
  }

  if (cursor < text.length) parts.push(text.slice(cursor));
  return <>{parts.length ? parts : text}</>;
}

function TemplateReview({ attachment }: { attachment: ChatAttachment }) {
  const { locale } = useLocale();
  const [showDemo, setShowDemo] = useState(false);
  const template = attachment.templateSlug ? getTemplate(attachment.templateSlug, locale) : undefined;
  const name = template?.name || attachment.name;
  const copy = locale === "en"
    ? { preview: "Preview", template: "TEMPLATE", collapse: "Collapse preview", demo: "View demo in chat", open: "Open page" }
    : { preview: "Xem trước", template: "MẪU GIAO DIỆN", collapse: "Thu gọn xem trước", demo: "Xem demo trong chat", open: "Mở trang riêng" };
  return <div className="chat-template-card"><div className="chat-template-cover" style={{ backgroundColor: attachment.tone || "#e8e5de" }}>{attachment.url ? <img src={attachment.url} alt={`${copy.preview} ${name}`} /> : <span>{name}</span>}</div><div><small>{copy.template}</small><strong>{name}</strong><button type="button" onClick={() => setShowDemo((value) => !value)}>{showDemo ? copy.collapse : copy.demo}</button><a href={attachment.href || "/giao-dien"} target="_blank" rel="noreferrer">{copy.open}</a></div>{showDemo && attachment.href && <iframe title={`${copy.preview} ${name}`} src={attachment.href} loading="lazy" />}</div>;
}

export function ChatMessageBody({ message }: { message: StoredChatMessage }) {
  const { locale } = useLocale();
  const copy = locale === "en" ? { attachment: "Attachment", sticker: "Sticker", email: "Send email to" } : { attachment: "Ảnh đính kèm", sticker: "Sticker", email: "Gửi email đến" };
  const attachment = message.attachment;
  return <>{attachment && <div className={`chat-attachment is-${attachment.kind}${attachment.animated ? " is-animated" : ""}`}>{attachment.kind === "image" || attachment.kind === "gif" || (attachment.kind === "sticker" && attachment.animated) ? <ChatMediaImage src={attachment.url} alt={attachment.name || copy.attachment} emoji={attachment.emoji} /> : attachment.kind === "video" ? <video src={attachment.url} controls preload="metadata" /> : attachment.kind === "audio" ? <audio src={attachment.url} controls /> : attachment.kind === "template" ? <TemplateReview attachment={attachment} /> : <span role="img" aria-label={attachment.name || copy.sticker}>{attachment.url}</span>}</div>}{message.text && <p><MessageText text={message.text} emailTitle={copy.email} /></p>}</>;
}

type ChatComposerProps = {
  draft: string;
  onDraftChange: (value: string) => void;
  onSend: (text: string, attachment?: ChatAttachment) => Promise<boolean>;
  inputId: string;
  placeholder: string;
  className?: string;
};

export function ChatComposer({ draft, onDraftChange, onSend, inputId, placeholder, className = "" }: ChatComposerProps) {
  const { locale } = useLocale();
  const templates = getTemplates(locale);
  const [panel, setPanel] = useState<"tools" | "emoji" | "gif" | "sticker" | "template" | null>(null);
  const [attachment, setAttachment] = useState<ChatAttachment>();
  const [notice, setNotice] = useState("");
  const [sending, setSending] = useState(false);
  const sendingRef = useRef(false);
  const [isRecording, setIsRecording] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const copy = locale === "en"
    ? { imageOrVideo: "Only images or videos are supported.", maxFile: "File must be 2.5 MB or smaller", recordingUnsupported: "This browser does not support audio recording.", recordingTooLarge: "Recording is too large (maximum 2.5 MB).", recordingName: "Voice recording", recording: "Recording — press again to stop.", retry: "Could not send; your content is kept so you can retry.", offline: "Connection lost. Please try again.", imagePreview: "Image preview", remove: "Remove attachment", tools: "Message tools", media: "Image/video", template: "Web template", stop: "Stop", record: "Record", chooseTemplate: "Choose a template", searchEmoji: "Search emoji", addTools: "Add tools", message: "Message", chooseEmoji: "Choose emoji", send: "Send message", sendLike: "Send like" }
    : { imageOrVideo: "Chỉ hỗ trợ ảnh hoặc video.", maxFile: "Tệp tối đa 2,5 MB", recordingUnsupported: "Trình duyệt này chưa hỗ trợ ghi âm.", recordingTooLarge: "Bản ghi quá lớn (tối đa 2,5 MB).", recordingName: "Ghi âm", recording: "Đang ghi âm — nhấn lại để dừng.", retry: "Chưa gửi được, nội dung vẫn được giữ để bạn thử lại", offline: "Mất kết nối, vui lòng thử gửi lại", imagePreview: "Xem trước ảnh", remove: "Bỏ tệp đính kèm", tools: "Công cụ nhắn tin", media: "Ảnh/video", template: "Mẫu web", stop: "Dừng", record: "Ghi âm", chooseTemplate: "Chọn mẫu giao diện", searchEmoji: "Tìm emoji", addTools: "Thêm công cụ", message: "Nội dung tin nhắn", chooseEmoji: "Chọn emoji", send: "Gửi tin nhắn", sendLike: "Gửi lượt thích" };

  function focusInput() { input.current?.focus({ preventScroll: true }); }
  function addEmoji(emoji: EmojiClickData) { onDraftChange(`${draft}${emoji.emoji}`); focusInput(); }
  function pickFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) { setNotice(copy.imageOrVideo); return; }
    if (file.size > maxMediaSize) { setNotice(copy.maxFile); return; }
    const reader = new FileReader();
    reader.onload = () => { setAttachment({ kind: file.type.startsWith("video/") ? "video" : "image", url: String(reader.result), name: file.name }); setNotice(""); setPanel(null); };
    reader.readAsDataURL(file);
  }
  function toggleRecording() {
    if (isRecording) { recorder.current?.stop(); return; }
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) { setNotice(copy.recordingUnsupported); return; }
    navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } }).then((stream) => {
      const chunks: BlobPart[] = [];
      const mediaRecorder = new MediaRecorder(stream);
      recorder.current = mediaRecorder;
      mediaRecorder.ondataavailable = (event) => chunks.push(event.data);
      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        const blob = new Blob(chunks, { type: mediaRecorder.mimeType || "audio/webm" });
        if (blob.size > maxMediaSize) setNotice(copy.recordingTooLarge);
        else { const reader = new FileReader(); reader.onload = () => setAttachment({ kind: "audio", url: String(reader.result), name: copy.recordingName }); reader.readAsDataURL(blob); }
        setIsRecording(false); recorder.current = null;
      };
      mediaRecorder.start(); setIsRecording(true); setNotice(copy.recording);
    }).catch((error: unknown) => {
      const name = error instanceof DOMException ? error.name : "UnknownError";
      if (name === "NotAllowedError" || name === "SecurityError") setNotice("Chrome hoặc Windows đang chặn micro. Kiểm tra Quyền riêng tư > Microphone của Windows.");
      else if (name === "NotFoundError") setNotice("Không tìm thấy micro. Hãy kết nối/chọn micro trong cài đặt âm thanh Windows.");
      else if (name === "NotReadableError") setNotice("Micro đang được ứng dụng khác sử dụng. Hãy đóng Zoom, Teams hoặc ứng dụng ghi âm rồi thử lại.");
      else setNotice(`Không thể khởi động micro (${name}). Hãy thử lại sau.`);
    });
  }
  async function deliver(text: string, media?: ChatAttachment) {
    if (sendingRef.current) return;
    sendingRef.current = true; setSending(true);
    try {
      if (await onSend(text, media)) { onDraftChange(""); setAttachment(undefined); setNotice(""); setPanel(null); focusInput(); }
      else setNotice(copy.retry);
    } catch { setNotice(copy.offline); }
    finally { sendingRef.current = false; setSending(false); }
  }
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (!draft.trim() && !attachment) return; void deliver(draft, attachment); }
  const setSelectedAttachment = (next: ChatAttachment) => { setAttachment(next); setPanel(null); setNotice(""); focusInput(); };
  return <fieldset disabled={sending} aria-busy={sending} className={`chat-media-composer chat-composer-fields ${className}`}>
    <input ref={fileInput} className="chat-file-input" type="file" accept="image/*,video/*" onChange={pickFile} />
    {attachment && <div className="chat-media-preview"><span>{attachment.kind === "image" || attachment.kind === "gif" || (attachment.kind === "sticker" && attachment.animated) ? <ChatMediaImage key={attachment.url} src={attachment.url} alt={attachment.name || copy.imagePreview} emoji={attachment.emoji} /> : attachment.kind === "video" ? <video src={attachment.url} muted /> : attachment.kind === "audio" ? <audio src={attachment.url} controls /> : attachment.kind === "template" ? attachment.name : attachment.url}</span><button type="button" onClick={() => setAttachment(undefined)} aria-label={copy.remove}><X size={15} /></button></div>}
    {notice && <p className="chat-media-notice">{notice}</p>}
    {panel === "tools" && <div className="chat-media-tools" aria-label={copy.tools}><button type="button" onClick={() => fileInput.current?.click()}><ImageIcon size={17} /><span>{copy.media}</span></button><button type="button" onClick={() => setPanel("gif")}><Gift size={17} /><span>GIF</span></button><button type="button" onClick={() => setPanel("sticker")}><Sticker size={17} /><span>Sticker</span></button><button type="button" onClick={() => setPanel("template")}><LayoutTemplate size={17} /><span>{copy.template}</span></button><button type="button" className={isRecording ? "is-recording" : ""} onClick={toggleRecording}>{isRecording ? <Square size={15} fill="currentColor" /> : <Mic size={17} />}<span>{isRecording ? copy.stop : copy.record}</span></button></div>}
    {(panel === "gif" || panel === "sticker") && <ChatMediaLibrary key={panel} initialTab={panel === "gif" ? "gif" : "animated"} onPick={setSelectedAttachment} onClose={() => setPanel(null)} />}
    {panel === "template" && <div className="chat-template-gallery" aria-label={copy.chooseTemplate}>{templates.map((template) => <button type="button" key={template.slug} onClick={() => setSelectedAttachment({ kind: "template", templateSlug: template.slug, url: template.image, name: template.name, href: `/giao-dien/${template.slug}`, tone: template.tone })}><span style={{ background: template.tone }}>{template.image && <img src={template.image} alt="" />}</span><strong>{template.name}</strong><small>{template.categoryLabel}</small></button>)}</div>}
    {panel === "emoji" && <div className="chat-media-emoji-picker"><EmojiPicker theme={Theme.LIGHT} width="100%" height={320} onEmojiClick={addEmoji} searchPlaceHolder={copy.searchEmoji} previewConfig={{ showPreview: false }} lazyLoadEmojis /></div>}
    <form className="chat-media-form" onSubmit={submit}><button type="button" className={panel === "tools" ? "is-active" : ""} onClick={() => setPanel(panel === "tools" ? null : "tools")} aria-label={copy.addTools}><CirclePlus size={21} /></button><input ref={input} id={inputId} aria-label={copy.message} placeholder={placeholder} value={draft} onChange={(event) => onDraftChange(event.target.value)} maxLength={1000} autoComplete="off" /><button type="button" className={panel === "emoji" ? "is-active" : ""} onClick={() => setPanel(panel === "emoji" ? null : "emoji")} aria-label={copy.chooseEmoji}><Smile size={20} /></button>{draft.trim() || attachment ? <button type="submit" className="chat-media-send" aria-label={copy.send}><Send size={17} /></button> : <button type="button" className="chat-media-like" onClick={() => void deliver("👍")} aria-label={copy.sendLike}><ThumbsUp size={20} fill="currentColor" /></button>}</form>
  </fieldset>;
}
