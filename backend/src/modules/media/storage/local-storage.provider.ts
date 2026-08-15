import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, resolve, sep } from "node:path";
import type { StorageProvider, StoreFileInput, StoredFile } from "./storage-provider";

@Injectable()
export class LocalStorageProvider implements StorageProvider {
  private readonly root: string;
  private readonly publicBaseUrl: string;

  constructor(config: ConfigService) {
    const configuredRoot = config.getOrThrow<string>("MEDIA_LOCAL_STORAGE_PATH");
    this.root = isAbsolute(configuredRoot)
      ? resolve(configuredRoot)
      : resolve(process.cwd(), configuredRoot);
    this.publicBaseUrl = config.getOrThrow<string>("MEDIA_PUBLIC_BASE_URL").replace(/\/$/, "");
  }

  async put(input: StoreFileInput): Promise<StoredFile> {
    const destination = this.resolveStorageKey(input.storageKey);
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, input.buffer, { flag: "wx" });

    return {
      storageKey: input.storageKey,
      url: `${this.publicBaseUrl}/${input.storageKey.split("/").map(encodeURIComponent).join("/")}`,
    };
  }

  async delete(storageKey: string) {
    try {
      await unlink(this.resolveStorageKey(storageKey));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }

  private resolveStorageKey(storageKey: string) {
    const resolved = resolve(this.root, storageKey);

    if (resolved !== this.root && !resolved.startsWith(`${this.root}${sep}`)) {
      throw new Error("Invalid storage key.");
    }

    return resolved;
  }
}
