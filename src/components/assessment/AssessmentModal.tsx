"use client";

import { useMemo, useState } from "react";
import {
  assessmentDisclaimer,
  assessmentPurposeOptions,
  healthConditions,
  assessmentQuestions,
  getAssessmentRecommendation,
  type AssessmentLeadPayload,
} from "@/data/assessment";

import { AssessmentIcon } from "@/components/assessment/components/AssessmentIcon";

type AssessmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialFlowKey?: string;
};

type LeadForm = {
  name: string;
  whatsapp: string;
};

const steps = [
  "purpose",
  "condition",
  "question",
  "lead",
  "loading",
  "result",
] as const;

type Step = (typeof steps)[number];

const productBenefits: Record<string, string[]> = {
  nephrisol: [
    "Mendukung kebutuhan nutrisi pada kondisi ginjal",
    "Membantu memenuhi kebutuhan energi harian",
  ],
  "nephrisol-d": [
    "Dirancang untuk kebutuhan pasien dialisis",
    "Mendukung pemenuhan nutrisi selama terapi",
  ],
  hepatosol: [
    "Mendukung kebutuhan nutrisi fungsi hati",
    "Membantu menjaga keseimbangan nutrisi",
  ],
  "hepatosol-lola": [
    "Untuk kebutuhan nutrisi hati yang lebih spesifik",
    "Mendukung kondisi dengan kebutuhan nutrisi khusus",
  ],
  pulmosol: [
    "Mendukung kebutuhan nutrisi sistem pernapasan",
    "Membantu memenuhi kebutuhan energi",
  ],
  oligo: [
    "Nutrisi yang mudah dicerna",
    "Mendukung kebutuhan nutrisi saluran cerna",
  ],
  entramix: [
    "Mendukung aktivitas harian",
    "Memenuhi kebutuhan nutrisi seimbang",
  ],
};

const productImages: Record<string, string> = {
  nephrisol:
    "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/NEPHRISOL/NEPHRISOL CAPPUCINO 1.png",

  "nephrisol-d":
    "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/NEPHRISOL-D/NEPHRISOL-D CAPPUCINO 1.png",

  hepatosol:
    "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/HEPATOSOL/HEPATOSOL VANILA 1.png",

  "hepatosol-lola":
    "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/HEPATOSOL LOLA/HEPATOSOL LOLA 1.png",

  pulmosol:
    "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/PULMOSOL/PULMOSOL 1.png",

  oligo:
    "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/OLIGO/OLIGO 1.png",

  entramix:
    "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/ENTRAMIX/ENTRAMIX VANILA 1.png",
};

export function AssessmentModal({
  isOpen,
  onClose,
  initialFlowKey,
}: AssessmentModalProps) {

  const [step,setStep] = useState<Step>("purpose");

  const [condition,setCondition] = useState("");
  const [answer,setAnswer] = useState("");

  const [leadForm,setLeadForm] = useState<LeadForm>({
    name:"",
    whatsapp:"",
  });


  const recommendation = useMemo(()=>{
    return getAssessmentRecommendation(
      condition,
      answer
    );
  },[condition,answer]);


  if(!isOpen) return null;


  const submitLead = async()=>{

    const payload: AssessmentLeadPayload = {
      purpose: initialFlowKey ?? "",
      condition,
      answers:{
        answer,
      },
      recommendation,
      lead:{
        ...leadForm,
        age:"",
        gender:"",
        educationConsent:true,
        communicationConsent:true,
      },
      createdAt:new Date().toISOString(),
    };


    try{
      await fetch("/api/leads",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(payload),
      });
    }catch(error){
      console.error(error);
    }


    setStep("loading");


    setTimeout(()=>{
      setStep("result");
    },1500);

  };


  const close = ()=>{
    setStep("purpose");
    setCondition("");
    setAnswer("");
    onClose();
  };


  const image =
    productImages[recommendation.productSlug];


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-md">

      <button
        onClick={close}
        className="absolute inset-0"
      />


      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[3rem] bg-white shadow-2xl">

        <button
          onClick={close}
          className="absolute right-6 top-6 z-20 h-10 w-10 rounded-full bg-[#e4f8ed] font-black text-[#006b3f]"
        >
          ×
        </button>


        <div className="grid md:grid-cols-2">


          <div className="hidden bg-gradient-to-br from-[#006b3f] to-[#10b981] p-12 text-white md:block">

            <p className="text-xs font-black tracking-[0.3em]">
              MEDIKAL NUTRIENCE
            </p>

            <h2 className="mt-8 text-5xl font-black leading-tight">
              Temukan Nutrisi Yang Tepat Untuk Anda
            </h2>

            <p className="mt-6 leading-8 text-white/80">
              Jawab beberapa pertanyaan untuk mendapatkan rekomendasi nutrisi personal.
            </p>

          </div>


          <div className="p-8 md:p-12">


          {step==="purpose" && (
            <>
              <p className="text-xs font-black text-[#006b3f]">
                LANGKAH 1
              </p>

              <h1 className="mt-4 text-4xl font-black">
                Apa kebutuhan utama Anda?
              </h1>

              <div className="mt-8 space-y-4">

              {assessmentPurposeOptions.map((item:any)=>(
                <button
                  key={item.value}
                  onClick={()=>setStep("condition")}
                  className="group w-full rounded-[2rem] border p-6 text-left hover:border-[#006b3f] hover:bg-[#f4fbf7]"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e4f8ed] text-[#006b3f]">
                    <AssessmentIcon name={item.icon}/>
                  </div>

                  <h3 className="mt-4 text-xl font-black">
                    {item.label}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {item.description}
                  </p>

                </button>
              ))}

              </div>
            </>
          )}



          {step==="condition" && (

            <>
            <h1 className="text-4xl font-black">
              Pilih kondisi kesehatan Anda
            </h1>


            <div className="mt-8 grid gap-4 sm:grid-cols-2">

            {healthConditions.map((item:any)=>(

              <button
                key={item.value}
                onClick={()=>{
                  setCondition(item.value);
                  setStep("question");
                }}
                className="rounded-2xl border p-5 text-left hover:border-[#006b3f]"
              >

                <AssessmentIcon name={item.icon}/>

                <h3 className="mt-3 font-black">
                  {item.label}
                </h3>

              </button>

            ))}

            </div>
            </>

          )}



          {step==="question" && (

            <>
            <h1 className="text-4xl font-black">
              {assessmentQuestions[condition as keyof typeof assessmentQuestions]?.title}
            </h1>


            <div className="mt-8 space-y-4">

            {assessmentQuestions[condition as keyof typeof assessmentQuestions]?.options.map(
              (option:{label:string;value:string})=>(

              <button
                key={option.value}
                onClick={()=>{
                  setAnswer(option.value);
                  setStep("lead");
                }}
                className="w-full rounded-2xl border p-5 text-left font-bold hover:border-[#006b3f]"
              >
                {option.label}
              </button>

            ))}

            </div>
            </>

          )}



          {step==="lead" && (

            <>
            <h1 className="text-4xl font-black">
              Dapatkan rekomendasi Anda
            </h1>


            <input
              placeholder="Nama"
              className="mt-6 w-full rounded-2xl border p-4"
              onChange={(e)=>setLeadForm({
                ...leadForm,
                name:e.target.value
              })}
            />


            <input
              placeholder="WhatsApp"
              className="mt-4 w-full rounded-2xl border p-4"
              onChange={(e)=>setLeadForm({
                ...leadForm,
                whatsapp:e.target.value
              })}
            />


            <button
              onClick={submitLead}
              className="mt-8 w-full rounded-full bg-[#006b3f] py-4 font-black text-white"
            >
              Lihat Rekomendasi
            </button>

            </>

          )}



          {step==="loading" && (

            <div className="flex flex-col items-center justify-center py-20 text-center">

              <div className="h-24 w-24 animate-spin rounded-full border-4 border-[#e4f8ed] border-t-[#006b3f]" />

              <h2 className="mt-8 text-3xl font-black">
                Menganalisa kebutuhan nutrisi Anda
              </h2>

              <p className="mt-4 text-slate-500">
                Kami sedang mencari rekomendasi terbaik untuk Anda.
              </p>

            </div>

          )}



          {step==="result" && (

            <div>

              <p className="text-xs font-black text-[#006b3f]">
                HASIL ASSESSMENT
              </p>


              <img
                src={image}
                alt={recommendation.product}
                className="mx-auto mt-6 h-56 object-contain"
              />


              <h1 className="mt-6 text-4xl font-black">
                {recommendation.product}
              </h1>


              <p className="mt-4 text-slate-600">
                {recommendation.note}
              </p>


              <div className="mt-6 space-y-3">

              {(productBenefits[recommendation.productSlug] ?? []).map(
                benefit=>(
                  <div
                    key={benefit}
                    className="rounded-2xl bg-[#f1f8f4] p-4 font-bold"
                  >
                    ✓ {benefit}
                  </div>
                )
              )}

              </div>


              <div className="mt-8 flex gap-3">

                <a
                  href={recommendation.ctaUrl}
                  className="flex-1 rounded-full bg-[#006b3f] py-4 text-center font-black text-white"
                >
                  Detail Produk
                </a>


                <a
                  href="https://wa.me/"
                  target="_blank"
                  className="flex-1 rounded-full border border-[#006b3f] py-4 text-center font-black text-[#006b3f]"
                >
                  WhatsApp
                </a>

              </div>


              <p className="mt-6 rounded-2xl bg-[#f1f8f4] p-4 text-xs text-slate-500">
                {assessmentDisclaimer}
              </p>


            </div>

          )}


          </div>

        </div>

      </div>

    </div>
  );
}
