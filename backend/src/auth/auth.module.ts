import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PermissionsGuard } from "./guards/permissions.guard";
import { SessionAuthGuard } from "./guards/session-auth.guard";
import { SessionCookieService } from "./session-cookie.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, SessionAuthGuard, PermissionsGuard, SessionCookieService],
  exports: [AuthService, SessionAuthGuard, PermissionsGuard],
})
export class AuthModule {}
