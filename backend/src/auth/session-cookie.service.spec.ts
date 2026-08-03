import { ConfigService } from "@nestjs/config";
import type { Response } from "express";
import { SESSION_COOKIE_PATH } from "./auth.constants";
import { SessionCookieService } from "./session-cookie.service";

describe("SessionCookieService", () => {
  const config = new ConfigService({
    SESSION_COOKIE_NAME: "cms_session",
    COOKIE_SECURE: true,
    COOKIE_SAME_SITE: "strict",
  });
  const service = new SessionCookieService(config);

  it("sets a hardened httpOnly cookie", () => {
    const response = { cookie: jest.fn() } as unknown as Response;
    const expiresAt = new Date("2026-08-03T12:00:00.000Z");

    service.set(response, "opaque-token", expiresAt);

    expect(response.cookie).toHaveBeenCalledWith("cms_session", "opaque-token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: SESSION_COOKIE_PATH,
      expires: expiresAt,
    });
  });

  it("clears the same cookie scope", () => {
    const response = { clearCookie: jest.fn() } as unknown as Response;

    service.clear(response);

    expect(response.clearCookie).toHaveBeenCalledWith("cms_session", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: SESSION_COOKIE_PATH,
    });
  });
});
