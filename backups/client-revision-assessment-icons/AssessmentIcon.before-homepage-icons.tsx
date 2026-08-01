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
    strokeWidth: 2.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };


  if (name === "child") {
    return (
      <svg {...common}>
        <circle cx="32" cy="20" r="9" />
        <path d="M17 54c2-12 9-18 15-18s13 6 15 18" />
        <path d="M24 38c-3 2-5 5-6 8" />
        <path d="M40 38c3 2 5 5 6 8" />
        <path d="M26 26c4 3 8 3 12 0" />
      </svg>
    );
  }


  if (name === "user" || name === "adult") {
    return (
      <svg {...common}>
        <circle cx="32" cy="18" r="10" />
        <path d="M15 54c2-13 9-20 17-20s15 7 17 20" />
        <path d="M23 37c5 4 13 4 18 0" />
      </svg>
    );
  }


  if (name === "kidney") {
    return (
      <svg {...common}>
        <path d="M27 10c-10 0-17 8-17 20 0 12 7 22 17 22 7 0 12-6 12-15V23c0-8-5-13-12-13Z" />
        <path d="M37 10c10 0 17 8 17 20 0 12-7 22-17 22-7 0-12-6-12-15V23c0-8 5-13 12-13Z" />
        <path d="M32 22v20" />
      </svg>
    );
  }


  if (name === "liver") {
    return (
      <svg {...common}>
        <path d="M9 35c9-18 29-23 46-13 0 18-13 29-30 29H14c-6 0-8-8-5-16Z" />
        <path d="M30 31c7 0 12 3 17 8" />
      </svg>
    );
  }


  if (name === "lung") {
    return (
      <svg {...common}>
        <path d="M32 12v18" />
        <path d="M29 30c-6-10-11-15-17-15-5 0-8 5-8 12v14c0 8 5 13 12 13 8 0 13-7 13-15Z" />
        <path d="M35 30c6-10 11-15 17-15 5 0 8 5 8 12v14c0 8-5 13-12 13-8 0-13-7-13-15Z" />
      </svg>
    );
  }


  if (name === "digestive") {
    return (
      <svg {...common}>
        <path d="M25 10v15c0 5 3 8 7 8s7-3 7-8V10" />
        <path d="M32 33c-10 0-15 7-15 15 0 5 5 8 15 8s15-4 15-10c0-7-6-13-15-13Z" />
      </svg>
    );
  }


  if (name === "shield") {
    return (
      <svg {...common}>
        <path d="M32 7 52 15v15c0 14-9 23-20 27C21 53 12 44 12 30V15Z" />
        <path d="m22 32 7 7 14-16" />
      </svg>
    );
  }


  if (name === "medical") {
    return (
      <svg {...common}>
        <circle cx="32" cy="32" r="23" />
        <path d="M32 20v24" />
        <path d="M20 32h24" />
      </svg>
    );
  }


  return (
    <svg {...common}>
      <circle cx="32" cy="32" r="20" />
      <path d="M32 22v20" />
      <path d="M22 32h20" />
    </svg>
  );
}
