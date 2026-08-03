import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_ROUTE } from "../auth.constants";
import { AuthService } from "../auth.service";
import type { RequestWithAdmin } from "../types/request-with-admin";

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_ROUTE, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<RequestWithAdmin>();
    const cookieName = this.config.getOrThrow<string>("SESSION_COOKIE_NAME");
    const cookies = request.cookies as Record<string, unknown> | undefined;
    const token = cookies?.[cookieName];

    if (typeof token !== "string" || !token) {
      throw new UnauthorizedException("Admin session is required.");
    }

    request.admin = await this.authService.verifySession(token);

    return true;
  }
}
