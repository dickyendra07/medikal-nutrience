import type { ExecutionContext } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Reflector } from "@nestjs/core";
import type { AuthService } from "../auth.service";
import { SessionAuthGuard } from "./session-auth.guard";

function createContext(cookies: Record<string, string> = {}) {
  const request = { cookies };
  const context = {
    getHandler: () => function handler() {},
    getClass: () => class TestController {},
    switchToHttp: () => ({ getRequest: () => request }),
  } as unknown as ExecutionContext;

  return { context, request };
}

describe("SessionAuthGuard", () => {
  const currentAdmin = {
    id: "admin-1",
    name: "Admin",
    email: "admin@example.com",
    role: { id: "role-admin", slug: "admin-marketing", name: "Admin Marketing" },
    permissions: ["dashboard.view"],
    sessionId: "session-1",
  };

  it("allows explicitly public routes without a cookie", async () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(true),
    } as unknown as Reflector;
    const authService = { verifySession: jest.fn() } as unknown as AuthService;
    const guard = new SessionAuthGuard(
      reflector,
      authService,
      new ConfigService({ SESSION_COOKIE_NAME: "cms_session" }),
    );

    await expect(guard.canActivate(createContext().context)).resolves.toBe(true);
  });

  it("verifies the opaque cookie and attaches the admin context", async () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(false),
    } as unknown as Reflector;
    const authService = {
      verifySession: jest.fn().mockResolvedValue(currentAdmin),
    } as unknown as AuthService;
    const guard = new SessionAuthGuard(
      reflector,
      authService,
      new ConfigService({ SESSION_COOKIE_NAME: "cms_session" }),
    );
    const { context, request } = createContext({ cms_session: "opaque-token" });

    await expect(guard.canActivate(context)).resolves.toBe(true);
    expect(authService.verifySession).toHaveBeenCalledWith("opaque-token");
    expect(request).toHaveProperty("admin", currentAdmin);
  });

  it("rejects protected routes without a cookie", async () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(false),
    } as unknown as Reflector;
    const authService = { verifySession: jest.fn() } as unknown as AuthService;
    const guard = new SessionAuthGuard(
      reflector,
      authService,
      new ConfigService({ SESSION_COOKIE_NAME: "cms_session" }),
    );

    await expect(guard.canActivate(createContext().context)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });
});
