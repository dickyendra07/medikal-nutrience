import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { StorageProvider, StoreFileInput, StoredFile } from "./storage-provider";

@Injectable()
export class S3CompatibleProvider implements StorageProvider {
  private client?: S3Client;

  constructor(private readonly config: ConfigService) {}

  async put(input: StoreFileInput): Promise<StoredFile> {
    await this.getClient().send(
      new PutObjectCommand({
        Bucket: this.config.getOrThrow<string>("S3_BUCKET"),
        Key: input.storageKey,
        Body: input.buffer,
        ContentType: input.mimeType,
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );

    const publicBaseUrl = this.config
      .getOrThrow<string>("MEDIA_PUBLIC_BASE_URL")
      .replace(/\/$/, "");

    return {
      storageKey: input.storageKey,
      url: `${publicBaseUrl}/${input.storageKey.split("/").map(encodeURIComponent).join("/")}`,
    };
  }

  async delete(storageKey: string) {
    await this.getClient().send(
      new DeleteObjectCommand({
        Bucket: this.config.getOrThrow<string>("S3_BUCKET"),
        Key: storageKey,
      }),
    );
  }

  private getClient() {
    if (!this.client) {
      this.client = new S3Client({
        endpoint: this.config.get<string>("S3_ENDPOINT"),
        region: this.config.getOrThrow<string>("S3_REGION"),
        forcePathStyle: this.config.getOrThrow<boolean>("S3_FORCE_PATH_STYLE"),
        credentials: {
          accessKeyId: this.config.getOrThrow<string>("S3_ACCESS_KEY_ID"),
          secretAccessKey: this.config.getOrThrow<string>("S3_SECRET_ACCESS_KEY"),
        },
      });
    }

    return this.client;
  }
}
