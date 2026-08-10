import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cmsInternalApiUrl } from "./backend";
import type { CmsAdminIdentity, CmsPermission } from "./permissions";

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

/** Guards file-backed Server Actions and server-rendered CMS pages. */
export async function requireCmsPermission(permission: CmsPermission) {
  const admin = await getCmsAdminIdentity();

  if (!admin) redirect("/cms/login");
  if (!admin.permissions.includes(permission)) redirect("/cms?error=forbidden");

  return admin;
}

export async function requireAnyCmsPermission(permissions: readonly CmsPermission[]) {
  const admin = await getCmsAdminIdentity();
  if (!admin) redirect("/cms/login");
  if (!permissions.some((permission) => admin.permissions.includes(permission))) {
    redirect("/cms?error=forbidden");
  }
  return admin;
}
