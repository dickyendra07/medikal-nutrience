import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { AdminRole } from "@prisma/client";
import { Reflector } from "@nestjs/core";
import { REQUIRED_ROLES } from "../auth.constants";
import type { RequestWithAdmin } from "../types/request-with-admin";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<AdminRole[]>(REQUIRED_ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles?.length) return true;

    const admin = context.switchToHttp().getRequest<RequestWithAdmin>().admin;

    if (!admin || !requiredRoles.includes(admin.role)) {
      throw new ForbiddenException("You do not have permission to perform this action.");
    }

    return true;
  }
}
