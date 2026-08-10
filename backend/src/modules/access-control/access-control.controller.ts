import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CurrentAdmin } from "../../auth/decorators/current-admin.decorator";
import { Permissions } from "../../auth/decorators/permissions.decorator";
import { PERMISSIONS } from "../../auth/permissions";
import type { CurrentAdminUser } from "../../auth/types/current-admin";
import { AccessControlService } from "./access-control.service";
import {
  CreateCmsRoleDto,
  CreateCmsUserDto,
  UpdateCmsRoleDto,
  UpdateCmsUserDto,
} from "./dto/access-control.dto";

@Controller("admin/access")
export class AccessControlController {
  constructor(private readonly access: AccessControlService) {}

  @Get("permissions")
  @Permissions(PERMISSIONS.ROLES_MANAGE)
  permissions() { return this.access.listPermissions(); }

  @Get("roles")
  @Permissions(PERMISSIONS.USERS_MANAGE)
  roles() { return this.access.listRoles(); }

  @Post("roles")
  @Permissions(PERMISSIONS.ROLES_MANAGE)
  createRole(@Body() dto: CreateCmsRoleDto, @CurrentAdmin() admin: CurrentAdminUser) {
    return this.access.createRole(dto, admin);
  }

  @Patch("roles/:id")
  @Permissions(PERMISSIONS.ROLES_MANAGE)
  updateRole(@Param("id") id: string, @Body() dto: UpdateCmsRoleDto, @CurrentAdmin() admin: CurrentAdminUser) {
    return this.access.updateRole(id, dto, admin);
  }

  @Get("users")
  @Permissions(PERMISSIONS.USERS_MANAGE)
  users() { return this.access.listUsers(); }

  @Post("users")
  @Permissions(PERMISSIONS.USERS_MANAGE)
  createUser(@Body() dto: CreateCmsUserDto, @CurrentAdmin() admin: CurrentAdminUser) {
    return this.access.createUser(dto, admin);
  }

  @Patch("users/:id")
  @Permissions(PERMISSIONS.USERS_MANAGE)
  updateUser(@Param("id") id: string, @Body() dto: UpdateCmsUserDto, @CurrentAdmin() admin: CurrentAdminUser) {
    return this.access.updateUser(id, dto, admin);
  }
}
