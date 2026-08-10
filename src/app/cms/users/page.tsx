import { AccessManagementClient } from "@/components/cms/access/AccessManagementClient";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { requireCmsPermission } from "@/lib/cms/auth";
import { CMS_PERMISSIONS } from "@/lib/cms/permissions";

export default async function CmsUsersPage() {
  const identity = await requireCmsPermission(CMS_PERMISSIONS.USERS_MANAGE);
  return (
    <CmsAdminShell
      active="users"
      eyebrow="Access control"
      title="User & Role"
      description="Kelola akun, role, dan permission CMS secara terpusat."
    >
      <AccessManagementClient canManageRoles={identity.permissions.includes(CMS_PERMISSIONS.ROLES_MANAGE)} />
    </CmsAdminShell>
  );
}
