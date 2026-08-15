import { NextResponse } from "next/server";
import { cmsInternalApiUrl } from "@/lib/cms/backend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  console.log("[CMS LOGIN] start", {
    url: `${cmsInternalApiUrl}/admin/auth/login`,
    email,
  });

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

    console.log("[CMS LOGIN] backend status", backendResponse.status);
    console.log(
      "[CMS LOGIN] headers",
      Array.from(backendResponse.headers.entries())
    );

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

  let sessionCookie: string | null = null;

  const setCookies = backendResponse.headers.getSetCookie?.();

  console.log("[CMS LOGIN] getSetCookie", setCookies);

  if (setCookies && setCookies.length > 0) {
    sessionCookie = setCookies[0];
  } else {
    sessionCookie = backendResponse.headers.get("set-cookie");
  }

  console.log("[CMS LOGIN] cookie final", sessionCookie);

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

  console.log("[CMS LOGIN] normalized cookie", normalizedCookie);

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
