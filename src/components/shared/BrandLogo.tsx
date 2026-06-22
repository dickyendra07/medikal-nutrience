type BrandLogoProps = {
  className?: string;
  variant?: "default" | "light";
};

export function BrandLogo({
  className = "h-12 w-auto",
  variant = "default",
}: BrandLogoProps) {
  return (
    <img
      src="/images/mednut/brand/logo-medikal-nutrience.png"
      alt="Medikal Nutrience"
      className={`${className} ${variant === "light" ? "brightness-0 invert" : ""}`}
    />
  );
}
