import { AdminRole, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import {
  PERMISSIONS,
  SYSTEM_ROLES,
  SYSTEM_ROLE_PERMISSIONS,
} from "../src/auth/permissions";

const prisma = new PrismaClient();

async function main() {
  const name = process.env.BOOTSTRAP_ADMIN_NAME?.trim();
  const email = process.env.BOOTSTRAP_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.BOOTSTRAP_ADMIN_PASSWORD;

  if (!name || !email || !password) {
    throw new Error(
      "BOOTSTRAP_ADMIN_NAME, BOOTSTRAP_ADMIN_EMAIL, and BOOTSTRAP_ADMIN_PASSWORD are required.",
    );
  }

  if (password.length < 12) {
    throw new Error("BOOTSTRAP_ADMIN_PASSWORD must contain at least 12 characters.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const roleDefinitions = [
    {
      id: "role_medical_affairs",
      slug: SYSTEM_ROLES.MEDICAL_AFFAIRS,
      name: "Medical Affairs / Dokter",
      description: "Validasi dan pengelolaan konten medis.",
    },
    {
      id: "role_dtc",
      slug: SYSTEM_ROLES.DTC,
      name: "Direct To Customer (DTC)",
      description: "Konten digital, event, dan copywriting.",
    },
    {
      id: "role_admin_marketing",
      slug: SYSTEM_ROLES.ADMIN_MARKETING,
      name: "Admin Marketing Medical Nutrience",
      description: "Administrator penuh website dan CMS.",
    },
  ];

  for (const key of Object.values(PERMISSIONS)) {
    await prisma.permission.upsert({
      where: { key },
      update: { module: key.split(".")[0] },
      create: {
        id: `perm_${key.replaceAll(".", "_")}`,
        key,
        module: key.split(".")[0],
      },
    });
  }

  for (const role of roleDefinitions) {
    const savedRole = await prisma.cmsRole.upsert({
      where: { slug: role.slug },
      update: {
        name: role.name,
        description: role.description,
        isSystem: true,
      },
      create: { ...role, isSystem: true },
    });
    const permissionKeys = SYSTEM_ROLE_PERMISSIONS[role.slug];
    const permissions = await prisma.permission.findMany({
      where: { key: { in: permissionKeys } },
      select: { id: true },
    });
    await prisma.rolePermission.deleteMany({ where: { roleId: savedRole.id } });
    await prisma.rolePermission.createMany({
      data: permissions.map(({ id: permissionId }) => ({
        roleId: savedRole.id,
        permissionId,
      })),
    });
  }

  const adminRole = await prisma.cmsRole.findUniqueOrThrow({
    where: { slug: SYSTEM_ROLES.ADMIN_MARKETING },
  });

  await prisma.adminUser.upsert({
    where: { email },
    update: {
      name,
      passwordHash,
      legacyRole: AdminRole.SUPER_ADMIN,
      roleId: adminRole.id,
      isActive: true,
      failedLoginCount: 0,
      lockedUntil: null,
    },
    create: {
      name,
      email,
      passwordHash,
      legacyRole: AdminRole.SUPER_ADMIN,
      roleId: adminRole.id,
      isActive: true,
    },
  });

  console.log(`Bootstrap admin ready: ${email}`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
