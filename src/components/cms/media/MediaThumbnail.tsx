import Image from "next/image";
import type { MediaAsset } from "@/lib/cms/media-api";

export function MediaThumbnail({
  media,
  sizes = "(max-width: 768px) 50vw, 25vw",
}: {
  media: MediaAsset;
  sizes?: string;
}) {
  return (
    <Image
      src={media.url}
      alt={media.altText || media.originalName}
      fill
      sizes={sizes}
      unoptimized={media.mimeType === "image/svg+xml"}
      className="object-contain p-3"
    />
  );
}
