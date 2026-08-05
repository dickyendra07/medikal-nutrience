import { cmsInternalApiUrl } from "@/lib/cms/backend";

async function proxy(request: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const incomingUrl = new URL(request.url);
  const target = `${cmsInternalApiUrl}/admin/${path.map(encodeURIComponent).join("/")}${incomingUrl.search}`;
  const headers = new Headers();
  for (const name of ["content-type", "cookie", "accept", "x-requested-with"]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }

  const response = await fetch(target, {
    method: request.method,
    cache: "no-store",
    headers,
    body: request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer(),
    redirect: "manual",
  });
  const outgoingHeaders = new Headers();
  for (const name of ["content-type", "content-disposition", "set-cookie"]) {
    const value = response.headers.get(name);
    if (value) outgoingHeaders.set(name, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: outgoingHeaders,
  });
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
export const PUT = proxy;
export const DELETE = proxy;
