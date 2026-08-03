import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import helmet from "helmet";
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
