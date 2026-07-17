export type EventProgram = {
  title: string;
  description: string;
};

export type EventItem = {
  slug: string;
  category: string;
  title: string;
  date: string;
  location: string;
  href: string;
  status: "Published" | "Draft" | "Hidden";
};

export type FeaturedEvent = {
  eyebrow: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  image: string;
  imageAlt: string;
  registrationTitle: string;
  registrationDescription: string;
};

export type EventPageData = {
  featuredEvent: FeaturedEvent;
  programs: EventProgram[];
  events: EventItem[];
  productOptions: string[];
  infoSources: string[];
};

export const eventPageData: EventPageData = {
  featuredEvent: {
    eyebrow: "Event Medikal Nutrience",
    title: "Hari Gizi Nasional 2026",
    description:
      "Gizi Seimbang untuk Lansia Kuat & Aktif. Ikuti health talk dan demo cooking bersama tenaga kesehatan profesional.",
    location: "Auditorium RS Permata Cibubur Lt. 4",
    date: "Kamis, 22 Januari 2026",
    time: "08.30 – 11.30 WIB",
    image: "/images/mednut/events/hgn-2026.webp",
    imageAlt: "Poster Hari Gizi Nasional 2026",
    registrationTitle: "Daftar Hari Gizi Nasional 2026",
    registrationDescription:
      "Lengkapi data berikut untuk mengikuti event. Data ini akan membantu tim Medikal Nutrience mengelola registrasi dan edukasi yang relevan.",
  },
  programs: [
    {
      title: "Health Talk",
      description:
        "Diskusi edukatif seputar gizi seimbang untuk lansia agar tetap kuat dan aktif.",
    },
    {
      title: "Demo Cooking",
      description:
        "Inspirasi menu sehat yang mudah diterapkan untuk mendukung kebutuhan nutrisi harian.",
    },
    {
      title: "Free Check & Sample",
      description:
        "Pemeriksaan protein, komposisi tubuh, snack box, lunch box, drink, dan sample selama kuota tersedia.",
    },
  ],
  events: [
    {
      slug: "hari-gizi-nasional-2026",
      category: "Health Talk & Demo Cooking",
      title: "Hari Gizi Nasional 2026",
      date: "Kamis, 22 Januari 2026",
      location: "Auditorium RS Permata Cibubur Lt. 4",
      href: "#registrasi-event",
      status: "Published",
    },
    {
      slug: "clinical-nutrition-symposium-2026",
      category: "Seminar Nutrisi",
      title: "Clinical Nutrition Symposium 2026",
      date: "15 Agustus 2026",
      location: "Jakarta",
      href: "#registrasi-event",
      status: "Published",
    },
    {
      slug: "edukasi-nutrisi-keluarga",
      category: "Webinar Keluarga",
      title: "Edukasi Nutrisi Keluarga",
      date: "22 Agustus 2026",
      location: "Online",
      href: "#registrasi-event",
      status: "Published",
    },
  ],
  productOptions: [
    "Entramix",
    "Entrakid",
    "Nephrisol",
    "Pulmosol",
    "Entrasoy",
    "Peptisol",
    "Oligo",
    "Hepatosol",
    "Hepatosol Lola",
    "Peptibren",
  ],
  infoSources: [
    "Instagram",
    "WhatsApp",
    "Dokter / Ahli Gizi",
    "Rumah Sakit / Klinik",
    "Teman / Keluarga",
    "Website Medikal Nutrience",
    "Lainnya",
  ],
};
