import { BadRequestException, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import multer from "multer";
import { ALLOWED_MEDIA_MIME_TYPES, type AllowedMediaMimeType } from "./media.constants";
import { MediaController } from "./media.controller";
import { MediaFileValidator } from "./media-file.validator";
import { MediaRepository } from "./media.repository";
import { MediaService } from "./media.service";
import { StorageModule } from "./storage/storage.module";

@Module({
  imports: [
    StorageModule,
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        storage: multer.memoryStorage(),
        limits: {
          files: 1,
          fileSize: config.getOrThrow<number>("MEDIA_MAX_FILE_SIZE_BYTES"),
        },
        fileFilter: (
          _request: Express.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, acceptFile: boolean) => void,
        ) => {
          if (!ALLOWED_MEDIA_MIME_TYPES.includes(file.mimetype as AllowedMediaMimeType)) {
            callback(
              new BadRequestException("Only JPEG, PNG, WebP, and SVG images are allowed."),
              false,
            );
            return;
          }

          callback(null, true);
        },
      }),
    }),
  ],
  controllers: [MediaController],
  providers: [MediaRepository, MediaFileValidator, MediaService],
})
export class MediaModule {}
