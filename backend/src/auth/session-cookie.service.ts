import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { CookieOptions, Response } from "express";
import { SESSION_COOKIE_PATH } from "./auth.constants";

@Injectable()
export class SessionCookieService {
  constructor(private readonly config: ConfigService) {}

  get name() {
    return this.config.getOrThrow<string>("SESSION_COOKIE_NAME");
  }

  private baseOptions(): CookieOptions {
    const domain = this.config.get<string>("COOKIE_DOMAIN");

    return {
      httpOnly: true,
      secure: this.config.getOrThrow<boolean>("COOKIE_SECURE"),
      sameSite: this.config.getOrThrow<"lax" | "strict" | "none">("COOKIE_SAME_SITE"),
      path: SESSION_COOKIE_PATH,
      ...(domain ? { domain } : {}),
    };
  }

  set(response: Response, token: string, expiresAt: Date) {
    response.cookie(this.name, token, {
      ...this.baseOptions(),
      expires: expiresAt,
    });
  }

  clear(response: Response) {
    response.clearCookie(this.name, this.baseOptions());
  }
}
