"use client";

import Link from "next/link";
import type { AssessmentResult as AssessmentResultType } from "@/data/assessment";

type Props = {
  recommendation: AssessmentResultType;
};


export function AssessmentResult({
  recommendation,
}: Props) {


  const whatsappMessage = encodeURIComponent(
    `Halo Medikal Nutrience,

Saya mendapatkan rekomendasi ${recommendation.product} dari Nutrition Assessment.

Saya ingin konsultasi lebih lanjut.`
  );


  return (
    <div className="space-y-7">


      <div>
        <p className="
          text-xs
          font-black
          tracking-[0.3em]
          text-[#006b3f]
        ">
          HASIL ASSESSMENT
        </p>

        <h2 className="
          mt-3
          text-4xl
          font-black
          text-slate-900
        ">
          Nutrisi Yang Sesuai Untuk Anda
        </h2>
      </div>



      <div className="
        relative
        flex
        justify-center
        rounded-[2.5rem]
        bg-gradient-to-br
        from-[#f4fbf7]
        to-[#e4f8ed]
        p-8
        overflow-hidden
      ">

        <div className="
          absolute
          inset-0
          bg-[#006b3f]/5
          blur-3xl
        "/>


        <img
          src={recommendation.image}
          alt={recommendation.product}
          className="
            relative
            z-10
            h-72
            object-contain
            drop-shadow-2xl
            animate-[float_3s_ease-in-out_infinite]
          "
        />

      </div>




      <div>

        <h3 className="
          text-4xl
          font-black
          text-[#006b3f]
        ">
          {recommendation.product}
        </h3>


        <p className="
          mt-3
          text-sm
          leading-7
          text-slate-600
        ">
          {recommendation.note}
        </p>

      </div>




      <div className="space-y-3">

        {recommendation.benefits.map((benefit)=>(
          <div
            key={benefit}
            className="
              rounded-2xl
              bg-[#f4f8f6]
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




      <div className="
        grid
        grid-cols-2
        gap-3
      ">

        <Link
          href={recommendation.ctaUrl}
          className="
            rounded-full
            bg-[#006b3f]
            px-5
            py-4
            text-center
            text-sm
            font-black
            text-white
          "
        >
          Detail Produk
        </Link>



        <a
          href={`https://wa.me/?text=${whatsappMessage}`}
          target="_blank"
          className="
            rounded-full
            border
            border-[#006b3f]
            px-5
            py-4
            text-center
            text-sm
            font-black
            text-[#006b3f]
          "
        >
          WhatsApp
        </a>


      </div>


    </div>
  );
}
