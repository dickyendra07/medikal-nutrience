type FaqIconProps = {
  name: string;
  className?: string;
};


const iconStyle = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};


export function FaqIcon({
  name,
  className = "",
}: FaqIconProps) {


  if (name === "building") {
    return (
      <svg
        viewBox="0 0 48 48"
        className={className}
        {...iconStyle}
      >
        <path d="M8 42h32" />
        <path d="M12 42V14l12-6 12 6v28" />
        <path d="M18 20h2" />
        <path d="M28 20h2" />
        <path d="M18 28h2" />
        <path d="M28 28h2" />
      </svg>
    );
  }


  if (name === "product") {
    return (
      <svg
        viewBox="0 0 48 48"
        className={className}
        {...iconStyle}
      >
        <path d="M18 8h12" />
        <path d="M20 8v6l-8 8v18c0 2 2 3 4 3h16c2 0 4-1 4-3V22l-8-8V8" />
        <path d="M16 28h16" />
      </svg>
    );
  }


  if (name === "target") {
    return (
      <svg
        viewBox="0 0 48 48"
        className={className}
        {...iconStyle}
      >
        <circle cx="24" cy="24" r="16" />
        <circle cx="24" cy="24" r="8" />
        <circle cx="24" cy="24" r="2" />
      </svg>
    );
  }


  if (name === "medical") {
    return (
      <svg
        viewBox="0 0 48 48"
        className={className}
        {...iconStyle}
      >
        <path d="M24 8v32" />
        <path d="M8 24h32" />
        <rect
          x="10"
          y="10"
          width="28"
          height="28"
          rx="8"
        />
      </svg>
    );
  }


  if (name === "package") {
    return (
      <svg
        viewBox="0 0 48 48"
        className={className}
        {...iconStyle}
      >
        <path d="M8 16 24 8l16 8v20l-16 8-16-8V16Z" />
        <path d="m8 16 16 8 16-8" />
        <path d="M24 24v20" />
      </svg>
    );
  }


  if (name === "shopping") {
    return (
      <svg
        viewBox="0 0 48 48"
        className={className}
        {...iconStyle}
      >
        <path d="M10 16h28l-3 24H13l-3-24Z" />
        <path d="M18 16a6 6 0 0 1 12 0" />
      </svg>
    );
  }


  if (name === "chat") {
    return (
      <svg
        viewBox="0 0 48 48"
        className={className}
        {...iconStyle}
      >
        <path d="M10 12h28v20H22l-8 8v-8h-4V12Z" />
        <path d="M18 20h12" />
        <path d="M18 26h8" />
      </svg>
    );
  }


  if (name === "book") {
    return (
      <svg
        viewBox="0 0 48 48"
        className={className}
        {...iconStyle}
      >
        <path d="M8 10h14c4 0 6 2 6 6v24c0-4-2-6-6-6H8V10Z" />
        <path d="M40 10H26c-4 0-6 2-6 6v24c0-4 2-6 6-6h14V10Z" />
      </svg>
    );
  }


  if (name === "calendar") {
    return (
      <svg
        viewBox="0 0 48 48"
        className={className}
        {...iconStyle}
      >
        <rect
          x="8"
          y="10"
          width="32"
          height="30"
          rx="5"
        />
        <path d="M16 6v8" />
        <path d="M32 6v8" />
        <path d="M8 20h32" />
      </svg>
    );
  }


  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      {...iconStyle}
    >
      <circle cx="24" cy="24" r="16" />
    </svg>
  );
}
