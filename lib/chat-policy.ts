export const CHAT_IDLE_MS = 48 * 60 * 60 * 1000;
export const CHAT_RETENTION_MS = 12 * 60 * 60 * 1000;
// Keep the complete JSON response below Vercel's function payload limit.
export const CHAT_MAX_BYTES = 3_700_000;
export const CHAT_MAX_MESSAGES = 300;
export function chatDates(now: Date) {
  return { expiresAt: new Date(now.getTime() + CHAT_IDLE_MS), deleteAt: new Date(now.getTime() + CHAT_IDLE_MS + CHAT_RETENTION_MS) };
}
export function chatState(expiresAt: Date, deleteAt: Date, now = new Date()) {
  if (now >= deleteAt) return "deleted";
  return now >= expiresAt ? "ended" : "active";
}
