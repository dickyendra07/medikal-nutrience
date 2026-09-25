import type { CSSProperties } from "react";
import { mednutAssets } from "@/data/mednut-assets";

const { productLogos, pharmacies } = mednutAssets;

type LogoFrame = Pick<CSSProperties, "aspectRatio" | "objectPosition">;

// Several official logo files sit on large transparent square canvases, so the
// artwork fills only a thin band of the image. Each frame crops the file to that
// visible artwork plus a small margin, letting every logo share one sizing rule
// instead of per-logo scale overrides. Values come from the artwork's pixel
// bounds: aspectRatio = width / band height, objectPosition = band offset.
const logoFrames: Record<string, LogoFrame> = {
  [productLogos.entrasoy]: { aspectRatio: "1000 / 214", objectPosition: "50% 50.8%" },
  [productLogos.entramix]: { aspectRatio: "1000 / 216", objectPosition: "50% 48.7%" },
  [productLogos.peptisol]: { aspectRatio: "1000 / 252", objectPosition: "50% 51.1%" },
  [productLogos.peptibren]: { aspectRatio: "1000 / 212", objectPosition: "50% 50.9%" },
  [productLogos.nephrisol]: { aspectRatio: "1000 / 229", objectPosition: "50% 51%" },
  [productLogos.hepatosol]: { aspectRatio: "4478 / 836", objectPosition: "50% 65.2%" },
  [productLogos.hepatosolLola]: { aspectRatio: "6607 / 836", objectPosition: "50% 65.2%" },
  [productLogos.oligo]: { aspectRatio: "2288 / 885", objectPosition: "50% 50%" },
  [productLogos.pulmosol]: { aspectRatio: "3862 / 670", objectPosition: "50% 34.8%" },
  [pharmacies.apotekBerkat]: { aspectRatio: "4267 / 872", objectPosition: "50% 48.9%" },
  [pharmacies.apotekGunaFarma]: { aspectRatio: "4267 / 1792", objectPosition: "50% 43.7%" },
  [pharmacies.apotekMandjur]: { aspectRatio: "4267 / 1526", objectPosition: "50% 56%" },
  [pharmacies.apotekRoxy]: { aspectRatio: "4267 / 863", objectPosition: "50% 43.8%" },
  [pharmacies.apotekSarika]: { aspectRatio: "4267 / 3914", objectPosition: "50% 64.3%" },
  [pharmacies.apotekku]: { aspectRatio: "4267 / 1421", objectPosition: "50% 39.6%" },
  [pharmacies.asiaSusu]: { aspectRatio: "4267 / 2564", objectPosition: "50% 50.6%" },
  [pharmacies.bormaToserba]: { aspectRatio: "4267 / 1767", objectPosition: "50% 46.3%" },
  [pharmacies.istanaSusu]: { aspectRatio: "4267 / 1766", objectPosition: "50% 43.1%" },
  [pharmacies.lapakSusuStore]: { aspectRatio: "4267 / 3214", objectPosition: "50% 46.1%" },
};

export function FramedLogo({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const frame = logoFrames[src];

  return (
    <img
      src={src}
      alt={alt}
      className={`h-auto w-auto object-contain ${className}`}
      style={frame ? { ...frame, objectFit: "cover" } : undefined}
    />
  );
}
