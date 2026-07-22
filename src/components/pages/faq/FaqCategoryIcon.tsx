type Props = {
  name: string;
  className?: string;
};

export function FaqCategoryIcon({
  name,
  className = "h-7 w-7",
}: Props) {

  const common = {
    fill:"none",
    stroke:"currentColor",
    strokeWidth:2,
    strokeLinecap:"round" as const,
    strokeLinejoin:"round" as const,
    className,
  };


  if(name==="grid"){
    return (
      <svg viewBox="0 0 48 48" {...common}>
        <rect x="7" y="7" width="14" height="14" rx="3"/>
        <rect x="27" y="7" width="14" height="14" rx="3"/>
        <rect x="7" y="27" width="14" height="14" rx="3"/>
        <rect x="27" y="27" width="14" height="14" rx="3"/>
      </svg>
    );
  }


  if(name==="building"){
    return (
      <svg viewBox="0 0 48 48" {...common}>
        <path d="M10 40V18l14-8 14 8v22"/>
        <path d="M18 40V26h12v14"/>
        <path d="M18 20h2"/>
        <path d="M28 20h2"/>
      </svg>
    );
  }


  if(name==="product" || name==="package"){
    return (
      <svg viewBox="0 0 48 48" {...common}>
        <path d="M8 16 24 8l16 8-16 8-16-8Z"/>
        <path d="M8 16v18l16 8 16-8V16"/>
        <path d="M24 24v18"/>
      </svg>
    );
  }


  if(name==="target"){
    return (
      <svg viewBox="0 0 48 48" {...common}>
        <circle cx="24" cy="24" r="16"/>
        <circle cx="24" cy="24" r="8"/>
        <circle cx="24" cy="24" r="2"/>
      </svg>
    );
  }


  if(name==="medical"){
    return (
      <svg viewBox="0 0 48 48" {...common}>
        <path d="M24 42s16-10 16-22c0-7-5-12-11-12-3 0-5 2-5 5-1-3-3-5-6-5-6 0-11 5-11 12 0 12 17 22 17 22Z"/>
        <path d="M24 18v12"/>
        <path d="M18 24h12"/>
      </svg>
    );
  }


  if(name==="shopping"){
    return (
      <svg viewBox="0 0 48 48" {...common}>
        <path d="M8 12h5l4 22h18l4-16H15"/>
        <circle cx="20" cy="40" r="2"/>
        <circle cx="34" cy="40" r="2"/>
      </svg>
    );
  }


  if(name==="chat"){
    return (
      <svg viewBox="0 0 48 48" {...common}>
        <path d="M8 12h32v22H18l-10 8V12Z"/>
        <path d="M16 22h16"/>
        <path d="M16 28h10"/>
      </svg>
    );
  }


  if(name==="book"){
    return (
      <svg viewBox="0 0 48 48" {...common}>
        <path d="M8 10h12c5 0 8 3 8 8v22c0-5-3-8-8-8H8V10Z"/>
        <path d="M40 10H28c-5 0-8 3-8 8"/>
      </svg>
    );
  }


  if(name==="calendar"){
    return (
      <svg viewBox="0 0 48 48" {...common}>
        <rect x="8" y="10" width="32" height="30" rx="5"/>
        <path d="M8 20h32"/>
        <path d="M16 6v8"/>
        <path d="M32 6v8"/>
      </svg>
    );
  }


  return (
    <svg viewBox="0 0 48 48" {...common}>
      <circle cx="24" cy="24" r="16"/>
    </svg>
  );
}
