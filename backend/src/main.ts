import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { static as expressStatic } from "express";
import helmet from "helmet";
import { isAbsolute, resolve } from "node:path";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
  });
  const config = app.get(ConfigService);
  const frontendOrigins = config
    .getOrThrow<string>("FRONTEND_ORIGIN")
    .split(",")
    .map((origin) => origin.trim());

  app.setGlobalPrefix("api");
  app.use(helmet());
  if (config.getOrThrow<string>("STORAGE_DRIVER") === "local") {
    const configuredStoragePath = config.getOrThrow<string>("MEDIA_LOCAL_STORAGE_PATH");
    const mediaStoragePath = isAbsolute(configuredStoragePath)
      ? configuredStoragePath
      : resolve(process.cwd(), configuredStoragePath);

    app.use(
      "/uploads/media",
      expressStatic(mediaStoragePath, {
        dotfiles: "deny",
        index: false,
        maxAge: "1h",
        setHeaders: (response) => {
          response.setHeader("Content-Security-Policy", "default-src 'none'; sandbox");
          response.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
          response.setHeader("X-Content-Type-Options", "nosniff");
        },
      }),
    );
  }
  app.use(cookieParser());
  app.enableCors({
    origin: frontendOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "X-Requested-With"],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: false,
    }),
  );
  app.enableShutdownHooks();

  await app.listen(config.getOrThrow<number>("PORT"), "0.0.0.0");
}

void bootstrap();
