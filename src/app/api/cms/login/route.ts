import { NextResponse } from "next/server";
import { cmsInternalApiUrl } from "@/lib/cms/backend";

export async function POST(request: Request) {
  const formData = await request.formData();

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  let backendResponse: Response;
  try {
    backendResponse = await fetch(`${cmsInternalApiUrl}/admin/auth/login`, {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    return NextResponse.redirect(
      new URL("/cms/login?error=unavailable", request.url),
      { status: 303 }
    );
  }

  if (!backendResponse.ok) {
    return NextResponse.redirect(new URL("/cms/login?error=invalid", request.url), { status: 303 });
  }

  const sessionCookie = backendResponse.headers.get("set-cookie");
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/cms/login?error=unavailable", request.url), { status: 303 });
  }

  const response = NextResponse.redirect(new URL("/cms", request.url), {
    status: 303,
  });

  response.headers.append(
    "set-cookie",
    sessionCookie.replace(/Path=\/api\/admin(?=;|$)/i, "Path=/"),
  );

  return response;
}
