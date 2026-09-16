import { NextRequest } from "next/server";
import { chatCollections, chatFailure, chatResponse, requireAdmin, serializeChat } from "@/lib/chat-server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    requireAdmin(request);
    const { conversations } = await chatCollections();
    const now = new Date();
    const offset = Math.floor(Math.max(0, Math.min(100000, Number(request.nextUrl.searchParams.get("offset")) || 0)));
    const docs = await conversations.find({ deleteAt: { $gt: now } }, { projection: { messages: 0, tokenHash: 0 } }).sort({ lastMessageAt: -1 }).skip(offset).limit(51).toArray();
    const items = docs.slice(0, 50).map(doc => {
      const summary = serializeChat({ ...doc, messages: [] }, now);
      return { id: summary.id, email: summary.email, status: summary.status, expiresAt: summary.expiresAt, deleteAt: summary.deleteAt, lastMessageAt: summary.lastMessageAt };
    });
    return chatResponse({ conversations: items, hasMore: docs.length > 50 });
  } catch (error) { return chatFailure(error); }
}
