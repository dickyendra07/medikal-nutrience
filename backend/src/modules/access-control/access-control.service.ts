import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { AdminRole, Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { BCRYPT_ROUNDS } from "../../auth/auth.constants";
import { PERMISSIONS } from "../../auth/permissions";
import type { CurrentAdminUser } from "../../auth/types/current-admin";
import { PrismaService } from "../../prisma/prisma.service";
import type {
  CreateCmsRoleDto,
  CreateCmsUserDto,
  UpdateCmsRoleDto,
  UpdateCmsUserDto,
} from "./dto/access-control.dto";

@Injectable()
export class AccessControlService {
  constructor(private readonly prisma: PrismaService) {}

  listPermissions() {
    return this.prisma.permission.findMany({
      orderBy: [{ module: "asc" }, { key: "asc" }],
    });
  }

  async listRoles() {
    const roles = await this.prisma.cmsRole.findMany({
      include: {
        permissions: { include: { permission: true } },
        _count: { select: { users: true } },
      },
      orderBy: [{ isSystem: "desc" }, { name: "asc" }],
    });
    return roles.map((role) => ({
      ...role,
      permissions: role.permissions.map(({ permission }) => permission),
    }));
  }

  listUsers() {
    return this.prisma.adminUser.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        cmsRole: { select: { id: true, slug: true, name: true } },
      },
      orderBy: { name: "asc" },
    });
  }

  async createUser(dto: CreateCmsUserDto, actor: CurrentAdminUser) {
    await this.requireRole(dto.roleId);
    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);
    try {
      const user = await this.prisma.adminUser.create({
        data: {
          name: dto.name.trim(),
          email: dto.email.trim().toLowerCase(),
          passwordHash,
          roleId: dto.roleId,
          legacyRole: AdminRole.EDITOR,
        },
        select: { id: true, name: true, email: true, isActive: true },
      });
      await this.audit(actor.id, "user.create", "AdminUser", user.id, {
        roleId: dto.roleId,
      });
      return user;
    } catch (error) {
      this.handleUnique(error, "Email user CMS sudah digunakan.");
    }
  }

  async updateUser(id: string, dto: UpdateCmsUserDto, actor: CurrentAdminUser) {
    const existing = await this.prisma.adminUser.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException("User CMS tidak ditemukan.");
    if (id === actor.id && dto.isActive === false) {
      throw new BadRequestException("Anda tidak dapat menonaktifkan akun sendiri.");
    }
    if (dto.roleId) await this.requireRole(dto.roleId);
    const passwordHash = dto.password
      ? await bcrypt.hash(dto.password, BCRYPT_ROUNDS)
      : undefined;
    const user = await this.prisma.adminUser.update({
      where: { id },
      data: {
        ...(dto.name !== undefined ? { name: dto.name.trim() } : {}),
        ...(dto.roleId !== undefined ? { roleId: dto.roleId } : {}),
        ...(dto.isActive !== undefined ? { isActive: dto.isActive } : {}),
        ...(passwordHash ? { passwordHash, failedLoginCount: 0, lockedUntil: null } : {}),
      },
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        cmsRole: { select: { id: true, slug: true, name: true } },
      },
    });
    await this.audit(actor.id, "user.update", "AdminUser", id, {
      fields: Object.keys(dto).filter((field) => field !== "password"),
      passwordChanged: Boolean(dto.password),
    });
    return user;
  }

  async createRole(dto: CreateCmsRoleDto, actor: CurrentAdminUser) {
    await this.validatePermissionIds(dto.permissionIds);
    try {
      const role = await this.prisma.cmsRole.create({
        data: {
          name: dto.name.trim(),
          slug: dto.slug,
          description: dto.description?.trim() || null,
          permissions: {
            create: [...new Set(dto.permissionIds)].map((permissionId) => ({
              permissionId,
            })),
          },
        },
      });
      await this.audit(actor.id, "role.create", "CmsRole", role.id, {
        permissionCount: new Set(dto.permissionIds).size,
      });
      return role;
    } catch (error) {
      this.handleUnique(error, "Slug role sudah digunakan.");
    }
  }

  async updateRole(id: string, dto: UpdateCmsRoleDto, actor: CurrentAdminUser) {
    const role = await this.prisma.cmsRole.findUnique({ where: { id } });
    if (!role) throw new NotFoundException("Role CMS tidak ditemukan.");
    if (dto.permissionIds) {
      await this.validatePermissionIds(dto.permissionIds);
      if (actor.role.id === id) {
        const granted = await this.prisma.permission.findMany({
          where: { id: { in: dto.permissionIds } },
          select: { key: true },
        });
        const keys = new Set(granted.map(({ key }) => key));
        if (!keys.has(PERMISSIONS.USERS_MANAGE) || !keys.has(PERMISSIONS.ROLES_MANAGE)) {
          throw new ForbiddenException("Role aktif Anda harus tetap memiliki akses user dan role management.");
        }
      }
    }
    await this.prisma.$transaction(async (tx) => {
      if (dto.permissionIds) {
        await tx.rolePermission.deleteMany({ where: { roleId: id } });
        await tx.rolePermission.createMany({
          data: [...new Set(dto.permissionIds)].map((permissionId) => ({
            roleId: id,
            permissionId,
          })),
        });
      }
      await tx.cmsRole.update({
        where: { id },
        data: {
          ...(dto.name !== undefined ? { name: dto.name.trim() } : {}),
          ...(dto.description !== undefined
            ? { description: dto.description.trim() || null }
            : {}),
        },
      });
    });
    await this.audit(actor.id, "role.update", "CmsRole", id, {
      fields: Object.keys(dto),
      permissionCount: dto.permissionIds?.length,
    });
    return this.prisma.cmsRole.findUnique({ where: { id } });
  }

  private async requireRole(id: string) {
    const role = await this.prisma.cmsRole.findUnique({ where: { id } });
    if (!role) throw new BadRequestException("Role CMS tidak valid.");
    return role;
  }

  private async validatePermissionIds(ids: string[]) {
    const unique = [...new Set(ids)];
    const count = await this.prisma.permission.count({ where: { id: { in: unique } } });
    if (count !== unique.length) throw new BadRequestException("Satu atau lebih permission tidak valid.");
  }

  private audit(
    actorId: string,
    action: string,
    resource: string,
    resourceId: string,
    metadata?: Prisma.InputJsonObject,
  ) {
    return this.prisma.cmsAuditLog.create({
      data: { actorId, action, resource, resourceId, metadata },
    });
  }

  private handleUnique(error: unknown, message: string): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new ConflictException(message);
    }
    throw error;
  }
}
