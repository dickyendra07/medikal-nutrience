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

  productInformation?: {
    background?: string;
    servingInstruction?: string;
    servingPer100ml?: string;
    osmolality?: string;
    flavors?: string[];
    availability?: string;
    packaging?: string;
    storage?: string;
    composition?: string;
    specificComposition?: string[];
  };
};


export const clinicalNutritionProducts = [
  "entramix",
  "entrasoy",
  "hepatosol",
  "hepatosol-lola",
];

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

  entramix: {
    productInformation: {
      background:
        "Minuman berbasis whey bubuk dengan sumber protein, sumber serat pangan, sumber kalsium, rendah laktosa, mengandung 12 vitamin dan 8 mineral untuk memenuhi gizi seimbang pada dewasa dan lansia. Entramix digunakan untuk melengkapi gaya hidup sehat dengan pola makan gizi lengkap dan seimbang. Entramix mendukung pemenuhan nutrisi dan aktivitas sehari-hari.",

      servingInstruction:
        "1 sachet dilarutkan ke dalam 200 ml air menghasilkan 250 ml larutan.",

      servingPer100ml:
        "23 gram serbuk ke 80 ml air.",

      osmolality:
        "Kurang dari 250.",

      flavors: [
        "Vanilla",
        "Coklat",
      ],

      availability:
        "Box",

      packaging:
        "Gramasi 174 gram (3 x 58 gram).",

      storage:
        "Simpan di tempat yang kering, bersih, dan jangan terkena sinar matahari langsung. Jangan dikonsumsi apabila terjadi perubahan yang mencolok pada bau, rasa, atau warna.",

      composition:
        "Base bubuk maltodextrin, kalsium kaseinat, lemak nabati (mengandung protein susu dan antioksidan askorbil palmitat dan tokoferol), protein whey, MCT, serat pangan, sukrosa, premiks vitamin dan mineral.",

      specificComposition: [
        "Protein",
        "MCT",
        "Omega 3",
        "Omega 6",
        "Serat Pangan",
      ],
    },

    displayName: "Entramix",
    category: "Adult & Elderly Nutrition Formula",

    title: "Nutrition Facts",

    subtitle:
      "Informasi nutrisi lengkap Entramix untuk membantu memenuhi kebutuhan gizi seimbang dewasa hingga lansia.",

    serving: "Per Sajian Mengandung",

    variants: [
      {
        name: "Vanila",
        image:
          "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/ENTRAMIX/ENTRAMIX VANILA 1.png",
      },
      {
        name: "Cokelat",
        image:
          "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/ENTRAMIX/ENTRAMIX COKELAT 1.png",
      },
    ],

    disclaimer: [
      "* Persen AKG berdasarkan kebutuhan energi 2150 kkal.",
    ],

    nutrition: [
      { name: "Energi", value: "250", unit: "kkal" },
      { name: "Energi dari Lemak", value: "54", unit: "kkal" },
      { name: "Lemak Total", value: "6", unit: "g" },
      { name: "Lemak Tak Jenuh Tunggal", value: "0", unit: "g" },
      { name: "Lemak Tak Jenuh Ganda", value: "0", unit: "g" },
      { name: "Omega 3", value: "72", unit: "mg" },
      { name: "Omega 6", value: "353", unit: "mg" },
      { name: "Lemak Trans", value: "0", unit: "g" },
      { name: "Kolesterol", value: "10", unit: "mg" },
      { name: "Lemak Jenuh", value: "3", unit: "g" },
      { name: "MCT", value: "3,5", unit: "g" },
      { name: "Protein", value: "10", unit: "g" },
      { name: "Karbohidrat Total", value: "38", unit: "g" },
      { name: "Serat Pangan", value: "3", unit: "g" },
      { name: "Inulin", value: "3", unit: "g" },
      { name: "Gula Total", value: "9", unit: "g" },
      { name: "Laktosa", value: "0", unit: "g" },
      { name: "Garam / Natrium", value: "60", unit: "mg" },
    ],

    vitamins: [
      { name: "Vitamin A", value: "", percentage: "20% AKG" },
      { name: "Vitamin B1", value: "", percentage: "15% AKG" },
      { name: "Vitamin B2", value: "", percentage: "15% AKG" },
      { name: "Vitamin B3", value: "", percentage: "15% AKG" },
      { name: "Vitamin B5", value: "", percentage: "15% AKG" },
      { name: "Vitamin B6", value: "", percentage: "20% AKG" },
      { name: "Asam Folat", value: "", percentage: "15% AKG" },
      { name: "Vitamin B12", value: "", percentage: "15% AKG" },
      { name: "Vitamin C", value: "", percentage: "30% AKG" },
      { name: "Vitamin D3", value: "", percentage: "15% AKG" },
      { name: "Vitamin E", value: "", percentage: "15% AKG" },
      { name: "Biotin", value: "", percentage: "10% AKG" },
      { name: "Kalium", value: "", percentage: "2% AKG" },
      { name: "Kalsium", value: "", percentage: "15% AKG" },
      { name: "Magnesium", value: "", percentage: "15% AKG" },
      { name: "Fosfor", value: "", percentage: "20% AKG" },
      { name: "Besi", value: "", percentage: "20% AKG" },
      { name: "Yodium", value: "", percentage: "15% AKG" },
      { name: "Selenium", value: "", percentage: "15% AKG" },
      { name: "Kromium", value: "", percentage: "15% AKG" },
      { name: "Seng", value: "", percentage: "15% AKG" },
    ],
  },


  entrasoy: {
    productInformation: {
      background:
        "Entrasoy by Entramix merupakan formula dengan 100% protein nabati dari isolat protein kedelai. Entrasoy mengandung tinggi protein, tinggi serat pangan, sumber 12 vitamin dan 8 mineral. Entrasoy bebas laktosa, bebas gluten, dan bebas kolesterol.",

      servingInstruction:
        "1 sachet dilarutkan ke 160 ml air menghasilkan 180 ml larutan.",

      servingPer100ml:
        "Mengikuti kebutuhan.",

      osmolality:
        "Kurang dari 250.",

      flavors: [
        "Almond Vanila",
      ],

      availability:
        "Box",

      packaging:
        "Gramasi 200 gram (5 sachet x 40 gram).",

      storage:
        "Simpan di tempat yang kering, bersih, dan jangan terkena sinar matahari langsung. Jangan dikonsumsi apabila terjadi perubahan yang mencolok pada bau, rasa, atau warna.",

      composition:
        "Sari kacang kedelai bubuk, maltodextrin, isolat protein kedelai, serat pangan, sukrosa, vitamin dan mineral, perisa sintetik, pengemulsi nabati, bubuk almond, steviol, allergen.",

      specificComposition: [
        "Mengandung isoflavon",
      ],
    },

    displayName: "Entrasoy",
    category: "Plant Based Nutrition Formula",

    title: "Nutrition Facts",

    subtitle:
      "Informasi nutrisi lengkap Entrasoy dengan protein nabati dari isolat protein kedelai.",

    serving:
      "Per Sajian Mengandung",

    variants: [
      {
        name: "Almond Vanila",
        image:
          "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/ENTRASOY PACKSHOOT/ENTRASOY.png",
      },
    ],

    disclaimer: [
      "* Persen AKG berdasarkan kebutuhan energi 2150 kkal.",
    ],

    nutrition: [
      { name: "Energi", value: "160", unit: "kkal" },
      { name: "Energi dari Lemak", value: "30", unit: "kkal" },
      { name: "Lemak Total", value: "3,5", unit: "g" },
      { name: "Lemak Tak Jenuh Tunggal", value: "0,5", unit: "g" },
      { name: "Lemak Tak Jenuh Ganda", value: "1,5", unit: "g" },
      { name: "Omega 3", value: "0", unit: "mg" },
      { name: "Omega 6", value: "0", unit: "mg" },
      { name: "Lemak Trans", value: "0", unit: "g" },
      { name: "Kolesterol", value: "0", unit: "mg" },
      { name: "Lemak Jenuh", value: "1", unit: "g" },
      { name: "MCT", value: "0", unit: "g" },
      { name: "Protein", value: "9", unit: "g" },
      { name: "Karbohidrat Total", value: "25", unit: "g" },
      { name: "Serat Pangan", value: "2,5", unit: "g" },
      { name: "Inulin", value: "2", unit: "g" },
      { name: "Gula Total", value: "6", unit: "g" },
      { name: "Laktosa", value: "0", unit: "g" },
      { name: "Garam (Natrium)", value: "130", unit: "mg" },
    ],

    vitamins: [
      { name: "Vitamin A", value: "72", unit: "mcg" },
      { name: "Vitamin B1", value: "0,15", unit: "mg" },
      { name: "Vitamin B2", value: "0,18", unit: "mg" },
      { name: "Vitamin B3", value: "2,1", unit: "mg" },
      { name: "Vitamin B5", value: "0,5", unit: "mg" },
      { name: "Vitamin B6", value: "0,18", unit: "mg" },
      { name: "Asam Folat", value: "44", unit: "mcg" },
      { name: "Vitamin B12", value: "0,27", unit: "mcg" },
      { name: "Vitamin C", value: "9", unit: "mg" },
      { name: "Vitamin D3", value: "1,6", unit: "mcg" },
      { name: "Vitamin E", value: "1,6", unit: "mg" },
      { name: "Biotin", value: "3,2", unit: "mcg" },
      { name: "Kalium", value: "300", unit: "mg" },
      { name: "Kalsium", value: "133", unit: "mg" },
      { name: "Magnesium", value: "66", unit: "mg" },
      { name: "Fosfor", value: "84", unit: "mg" },
      { name: "Besi", value: "3,1", unit: "mg" },
      { name: "Yodium", value: "17", unit: "mcg" },
      { name: "Selenium", value: "3", unit: "mcg" },
      { name: "Kromium", value: "Tidak diukur" },
      { name: "Seng", value: "1,5", unit: "mg" },
    ],
  },

  hepatosol: {
    productInformation: {
      background:
        "Hepatosol merupakan nutrisi adekuat dengan nutrien spesifik seperti BCAA dan Lemak Rantai Sedang (MCT) yang dapat membantu mempercepat pemulihan. Solusi untuk pemenuhan nutrisi malam hari sebelum beristirahat.",

      servingInstruction:
        "1 sachet dilarutkan ke dalam 300 ml air menghasilkan 363 ml larutan.",

      servingPer100ml:
        "22 gram serbuk ke 83 ml air.",

      flavors: [
        "Vanilla",
        "Coklat",
      ],

      availability:
        "Box",

      packaging:
        "Gramasi 240 gram (3 sachet x 80 gram).",

      storage:
        "Simpan di tempat yang kering, bersih, dan jangan terkena sinar matahari langsung. Jangan dikonsumsi apabila terjadi perubahan yang mencolok pada bau, rasa, atau warna.",

      composition:
        "Maltodekstrin, Bubuk MCT, Sukrosa, Isolat Protein Whey, Konsentrat Protein Whey, Inulin, Premiks Asam Amino (BCAA), Natrium Klorida, Kalsium Karbonat, Mononatrium Fosfat, Bubuk Lemak Nabati, Vitamin & Mineral.",

      specificComposition: [
        "MCT",
        "BCAA",
        "Inulin",
      ],
    },

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

    productInformation: {
      background:
        "Hepatosol LOLA merupakan nutrisi enteral yang lengkap untuk pasien dengan gangguan fungsi hati berat. Dengan kombinasi kandungan BCAA dan LOLA yang membantu menurunkan kadar amonia dalam darah, memperbaiki keseimbangan nitrogen dan rasio Fischer serta membantu menurunkan pemecahan protein sebagai sumber protein otot.",

      servingInstruction:
        "1 sachet dilarutkan ke dalam 250 ml air menghasilkan 303 ml larutan.",

      servingPer100ml:
        "27 gram serbuk ke 83 ml air.",

      flavors: [
        "Jeruk",
      ],

      availability:
        "Box",

      packaging:
        "Gramasi 249 gram (3 sachet x 83 gram).",

      storage:
        "Simpan di tempat yang kering, bersih, dan jangan terkena sinar matahari langsung. Jangan dikonsumsi apabila terjadi perubahan yang mencolok pada bau, rasa, atau warna.",

      composition:
        "Dekstrin, Maltodekstrin, Konsentrat Protein Whey, Bubuk MCT, Inulin, Premiks Asam Amino, Natrium Klorida, Mononatrium Fosfat, Kalsium Karbonat, Trikalsium Fosfat.",

      specificComposition: [
        "MCT",
        "BCAA",
        "LOLA",
        "Inulin",
      ],
    },

    category: "Clinical Nutrition Formula",

    variants: [
      {
        name: "Jeruk",
        image:
          "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/HEPATOSOL LOLA/HEPATOSOL LOLA 1.png",
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
