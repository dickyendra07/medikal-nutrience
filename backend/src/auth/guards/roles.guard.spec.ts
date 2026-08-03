import type { ExecutionContext } from "@nestjs/common";
import { ForbiddenException } from "@nestjs/common";
import { AdminRole } from "@prisma/client";
import type { Reflector } from "@nestjs/core";
import { RolesGuard } from "./roles.guard";

function createContext(role: AdminRole): ExecutionContext {
  return {
    getHandler: () => function handler() {},
    getClass: () => class TestController {},
    switchToHttp: () => ({
      getRequest: () => ({
        admin: {
          id: "admin-1",
          name: "Admin",
          email: "admin@example.com",
          role,
          sessionId: "session-1",
        },
      }),
    }),
  } as unknown as ExecutionContext;
}

describe("RolesGuard", () => {
  it("allows an admin with a required role", () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue([AdminRole.SUPER_ADMIN, AdminRole.ADMIN]),
    } as unknown as Reflector;
    const guard = new RolesGuard(reflector);

    expect(guard.canActivate(createContext(AdminRole.ADMIN))).toBe(true);
  });

  it("denies an admin without a required role", () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue([AdminRole.SUPER_ADMIN]),
    } as unknown as Reflector;
    const guard = new RolesGuard(reflector);

    expect(() => guard.canActivate(createContext(AdminRole.EDITOR))).toThrow(
      ForbiddenException,
    );
  });

  it("allows routes without a role restriction", () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(undefined),
    } as unknown as Reflector;
    const guard = new RolesGuard(reflector);

    expect(guard.canActivate(createContext(AdminRole.VIEWER))).toBe(true);
  });
});
