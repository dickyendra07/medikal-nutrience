import { NextResponse } from "next/server";
import { cmsInternalApiUrl } from "@/lib/cms/backend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  let backendResponse: Response;

  try {
    backendResponse = await fetch(`${cmsInternalApiUrl}/admin/auth/login`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  } catch {
    return NextResponse.redirect(
      new URL("/cms/login?error=unavailable", request.url),
      {
        status: 303,
      }
    );
  }

  if (!backendResponse.ok) {
    return NextResponse.redirect(
      new URL("/cms/login?error=invalid", request.url),
      {
        status: 303,
      }
    );
  }

  let sessionCookie: string | null = null;

  const cookies = backendResponse.headers.getSetCookie?.();

  if (cookies && cookies.length > 0) {
    sessionCookie = cookies[0];
  } else {
    sessionCookie = backendResponse.headers.get("set-cookie");
  }

  if (!sessionCookie) {
    console.error("CMS login: backend session cookie missing");

    return NextResponse.redirect(
      new URL("/cms/login?error=unavailable", request.url),
      {
        status: 303,
      }
    );
  }

  const normalizedCookie = sessionCookie.replace(
    /Path=\/api\/admin(?=;|$)/i,
    "Path=/"
  );

  const response = NextResponse.redirect(
    new URL("/cms", request.url),
    {
      status: 303,
    }
  );

  response.headers.append(
    "set-cookie",
    normalizedCookie
  );

  return response;
}
