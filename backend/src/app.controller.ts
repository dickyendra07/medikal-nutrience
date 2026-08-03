import { Controller, Get } from "@nestjs/common";
import { Public } from "./auth/decorators/public.decorator";
import { PrismaService } from "./prisma/prisma.service";

@Controller("health")
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Public()
  @Get()
  health() {
    return {
      status: "ok",
      service: "medikal-nutrience-cms-backend",
    };
  }

  @Public()
  @Get("ready")
  async readiness() {
    await this.prisma.$queryRaw`SELECT 1`;

    return {
      status: "ready",
      database: "connected",
    };
  }
}
