export type NutritionItem = {
  name: string;
  value: string;
  unit?: string;
  percentage?: string;

};

export type ProductHighlight = {
  title: string;
  description: string;
  icon: string;
};

export type ProductVariant = {
  name: string;
  image: string;
};

export type ProductNutrition = {
  title: string;
  subtitle: string;
  serving: string;

  displayName?: string;
  category?: string;

  nutrition: NutritionItem[];
  vitamins: NutritionItem[];

  components?: NutritionItem[];

  variants?: ProductVariant[];

  highlights?: ProductHighlight[];
  highlightTitle?: string;
  highlightSubtitle?: string;

  disclaimer?: string[];

  targetAudience?: {
    title: string;
    description: string;
    items?: string[];
  };
};


export const productNutrition: Record<string, ProductNutrition> = {
  entrakid: {
    title: "Nutrition Facts",
    subtitle:
      "Per sajian mengandung nutrisi lengkap untuk mendukung tumbuh kembang anak.",
    serving: "Per Saji Mengandung",

    nutrition: [
      { name: "Energi", value: "200", unit: "kkal" },
      { name: "Energi dari Lemak", value: "65", unit: "kkal" },
      { name: "Lemak Total", value: "7", unit: "g", percentage: "10%" },
      { name: "Lemak Tak Jenuh Tunggal", value: "0", unit: "%" },
      { name: "Lemak Trans", value: "0", unit: "g" },
      { name: "Kolesterol", value: "0", unit: "mg" },
      { name: "Omega 3", value: "203", unit: "mg" },
      { name: "Omega 6", value: "40", unit: "mg", percentage: "34%" },
      { name: "DHA*", value: "14", unit: "mg" },
      { name: "Lemak Jenuh", value: "6,8", unit: "g", percentage: "10%" },
      { name: "MCT**", value: "3", unit: "g", percentage: "9%" },
      { name: "Protein", value: "6", unit: "g", percentage: "3%" },
      { name: "Karbohidrat Total", value: "29", unit: "g" },
      { name: "Serat Pangan", value: "1", unit: "g" },
      { name: "Inulin", value: "1", unit: "g" },
      { name: "Gula Total", value: "14", unit: "g", percentage: "5%" },
      { name: "Sukrosa", value: "4", unit: "g" },
      { name: "Garam (Natrium)", value: "80", unit: "mg" },
    ],

    vitamins: [
      { name: "Vitamin A", value: "150", unit: "mcg", percentage: "25%" },
      { name: "Vitamin B1", value: "0,21", unit: "mg", percentage: "15%" },
      { name: "Vitamin B2", value: "0,24", unit: "mg", percentage: "15%" },
      { name: "Vitamin B3", value: "2,25", unit: "mg", percentage: "15%" },
      { name: "Vitamin B5", value: "0,75", unit: "mg", percentage: "15%" },
      { name: "Vitamin B6", value: "0,2", unit: "mg", percentage: "15%" },
      { name: "Asam Folat", value: "45", unit: "mcg", percentage: "10%" },
      { name: "Vitamin B12", value: "0,36", unit: "mcg", percentage: "15%" },
      { name: "Vitamin C", value: "14", unit: "mg", percentage: "15%" },
      { name: "Vitamin D3", value: "0,9", unit: "mcg", percentage: "6%" },
      { name: "Vitamin E", value: "2,3", unit: "mg", percentage: "15%" },
      { name: "Biotin", value: "4,5", unit: "mcg", percentage: "15%" },
      { name: "Kalium", value: "270", unit: "mg", percentage: "6%" },
      { name: "Kalsium", value: "165", unit: "mg", percentage: "15%" },
      { name: "Fosfor", value: "70", unit: "mg", percentage: "10%" },
      { name: "Besi", value: "2,2", unit: "mg", percentage: "10%" },
      { name: "Yodium", value: "23", unit: "mcg", percentage: "15%" },
      { name: "Seng", value: "2,6", unit: "mg", percentage: "20%" },
      { name: "Selenium", value: "2,4", unit: "mcg", percentage: "8%" },
    ],
  },

  hepatosol: {
    displayName: "Hepatosol",
    category: "Clinical Nutrition Formula",

    variants: [
      {
        name: "Vanila",
        image:
          "/images/mednut/products/packshots/hepatosol-vanila-1.png",
      },
      {
        name: "Cokelat",
        image:
          "/images/mednut/products/packshots/hepatosol-cokelat-1.png",
      },
    ],

    disclaimer: [
      "* Persen AKG berdasarkan kebutuhan energi 2150 kkal.",
      "** Middle Chain Triglycerides.",
    ],

    targetAudience: {
      title: "Siapa yang Membutuhkan Hepatosol?",
      description:
        "Formula nutrisi klinis yang diformulasikan untuk membantu memenuhi kebutuhan pasien dengan gangguan fungsi hati ringan hingga moderate.",
    },

    title: "Nutrition Facts",
    subtitle:
      "Informasi nutrisi lengkap untuk membantu memenuhi kebutuhan pasien dengan gangguan fungsi hati ringan hingga moderate.",
    serving: "Per Sajian Mengandung",

    highlightTitle:
      "Keunggulan Utama Hepatosol",

    highlightSubtitle:
      "Formula nutrisi klinis yang diformulasikan untuk membantu memenuhi kebutuhan pasien dengan gangguan fungsi hati ringan hingga moderate.",

    nutrition: [
      { name: "Energi Total", value: "480", unit: "kkal" },
      { name: "Energi dari Lemak", value: "175", unit: "kkal" },
      { name: "Lemak Total", value: "19", unit: "g", percentage: "18%" },
      { name: "Lemak Trans", value: "0", unit: "g" },
      { name: "Kolesterol", value: "0", unit: "mg" },
      { name: "Lemak Jenuh", value: "19", unit: "g", percentage: "7%" },
      { name: "MCT", value: "15", unit: "g" },
      { name: "Protein", value: "14", unit: "g", percentage: "9%" },
      { name: "Karbohidrat Total", value: "61", unit: "g", percentage: "17%" },
      { name: "Total Gula", value: "29", unit: "g" },
      { name: "Laktosa", value: "0", unit: "g" },
      { name: "Serat Pangan", value: "3", unit: "g" },
      { name: "Garam (Natrium)", value: "210", unit: "mg", percentage: "7%" },
    ],

    vitamins: [
      { name: "Vitamin A", value: "116", unit: "mcg", percentage: "10%" },
      { name: "Vitamin B1", value: "0,22", unit: "mg", percentage: "17%" },
      { name: "Vitamin B2", value: "0,25", unit: "mg", percentage: "15%" },
      { name: "Vitamin B3", value: "2,3", unit: "mg", percentage: "11%" },
      { name: "Vitamin B5", value: "0,96", unit: "mg", percentage: "16%" },
      { name: "Vitamin B6", value: "0,17", unit: "mg", percentage: "8%" },
      { name: "Asam Folat", value: "73", unit: "mcg", percentage: "14,5%" },
      { name: "Vitamin B12", value: "0,4", unit: "mcg", percentage: "13%" },
      { name: "Vitamin C", value: "14", unit: "mg", percentage: "12%" },
      { name: "Vitamin D3", value: "2,9", unit: "mcg", percentage: "10%" },
      { name: "Vitamin E", value: "2,7", unit: "mcg", percentage: "13%" },
      { name: "Biotin", value: "4,6", unit: "mg", percentage: "12%" },
      { name: "Kalium", value: "75", unit: "mg", percentage: "13%" },
      { name: "Kalsium", value: "188", unit: "mg", percentage: "15%" },
      { name: "Fosfor", value: "103", unit: "mg", percentage: "12%" },
      { name: "Besi", value: "4,3", unit: "mg", percentage: "19%" },
      { name: "Seng", value: "1,6", unit: "mg", percentage: "12%" },
    ],

    components: [
      { name: "Valin", value: "0,6", unit: "g" },
      { name: "Isoleusin", value: "0,6", unit: "g" },
      { name: "Leusin", value: "1,2", unit: "g" },
    ],

    highlights: [
      {
        title: "Tinggi Kalori",
        description: "Membantu memenuhi kebutuhan energi pasien.",
        icon: "/images/client-assets/icon/HEPATOSOL/NEW ICON/Tinggi Kalori.svg",
      },
      {
        title: "Bebas Laktosa & Gluten",
        description: "Formula nutrisi untuk kebutuhan khusus pasien.",
        icon: "/images/client-assets/icon/HEPATOSOL/NEW ICON/Bebas Laktosa & Gluten 2.svg",
      },
      {
        title: "Diperkaya BCAA",
        description: "Mengandung asam amino rantai cabang.",
        icon: "/images/client-assets/icon/HEPATOSOL/NEW ICON/Diperkaya BCAA.svg",
      },
      {
        title: "Sumber Lemak MCT",
        description: "Sumber energi dari lemak rantai sedang.",
        icon: "/images/client-assets/icon/HEPATOSOL/NEW ICON/sumber-lemak-mct.svg",
      },
    ],
  },


  "hepatosol-lola": {
    displayName: "Hepatosol Lola",
    category: "Clinical Nutrition Formula",

    variants: [
      {
        name: "Jeruk",
        image:
          "/images/mednut/products/packshots/hepatosol-lola-1.png",
      },
    ],

    disclaimer: [
      "* Persen AKG berdasarkan kebutuhan energi 2150 kkal.",
      "** Middle Chain Triglycerides.",
    ],

    targetAudience: {
      title: "Siapa yang Membutuhkan Hepatosol Lola?",
      description:
        "Formula nutrisi klinis spesifik untuk membantu memenuhi kebutuhan pasien dengan gangguan fungsi hati berat.",
    },

    title: "Nutrition Facts",
    subtitle:
      "Informasi nutrisi lengkap untuk pasien dengan gangguan fungsi hati berat.",
    serving: "Per Sajian Mengandung",

    highlightTitle:
      "Keunggulan Utama Hepatosol Lola",

    highlightSubtitle:
      "Formula nutrisi klinis spesifik untuk membantu memenuhi kebutuhan pasien dengan gangguan fungsi hati berat.",

    nutrition: [
      { name: "Energi Total", value: "410", unit: "kkal" },
      { name: "Energi dari Lemak", value: "70", unit: "kkal" },
      { name: "Lemak Total", value: "7", unit: "g", percentage: "7%" },
      { name: "Protein", value: "16", unit: "g" },
      { name: "Karbohidrat Total", value: "71", unit: "g", percentage: "16%" },
      { name: "Total Gula", value: "2", unit: "g", percentage: "22%" },
      { name: "Laktosa", value: "0", unit: "g" },
      { name: "Serat Pangan", value: "3", unit: "g" },
      { name: "Garam (Natrium)", value: "183", unit: "mg", percentage: "8%" },
    ],

    vitamins: [
      { name: "Vitamin A", value: "117", unit: "mcg", percentage: "10%" },
      { name: "Vitamin B1", value: "0,25", unit: "mg", percentage: "18%" },
      { name: "Vitamin B2", value: "0,25", unit: "mg", percentage: "17%" },
      { name: "Vitamin B3", value: "2,3", unit: "mg", percentage: "13%" },
      { name: "Vitamin B5", value: "0,95", unit: "mg", percentage: "10%" },
      { name: "Vitamin B6", value: "0,17", unit: "mg", percentage: "8%" },
      { name: "Asam Folat", value: "73", unit: "mcg", percentage: "15%" },
      { name: "Vitamin B12", value: "0,4", unit: "mcg", percentage: "12,5%" },
      { name: "Vitamin C", value: "14", unit: "mcg", percentage: "16%" },
      { name: "Vitamin D3", value: "2,9", unit: "mcg", percentage: "16%" },
      { name: "Vitamin E", value: "2,7", unit: "mg", percentage: "15%" },
      { name: "Biotin", value: "4,6", unit: "mcg", percentage: "10%" },
      { name: "Kalium", value: "80", unit: "mg", percentage: "2%" },
      { name: "Kalsium", value: "180", unit: "mg", percentage: "11%" },
      { name: "Fosfor", value: "124", unit: "mg", percentage: "15%" },
      { name: "Besi", value: "4,3", unit: "mg", percentage: "20%" },
      { name: "Yodium", value: "23", unit: "mcg", percentage: "13%" },
      { name: "Seng", value: "1,9", unit: "mg", percentage: "20%" },
    ],

    components: [
      { name: "Isoleusin", value: "1", unit: "g" },
      { name: "Valin", value: "0,7", unit: "g" },
      { name: "Leusin", value: "0,6", unit: "g" },
    ],

    highlights: [
      {
        title: "Tinggi Kalori",
        description: "Mendukung kebutuhan energi pasien dengan kondisi hati berat.",
        icon: "/images/client-assets/icon/HEPATOSOL/NEW ICON/Tinggi Kalori.svg",
      },
      {
        title: "Diperkaya BCAA",
        description: "Mengandung asam amino rantai cabang.",
        icon: "/images/client-assets/icon/HEPATOSOL/NEW ICON/Diperkaya BCAA.svg",
      },
      {
        title: "Sumber Lemak MCT",
        description: "Sumber energi dari lemak rantai sedang.",
        icon: "/images/client-assets/icon/HEPATOSOL/NEW ICON/sumber-lemak-mct.svg",
      },
      {
        title: "LOLA",
        description:
          "Mengandung L-Ornithine L-Aspartate untuk mendukung kebutuhan nutrisi spesifik pasien hati.",
        icon: "/images/client-assets/icon/HEPATOSOL/NEW ICON/Diperkaya BCAA.svg",
      },
    ],
  }

};
