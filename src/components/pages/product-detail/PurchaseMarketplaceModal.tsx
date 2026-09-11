"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import {
  marketplaceRegistry,
  type MarketplacePurchaseLink,
} from "@/data/purchase-urls";

type PurchaseMarketplaceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  purchaseLinks: readonly MarketplacePurchaseLink[];
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function PurchaseMarketplaceModal({
  isOpen,
  onClose,
  productName,
  purchaseLinks,
}: PurchaseMarketplaceModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const backgroundElements = Array.from(document.body.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && element !== backdropRef.current,
    );
    const previousInertStates = backgroundElements.map((element) => ({
      element,
      inert: element.inert,
    }));

    document.body.style.overflow = "hidden";
    backgroundElements.forEach((element) => {
      element.inert = true;
    });
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute("disabled"));

      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      previousInertStates.forEach(({ element, inert }) => {
        element.inert = inert;
      });
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || purchaseLinks.length === 0) return null;

  return createPortal(
    <div
      ref={backdropRef}
      className="purchase-modal-backdrop fixed inset-0 z-[150] flex items-end justify-center bg-[#0f172a]/55 px-4 py-5 backdrop-blur-md md:items-center md:px-6 md:py-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="purchase-modal-panel relative max-h-[calc(100dvh-2.5rem)] w-full max-w-[52rem] overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-950/20 ring-1 ring-black/5 md:max-h-[calc(100dvh-4rem)] md:p-9"
      >
        <div className="flex items-start justify-between gap-5 md:gap-8">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#006b3f]">
              Beli Produk
            </p>
            <h2
              id={titleId}
              className="mt-3 text-3xl font-black leading-tight text-[#111827] md:text-5xl"
            >
              Pilih E-Commerce Pilihan Anda
            </h2>
            <p
              id={descriptionId}
              className="mt-3 max-w-2xl text-sm font-medium leading-7 text-[#64748b] md:text-base"
            >
              Pilih platform e-commerce untuk membeli {productName} melalui
              toko resmi kami.
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e4f8ed] text-xl font-black text-[#006b3f] transition hover:bg-[#006b3f] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#006b3f]/20"
            aria-label="Tutup pilihan e-commerce"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div
          className={`mt-7 grid gap-4 ${
            purchaseLinks.length > 1 ? "md:grid-cols-2" : ""
          }`}
        >
          {purchaseLinks.map((link, index) => {
            const marketplace = marketplaceRegistry[link.marketplace];

            return (
              <a
                key={link.marketplace}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="purchase-marketplace-card group flex min-w-0 flex-col rounded-[1.5rem] bg-[#f8fcfa] p-5 ring-1 ring-black/5 transition duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-green-900/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#006b3f]/20 md:p-6"
                style={{ animationDelay: `${80 + index * 55}ms` }}
                aria-label={`${marketplace.ctaLabel} — ${productName} (buka tab baru)`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-sm ring-1 ring-black/5">
                    <Image
                      src={marketplace.icon}
                      alt=""
                      width={48}
                      height={48}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-black text-[#111827]">
                      {marketplace.label}
                    </h3>
                    <p className="mt-1 text-sm font-medium leading-6 text-[#64748b]">
                      Beli {productName} melalui {marketplace.label}
                    </p>
                  </div>
                </div>

                <p
                  className="mt-5 inline-flex items-center gap-2 text-sm font-black"
                  style={{ color: marketplace.brandColor }}
                >
                  {marketplace.ctaLabel}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
}
