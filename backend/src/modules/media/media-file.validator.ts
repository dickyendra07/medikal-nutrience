import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import sharp, { type Metadata } from "sharp";
import {
  ALLOWED_MEDIA_MIME_TYPES,
  type AllowedMediaMimeType,
} from "./media.constants";

const detectedMimeTypes: Partial<Record<string, AllowedMediaMimeType>> = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  svg: "image/svg+xml",
};

@Injectable()
export class MediaFileValidator {
  constructor(private readonly config: ConfigService) {}

  async validate(file: Express.Multer.File) {
    if (file.size <= 0 || file.size > this.config.getOrThrow<number>("MEDIA_MAX_FILE_SIZE_BYTES")) {
      throw new BadRequestException("The image is empty or exceeds the configured file size limit.");
    }

    if (!ALLOWED_MEDIA_MIME_TYPES.includes(file.mimetype as AllowedMediaMimeType)) {
      throw new BadRequestException("Only JPEG, PNG, WebP, and SVG images are allowed.");
    }

    if (file.mimetype === "image/svg+xml") this.validateSvg(file.buffer);

    let metadata: Metadata;

    try {
      metadata = await sharp(file.buffer, {
        failOn: "error",
        limitInputPixels: this.config.getOrThrow<number>("MEDIA_MAX_IMAGE_PIXELS"),
      }).metadata();
    } catch {
      throw new BadRequestException("The uploaded file is not a valid, safe image.");
    }

    const detectedMimeType = metadata.format ? detectedMimeTypes[metadata.format] : undefined;

    if (!detectedMimeType || detectedMimeType !== file.mimetype) {
      throw new BadRequestException("The file content does not match its declared MIME type.");
    }

    if (!metadata.width || !metadata.height) {
      throw new BadRequestException("Image dimensions could not be determined.");
    }

    if (metadata.width > 12_000 || metadata.height > 12_000 || (metadata.pages ?? 1) > 1) {
      throw new BadRequestException("Animated images or dimensions above 12,000px are not allowed.");
    }

    return {
      mimeType: detectedMimeType,
      width: metadata.width,
      height: metadata.height,
    };
  }

  private validateSvg(buffer: Buffer) {
    const svg = buffer.toString("utf8");
    const forbiddenMarkup = [
      /<!DOCTYPE/i,
      /<!ENTITY/i,
      /<script\b/i,
      /<style\b/i,
      /<foreignObject\b/i,
      /<(?:iframe|object|embed)\b/i,
      /<\?xml-stylesheet\b/i,
      /\son[a-z]+\s*=/i,
      /\bjavascript\s*:/i,
      /url\(\s*["']?(?!#)/i,
    ];
    const references = svg.matchAll(/(?:href|xlink:href)\s*=\s*["']([^"']+)["']/gi);

    if (!/<svg\b/i.test(svg) || forbiddenMarkup.some((pattern) => pattern.test(svg))) {
      throw new BadRequestException("The SVG contains unsupported or unsafe markup.");
    }

    for (const reference of references) {
      if (!reference[1].startsWith("#")) {
        throw new BadRequestException("External references are not allowed in SVG images.");
      }
    }
  }
}
