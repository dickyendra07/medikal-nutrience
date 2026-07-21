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
  age: string;
  gender: "male" | "female" | "";
  whatsapp: string;
  educationConsent: boolean;
  communicationConsent: boolean;
};

const steps = [
  "purpose",
  "condition",
  "question",
  "lead",
  "result",
] as const;

type Step = (typeof steps)[number];

export function AssessmentModal({
  isOpen,
  onClose,
  initialFlowKey,
}: AssessmentModalProps) {
  const [step, setStep] = useState<Step>("purpose");

  const [purpose, setPurpose] = useState(
    initialFlowKey ?? ""
  );

  const [condition, setCondition] = useState("");

  const [answer, setAnswer] = useState("");

  const [leadForm, setLeadForm] = useState<LeadForm>({
    name: "",
    age: "",
    gender: "",
    whatsapp: "",
    educationConsent: false,
    communicationConsent: false,
  });

  const recommendation = useMemo(() => {
    return getAssessmentRecommendation(
      condition,
      answer
    );
  }, [condition, answer]);


  if (!isOpen) {
    return null;
  }


  const reset = () => {
    setStep("purpose");
    setPurpose(initialFlowKey ?? "");
    setCondition("");
    setAnswer("");

    setLeadForm({
      name: "",
      age: "",
      gender: "",
      whatsapp: "",
      educationConsent:false,
      communicationConsent:false,
    });
  };


  const close = () => {
    reset();
    onClose();
  };


  const updateLead = (
    key: keyof LeadForm,
    value: string | boolean
  ) => {
    setLeadForm((current)=>({
      ...current,
      [key]:value,
    }));
  };


  const submitLead = async () => {

    const payload: AssessmentLeadPayload = {
      purpose,
      condition,
      answers:{
        answer,
      },
      recommendation,
      lead:leadForm,
      createdAt:new Date().toISOString(),
    };


    try {

      await fetch("/api/leads",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(payload),
      });

    } catch(error){

      console.error(
        "Assessment lead error",
        error
      );

    }


    setStep("result");
  };


  const progress =
    ((steps.indexOf(step)+1) /
      steps.length) * 100;


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-md">

      <button
        onClick={close}
        className="absolute inset-0"
      />


      <div className="
        relative
        w-full
        max-w-5xl
        overflow-hidden
        rounded-[3rem]
        bg-white
        shadow-2xl
      ">


        <div className="h-2 bg-slate-100">
          <div
            className="
              h-full
              bg-[#006b3f]
              transition-all
            "
            style={{
              width:`${progress}%`
            }}
          />
        </div>


        <button
          onClick={close}
          className="
            absolute
            right-6
            top-6
            z-10
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-[#e4f8ed]
            text-[#006b3f]
            font-black
          "
        >
          ×
        </button>



        <div className="grid md:grid-cols-2">


          <div className="
            hidden
            bg-gradient-to-br
            from-[#006b3f]
            to-[#10b981]
            p-12
            text-white
            md:block
          ">

            <p className="
              text-xs
              font-black
              tracking-[0.3em]
            ">
              ASSESSMENT
            </p>


            <h2 className="
              mt-8
              text-5xl
              font-black
              leading-tight
            ">
              Temukan Nutrisi
              Yang Tepat
              Untuk Anda
            </h2>


            <p className="
              mt-6
              leading-8
              text-white/80
            ">
              Jawab beberapa pertanyaan
              singkat untuk mendapatkan
              rekomendasi nutrisi yang
              lebih personal.
            </p>


          </div>



          <div className="p-8 md:p-12">


            {step==="purpose" && (
<>
<p className="text-xs font-black tracking-[0.3em] text-[#006b3f]">
LANGKAH 1 / 4
</p>

<h1 className="
mt-4
text-4xl
font-black
leading-tight
text-slate-900
">
Apa kebutuhan utama Anda?
</h1>

<p className="mt-4 text-sm leading-7 text-slate-500">
Pilih tujuan assessment agar kami dapat memberikan rekomendasi nutrisi yang lebih sesuai.
</p>


<div className="
mt-8
grid
gap-5
">

{assessmentPurposeOptions.map((item:any)=>(

<button
key={item.value}
onClick={()=>{
setPurpose(item.value);
setStep("condition");
}}

className="
group
rounded-[2rem]
border
border-slate-200
bg-white
p-6
text-left
transition-all
duration-300
hover:-translate-y-1
hover:border-[#006b3f]
hover:bg-[#f4fbf7]
hover:shadow-xl
"
>

<div className="
flex
h-16
w-16
items-center
justify-center
rounded-2xl
bg-[#e4f8ed]
text-[#006b3f]
transition
group-hover:scale-110
">

<AssessmentIcon name={item.icon}/>

</div>


<h3 className="
mt-5
text-xl
font-black
text-slate-900
">
{item.label}
</h3>


<p className="
mt-2
text-sm
leading-6
text-slate-500
">
{item.description}
</p>


</button>

))}

</div>

</>
)}

{step==="condition" && (
<>

<p className="text-xs font-black tracking-[0.3em] text-[#006b3f]">
LANGKAH 2 / 4
</p>


<h1 className="
mt-4
text-4xl
font-black
leading-tight
text-slate-900
">
Pilih kondisi kesehatan Anda
</h1>


<p className="mt-4 text-sm leading-7 text-slate-500">
Kami akan menyesuaikan rekomendasi berdasarkan kebutuhan nutrisi Anda.
</p>


<div className="
mt-8
grid
grid-cols-1
gap-5
sm:grid-cols-2
">


{healthConditions.map((item:any)=>(

<button
key={item.value}
onClick={()=>{
setCondition(item.value);
setStep("question");
}}

className="
group
rounded-[2rem]
border
border-slate-200
bg-white
p-6
text-left
transition-all
duration-300
hover:-translate-y-1
hover:border-[#006b3f]
hover:bg-[#f4fbf7]
hover:shadow-xl
"
>


<div className="
flex
h-16
w-16
items-center
justify-center
rounded-2xl
bg-[#e4f8ed]
text-[#006b3f]
transition
group-hover:scale-110
">

<AssessmentIcon name={item.icon}/>

</div>


<h3 className="
mt-5
text-xl
font-black
text-slate-900
">
{item.label}
</h3>


<p className="
mt-2
text-sm
leading-6
text-slate-500
">
{item.description}
</p>


</button>

))}

</div>

</>
)}

{step==="question" && (
              <>
                <p className="text-xs font-black tracking-widest text-[#006b3f]">
                  LANGKAH 3
                </p>

                <h1 className="
                  mt-4
                  text-4xl
                  font-black
                ">
                  {
                    assessmentQuestions[
                      condition as keyof typeof assessmentQuestions
                    ]?.title
                  }
                </h1>


                <div className="mt-8 space-y-4">

                  {
                    assessmentQuestions[
                      condition as keyof typeof assessmentQuestions
                    ]?.options.map((option: { label: string; value: string }) => (
                      <button
                        key={option.value}
                        onClick={()=>{
                          setAnswer(option.value);
                          setStep("lead");
                        }}
                        className="
                          w-full
                          rounded-2xl
                          border
                          p-5
                          text-left
                          font-bold
                          transition
                          hover:border-[#006b3f]
                          hover:bg-[#e4f8ed]
                        "
                      >
                        {option.label}
                      </button>
                    ))
                  }

                </div>

              </>
            )}



            {step==="lead" && (

              <div>

                <p className="text-xs font-black tracking-widest text-[#006b3f]">
                  LANGKAH 4
                </p>


                <h1 className="mt-4 text-4xl font-black">
                  Dapatkan rekomendasi Anda
                </h1>


                <div className="mt-6 space-y-4">

                  <input
                    placeholder="Nama"
                    className="w-full rounded-2xl border p-4"
                    onChange={(e)=>updateLead("name",e.target.value)}
                  />

                  <input
                    placeholder="WhatsApp"
                    className="w-full rounded-2xl border p-4"
                    onChange={(e)=>updateLead("whatsapp",e.target.value)}
                  />

                </div>


                <button
                  onClick={submitLead}
                  className="
                    mt-8
                    w-full
                    rounded-full
                    bg-[#006b3f]
                    px-8
                    py-4
                    font-black
                    text-white
                  "
                >
                  Lihat Rekomendasi
                </button>


              </div>

            )}




            {step==="result" && (

              <div>

                <p className="text-xs font-black tracking-widest text-[#006b3f]">
                  HASIL ASSESSMENT
                </p>


                <h1 className="mt-5 text-5xl font-black">
                  {recommendation.product}
                </h1>


                <p className="mt-5 text-lg text-slate-600">
                  {recommendation.note}
                </p>


                <p className="
                  mt-8
                  rounded-2xl
                  bg-[#f1f8f4]
                  p-5
                  text-sm
                ">
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
