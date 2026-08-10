import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { REQUIRED_PERMISSIONS } from "../auth.constants";
import type { PermissionKey } from "../permissions";
import type { RequestWithAdmin } from "../types/request-with-admin";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const required = this.reflector.getAllAndOverride<PermissionKey[]>(
      REQUIRED_PERMISSIONS,
      [context.getHandler(), context.getClass()],
    );

    if (!required?.length) return true;

    const admin = context.switchToHttp().getRequest<RequestWithAdmin>().admin;
    const granted = new Set(admin?.permissions ?? []);

    if (!admin || !required.every((permission) => granted.has(permission))) {
      throw new ForbiddenException({
        code: "CMS_PERMISSION_DENIED",
        message: "You do not have permission to perform this action.",
        requiredPermissions: required,
      });
    }

    return true;
  }
}
