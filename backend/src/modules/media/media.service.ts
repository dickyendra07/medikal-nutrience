import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { basename } from "node:path";
import { ListMediaDto } from "./dto/list-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { STORAGE_PROVIDER, type AllowedMediaMimeType } from "./media.constants";
import { MediaFileValidator } from "./media-file.validator";
import { MediaRepository } from "./media.repository";
import type { StorageProvider } from "./storage/storage-provider";

const extensions: Record<AllowedMediaMimeType, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/svg+xml": "svg",
};

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);

  constructor(
    private readonly repository: MediaRepository,
    private readonly fileValidator: MediaFileValidator,
    @Inject(STORAGE_PROVIDER) private readonly storage: StorageProvider,
  ) {}

  async upload(file: Express.Multer.File) {
    const image = await this.fileValidator.validate(file);
    const now = new Date();
    const filename = `${randomUUID()}.${extensions[image.mimeType]}`;
    const storageKey = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${filename}`;
    const stored = await this.storage.put({
      storageKey,
      buffer: file.buffer,
      mimeType: image.mimeType,
    });

    try {
      return await this.repository.create({
        filename,
        originalName: this.safeOriginalName(file.originalname),
        storageKey: stored.storageKey,
        url: stored.url,
        mimeType: image.mimeType,
        size: file.size,
        width: image.width,
        height: image.height,
      });
    } catch (error) {
      await this.storage.delete(stored.storageKey).catch((cleanupError: unknown) => {
        this.logger.error("Failed to remove an orphaned media upload.", cleanupError);
      });
      throw error;
    }
  }

  async list(query: ListMediaDto) {
    const where: Prisma.MediaAssetWhereInput = {
      deletedAt: null,
      mimeType: query.mimeType,
      ...(query.search?.trim()
        ? {
            OR: [
              { originalName: { contains: query.search.trim(), mode: "insensitive" } },
              { altText: { contains: query.search.trim(), mode: "insensitive" } },
              { caption: { contains: query.search.trim(), mode: "insensitive" } },
            ],
          }
        : {}),
    };
    const result = await this.repository.list(where, (query.page - 1) * query.limit, query.limit);

    return {
      ...result,
      pagination: {
        page: query.page,
        limit: query.limit,
        total: result.total,
        totalPages: Math.ceil(result.total / query.limit),
      },
    };
  }

  async getById(id: string) {
    const media = await this.repository.findById(id);
    if (!media) throw new NotFoundException("Media asset was not found.");
    return media;
  }

  async update(id: string, dto: UpdateMediaDto) {
    await this.getById(id);
    return this.repository.update(id, {
      ...(dto.altText !== undefined ? { altText: this.nullWhenBlank(dto.altText) } : {}),
      ...(dto.caption !== undefined ? { caption: this.nullWhenBlank(dto.caption) } : {}),
    });
  }

  async delete(id: string) {
    const media = await this.getById(id);
    await this.repository.softDelete(id);

    try {
      await this.storage.delete(media.storageKey);
    } catch (error) {
      this.logger.error(`Media ${media.id} was archived but its storage object could not be deleted.`, error);
    }

    return { success: true };
  }

  private safeOriginalName(originalName: string) {
    return basename(originalName).replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 255) || "image";
  }

  private nullWhenBlank(value: string) {
    const normalized = value.trim();
    return normalized || null;
  }
}
