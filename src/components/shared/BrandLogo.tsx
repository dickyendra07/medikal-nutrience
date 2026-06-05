type BrandLogoProps = {
  variant?: "dark" | "light";
};

export function BrandLogo({ variant = "dark" }: BrandLogoProps) {
  return (
    <div className="flex items-center">
      <img
        src="/images/brand/medikal-nutrience-logo.png"
        alt="Medikal Nutrience"
        className={`h-10 w-auto object-contain md:h-12 ${
          variant === "light" ? "brightness-0 invert" : ""
        }`}
      />
    </div>
  );
}
