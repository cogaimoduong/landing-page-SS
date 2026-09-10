import type { ChatMessage } from "@/lib/chat-demo";

export type ChatAttachment = {
  kind: "image" | "video" | "gif" | "sticker" | "audio" | "template";
  url: string;
  name?: string;
  href?: string;
  tone?: string;
  animated?: boolean;
  emoji?: string;
};

export type ChatActor = ChatMessage["sender"];
export type StoredChatMessage = ChatMessage & { createdAt: string; attachment?: ChatAttachment; reactions?: Partial<Record<ChatActor, string>> };

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

export function makeChatMessage(sender: ChatMessage["sender"], text: string, attachment?: ChatAttachment): StoredChatMessage {
  return { id: crypto.randomUUID(), sender, text, attachment, createdAt: new Date().toISOString() };
}

export function toggleChatReaction(messageId: string, actor: ChatActor, emoji: string) {
  // Read the latest messages so reacting never overwrites a newer reply.
  const messages = getStoredChatMessages();
  if (!messages.some((message) => message.id === messageId)) return;
  saveChatMessages(messages.map((message) => {
    if (message.id !== messageId) return message;
    const reactions = { ...message.reactions };
    if (reactions[actor] === emoji) delete reactions[actor];
    else reactions[actor] = emoji;
    return { ...message, reactions };
  }));
}
