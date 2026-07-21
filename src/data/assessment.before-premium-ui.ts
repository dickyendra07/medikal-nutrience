export type AssessmentOption = {
  label: string;
  value: string;
};

export type AssessmentResult = {
  product: string;
  productSlug: string;
  image: string;
  note: string;
  benefits: string[];
  ctaUrl: string;
};

export type AssessmentLeadPayload = {
  purpose: string;
  condition?: string;
  answers: Record<string, string>;
  recommendation: AssessmentResult;
  lead?: {
    name: string;
    age: string;
    gender: "male" | "female" | "";
    whatsapp: string;
    educationConsent: boolean;
    communicationConsent: boolean;
  };
  createdAt: string;
};


export const assessmentDisclaimer =
"Rekomendasi ini bersifat informasi awal dan tidak menggantikan diagnosis, saran medis, atau konsultasi langsung dengan dokter maupun ahli gizi.";


export const assessmentPurposeOptions = [
{
 label:"Memiliki kondisi kesehatan",
 value:"condition",
 icon:"medical"
},
{
 label:"Menjaga kesehatan",
 value:"health",
 icon:"health"
}
];


export const healthConditions = [
{
 label:"Ginjal",
 value:"ginjal",
 icon:"kidney"
},
{
 label:"Hati / Liver",
 value:"hati",
 icon:"liver"
},
{
 label:"Pernapasan",
 value:"pernapasan",
 icon:"lung"
},
{
 label:"Pencernaan",
 value:"pencernaan",
 icon:"digestive"
}
];


export const assessmentQuestions = {

ginjal:{
title:"Apakah Anda sedang menjalani dialisis?",
options:[
{
label:"Ya, saya menjalani dialisis",
value:"dialysis"
},
{
label:"Tidak",
value:"normal"
}
]
},

hati:{
title:"Apa kebutuhan nutrisi Anda?",
options:[
{
label:"Dukungan nutrisi hati",
value:"specific"
},
{
label:"Menjaga kesehatan",
value:"normal"
}
]
},

pernapasan:{
title:"Apa kebutuhan nutrisi Anda?",
options:[
{
label:"Masa pemulihan",
value:"recovery"
},
{
label:"Menjaga kebutuhan nutrisi",
value:"normal"
}
]
},

pencernaan:{
title:"Apa kebutuhan nutrisi Anda?",
options:[
{
label:"Nutrisi mudah dicerna",
value:"easy"
},
{
label:"Pemulihan",
value:"recovery"
}
]
},

dewasa:{
title:"Apa tujuan Anda?",
options:[
{
label:"Menjaga kesehatan",
value:"entramix"
},
{
label:"Tanpa susu sapi",
value:"entrasoy"
},
{
label:"Pemulihan",
value:"peptisol"
}
]
}

};



export function getAssessmentRecommendation(
condition:string,
answer:string
):AssessmentResult{


if(condition==="ginjal"){

return answer==="dialysis"
?
{
product:"NEPHRISOL-D",
productSlug:"nephrisol-d",
image:"/images/products/nephrisol-d.png",
note:"Direkomendasikan untuk pasien yang menjalani dialisis.",
benefits:[
"Mendukung kebutuhan nutrisi pasien dialisis",
"Formula nutrisi khusus ginjal",
"Membantu memenuhi kebutuhan energi harian"
],
ctaUrl:"/produk/nephrisol-d"
}
:
{
product:"NEPHRISOL",
productSlug:"nephrisol",
image:"/images/products/nephrisol.png",
note:"Direkomendasikan untuk dukungan nutrisi ginjal.",
benefits:[
"Mendukung pengaturan nutrisi ginjal",
"Membantu memenuhi kebutuhan nutrisi harian"
],
ctaUrl:"/produk/nephrisol"
};

}


if(condition==="hati"){

return {
product:"HEPATOSOL",
productSlug:"hepatosol",
image:"/images/products/hepatosol.png",
note:"Direkomendasikan untuk kebutuhan nutrisi hati.",
benefits:[
"Mendukung fungsi hati",
"Membantu memenuhi kebutuhan protein"
],
ctaUrl:"/produk/hepatosol"
};

}


if(condition==="pernapasan"){

return {
product:"PULMOSOL",
productSlug:"pulmosol",
image:"/images/products/pulmosol.png",
note:"Direkomendasikan untuk dukungan nutrisi pernapasan.",
benefits:[
"Membantu memenuhi kebutuhan energi",
"Mendukung masa pemulihan"
],
ctaUrl:"/produk/pulmosol"
};

}


if(condition==="pencernaan"){

return {
product:"OLIGO",
productSlug:"oligo",
image:"/images/products/oligo.png",
note:"Direkomendasikan untuk nutrisi yang mudah dicerna.",
benefits:[
"Formula mudah diserap",
"Mendukung kebutuhan nutrisi pencernaan"
],
ctaUrl:"/produk/oligo"
};

}


return {
product:"ENTRAMIX",
productSlug:"entramix",
image:"/images/products/entramix.png",
note:"Membantu memenuhi kebutuhan nutrisi harian.",
benefits:[
"Mendukung aktivitas harian",
"Memenuhi kebutuhan nutrisi seimbang"
],
ctaUrl:"/produk/entramix"
};


}
