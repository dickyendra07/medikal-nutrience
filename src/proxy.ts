import { NextRequest, NextResponse } from "next/server";
import { buildContentSecurityPolicy } from "@/lib/security/csp";
import { isCmsClientAllowed, isCmsPath } from "@/lib/security/cms-access";

const LOGIN_ERROR_VALUES = new Set(["invalid", "unavailable"]);

// Per-request nonce keeps script-src free of 'unsafe-inline'. Next.js reads the
// nonce from the request CSP header and applies it to its own inline scripts.
export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Optional network allowlist for the CMS (see src/lib/security/cms-access.ts).
  // Blocked clients get a plain 404 so the CMS is not discoverable from outside.
  if (isCmsPath(pathname) && !isCmsClientAllowed(request.headers)) {
    return new NextResponse("Not Found", {
      status: 404,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }

  // API routes only need the allowlist above; they render no HTML to protect.
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // /cms/login?error= only accepts fixed values. Anything else is dropped via
  // redirect so arbitrary query text never reaches the rendered response (the
  // Next.js RSC payload echoes the request URL).
  if (pathname === "/cms/login" && searchParams.has("error")) {
    const error = searchParams.get("error") ?? "";

    if (!LOGIN_ERROR_VALUES.has(error) || searchParams.size > 1) {
      const cleanUrl = request.nextUrl.clone();

      cleanUrl.search = "";

      if (LOGIN_ERROR_VALUES.has(error)) {
        cleanUrl.searchParams.set("error", error);
      }

      return NextResponse.redirect(cleanUrl, 307);
    }
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const contentSecurityPolicy = buildContentSecurityPolicy(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", contentSecurityPolicy);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", contentSecurityPolicy);

  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico|icon.svg|.well-known).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
    // CMS paths must never skip the proxy: the entry above ignores requests that
    // send a prefetch header, which a client could forge to bypass the allowlist.
    "/cms/:path*",
    // CMS-related API routes: only the optional IP allowlist applies here.
    "/api/cms/:path*",
    "/api/admin/:path*",
  ],
};
