import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { RolesGuard } from "./guards/roles.guard";
import { SessionAuthGuard } from "./guards/session-auth.guard";
import { SessionCookieService } from "./session-cookie.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, SessionAuthGuard, RolesGuard, SessionCookieService],
  exports: [AuthService, SessionAuthGuard, RolesGuard],
})
export class AuthModule {}
