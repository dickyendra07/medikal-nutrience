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
  answers: Record<string,string>;
  recommendation: AssessmentResult;
  lead?: {
    name:string;
    age:string;
    gender:"male"|"female"|"";
    whatsapp:string;
    educationConsent:boolean;
    communicationConsent:boolean;
  };
  createdAt:string;
};


export const assessmentDisclaimer =
"Rekomendasi ini bersifat informasi awal dan tidak menggantikan diagnosis, saran medis, atau konsultasi langsung dengan dokter maupun ahli gizi.";


export const assessmentPurposeOptions = [
  {
    label:"Memiliki kondisi kesehatan",
    value:"condition",
    icon:"medical",
    description:"Cari rekomendasi nutrisi berdasarkan kondisi kesehatan tertentu."
  },
  {
    label:"Menjaga kesehatan",
    value:"health",
    icon:"shield",
    description:"Temukan nutrisi untuk mendukung aktivitas dan kebutuhan harian."
  }
];


export const healthConditions = [
  {
    label:"Ginjal",
    value:"ginjal",
    icon:"kidney",
    description:"Dukungan nutrisi untuk kebutuhan pasien dengan kondisi ginjal."
  },
  {
    label:"Hati / Liver",
    value:"hati",
    icon:"liver",
    description:"Dukungan nutrisi untuk membantu menjaga fungsi hati."
  },
  {
    label:"Pernapasan",
    value:"pernapasan",
    icon:"lung",
    description:"Nutrisi pendukung untuk kebutuhan sistem pernapasan."
  },
  {
    label:"Pencernaan",
    value:"pencernaan",
    icon:"digestive",
    description:"Nutrisi yang lebih mudah diserap dan dicerna."
  }
];


export const assessmentQuestions:any = {

ginjal:{
title:"Apakah Anda sedang menjalani dialisis?",
options:[
{label:"Ya, sedang menjalani dialisis",value:"dialysis"},
{label:"Tidak menjalani dialisis",value:"no-dialysis"}
]
},

hati:{
title:"Apa kebutuhan nutrisi Anda?",
options:[
{label:"Menjaga kesehatan hati",value:"maintenance"},
{label:"Membutuhkan dukungan lebih spesifik",value:"specific"}
]
},

pernapasan:{
title:"Apa kebutuhan nutrisi Anda saat ini?",
options:[
{label:"Menjaga kesehatan pernapasan",value:"maintenance"},
{label:"Masa pemulihan",value:"recovery"}
]
},

pencernaan:{
title:"Apa kebutuhan nutrisi Anda?",
options:[
{label:"Nutrisi mudah dicerna",value:"easy"},
{label:"Pemulihan setelah tindakan medis",value:"recovery"}
]
},

dewasa:{
title:"Apa tujuan utama Anda?",
options:[
{label:"Menjaga kesehatan harian",value:"entramix"},
{label:"Alternatif tanpa susu sapi",value:"entrasoy"},
{label:"Pemulihan setelah sakit",value:"peptisol"}
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
image:"/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/NEPHRISOL-D/NEPHRISOL-D VANILA 2.png",
note:"Direkomendasikan untuk kebutuhan nutrisi pasien yang menjalani dialisis.",
benefits:[
"Mendukung kebutuhan nutrisi pasien ginjal",
"Formula nutrisi khusus untuk kebutuhan dialisis"
],
ctaUrl:"/produk/nephrisol-d"
}
:
{
product:"NEPHRISOL",
productSlug:"nephrisol",
image:"/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/NEPHRISOL/NEPHRISOL CAPPUCINO 1.png",
note:"Direkomendasikan untuk dukungan nutrisi kondisi ginjal.",
benefits:[
"Membantu memenuhi kebutuhan nutrisi",
"Mendukung kondisi ginjal"
],
ctaUrl:"/produk/nephrisol"
};
}



if(condition==="hati"){
return {
product:"HEPATOSOL",
productSlug:"hepatosol",
image:"/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/HEPATOSOL/HEPATOSOL VANILA 1.png",
note:"Direkomendasikan untuk dukungan nutrisi hati.",
benefits:[
"Mendukung kebutuhan nutrisi hati",
"Membantu menjaga asupan harian"
],
ctaUrl:"/produk/hepatosol"
};
}



if(condition==="pernapasan"){
return {
product:"PULMOSOL",
productSlug:"pulmosol",
image:"/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/PULMOSOL/PULMOSOL 1.png",
note:"Direkomendasikan untuk dukungan nutrisi sistem pernapasan.",
benefits:[
"Mendukung kebutuhan energi",
"Membantu pemenuhan nutrisi"
],
ctaUrl:"/produk/pulmosol"
};
}



if(condition==="pencernaan"){
return {
product:"OLIGO",
productSlug:"oligo",
image:"/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/OLIGO/OLIGO 1.png",
note:"Direkomendasikan untuk kebutuhan nutrisi pencernaan.",
benefits:[
"Mudah dicerna",
"Mendukung kebutuhan nutrisi"
],
ctaUrl:"/produk/oligo"
};
}



return {
product:"ENTRAMIX",
productSlug:"entramix",
image:"/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/ENTRAMIX/ENTRAMIX VANILA.png",
note:"Membantu memenuhi kebutuhan nutrisi harian.",
benefits:[
"Mendukung aktivitas harian",
"Memenuhi kebutuhan nutrisi seimbang"
],
ctaUrl:"/produk/entramix"
};

}
