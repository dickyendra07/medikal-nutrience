import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { STORAGE_PROVIDER } from "../media.constants";
import { LocalStorageProvider } from "./local-storage.provider";
import { S3CompatibleProvider } from "./s3-compatible.provider";

@Module({
  providers: [
    LocalStorageProvider,
    S3CompatibleProvider,
    {
      provide: STORAGE_PROVIDER,
      inject: [ConfigService, LocalStorageProvider, S3CompatibleProvider],
      useFactory: (
        config: ConfigService,
        local: LocalStorageProvider,
        s3: S3CompatibleProvider,
      ) => (config.getOrThrow<string>("STORAGE_DRIVER") === "s3" ? s3 : local),
    },
  ],
  exports: [STORAGE_PROVIDER],
})
export class StorageModule {}
