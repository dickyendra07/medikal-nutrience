"use client";

import { useState } from "react";

export function ProductVariantSwitcher({
  color,
}: {
  color: string;
}) {

  const variants = [
    {
      name: "Vanila",
      image:
        "/images/mednut/products/packshots/entrakid-vanila-1.png",
    },
    {
      name: "Cokelat",
      image:
        "/images/mednut/products/packshots/entrakid-cokelat-1.png",
    },
  ];


  const [active, setActive] = useState(0);


  return (
    <div className="w-full max-w-[320px]">

      <div className="mb-5 flex gap-3">

        {variants.map((variant, index) => (

          <button
            key={variant.name}
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
          alt={`Entrakid ${variants[active].name}`}
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
