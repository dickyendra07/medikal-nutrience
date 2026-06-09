type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className = "h-12 w-auto" }: BrandLogoProps) {
  return (
    <img
      src="/images/brand/medikal-nutrience-logo.png"
      alt="Medikal Nutrience"
      className={className}
    />
  );
}
