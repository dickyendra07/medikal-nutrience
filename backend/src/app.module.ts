import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { PermissionsGuard } from "./auth/guards/permissions.guard";
import { SessionAuthGuard } from "./auth/guards/session-auth.guard";
import { validateEnvironment } from "./config/environment";
import { MediaModule } from "./modules/media/media.module";
import { ArticlesModule } from "./modules/articles/articles.module";
import { PrismaModule } from "./prisma/prisma.module";
import { AccessControlModule } from "./modules/access-control/access-control.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateEnvironment,
    }),
    PrismaModule,
    AuthModule,
    MediaModule,
    ArticlesModule,
    AccessControlModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SessionAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
