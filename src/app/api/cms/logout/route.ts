import { NextResponse } from "next/server";
import { cmsSessionCookieName } from "@/lib/cms/auth";
import { cmsInternalApiUrl } from "@/lib/cms/backend";

export async function POST(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  const backendResponse = await fetch(`${cmsInternalApiUrl}/admin/auth/logout`, {
    method: "POST",
    cache: "no-store",
    headers: { Cookie: cookie },
  }).catch(() => null);
  const response = NextResponse.redirect(new URL("/cms/login", request.url), {
    status: 303,
  });

  const backendCookie = backendResponse?.headers.get("set-cookie");
  if (backendCookie) {
    response.headers.append(
      "set-cookie",
      backendCookie.replace(/Path=\/api\/admin(?=;|$)/i, "Path=/"),
    );
  }

  response.cookies.set(cmsSessionCookieName, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
