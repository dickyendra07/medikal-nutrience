import { NextResponse } from "next/server";
import { cmsSessionCookieName } from "@/lib/cms/auth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/cms/login", request.url), {
    status: 303,
  });

  response.cookies.set(cmsSessionCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
