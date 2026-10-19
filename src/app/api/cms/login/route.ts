import { NextResponse } from "next/server";
import { cmsInternalApiUrl } from "@/lib/cms/backend";
import {
  clearLoginAttempts,
  clientKey,
  isLoginRateLimited,
} from "@/lib/cms/login-rate-limit";

export const runtime = "nodejs";

const MAX_FIELD_LENGTH = 256;

export async function POST(request: Request) {
  const rateLimitKey = clientKey(request);

  if (isLoginRateLimited(rateLimitKey)) {
    return NextResponse.redirect(
      new URL("/cms/login?error=unavailable", request.url),
      {
        status: 303,
      }
    );
  }

  const formData = await request.formData();

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (email.length > MAX_FIELD_LENGTH || password.length > MAX_FIELD_LENGTH) {
    return NextResponse.redirect(
      new URL("/cms/login?error=invalid", request.url),
      {
        status: 303,
      }
    );
  }

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
  } catch (error) {
    console.error("[CMS LOGIN] fetch error", error);

    return NextResponse.redirect(
      new URL("/cms/login?error=unavailable", request.url),
      {
        status: 303,
      }
    );
  }

  if (!backendResponse.ok) {
    console.error("[CMS LOGIN] invalid response");

    return NextResponse.redirect(
      new URL("/cms/login?error=invalid", request.url),
      {
        status: 303,
      }
    );
  }

  clearLoginAttempts(rateLimitKey);

  let sessionCookie: string | null = null;

  const setCookies = backendResponse.headers.getSetCookie?.();

  if (setCookies && setCookies.length > 0) {
    sessionCookie = setCookies[0];
  } else {
    sessionCookie = backendResponse.headers.get("set-cookie");
  }

  if (!sessionCookie) {
    console.error("[CMS LOGIN] cookie missing");

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
