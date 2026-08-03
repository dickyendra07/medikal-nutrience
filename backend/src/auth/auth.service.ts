import {
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { AdminUser } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { createHash, randomBytes } from "crypto";
import { PrismaService } from "../prisma/prisma.service";
import {
  ACCOUNT_LOCK_MINUTES,
  BCRYPT_ROUNDS,
  MAX_FAILED_LOGINS,
} from "./auth.constants";
import type { LoginDto } from "./dto/login.dto";
import type { CurrentAdminUser, SafeAdminUser } from "./types/current-admin";

type SessionMetadata = {
  ipAddress?: string;
  userAgent?: string;
};

const INVALID_CREDENTIALS_MESSAGE = "Invalid email or password.";

function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function toSafeAdmin(admin: Pick<AdminUser, "id" | "name" | "email" | "role">): SafeAdminUser {
  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  };
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async login(dto: LoginDto, metadata: SessionMetadata) {
    const admin = await this.prisma.adminUser.findUnique({
      where: { email: dto.email },
    });

    const passwordMatches = admin
      ? await bcrypt.compare(dto.password, admin.passwordHash)
      : await bcrypt.hash(dto.password, BCRYPT_ROUNDS).then(() => false);

    const accountLocked = Boolean(admin?.lockedUntil && admin.lockedUntil > new Date());

    if (!admin || !admin.isActive || !passwordMatches || accountLocked) {
      if (admin?.isActive && !accountLocked) {
        await this.recordFailedLogin(admin);
      }

      throw new UnauthorizedException(INVALID_CREDENTIALS_MESSAGE);
    }

    const sessionToken = randomBytes(32).toString("base64url");
    const tokenHash = hashSessionToken(sessionToken);
    const ttlHours = this.config.getOrThrow<number>("SESSION_TTL_HOURS");
    const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000);

    await this.prisma.$transaction([
      this.prisma.adminUser.update({
        where: { id: admin.id },
        data: {
          failedLoginCount: 0,
          lockedUntil: null,
          lastLoginAt: new Date(),
        },
      }),
      this.prisma.adminSession.create({
        data: {
          tokenHash,
          adminUserId: admin.id,
          expiresAt,
          ipAddress: metadata.ipAddress?.slice(0, 64),
          userAgent: metadata.userAgent?.slice(0, 512),
        },
      }),
      this.prisma.adminSession.deleteMany({
        where: {
          OR: [{ expiresAt: { lte: new Date() } }, { revokedAt: { not: null } }],
        },
      }),
    ]);

    return {
      sessionToken,
      expiresAt,
      user: toSafeAdmin(admin),
    };
  }

  async verifySession(token: string): Promise<CurrentAdminUser> {
    const session = await this.prisma.adminSession.findFirst({
      where: {
        tokenHash: hashSessionToken(token),
        revokedAt: null,
        expiresAt: { gt: new Date() },
        adminUser: { isActive: true },
      },
      include: { adminUser: true },
    });

    if (!session) {
      throw new UnauthorizedException("Invalid or expired admin session.");
    }

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    if (session.lastSeenAt < fiveMinutesAgo) {
      await this.prisma.adminSession.update({
        where: { id: session.id },
        data: { lastSeenAt: new Date() },
      });
    }

    return {
      ...toSafeAdmin(session.adminUser),
      sessionId: session.id,
    };
  }

  async logout(sessionId: string) {
    await this.prisma.adminSession.updateMany({
      where: { id: sessionId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  private async recordFailedLogin(admin: AdminUser) {
    const failedLoginCount = admin.failedLoginCount + 1;
    const shouldLock = failedLoginCount >= MAX_FAILED_LOGINS;

    await this.prisma.adminUser.update({
      where: { id: admin.id },
      data: {
        failedLoginCount,
        lockedUntil: shouldLock
          ? new Date(Date.now() + ACCOUNT_LOCK_MINUTES * 60 * 1000)
          : null,
      },
    });
  }
}
