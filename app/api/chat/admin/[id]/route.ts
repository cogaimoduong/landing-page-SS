import { NextRequest } from "next/server";
import { appendMessage, bodyJson, chatFailure, chatResponse, checkOrigin, findConversation, rateLimit, reactToMessage, requireAdmin, serializeChat, ChatError } from "@/lib/chat-server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
type Context = { params: Promise<{ id: string }> };
export async function GET(request: NextRequest, context: Context) {
  try {
    requireAdmin(request);
    return chatResponse({ session: serializeChat(await findConversation((await context.params).id)) });
  } catch (error) { return chatFailure(error); }
}
export async function POST(request: NextRequest, context: Context) {
  try {
    checkOrigin(request); requireAdmin(request);
    await rateLimit(request, "admin-message", 120, 60 * 1000);
    const id = (await context.params).id;
    await findConversation(id);
    const body = await bodyJson(request);
    if (body.action === "send") return chatResponse({ session: await appendMessage(id, "admin", body) });
    if (body.action === "react") return chatResponse({ session: await reactToMessage(id, "admin", body) });
    throw new ChatError(400, "Thao tác không hợp lệ");
  } catch (error) { return chatFailure(error); }
}
