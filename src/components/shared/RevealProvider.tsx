"use client";

import { useEffect } from "react";

export function RevealProvider() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".reveal, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale"
      )
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            element.classList.add("is-visible");
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
