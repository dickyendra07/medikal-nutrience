import type { ExecutionContext } from "@nestjs/common";
import { ForbiddenException } from "@nestjs/common";
import type { Reflector } from "@nestjs/core";
import { PERMISSIONS } from "../permissions";
import { PermissionsGuard } from "./permissions.guard";

function contextFor(permissions?: string[]) {
  const request = permissions ? {
    admin: {
      id: "admin-1",
      name: "CMS User",
      email: "user@example.com",
      role: { id: "role-1", slug: "dtc", name: "Direct To Customer" },
      permissions,
      sessionId: "session-1",
    },
  } : {};
  return {
    getHandler: () => function handler() {},
    getClass: () => class TestController {},
    switchToHttp: () => ({ getRequest: () => request }),
  } as unknown as ExecutionContext;
}

describe("PermissionsGuard", () => {
  it("allows endpoints without declared permissions", () => {
    const reflector = { getAllAndOverride: jest.fn().mockReturnValue(undefined) } as unknown as Reflector;
    expect(new PermissionsGuard(reflector).canActivate(contextFor())).toBe(true);
  });

  it("allows an authenticated admin with every required permission", () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue([PERMISSIONS.ARTICLE_VIEW, PERMISSIONS.ARTICLE_EDIT]),
    } as unknown as Reflector;
    const guard = new PermissionsGuard(reflector);
    expect(guard.canActivate(contextFor([PERMISSIONS.ARTICLE_VIEW, PERMISSIONS.ARTICLE_EDIT]))).toBe(true);
  });

  it("returns a structured forbidden response when a permission is missing", () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue([PERMISSIONS.ARTICLE_PUBLISH]),
    } as unknown as Reflector;
    const guard = new PermissionsGuard(reflector);
    expect(() => guard.canActivate(contextFor([PERMISSIONS.ARTICLE_EDIT]))).toThrow(ForbiddenException);
    try {
      guard.canActivate(contextFor([PERMISSIONS.ARTICLE_EDIT]));
    } catch (error) {
      expect((error as ForbiddenException).getResponse()).toEqual({
        code: "CMS_PERMISSION_DENIED",
        message: "You do not have permission to perform this action.",
        requiredPermissions: [PERMISSIONS.ARTICLE_PUBLISH],
      });
    }
  });
});
