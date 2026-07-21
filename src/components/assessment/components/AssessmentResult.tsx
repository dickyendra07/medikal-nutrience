"use client";

import Link from "next/link";
import type { AssessmentResult as AssessmentResultType } from "@/data/assessment";

type Props = {
  recommendation: AssessmentResultType;
};

export function AssessmentResult({
  recommendation,
}: Props) {
  return (
    <div className="space-y-8 text-center">

      <div>
        <p className="text-xs font-black tracking-[0.3em] text-[#006b3f]">
          HASIL ASSESSMENT
        </p>

        <h2 className="mt-4 text-4xl font-black leading-tight text-slate-900">
          Rekomendasi Nutrisi Anda
        </h2>
      </div>


      <div className="
        mx-auto
        flex
        max-w-sm
        justify-center
        rounded-[2.5rem]
        bg-[#f4fbf7]
        p-8
      ">
        <img
          src={recommendation.image}
          alt={recommendation.product}
          className="
            h-72
            object-contain
            drop-shadow-xl
          "
        />
      </div>


      <div>
        <h3 className="text-3xl font-black text-[#006b3f]">
          {recommendation.product}
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-500">
          {recommendation.note}
        </p>
      </div>


      <div className="grid gap-3 text-left">

        {recommendation.benefits.map((benefit)=>(
          <div
            key={benefit}
            className="
              rounded-2xl
              bg-[#f8fafc]
              px-5
              py-4
              text-sm
              font-bold
              text-slate-700
            "
          >
            ✓ {benefit}
          </div>
        ))}

      </div>


      <div className="grid gap-3">

        <Link
          href={recommendation.ctaUrl}
          className="
            rounded-full
            bg-[#006b3f]
            px-8
            py-4
            text-sm
            font-black
            text-white
            transition
            hover:bg-[#004b34]
          "
        >
          Lihat Detail Produk
        </Link>


        <a
          href="https://wa.me/"
          target="_blank"
          className="
            rounded-full
            border
            border-[#006b3f]
            px-8
            py-4
            text-sm
            font-black
            text-[#006b3f]
          "
        >
          Konsultasi WhatsApp
        </a>

      </div>

    </div>
  );
}
