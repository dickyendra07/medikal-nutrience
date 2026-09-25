"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function RevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".reveal, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale"
      )
    );

    if (!elements.length) return;

    const revealRatio = 0.15;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          const rootHeight = entry.rootBounds?.height ?? window.innerHeight;
          // Blocks taller than rootHeight / revealRatio (e.g. long stacked lists
          // on mobile) can never reach the ratio, so reveal them on first entry.
          const isTallerThanRatioAllows =
            entry.boundingClientRect.height * revealRatio > rootHeight;

          if (
            entry.isIntersecting &&
            (entry.intersectionRatio >= revealRatio || isTallerThanRatioAllows)
          ) {
            element.classList.add("is-visible");
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: [0, revealRatio],
        rootMargin: "0px 0px -8% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
