"use client";

import { useState } from "react";
import type { ProductVariant } from "@/data/product-nutrition";

export function ProductVariantSwitcher({
  color,
  variants,
}: {
  color: string;
  variants?: ProductVariant[];
}) {

  const [active, setActive] = useState(0);


  if (!variants || variants.length === 0) {
    return null;
  }


  if (variants.length === 1) {
    return (
      <div className="flex justify-center">
        <img
          src={variants[0].image}
          alt={variants[0].name}
          className="
            h-auto
            w-[230px]
            object-contain
            drop-shadow-2xl
          "
        />
      </div>
    );
  }


  return (
    <div className="w-full max-w-[320px]">

      <div className="mb-5 flex gap-3">

        {variants.map((variant, index) => (

          <button
            key={`${variant.name}-${index}`}
            onClick={() => setActive(index)}
            className="
              flex-1
              rounded-full
              px-5
              py-3
              text-sm
              font-black
              transition
            "
            style={{
              backgroundColor:
                active === index ? color : "#ffffff",

              color:
                active === index ? "#ffffff" : "#374151",

              boxShadow:
                "0 8px 20px rgba(0,0,0,0.08)",
            }}
          >
            {variant.name}

          </button>

        ))}

      </div>


      <div className="relative flex justify-center">

        <div
          className="
            absolute
            h-[220px]
            w-[220px]
            rounded-full
            opacity-20
            blur-xl
          "
          style={{
            backgroundColor: color,
          }}
        />


        <img
          src={variants[active].image}
          alt={variants[active].name}
          className="
            relative
            z-10
            h-auto
            w-[230px]
            object-contain
            drop-shadow-2xl
            transition
            duration-500
          "
        />

      </div>


    </div>
  );
}
