import { NextRequest } from "next/server";
import { appendMessage, bodyJson, chatFailure, chatResponse, checkOrigin, cookieOptions, findVisitor, rateLimit, reactToMessage, serializeChat, startConversation, visitorToken, VISITOR_COOKIE, ChatError } from "@/lib/chat-server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    const doc = await findVisitor(visitorToken(request));
    const response = chatResponse({ session: doc ? serializeChat(doc) : null });
    if (!doc) response.cookies.set(VISITOR_COOKIE, "", cookieOptions(0));
    return response;
  } catch (error) { return chatFailure(error); }
}
export async function POST(request: NextRequest) {
  try {
    checkOrigin(request);
    const body = await bodyJson(request);
    const token = visitorToken(request);
    if (body.action === "start") {
      await rateLimit(request, "start", 10, 60 * 60 * 1000);
      const result = await startConversation(body.email, token);
      const response = chatResponse({ session: result.session });
      response.cookies.set(VISITOR_COOKIE, result.token, cookieOptions(365 * 24 * 60 * 60));
      return response;
    }
    const doc = await findVisitor(token);
    if (!doc) throw new ChatError(401, "Vui lòng nhập email để bắt đầu phiên mới");
    await rateLimit(request, "message", 60, 60 * 1000);
    if (body.action === "send") return chatResponse({ session: await appendMessage(doc._id, "user", body) });
    if (body.action === "react") return chatResponse({ session: await reactToMessage(doc._id, "user", body) });
    throw new ChatError(400, "Thao tác không hợp lệ");
  } catch (error) { return chatFailure(error); }
}
