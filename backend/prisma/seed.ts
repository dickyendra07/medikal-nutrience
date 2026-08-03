import { AdminRole, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

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

  await prisma.adminUser.upsert({
    where: { email },
    update: {
      name,
      passwordHash,
      role: AdminRole.SUPER_ADMIN,
      isActive: true,
      failedLoginCount: 0,
      lockedUntil: null,
    },
    create: {
      name,
      email,
      passwordHash,
      role: AdminRole.SUPER_ADMIN,
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
