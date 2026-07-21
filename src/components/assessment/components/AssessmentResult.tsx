"use client";

import Link from "next/link";
import type { AssessmentResult as AssessmentResultType } from "@/data/assessment";

type Props = {
  recommendation: AssessmentResultType;
};


export function AssessmentResult({
  recommendation,
}: Props) {

  const whatsappMessage =
    `Halo, saya mendapatkan rekomendasi nutrisi ${recommendation.product} dari Assessment Medikal Nutrience. Saya ingin konsultasi lebih lanjut.`;

  const whatsappUrl =
    `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;


  return (
    <div className="
      space-y-8
      animate-in
      fade-in
      duration-500
    ">


      <div>

        <p className="
          text-xs
          font-black
          tracking-[0.3em]
          text-[#006b3f]
        ">
          ✓ REKOMENDASI UNTUK ANDA
        </p>


        <h2 className="
          mt-4
          text-4xl
          font-black
          leading-tight
          text-slate-900
        ">
          Nutrisi yang Sesuai
          Dengan Kebutuhan Anda
        </h2>

      </div>



      <div className="
        relative
        flex
        justify-center
        overflow-hidden
        rounded-[2.5rem]
        bg-gradient-to-br
        from-[#f4fbf7]
        to-white
        p-8
      ">

        <img
          src={recommendation.image}
          alt={recommendation.product}
          className="
            h-80
            object-contain
            drop-shadow-2xl
            transition
            duration-500
            hover:scale-105
          "
        />

      </div>




      <div>

        <h3 className="
          text-3xl
          font-black
          text-[#006b3f]
        ">
          {recommendation.product}
        </h3>


        <p className="
          mt-3
          text-sm
          leading-7
          text-slate-500
        ">
          {recommendation.note}
        </p>

      </div>




      <div className="
        space-y-3
      ">


        {recommendation.benefits.map((benefit)=>(
          <div
            key={benefit}
            className="
              rounded-2xl
              bg-[#f4fbf7]
              px-5
              py-4
              text-sm
              font-bold
              text-slate-700
            "
          >

            <span className="
              text-[#006b3f]
            ">
              ✓
            </span>

            {" "}
            {benefit}

          </div>
        ))}


      </div>




      <div className="
        grid
        gap-3
        sm:grid-cols-2
      ">


        <Link
          href={recommendation.ctaUrl}
          className="
            rounded-full
            bg-[#006b3f]
            px-8
            py-4
            text-center
            text-sm
            font-black
            text-white
            transition
            hover:bg-[#004b34]
          "
        >
          Detail Produk
        </Link>



        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="
            rounded-full
            border
            border-[#006b3f]
            px-8
            py-4
            text-center
            text-sm
            font-black
            text-[#006b3f]
            transition
            hover:bg-[#e4f8ed]
          "
        >
          Konsultasi WhatsApp
        </a>


      </div>




      <div className="
        rounded-2xl
        bg-[#f1f8f4]
        p-5
        text-xs
        leading-6
        text-slate-500
      ">
        Rekomendasi ini bersifat informasi awal dan tidak menggantikan diagnosis,
        saran medis, atau konsultasi langsung dengan dokter maupun ahli gizi.
      </div>


    </div>
  );
}
