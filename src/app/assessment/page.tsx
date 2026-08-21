import type { Metadata } from "next";

import { AssessmentFlow } from "@/components/assessment/AssessmentFlow";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: { absolute: "Assessment Nutrisi | Medikal Nutrience" },
  description:
    "Jawab beberapa pertanyaan untuk mendapatkan arahan awal pilihan nutrisi Medikal Nutrience.",
};

export default function AssessmentPage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden bg-[#f4fbf8] px-5 py-12 md:py-18 lg:px-10">
        <div className="absolute -left-48 -top-48 h-[30rem] w-[30rem] rounded-full bg-[#d9f3e8]" />
        <div className="absolute -bottom-52 -right-36 h-[32rem] w-[32rem] rounded-full bg-[#c6f1df]" />
        <div className="relative mx-auto grid w-full max-w-[1200px] overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-green-900/10 ring-1 ring-black/5 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="hidden bg-gradient-to-br from-[#004b34] via-[#006b3f] to-[#10b981] p-8 text-white lg:block lg:p-12">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-white/70">Assessment Nutrisi</p>
            <h1 className="mt-6 text-4xl font-black leading-tight md:text-5xl">
              Pertanyaan yang mengikuti kebutuhan Anda.
            </h1>
            <p className="mt-5 max-w-md text-sm font-medium leading-7 text-white/80 md:text-base md:leading-8">
              Setiap pilihan membuka pertanyaan lanjutan yang berbeda agar hasil lebih relevan dengan tujuan, kondisi, dan kebutuhan Anda.
            </p>
          </aside>
          <section className="min-w-0 p-6 sm:p-8 md:p-10 lg:p-12">
            <AssessmentFlow />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
