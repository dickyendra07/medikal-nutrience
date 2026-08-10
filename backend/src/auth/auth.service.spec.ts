import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AdminRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import type { PrismaService } from "../prisma/prisma.service";
import { AuthService } from "./auth.service";

type PrismaMock = {
  adminUser: {
    findUnique: jest.Mock;
    update: jest.Mock;
  };
  adminSession: {
    create: jest.Mock;
    deleteMany: jest.Mock;
    findFirst: jest.Mock;
    update: jest.Mock;
    updateMany: jest.Mock;
  };
  $transaction: jest.Mock;
};

function createPrismaMock(): PrismaMock {
  const mock: PrismaMock = {
    adminUser: {
      findUnique: jest.fn(),
      update: jest.fn().mockResolvedValue({}),
    },
    adminSession: {
      create: jest.fn().mockResolvedValue({}),
      deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
      findFirst: jest.fn(),
      update: jest.fn().mockResolvedValue({}),
      updateMany: jest.fn().mockResolvedValue({ count: 1 }),
    },
    $transaction: jest.fn(async (operations: Promise<unknown>[]) => Promise.all(operations)),
  };

  return mock;
}

describe("AuthService", () => {
  let passwordHash: string;
  let admin: Record<string, unknown> & { id: string; name: string; email: string; passwordHash: string; failedLoginCount: number };

  beforeAll(async () => {
    passwordHash = await bcrypt.hash("correct-password", 4);
    admin = {
      id: "admin-1",
      name: "CMS Admin",
      email: "admin@example.com",
      passwordHash,
      legacyRole: AdminRole.ADMIN,
      roleId: "role-admin",
      cmsRole: {
        id: "role-admin",
        slug: "admin-marketing",
        name: "Admin Marketing Medical Nutrience",
        permissions: [
          { permission: { id: "permission-1", key: "dashboard.view", module: "dashboard", description: "View dashboard", createdAt: new Date() } },
        ],
      },
      isActive: true,
      failedLoginCount: 0,
      lockedUntil: null,
      lastLoginAt: null,
      createdAt: new Date("2026-08-03T00:00:00.000Z"),
      updatedAt: new Date("2026-08-03T00:00:00.000Z"),
    };
  });

  it("creates a revocable opaque session after a valid login", async () => {
    const prisma = createPrismaMock();
    prisma.adminUser.findUnique.mockResolvedValue(admin);
    const service = new AuthService(
      prisma as unknown as PrismaService,
      new ConfigService({ SESSION_TTL_HOURS: 8 }),
    );

    const result = await service.login(
      { email: admin.email, password: "correct-password" },
      { ipAddress: "127.0.0.1", userAgent: "Jest" },
    );

    expect(result.sessionToken).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(result.user).toEqual({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: { id: "role-admin", slug: "admin-marketing", name: "Admin Marketing Medical Nutrience" },
      permissions: ["dashboard.view"],
    });
    expect(prisma.adminSession.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        adminUserId: admin.id,
        tokenHash: expect.stringMatching(/^[a-f0-9]{64}$/),
      }),
    });
    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
  });

  it("records a failed login and returns a generic error", async () => {
    const prisma = createPrismaMock();
    prisma.adminUser.findUnique.mockResolvedValue(admin);
    const service = new AuthService(
      prisma as unknown as PrismaService,
      new ConfigService({ SESSION_TTL_HOURS: 8 }),
    );

    await expect(
      service.login(
        { email: admin.email, password: "wrong-password" },
        {},
      ),
    ).rejects.toEqual(new UnauthorizedException("Invalid email or password."));
    expect(prisma.adminUser.update).toHaveBeenCalledWith({
      where: { id: admin.id },
      data: { failedLoginCount: 1, lockedUntil: null },
    });
  });

  it("verifies an active database session", async () => {
    const prisma = createPrismaMock();
    prisma.adminSession.findFirst.mockResolvedValue({
      id: "session-1",
      lastSeenAt: new Date(),
      adminUser: admin,
    });
    const service = new AuthService(
      prisma as unknown as PrismaService,
      new ConfigService({ SESSION_TTL_HOURS: 8 }),
    );

    await expect(service.verifySession("opaque-token")).resolves.toEqual({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: { id: "role-admin", slug: "admin-marketing", name: "Admin Marketing Medical Nutrience" },
      permissions: ["dashboard.view"],
      sessionId: "session-1",
    });
  });
});
