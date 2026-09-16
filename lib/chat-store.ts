export type ChatAttachment = {
  kind: "image" | "video" | "gif" | "sticker" | "audio" | "template";
  url: string; name?: string; href?: string; tone?: string; animated?: boolean; emoji?: string;
};
export type ChatActor = "user" | "admin";
export type StoredChatMessage = { id: string; sender: ChatActor; text: string; createdAt: string; attachment?: ChatAttachment; reactions?: Partial<Record<ChatActor, string>> };
export type ChatSession = { id: string; email: string; status: "active" | "ended"; expiresAt: string; deleteAt: string; lastMessageAt: string; messages: StoredChatMessage[] };
export type ChatSummary = Omit<ChatSession, "messages">;
export class ChatRequestError extends Error {
  constructor(message: string, public status: number) { super(message); }
}
export async function chatRequest<T>(url: string, body?: unknown, method?: string): Promise<T> {
  const response = await fetch(url, { method: method || (body === undefined ? "GET" : "POST"), credentials: "same-origin", cache: "no-store", headers: body === undefined ? undefined : { "Content-Type": "application/json" }, body: body === undefined ? undefined : JSON.stringify(body) });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new ChatRequestError(data.error || "Chưa kết nối được chat, vui lòng thử lại", response.status);
  return data as T;
}
