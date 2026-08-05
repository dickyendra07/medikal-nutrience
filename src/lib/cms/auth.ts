import { cookies } from "next/headers";
import { cmsInternalApiUrl } from "./backend";

export const cmsSessionCookieName = "mednut_admin_session";

export async function getCmsSession() {
  const cookieStore = await cookies();
  return cookieStore.get(cmsSessionCookieName)?.value ?? null;
}

export async function isCmsAuthenticated() {
  const session = await getCmsSession();
  if (!session) return false;

  try {
    const response = await fetch(`${cmsInternalApiUrl}/admin/auth/me`, {
      cache: "no-store",
      headers: { Cookie: `${cmsSessionCookieName}=${encodeURIComponent(session)}` },
    });
    return response.ok;
  } catch {
    return false;
  }
}
