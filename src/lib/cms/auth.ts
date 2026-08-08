import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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

type CmsAdminIdentity = {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER";
};

export async function getCmsAdminIdentity(): Promise<CmsAdminIdentity | null> {
  const session = await getCmsSession();
  if (!session) return null;

  try {
    const response = await fetch(`${cmsInternalApiUrl}/admin/auth/me`, {
      cache: "no-store",
      headers: { Cookie: `${cmsSessionCookieName}=${encodeURIComponent(session)}` },
    });

    if (!response.ok) return null;
    return (await response.json()) as CmsAdminIdentity;
  } catch {
    return null;
  }
}

/** Guard every file-backed Server Action, where NestJS RBAC cannot run. */
export async function requireCmsEditor() {
  const admin = await getCmsAdminIdentity();

  if (!admin) redirect("/cms/login");
  if (admin.role === "VIEWER") redirect("/cms?error=forbidden");

  return admin;
}
