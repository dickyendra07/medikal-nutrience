"use client";

import type { CSSProperties } from "react";
import { useCallback, useRef, useState } from "react";
import { getPurchaseLinks } from "@/data/purchase-urls";
import { PurchaseMarketplaceModal } from "@/components/pages/product-detail/PurchaseMarketplaceModal";

type PurchaseButtonProps = {
  productName: string;
  productSlug: string;
  className: string;
  style?: CSSProperties;
  showArrow?: boolean;
};

export function PurchaseButton({
  productName,
  productSlug,
  className,
  style,
  showArrow = false,
}: PurchaseButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const purchaseLinks = getPurchaseLinks(productSlug);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  if (purchaseLinks.length === 0) return null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className={`${className} focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#006b3f]/20`}
        style={style}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        Beli Sekarang
        {showArrow ? <span aria-hidden="true">→</span> : null}
      </button>

      <PurchaseMarketplaceModal
        isOpen={isOpen}
        onClose={closeModal}
        productName={productName}
        purchaseLinks={purchaseLinks}
      />
    </>
  );
}
