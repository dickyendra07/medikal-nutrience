"use client";

import { useMemo, useState } from "react";

import {
  assessmentDisclaimer,
  assessmentPurposeOptions,
  healthConditions,
  healthTargetOptions,
  assessmentQuestions,
  getAssessmentRecommendation,
  type AssessmentLeadPayload,
} from "@/data/assessment";


import { AssessmentIcon } from "@/components/assessment/components/AssessmentIcon";
import { AssessmentProgress } from "@/components/assessment/components/AssessmentProgress";
import { AssessmentOptionCard } from "@/components/assessment/components/AssessmentOptionCard";
import { AssessmentResultCard } from "@/components/assessment/components/AssessmentResultCard";
import { AssessmentLoading } from "@/components/assessment/components/AssessmentLoading";


type AssessmentModalProps = {
  isOpen:boolean;
  onClose:()=>void;
  initialFlowKey?:string;
};


type LeadForm = {
  name:string;
  whatsapp:string;
};


const steps = [
  "purpose",
  "condition",
  "target",
  "question",
  "lead",
  "loading",
  "result",
] as const;


type Step = typeof steps[number];


const productImages:Record<string,string> = {

entrakid:
"/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/ENTRAKID/ENTRAKID VANILA 1.png",

entramix:
"/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/ENTRAMIX/ENTRAMIX VANILA 1.png",

entrasoy:
"/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/ENTRASOY PACKSHOOT/ENTRASOY.png",

peptisol:
"/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/PEPTISOL/Peptisol Vanila 1.png",

nephrisol:
"/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/NEPHRISOL/NEPHRISOL CAPPUCINO 1.png",

"nephrisol-d":
"/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/NEPHRISOL-D/NEPHRISOL-D - CAPPUCINO 1.png",

hepatosol:
"/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/HEPATOSOL/HEPATOSOL VANILA 1.png",

"hepatosol-lola":
"/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/HEPATOSOL LOLA/HEPATOSOL LOLA 1.png",

pulmosol:
"/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/PULMOSOL/PULMOSOL 1.png",

oligo:
"/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/OLIGO/OLIGO 1.png",

};


export function AssessmentModal({
isOpen,
onClose,
initialFlowKey,
}:AssessmentModalProps){


const [step,setStep]=useState<Step>("purpose");

const [condition,setCondition]=useState("");

const [answer,setAnswer]=useState("");

const [privacyConsent,setPrivacyConsent]=useState(false);


const [leadForm,setLeadForm]=useState<LeadForm>({
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


const close=()=>{

setStep("purpose");
setCondition("");
setAnswer("");
setPrivacyConsent(false);

onClose();

};


const submitLead=async()=>{


const payload:AssessmentLeadPayload={

purpose:initialFlowKey ?? "",

condition,

answers:{
answer
},

recommendation,

lead:{
...leadForm,
age:"",
gender:"",
educationConsent:privacyConsent,
communicationConsent:privacyConsent,
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



const image =
productImages[recommendation.productSlug];


const progressStep =
step==="purpose"
?1
:step==="condition" || step==="target"
?2
:step==="question"
?3
:step==="lead"
?4
:5;



return (

<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-md">


<button
className="absolute inset-0"
onClick={close}
/>


<div className="
relative
z-10
w-full
max-w-5xl
overflow-hidden
rounded-[3rem]
bg-white
shadow-2xl
">


<button
onClick={close}
className="
absolute
right-6
top-6
z-20
h-10
w-10
rounded-full
bg-[#e4f8ed]
font-black
text-[#006b3f]
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


<p className="text-xs font-black tracking-[0.3em]">
MEDIKAL NUTRIENCE
</p>


<h2 className="
mt-8
text-5xl
font-black
leading-tight
">
Temukan Nutrisi Yang Tepat Untuk Anda
</h2>


<p className="
mt-6
leading-8
text-white/80
">
Jawab beberapa pertanyaan dan dapatkan rekomendasi nutrisi yang sesuai.
</p>


</div>



<div className="p-8 md:p-12">


{step !== "loading" && step !== "result" && (
<AssessmentProgress step={progressStep}/>
)}




{step==="purpose" && (

<div className="space-y-5">

<h1 className="text-4xl font-black">
Apa kebutuhan utama Anda?
</h1>


{assessmentPurposeOptions.map(item=>(

<AssessmentOptionCard

key={item.value}

title={item.label}

description={item.description}

icon={item.icon}

onClick={()=>{

if(item.value==="health"){
setStep("target");
}else{
setStep("condition");
}

}}

/>

))}

</div>

)}



{step==="condition" && (

<div>

<h1 className="text-4xl font-black">
Pilih kondisi kesehatan Anda
</h1>


<div className="mt-6 grid grid-cols-2 gap-4">

{healthConditions.map(item=>(

<AssessmentOptionCard

key={item.value}

title={item.label}

description={item.description}

icon={item.icon}

onClick={()=>{

setCondition(item.value);
setStep("question");

}}

/>

))}

</div>

</div>

)}




{step==="target" && (

<div className="space-y-5">


<h1 className="text-4xl font-black">
Siapa yang membutuhkan nutrisi ini?
</h1>


{healthTargetOptions.map(item=>(

<AssessmentOptionCard

key={item.value}

title={item.label}

icon={item.icon}

onClick={()=>{

setCondition(item.value);
setStep("question");

}}

/>

))}


</div>

)}





{step==="question" && (

<div className="space-y-5">


<h1 className="text-4xl font-black">

{
assessmentQuestions[condition]?.title
}

</h1>


{

assessmentQuestions[condition]?.options.map((option:any)=>(

<AssessmentOptionCard

key={option.value}

title={option.label}

onClick={()=>{

setAnswer(option.value);
setStep("lead");

}}

icon="medical"

/>

))

}


</div>

)}






{step==="lead" && (

<div>

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


<label className="
mt-6
flex
gap-3
rounded-2xl
bg-[#f4fbf7]
p-4
text-sm
font-medium
">

<input
type="checkbox"
checked={privacyConsent}
onChange={(e)=>setPrivacyConsent(e.target.checked)}
/>


Saya menyetujui penggunaan data saya untuk mendapatkan rekomendasi nutrisi dan informasi terkait produk Medikal Nutrience.

</label>


<button
disabled={!privacyConsent}
onClick={submitLead}
className="
mt-8
w-full
rounded-full
bg-[#006b3f]
py-4
font-black
text-white
disabled:opacity-40
"
>
Lihat Rekomendasi
</button>


</div>

)}





{step==="loading" && (

<AssessmentLoading/>

)}





{step==="result" && (

<AssessmentResultCard

result={recommendation}

image={image}

onClose={close}

/>

)}



<p className="
mt-8
rounded-2xl
bg-[#f4fbf7]
p-4
text-xs
text-slate-500
">
{assessmentDisclaimer}
</p>


</div>


</div>


</div>


</div>

);

}
