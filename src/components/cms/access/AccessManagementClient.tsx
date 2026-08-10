"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  createCmsUser,
  createCmsRole,
  listCmsPermissions,
  listCmsRoles,
  listCmsUsers,
  updateCmsRole,
  updateCmsUser,
  type CmsAccessPermission,
  type CmsAccessRole,
  type CmsAccessUser,
} from "@/lib/cms/access-api";
import { CmsCard, CmsEmptyState, CmsSectionHeader, cmsFieldClass } from "@/components/cms/CmsUi";

function formatDate(value: string | null) {
  return value ? new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "Belum pernah masuk";
}

export function AccessManagementClient({ canManageRoles }: { canManageRoles: boolean }) {
  const [users, setUsers] = useState<CmsAccessUser[]>([]);
  const [roles, setRoles] = useState<CmsAccessRole[]>([]);
  const [permissions, setPermissions] = useState<CmsAccessPermission[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [roleEditor, setRoleEditor] = useState<CmsAccessRole | null>(null);
  const [createRoleOpen, setCreateRoleOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [nextUsers, nextRoles, nextPermissions] = await Promise.all([
        listCmsUsers(),
        listCmsRoles(),
        canManageRoles ? listCmsPermissions() : Promise.resolve([]),
      ]);
      setUsers(nextUsers);
      setRoles(nextRoles);
      setPermissions(nextPermissions);
    } catch (error) {
      setMessage({ tone: "error", text: error instanceof Error ? error.message : "Data akses belum dapat dimuat." });
    } finally {
      setLoading(false);
    }
  }, [canManageRoles]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timeoutId);
  }, [load]);

  const permissionGroups = useMemo(() => {
    const groups = new Map<string, CmsAccessPermission[]>();
    for (const permission of permissions) groups.set(permission.module, [...(groups.get(permission.module) ?? []), permission]);
    return [...groups.entries()];
  }, [permissions]);

  async function createUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy("create-user");
    try {
      await createCmsUser({
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        password: String(form.get("password") ?? ""),
        roleId: String(form.get("roleId") ?? ""),
      });
      setCreateOpen(false);
      setMessage({ tone: "success", text: "User CMS berhasil dibuat." });
      await load();
    } catch (error) {
      setMessage({ tone: "error", text: error instanceof Error ? error.message : "User belum berhasil dibuat." });
    } finally { setBusy(null); }
  }

  async function createRole(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy("create-role");
    try {
      await createCmsRole({
        name: String(form.get("name") ?? "").trim(),
        slug: String(form.get("slug") ?? "").trim().toLowerCase(),
        description: String(form.get("description") ?? "").trim(),
        permissionIds: [],
      });
      setCreateRoleOpen(false);
      setMessage({ tone: "success", text: "Role baru berhasil dibuat. Tambahkan permission sebelum digunakan." });
      await load();
    } catch (error) {
      setMessage({ tone: "error", text: error instanceof Error ? error.message : "Role belum berhasil dibuat." });
    } finally { setBusy(null); }
  }

  async function changeUser(user: CmsAccessUser, input: { roleId?: string; isActive?: boolean }) {
    setBusy(user.id);
    try {
      await updateCmsUser(user.id, input);
      setMessage({ tone: "success", text: "Akses user berhasil diperbarui." });
      await load();
    } catch (error) {
      setMessage({ tone: "error", text: error instanceof Error ? error.message : "Akses user belum dapat diperbarui." });
    } finally { setBusy(null); }
  }

  async function saveRole() {
    if (!roleEditor) return;
    setBusy(roleEditor.id);
    try {
      await updateCmsRole(roleEditor.id, { permissionIds: selectedPermissions });
      setRoleEditor(null);
      setMessage({ tone: "success", text: "Permission role berhasil diperbarui." });
      await load();
    } catch (error) {
      setMessage({ tone: "error", text: error instanceof Error ? error.message : "Permission role belum dapat diperbarui." });
    } finally { setBusy(null); }
  }

  if (loading) return <div className="grid gap-4 lg:grid-cols-2"><div className="h-80 animate-pulse rounded-2xl bg-white" /><div className="h-80 animate-pulse rounded-2xl bg-white" /></div>;

  return (
    <div className="space-y-5">
      {message ? <div role={message.tone === "error" ? "alert" : "status"} className={`rounded-xl border px-4 py-3 text-xs font-medium ${message.tone === "error" ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>{message.text}</div> : null}

      {canManageRoles ? <CmsCard>
        <CmsSectionHeader eyebrow="Akses pengguna" title="User CMS" description="Kelola akun aktif dan role tanpa membagikan kredensial antar pengguna." action={<button type="button" onClick={() => setCreateOpen((open) => !open)} className="h-9 rounded-lg bg-[#08704c] px-4 text-xs font-semibold text-white">Tambah user</button>} />
        {createOpen ? <form onSubmit={createUser} className="mt-5 grid gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 md:grid-cols-2 xl:grid-cols-4">
          <label>Nama<input required name="name" minLength={2} className={`mt-1.5 ${cmsFieldClass}`} /></label>
          <label>Email<input required name="email" type="email" className={`mt-1.5 ${cmsFieldClass}`} /></label>
          <label>Password sementara<input required name="password" type="password" minLength={12} autoComplete="new-password" className={`mt-1.5 ${cmsFieldClass}`} /></label>
          <label>Role<select required name="roleId" className={`mt-1.5 ${cmsFieldClass}`}><option value="">Pilih role</option>{roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}</select></label>
          <div className="md:col-span-2 xl:col-span-4 flex justify-end gap-2"><button type="button" onClick={() => setCreateOpen(false)} className="h-9 rounded-lg border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-600">Batal</button><button disabled={busy === "create-user"} className="h-9 rounded-lg bg-[#08704c] px-4 text-xs font-semibold text-white disabled:opacity-50">{busy === "create-user" ? "Menyimpan…" : "Buat user"}</button></div>
        </form> : null}
        {!users.length ? <CmsEmptyState title="Belum ada user CMS" description="Buat user pertama untuk memulai pengelolaan akses." /> : <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200"><table className="w-full min-w-[720px] text-left"><thead className="bg-slate-50 text-[10px] font-semibold uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">User</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Login terakhir</th><th className="px-4 py-3">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{users.map((user) => <tr key={user.id}><td className="px-4 py-3"><p className="text-sm font-semibold text-slate-800">{user.name}</p><p className="mt-0.5 text-[11px] text-slate-500">{user.email}</p></td><td className="px-4 py-3"><select disabled={busy === user.id} value={user.cmsRole.id} onChange={(event) => void changeUser(user, { roleId: event.target.value })} aria-label={`Role ${user.name}`} className="h-9 min-w-48 rounded-lg border border-slate-200 bg-white px-3 text-xs">{roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}</select></td><td className="px-4 py-3 text-xs text-slate-500">{formatDate(user.lastLoginAt)}</td><td className="px-4 py-3"><button type="button" disabled={busy === user.id} onClick={() => void changeUser(user, { isActive: !user.isActive })} className={`rounded-md border px-2.5 py-1.5 text-[10px] font-semibold ${user.isActive ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-slate-50 text-slate-500"}`}>{user.isActive ? "Aktif" : "Nonaktif"}</button></td></tr>)}</tbody></table></div>}
      </CmsCard> : null}

      <CmsCard>
        <CmsSectionHeader eyebrow="Permission matrix" title="Role CMS" description="Role merupakan kumpulan permission. Perubahan divalidasi ulang pada setiap permintaan API." action={<button type="button" onClick={() => setCreateRoleOpen((open) => !open)} className="h-9 rounded-lg border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-600">Buat role</button>} />
        {createRoleOpen ? <form onSubmit={createRole} className="mt-5 grid gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 md:grid-cols-3"><label>Nama role<input required name="name" minLength={2} className={`mt-1.5 ${cmsFieldClass}`} /></label><label>Slug<input required name="slug" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="content-reviewer" className={`mt-1.5 ${cmsFieldClass}`} /></label><label>Deskripsi<input name="description" maxLength={500} className={`mt-1.5 ${cmsFieldClass}`} /></label><div className="md:col-span-3 flex justify-end gap-2"><button type="button" onClick={() => setCreateRoleOpen(false)} className="h-9 rounded-lg border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-600">Batal</button><button disabled={busy === "create-role"} className="h-9 rounded-lg bg-[#08704c] px-4 text-xs font-semibold text-white disabled:opacity-50">{busy === "create-role" ? "Menyimpan…" : "Buat role"}</button></div></form> : null}
        <div className="mt-5 grid gap-3 lg:grid-cols-3">{roles.map((role) => <article key={role.id} className="rounded-xl border border-slate-200 p-4"><div className="flex items-start justify-between gap-3"><div><h3 className="text-sm font-semibold text-slate-800">{role.name}</h3><p className="mt-1 text-[11px] leading-5 text-slate-500">{role.description}</p></div><span className="shrink-0 rounded-md bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500">{role._count.users} user</span></div><p className="mt-4 text-[11px] text-slate-500">{role.permissions.length} permission aktif</p><button type="button" onClick={() => { setRoleEditor(role); setSelectedPermissions(role.permissions.map(({ id }) => id)); }} className="mt-3 h-8 rounded-lg border border-slate-200 px-3 text-[11px] font-semibold text-slate-600">Kelola permission</button></article>)}</div>
      </CmsCard>

      {roleEditor ? <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4"><section role="dialog" aria-modal="true" aria-labelledby="role-title" className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl"><CmsSectionHeader title={roleEditor.name} description="Pilih permission yang menjadi kewenangan role ini." /><div className="mt-5 grid gap-4 md:grid-cols-2">{permissionGroups.map(([module, modulePermissions]) => <fieldset key={module} className="rounded-xl border border-slate-200 p-4"><legend className="px-1 text-[10px] font-semibold uppercase tracking-wide text-[#08704c]">{module.replaceAll("_", " ")}</legend><div className="mt-2 space-y-2">{modulePermissions.map((permission) => <label key={permission.id} className="flex items-start gap-2.5"><input type="checkbox" checked={selectedPermissions.includes(permission.id)} onChange={(event) => setSelectedPermissions((current) => event.target.checked ? [...current, permission.id] : current.filter((id) => id !== permission.id))} className="mt-0.5 h-4 w-4 accent-[#08704c]" /><span><span className="block text-xs font-medium text-slate-700">{permission.key}</span><span className="mt-0.5 block text-[10px] text-slate-400">{permission.description}</span></span></label>)}</div></fieldset>)}</div><div className="mt-5 flex justify-end gap-2"><button type="button" onClick={() => setRoleEditor(null)} className="h-9 rounded-lg border border-slate-200 px-4 text-xs font-semibold text-slate-600">Batal</button><button type="button" disabled={busy === roleEditor.id} onClick={() => void saveRole()} className="h-9 rounded-lg bg-[#08704c] px-4 text-xs font-semibold text-white disabled:opacity-50">Simpan permission</button></div></section></div> : null}
    </div>
  );
}
