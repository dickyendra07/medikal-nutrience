import { NextResponse } from "next/server";
import { cmsSessionCookieName } from "@/lib/cms/auth";

export async function POST(request: Request) {
  const formData = await request.formData();

  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const validUsername = process.env.CMS_USERNAME ?? "admin";
  const validPassword = process.env.CMS_PASSWORD ?? "mednut2026";

  if (username !== validUsername || password !== validPassword) {
    return NextResponse.redirect(
      new URL("/cms/login?error=invalid", request.url),
      { status: 303 }
    );
  }

  const response = NextResponse.redirect(new URL("/cms", request.url), {
    status: 303,
  });

  response.cookies.set(cmsSessionCookieName, "authenticated", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
