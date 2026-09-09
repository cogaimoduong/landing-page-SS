import type { ChatMessage } from "@/lib/chat-demo";

export type StoredChatMessage = ChatMessage & { createdAt: string };

const storageKey = "devdes-demo-chat-messages";
export const chatChangedEvent = "devdes-demo-chat-changed";

export const initialChatMessages: StoredChatMessage[] = [
  { id: "welcome", sender: "admin", text: "Chào bạn 👋 DevDes đây! Bạn đang có ý tưởng website nào? Nhắn mình cùng trao đổi nhé.", createdAt: "2026-01-01T00:00:00.000Z" },
];

export function getStoredChatMessages(): StoredChatMessage[] {
  if (typeof window === "undefined") return initialChatMessages;
  try {
    const value = window.localStorage.getItem(storageKey);
    if (!value) return initialChatMessages;
    const messages: unknown = JSON.parse(value);
    return Array.isArray(messages) ? messages as StoredChatMessage[] : initialChatMessages;
  } catch { return initialChatMessages; }
}

export function saveChatMessages(messages: StoredChatMessage[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(messages));
  window.dispatchEvent(new Event(chatChangedEvent));
}

export function makeChatMessage(sender: ChatMessage["sender"], text: string): StoredChatMessage {
  return { id: crypto.randomUUID(), sender, text, createdAt: new Date().toISOString() };
}
