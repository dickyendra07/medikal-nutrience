import { cookies } from "next/headers";

export const cmsSessionCookieName = "mednut_cms_session";

export async function getCmsSession() {
  const cookieStore = await cookies();
  return cookieStore.get(cmsSessionCookieName)?.value ?? null;
}

export async function isCmsAuthenticated() {
  const session = await getCmsSession();
  return session === "authenticated";
}
