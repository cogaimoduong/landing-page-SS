import { createHash, createHmac, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import type { ChatActor, ChatAttachment, ChatLocale, ChatSession, StoredChatMessage } from "./chat-store";
import { chatDb } from "./chat-db";
import { CHAT_MAX_BYTES, CHAT_MAX_MESSAGES, chatDates, chatState } from "./chat-policy";
import { getTemplates } from "./templates";
export const VISITOR_COOKIE = "devdes_chat";
export const ADMIN_COOKIE = "devdes_chat_admin";
export const ADMIN_STAFF = [
  { id: "thanh-phong", name: "Thanh Phong" },
  { id: "anh-gia", name: "Anh Gia" },
  { id: "kim-thoa", name: "Kim Thoa" },
] as const;
export type AdminStaff = (typeof ADMIN_STAFF)[number];
const CHAT_COPY: Record<ChatLocale, { welcome: string; acknowledgement: string }> = {
  en: {
    welcome: "Hello! DevDes is happy to help. Please leave the details you would like advice on.",
    acknowledgement: "Thanks for messaging DevDes! Our team has received your details and usually replies within two hours. We'll get back to you soon.",
  },
  vi: {
    welcome: "Chào bạn, DevDes rất vui được hỗ trợ. Bạn cứ để lại nội dung cần tư vấn nhé.",
    acknowledgement: "Cảm ơn bạn đã nhắn DevDes! Đội ngũ đã nhận được thông tin và thường phản hồi trong vòng 2 giờ. Chúng mình sẽ sớm liên hệ với bạn nhé.",
  },
};
export class ChatError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
type Conversation = { _id: string; tokenHash: string; email: string; locale?: ChatLocale; createdAt: Date; lastMessageAt: Date; expiresAt: Date; deleteAt: Date; bytes: number; count: number; messages: StoredChatMessage[] };
type Limit = { _id: string; count: number; deleteAt: Date };
let indexes: Promise<unknown> | undefined;
export async function chatCollections() {
  const db = await chatDb();
  const conversations = db.collection<Conversation>("chat_conversations");
  const limits = db.collection<Limit>("chat_rate_limits");
  if (!indexes) indexes = Promise.all([
    conversations.createIndex({ deleteAt: 1 }, { expireAfterSeconds: 0 }),
    conversations.createIndex({ tokenHash: 1 }, { unique: true }),
    conversations.createIndex({ lastMessageAt: -1 }),
    limits.createIndex({ deleteAt: 1 }, { expireAfterSeconds: 0 }),
  ]).catch(error => { indexes = undefined; throw error; });
  await indexes;
  return { conversations, limits };
}
export const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");
export function parseChatLocale(value: unknown): ChatLocale {
  if (value === undefined) return "en";
  if (value === "en" || value === "vi") return value;
  throw new ChatError(400, "Ngôn ngữ không hợp lệ");
}
// Conversations created before language selection was added contain Vietnamese
// system messages, so an absent field deliberately resolves to Vietnamese.
export function conversationLocale(value: { locale?: ChatLocale }): ChatLocale {
  return value.locale === "en" ? "en" : "vi";
}
function secret() {
  const value = process.env.CHAT_SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("CHAT_NOT_CONFIGURED");
  return value;
}
export function signature(value: string) { return createHmac("sha256", secret()).update(value).digest("hex"); }
function equals(a: string, b: string) { return timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest()); }
const adminPasswordKeys: Record<AdminStaff["id"], string> = {
  "thanh-phong": "CHAT_ADMIN_PASSWORD_THANH_PHONG",
  "anh-gia": "CHAT_ADMIN_PASSWORD_ANH_GIA",
  "kim-thoa": "CHAT_ADMIN_PASSWORD_KIM_THOA",
};
export function validPassword(staffId: AdminStaff["id"], password: unknown) {
  const expected = process.env[adminPasswordKeys[staffId]];
  if (!expected || expected.length < 8) throw new Error("CHAT_NOT_CONFIGURED");
  return typeof password === "string" && equals(password, expected);
}
export function adminCookieValue(staffId: AdminStaff["id"]) {
  const payload = `${Date.now() + 12 * 60 * 60 * 1000}.${randomBytes(16).toString("hex")}.${staffId}`;
  return `${payload}.${signature(payload)}`;
}
export function requireAdmin(request: NextRequest) {
  const [expiry, nonce, staffId, mac] = (request.cookies.get(ADMIN_COOKIE)?.value || "").split(".");
  const staff = ADMIN_STAFF.find(item => item.id === staffId);
  if (!/^\d{13}$/.test(expiry || "") || !/^[a-f0-9]{32}$/.test(nonce || "") || !staff || !/^[a-f0-9]{64}$/.test(mac || "") || Number(expiry) <= Date.now() || !equals(signature(`${expiry}.${nonce}.${staffId}`), mac)) throw new ChatError(401, "Vui lòng đăng nhập quản trị");
  return staff;
}
export function cookieOptions(maxAge: number) { return { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" as const, path: "/", maxAge }; }
export function visitorToken(request: NextRequest) {
  const token = request.cookies.get(VISITOR_COOKIE)?.value;
  return token && /^[a-f0-9]{64}$/.test(token) ? token : null;
}
export function checkOrigin(request: NextRequest) {
  if (request.headers.get("origin") !== new URL(request.url).origin) throw new ChatError(403, "Yêu cầu không hợp lệ");
}
export async function bodyJson(request: NextRequest, maxBytes = 3_550_000): Promise<Record<string, unknown>> {
  if (!request.headers.get("content-type")?.startsWith("application/json")) throw new ChatError(415, "Định dạng không hợp lệ");
  const reader = request.body?.getReader();
  if (!reader) throw new ChatError(400, "Thiếu nội dung");
  const chunks: Uint8Array[] = []; let length = 0;
  while (true) {
    const { value, done } = await reader.read(); if (done) break;
    length += value.length;
    if (length > maxBytes) { await reader.cancel(); throw new ChatError(413, "Nội dung quá lớn, vui lòng gửi tệp nhỏ hơn"); }
    chunks.push(value);
  }
  try {
    const value = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error();
    return value;
  } catch { throw new ChatError(400, "Nội dung không hợp lệ"); }
}
export async function rateLimit(request: NextRequest, scope: string, maximum: number, windowMs: number) {
  const ip = request.headers.get("x-vercel-forwarded-for") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const bucket = Math.floor(Date.now() / windowMs);
  const { limits } = await chatCollections();
  const _id = signature(`${scope}:${ip}:${bucket}`);
  let entry;
  try {
    entry = await limits.findOneAndUpdate({ _id }, { $inc: { count: 1 }, $setOnInsert: { deleteAt: new Date((bucket + 1) * windowMs) } }, { upsert: true, returnDocument: "after" });
  } catch (error) {
    if ((error as { code?: number }).code !== 11000) throw error;
    entry = await limits.findOneAndUpdate({ _id }, { $inc: { count: 1 } }, { returnDocument: "after" });
  }
  if (!entry || entry.count > maximum) throw new ChatError(429, "Bạn thao tác hơi nhanh, vui lòng thử lại sau");
}
export function serializeChat(doc: Conversation, now = new Date()): ChatSession {
  return { id: doc._id, email: doc.email, locale: conversationLocale(doc), status: chatState(doc.expiresAt, doc.deleteAt, now) === "active" ? "active" : "ended", expiresAt: doc.expiresAt.toISOString(), deleteAt: doc.deleteAt.toISOString(), lastMessageAt: doc.lastMessageAt.toISOString(), messages: doc.messages };
}
export async function findVisitor(token: string | null, now = new Date()) {
  if (!token) return null;
  const { conversations } = await chatCollections();
  return conversations.findOne({ tokenHash: hashToken(token), deleteAt: { $gt: now } });
}
export async function startConversation(email: unknown, token: string | null, localeOrNow: ChatLocale | Date = "en", now = new Date()) {
  // Keep the former third `now` argument working for callers that predate
  // language support. Those legacy calls keep the Vietnamese behavior.
  const legacyCall = localeOrNow instanceof Date;
  const resolvedLocale = legacyCall ? "vi" : parseChatLocale(localeOrNow);
  const currentTime = legacyCall ? localeOrNow : now;
  if (typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) throw new ChatError(400, "Vui lòng nhập email hợp lệ");
  const existing = await findVisitor(token, currentTime);
  if (existing && existing.expiresAt > currentTime) return { session: serializeChat(existing, currentTime), token: token! };
  const nextToken = randomBytes(32).toString("hex");
  const welcome: StoredChatMessage = { id: randomUUID(), sender: "admin", senderName: "DevDes AI", text: CHAT_COPY[resolvedLocale].welcome, createdAt: currentTime.toISOString() };
  const doc: Conversation = { _id: randomUUID(), email: email.trim().toLowerCase(), locale: resolvedLocale, tokenHash: hashToken(nextToken), createdAt: currentTime, lastMessageAt: currentTime, ...chatDates(currentTime), messages: [welcome], count: 1, bytes: Buffer.byteLength(JSON.stringify(welcome)) };
  const { conversations } = await chatCollections();
  await conversations.insertOne(doc);
  return { session: serializeChat(doc, currentTime), token: nextToken };
}
export async function findConversation(id: string, now = new Date()) {
  if (!/^[a-f0-9-]{36}$/.test(id)) throw new ChatError(404, "Không tìm thấy cuộc trò chuyện");
  const { conversations } = await chatCollections();
  const doc = await conversations.findOne({ _id: id, deleteAt: { $gt: now } });
  if (!doc) throw new ChatError(404, "Cuộc trò chuyện không còn tồn tại");
  return doc;
}
function validateAttachment(value: unknown, locale: ChatLocale): ChatAttachment | undefined {
  if (value === undefined) return undefined;
  if (!value || typeof value !== "object") throw new ChatError(400, "Tệp không hợp lệ");
  const raw = value as Record<string, unknown>;
  if (raw.kind === "template") {
    const templateSlug = typeof raw.templateSlug === "string"
      ? raw.templateSlug
      : typeof raw.href === "string"
        ? raw.href.match(/^\/giao-dien\/([^/?#]+)$/)?.[1]
        : undefined;
    const template = getTemplates(locale).find(item => item.slug === templateSlug);
    if (!template) throw new ChatError(400, "Mẫu không hợp lệ");
    return { kind: "template", templateSlug: template.slug, url: template.image, href: `/giao-dien/${template.slug}`, name: template.name, tone: template.tone };
  }
  if (typeof raw.url !== "string" || typeof raw.kind !== "string" || !["image", "video", "audio", "gif", "sticker"].includes(raw.kind)) throw new ChatError(400, "Tệp không hợp lệ");
  const result: ChatAttachment = { kind: raw.kind as ChatAttachment["kind"], url: raw.url, name: typeof raw.name === "string" ? raw.name.slice(0, 120) : undefined };
  if (raw.kind === "sticker" && raw.animated !== true) {
    if (!raw.url || raw.url.length > 32) throw new ChatError(400, "Sticker không hợp lệ");
    return result;
  }
  if (raw.url.startsWith("data:")) {
    const match = raw.url.match(/^data:((?:image\/(?:png|jpeg|webp|gif))|(?:video\/(?:mp4|webm))|(?:audio\/(?:webm|ogg|mpeg|mp4|wav)))(?:;codecs=[a-zA-Z0-9.,-]+)?;base64,([A-Za-z0-9+/]+={0,2})$/);
    if (!match || !match[1].startsWith(`${raw.kind}/`) || Buffer.from(match[2], "base64").length > 2.5 * 1024 * 1024) throw new ChatError(400, "Tệp không được hỗ trợ hoặc vượt quá 2,5 MB");
  } else {
    let url: URL;
    try { url = new URL(raw.url); } catch { throw new ChatError(400, "Địa chỉ media không hợp lệ"); }
    if (url.protocol !== "https:" || !["media.giphy.com", "fonts.gstatic.com"].includes(url.hostname) || url.username || url.password || raw.url.length > 2048 || !["gif", "sticker", "image"].includes(raw.kind)) throw new ChatError(400, "Chỉ hỗ trợ media từ thư viện chat");
  }
  if (raw.animated === true) result.animated = true;
  if (typeof raw.emoji === "string") result.emoji = raw.emoji.slice(0, 32);
  return result;
}
export async function appendMessage(id: string, actor: ChatActor, body: Record<string, unknown>, now = new Date(), senderName?: string, locale: ChatLocale = "vi") {
  if (typeof body.id !== "string" || !/^[a-f0-9-]{36}$/.test(body.id) || typeof body.text !== "string" || body.text.length > 1000) throw new ChatError(400, "Tin nhắn không hợp lệ (tối đa 1000 ký tự)");
  const attachment = validateAttachment(body.attachment, locale);
  const text = body.text.trim();
  if (!text && !attachment) throw new ChatError(400, "Vui lòng nhập tin nhắn");
  const message: StoredChatMessage = { id: body.id, sender: actor, text, createdAt: now.toISOString(), ...(actor === "admin" && senderName ? { senderName } : {}), ...(attachment ? { attachment } : {}) };
  const bytes = Buffer.byteLength(JSON.stringify(message)) + 512;
  const { conversations } = await chatCollections();
  if (actor === "user") {
    // Keep this in the database operation so retries and simultaneous sends
    // still create the acknowledgement exactly once.
    const acknowledgement: StoredChatMessage = { id: randomUUID(), sender: "admin", senderName: "DevDes AI", text: CHAT_COPY[locale === "en" ? "en" : "vi"].acknowledgement, createdAt: now.toISOString() };
    const acknowledgementBytes = Buffer.byteLength(JSON.stringify(acknowledgement)) + 512;
    const firstMessage = await conversations.findOneAndUpdate({
      _id: id, expiresAt: { $gt: now }, bytes: { $lte: CHAT_MAX_BYTES - bytes - acknowledgementBytes }, count: { $lte: CHAT_MAX_MESSAGES - 2 },
      "messages.id": { $ne: message.id }, "messages.sender": { $ne: "user" },
    }, {
      $push: { messages: { $each: [message, acknowledgement] } }, $inc: { bytes: bytes + acknowledgementBytes, count: 2 },
      $max: { lastMessageAt: now, ...chatDates(now) },
    }, { returnDocument: "after" });
    if (firstMessage) return serializeChat(firstMessage, now);
  }
  const updated = await conversations.findOneAndUpdate({
    _id: id, expiresAt: { $gt: now }, bytes: { $lte: CHAT_MAX_BYTES - bytes }, count: { $lt: CHAT_MAX_MESSAGES }, "messages.id": { $ne: message.id },
    // A first visitor message must be stored with its acknowledgement above;
    // this fallback is only for later visitor messages.
    ...(actor === "user" ? { "messages.sender": "user" } : {}),
  }, {
    $push: { messages: message }, $inc: { bytes, count: 1 },
    $max: { lastMessageAt: now, ...chatDates(now) },
  }, { returnDocument: "after" });
  if (updated) return serializeChat(updated, now);
  const existing = await findConversation(id, now);
  if (existing.expiresAt <= now) throw new ChatError(409, "Phiên trò chuyện đã kết thúc");
  if (existing.messages.some(item => item.id === message.id && item.sender === actor)) return serializeChat(existing, now);
  throw new ChatError(413, "Phiên đã đạt giới hạn 300 tin nhắn hoặc 3,7 MB, vui lòng gửi nội dung nhỏ hơn hoặc liên hệ qua email");
}
export async function reactToMessage(id: string, actor: ChatActor, body: Record<string, unknown>, now = new Date()) {
  if (typeof body.messageId !== "string" || !/^[a-f0-9-]{36}$/.test(body.messageId) || typeof body.emoji !== "string" || body.emoji.length > 32) throw new ChatError(400, "Cảm xúc không hợp lệ");
  const { conversations } = await chatCollections();
  const path = `messages.$.reactions.${actor}`;
  const updated = await conversations.findOneAndUpdate({ _id: id, expiresAt: { $gt: now }, "messages.id": body.messageId }, body.emoji ? { $set: { [path]: body.emoji } } : { $unset: { [path]: "" } }, { returnDocument: "after" });
  if (!updated) throw new ChatError(409, "Phiên đã kết thúc hoặc tin nhắn không còn tồn tại");
  return serializeChat(updated, now);
}
export function chatResponse(value: unknown, status = 200) { return NextResponse.json(value, { status, headers: { "Cache-Control": "no-store, private", "X-Content-Type-Options": "nosniff" } }); }
export function chatFailure(error: unknown) {
  if (error instanceof ChatError) return chatResponse({ error: error.message }, error.status);
  console.error("Chat backend unavailable", error);
  return chatResponse({ error: "Chat chưa kết nối được máy chủ, vui lòng thử lại sau" }, 503);
}
