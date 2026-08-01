type AssessmentIconProps = {
  name: string;
  className?: string;
};

const homepageConditionIcons: Record<string, string> = {
  kidney: "/images/mednut/solutions/icons/icon-ginjal.svg",
  liver: "/images/mednut/solutions/icons/icon-hati-liver.svg",
  lung: "/images/mednut/solutions/icons/icon-pernafasan.svg",
  digestive: "/images/mednut/solutions/icons/icon-pencernaan.svg",
};

export function AssessmentIcon({
  name,
  className = "",
}: AssessmentIconProps) {
  const homepageIcon = homepageConditionIcons[name];

  if (homepageIcon) {
    return (
      <img
        src={homepageIcon}
        alt=""
        aria-hidden="true"
        className={`h-9 w-9 object-contain [filter:brightness(0)_saturate(100%)_invert(23%)_sepia(97%)_saturate(798%)_hue-rotate(129deg)_brightness(91%)_contrast(101%)] ${className}`}
      />
    );
  }

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
