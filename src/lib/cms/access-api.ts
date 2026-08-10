export type CmsAccessPermission = {
  id: string;
  key: string;
  module: string;
  description: string | null;
};

export type CmsAccessRole = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  isSystem: boolean;
  permissions: CmsAccessPermission[];
  _count: { users: number };
};

export type CmsAccessUser = {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  cmsRole: Pick<CmsAccessRole, "id" | "slug" | "name">;
};

async function accessRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api/admin/access${path}`, {
    ...init,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { message?: string | string[] } | null;
    const message = Array.isArray(body?.message) ? body.message[0] : body?.message;
    throw new Error(message || "Permintaan pengelolaan akses gagal diproses.");
  }
  return response.json() as Promise<T>;
}

export function listCmsUsers() { return accessRequest<CmsAccessUser[]>("/users"); }
export function listCmsRoles() { return accessRequest<CmsAccessRole[]>("/roles"); }
export function listCmsPermissions() { return accessRequest<CmsAccessPermission[]>("/permissions"); }
export function createCmsUser(input: { name: string; email: string; password: string; roleId: string }) {
  return accessRequest<CmsAccessUser>("/users", { method: "POST", body: JSON.stringify(input) });
}
export function updateCmsUser(id: string, input: { name?: string; password?: string; roleId?: string; isActive?: boolean }) {
  return accessRequest<CmsAccessUser>(`/users/${id}`, { method: "PATCH", body: JSON.stringify(input) });
}
export function updateCmsRole(id: string, input: { name?: string; description?: string; permissionIds?: string[] }) {
  return accessRequest<CmsAccessRole>(`/roles/${id}`, { method: "PATCH", body: JSON.stringify(input) });
}
export function createCmsRole(input: { name: string; slug: string; description?: string; permissionIds: string[] }) {
  return accessRequest<CmsAccessRole>("/roles", { method: "POST", body: JSON.stringify(input) });
}
