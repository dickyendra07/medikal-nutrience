import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { CurrentAdmin } from "./decorators/current-admin.decorator";
import { Public } from "./decorators/public.decorator";
import { LoginDto } from "./dto/login.dto";
import { SessionCookieService } from "./session-cookie.service";
import type { CurrentAdminUser, SafeAdminUser } from "./types/current-admin";

@Controller("admin/auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionCookie: SessionCookieService,
  ) {}

  @Public()
  @Post("login")
  @HttpCode(200)
  async login(
    @Body() dto: LoginDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(dto, {
      ipAddress: request.ip,
      userAgent: request.get("user-agent"),
    });

    this.sessionCookie.set(response, result.sessionToken, result.expiresAt);

    return {
      user: result.user,
      expiresAt: result.expiresAt,
    };
  }

  @Get("me")
  me(@CurrentAdmin() admin: CurrentAdminUser): SafeAdminUser {
    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };
  }

  @Post("logout")
  @HttpCode(200)
  async logout(
    @CurrentAdmin() admin: CurrentAdminUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(admin.sessionId);
    this.sessionCookie.clear(response);

    return { success: true };
  }
}
