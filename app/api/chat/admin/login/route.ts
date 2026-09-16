import { NextRequest } from "next/server";
import { ADMIN_COOKIE, adminCookieValue, bodyJson, chatFailure, chatResponse, checkOrigin, cookieOptions, rateLimit, validPassword, ChatError } from "@/lib/chat-server";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  try {
    checkOrigin(request);
    await rateLimit(request, "admin-login", 10, 15 * 60 * 1000);
    const body = await bodyJson(request, 2048);
    if (!validPassword(body.password)) throw new ChatError(401, "Mật khẩu quản trị không đúng");
    const response = chatResponse({ ok: true });
    response.cookies.set(ADMIN_COOKIE, adminCookieValue(), cookieOptions(12 * 60 * 60));
    return response;
  } catch (error) { return chatFailure(error); }
}
export async function DELETE(request: NextRequest) {
  try {
    checkOrigin(request);
    const response = chatResponse({ ok: true });
    response.cookies.set(ADMIN_COOKIE, "", cookieOptions(0));
    return response;
  } catch (error) { return chatFailure(error); }
}
