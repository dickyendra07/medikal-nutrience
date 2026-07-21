type AssessmentIconProps = {
  name: string;
  className?: string;
};

export function AssessmentIcon({
  name,
  className = "",
}: AssessmentIconProps) {
  const common = {
    className: `h-12 w-12 ${className}`,
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "kidney") {
    return (
      <svg {...common}>
        <path d="M27 12c-10 0-17 8-17 19 0 12 7 21 17 21 8 0 13-6 13-15V24c0-7-5-12-13-12Z" />
        <path d="M37 12c10 0 17 8 17 19 0 12-7 21-17 21-8 0-13-6-13-15V24c0-7 5-12 13-12Z" />
        <path d="M32 20v24" />
      </svg>
    );
  }

  if (name === "liver") {
    return (
      <svg {...common}>
        <path d="M8 34c9-16 29-20 48-12-2 18-14 28-31 28H13c-5 0-7-7-5-16Z" />
        <path d="M31 30c6 1 11 4 15 9" />
      </svg>
    );
  }

  if (name === "lung") {
    return (
      <svg {...common}>
        <path d="M31 12v18" />
        <path d="M31 30c-5-11-10-16-16-16-5 0-8 5-8 12v15c0 7 5 11 11 11 8 0 13-6 13-14Z" />
        <path d="M33 30c5-11 10-16 16-16 5 0 8 5 8 12v15c0 7-5 11-11 11-8 0-13-6-13-14Z" />
      </svg>
    );
  }

  if (name === "digestive") {
    return (
      <svg {...common}>
        <path d="M24 10v14c0 5 4 8 8 8s8-3 8-8V10" />
        <path d="M32 32c-8 0-14 6-14 14s6 8 14 8 14-4 14-10c0-6-5-10-10-10" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg {...common}>
        <path d="M32 8 52 16v14c0 14-9 22-20 27C21 52 12 44 12 30V16Z" />
        <path d="m23 32 6 6 12-14" />
      </svg>
    );
  }

  if (name === "medical") {
    return (
      <svg {...common}>
        <circle cx="32" cy="32" r="24" />
        <path d="M32 18v28" />
        <path d="M18 32h28" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M32 54S10 40 10 24c0-8 6-14 14-14 5 0 8 3 8 8 0-5 4-8 9-8 8 0 13 6 13 14 0 16-22 30-22 30Z" />
    </svg>
  );
}
