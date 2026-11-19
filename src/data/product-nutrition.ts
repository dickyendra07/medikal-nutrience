export type NutritionItem = {
  name: string;
  // null preserves an empty client cell; never substitute zero or a dash.
  value: string | null;
  unit?: string;

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
  // Intro under the "Mengapa [Produk]?" heading; falls back to the generic line.
  whySubtitle?: string;

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
    // Per-flavor values; takes precedence over `osmolality` when present.
    osmolalityByFlavor?: { flavor: string; value: string }[];
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

// Source: Komposisi per Saji Dion_Website (2) (1).xlsx, Sheet1.
// Each product owns rows 13–52 (18 macros, 21 vitamins/minerals, 1 additional).
// Preserve source decimals, text, units and blanks without normalization.
// Serving instructions: row 3; per 100 ml: row 4; composition: rows 10–11.
export const productNutrition: Record<string, ProductNutrition> = {
  entrakid: {
    productInformation: {
      background:
        "Entrakid merupakan suplemen nutrisi dengan komposisi gizi lengkap yang diformulasikan untuk membantu mendukung tumbuh kembang anak usia 1–12 tahun. Dengan kandungan nutrisi yang seimbang, Entrakid menjadi pilihan untuk melengkapi kebutuhan nutrisi anak dalam masa pertumbuhan.",
      flavors: ["Coklat", "Vanilla"],
      availability: "Boks",
      packaging: "Gramasi 185 Gram (3 Sachet x 61 Gram).",
      storage: "Simpan di tempat yang kering, bersih, dan jangan terkena sinar matahari langsung. Jangan dikonsumsi apabila terjadi perubahan yang mencolok pada bau, rasa, atau warna.",
      osmolalityByFlavor: [
        { flavor: "Coklat", value: "474 mOsm/L" },
        { flavor: "Vanilla", value: "486 mOsm/L" },
      ],
      "servingInstruction": "3 sendok takar (+/- 45 g) dilarutkan ke 190 mL air menghasilkan 235 mL larutan",
      "servingPer100ml": "22 Gram serbuk ke 90 mL air",
      "composition": "Susu Bubuk (mengandung Padatan Susu, Protein Whey dan Kalsium Kaseinat), Krimer Minuman (mengandung Susu, Maltodekstrin, Lemak Nabati (mengandung Susu), Antioksidan Askorbil Palmitat, Natrium Askorbat, Tokoferol Campuran Pekat dan d-Alfa Tokoferol), Sukrosa, Serat Pangan, Perisa Sintetik, Premiks Mineral dan Vitamin.",
      "specificComposition": [
        "DHA, Inulin, Omega 3, Omega 6"
      ]
    },
    displayName: "Entrakid",
    title: "Nutrition Facts",
    subtitle:
      "Per sajian mengandung nutrisi lengkap untuk mendukung tumbuh kembang anak.",
    serving: "Per Sajian Entrakid",

    nutrition: [
      { name: "Energi", value: "200", unit: "kkal" },
      { name: "Energi dari lemak", value: "65", unit: "kkal" },
      { name: "Lemak total", value: "7", unit: "g" },
      { name: "Lemak tak jenuh tunggal", value: "1", unit: "g" },
      { name: "Lemak tak jenuh ganda", value: "0.5", unit: "g" },
      { name: "Omega 3", value: "220", unit: "mg" },
      { name: "Omega 6", value: "550", unit: "mg" },
      { name: "Lemak trans", value: "0", unit: "g" },
      { name: "Kolesterol", value: "9 g", unit: "mg" },
      { name: "Lemak Jenuh", value: "2.5", unit: "g" },
      { name: "MCT", value: "0", unit: "g" },
      { name: "Protein", value: "6", unit: "g" },
      { name: "KH total", value: "29", unit: "g" },
      { name: "Serat Pangan", value: "1", unit: "g" },
      { name: "Inulin", value: "1", unit: "g" },
      { name: "Gula Total", value: "11", unit: "g" },
      { name: "Laktosa", value: "6", unit: "g" },
      { name: "Garam / Natrium", value: "70", unit: "mg" },
    ],

    vitamins: [
      { name: "Vitamin A", value: "150", unit: "mcg" },
      { name: "Vitamin B1", value: "0.21", unit: "mg" },
      { name: "Vitamin B2", value: "0.4", unit: "mg" },
      { name: "Vitamin B3", value: "3", unit: "mg" },
      { name: "Vitamin B5", value: "0.75", unit: "mg" },
      { name: "Vitamin B6", value: "0.26", unit: "mg" },
      { name: "Asam folat", value: "Tidak diukur", unit: "mcg" },
      { name: "Vitamin B12", value: "0.36", unit: "mcg" },
      { name: "Vitamin C", value: "27", unit: "mg" },
      { name: "Vitamin D3", value: "0.9", unit: "mcg" },
      { name: "Vitamin E", value: "2.25", unit: "mg" },
      { name: "Biotin", value: "4.5", unit: "mcg" },
      { name: "Kalium", value: "282", unit: "mg" },
      { name: "Kalsium", value: "165", unit: "mg" },
      { name: "Magnesium", value: "14", unit: "mg" },
      { name: "Fosfor", value: "175", unit: "mg" },
      { name: "Besi", value: "2.2", unit: "mg" },
      { name: "Yodium", value: "22.5", unit: "mcg" },
      { name: "Selenium", value: "2.4", unit: "mcg" },
      { name: "Kromium", value: "Tidak diukur" },
      { name: "Seng", value: "3.25", unit: "mg" },
    ],
    components: [
      { name: "Zat Gizi Lainnya", value: "DHA 14 mg" },
    ],
  },

  entramix: {
    productInformation: {
      background:
        "Minuman berbasis whey bubuk dengan sumber protein, sumber serat pangan, sumber kalsium, rendah laktosa, mengandung 12 vitamin dan 8 mineral untuk memenuhi gizi seimbang pada dewasa dan lansia. Entramix digunakan untuk melengkapi gaya hidup sehat dengan pola makan gizi lengkap dan seimbang. Entramix mendukung pemenuhan nutrisi dan aktivitas sehari-hari.",

      servingInstruction:
        "Untuk menyajikan 250 mL larutan, tambahkan satu (1) Sachet ENTRAMIX (± 58 Gram) ke dalam 200 mL air matang hangat, aduk hingga larut.",

      servingPer100ml:
        "23 Gram serbuk ke 80 mL air",

      osmolalityByFlavor: [
        { flavor: "Coklat", value: "453 mOsm/L" },
        { flavor: "Vanilla", value: "424 mOsm/L" },
      ],

      flavors: [
        "Vanilla",
        "Coklat",
      ],

      availability:
        "Boks",

      packaging:
        "Gramasi 174 Gram (3 x 58 Gram).",

      storage:
        "Simpan di tempat yang kering, bersih, dan jangan terkena sinar matahari langsung. Jangan dikonsumsi apabila terjadi perubahan yang mencolok pada bau, rasa, atau warna.",

      composition:
        "Base bubuk (Maltodekstrin, Kalsium Kaseinat, Lemak Nabati, Protein Whey mengandung Protein Susu, Trigliserida Rantai Sedang, Antioksidan (Askorbil Palmitat dan Tokoferol)), Serat Pangan, Sukrosa, Perisa Sintetik, Premiks Mineral dan Vitamin.",

      specificComposition: ["Protein, MCT, Omega 3, Omega 6, Serat Pangan, Komposisi gizi seimbang"],
    },

    displayName: "Entramix",
    category: "Adult & Elderly Nutrition Formula",

    title: "Nutrition Facts",

    subtitle:
      "Informasi nutrisi lengkap Entramix untuk membantu memenuhi kebutuhan gizi seimbang dewasa hingga lansia.",

    serving: "Per Sajian Entramix",

    variants: [
      {
        name: "Vanila",
        image:
          "/images/mednut/products/front/entramix-vanila.png",
      },
      {
        name: "Cokelat",
        image:
          "/images/mednut/products/front/entramix-cokelat.png",
      },
    ],

    disclaimer: [
      "* Persen AKG berdasarkan kebutuhan energi 2150 kkal.",
    ],

    nutrition: [
      { name: "Energi", value: "250", unit: "kkal" },
      { name: "Energi dari lemak", value: "54", unit: "kkal" },
      { name: "Lemak total", value: "6", unit: "g" },
      { name: "Lemak tak jenuh tunggal", value: "0", unit: "g" },
      { name: "Lemak tak jenuh ganda", value: "0", unit: "g" },
      { name: "Omega 3", value: "72", unit: "mg" },
      { name: "Omega 6", value: "353", unit: "mg" },
      { name: "Lemak trans", value: "0", unit: "g" },
      { name: "Kolesterol", value: "10", unit: "mg" },
      { name: "Lemak Jenuh", value: "3", unit: "g" },
      { name: "MCT", value: "3.5", unit: "g" },
      { name: "Protein", value: "10", unit: "g" },
      { name: "KH total", value: "38", unit: "g" },
      { name: "Serat Pangan", value: "3", unit: "g" },
      { name: "Inulin", value: "3", unit: "g" },
      { name: "Gula Total", value: "9", unit: "g" },
      { name: "Laktosa", value: "0", unit: "g" },
      { name: "Garam / Natrium", value: "60", unit: "mg" },
    ],

    vitamins: [
      { name: "Vitamin A", value: "20% AKG", unit: "mcg" },
      { name: "Vitamin B1", value: "15% AKG", unit: "mg" },
      { name: "Vitamin B2", value: "15% AKG", unit: "mg" },
      { name: "Vitamin B3", value: "15% AKG", unit: "mg" },
      { name: "Vitamin B5", value: "15% AKG", unit: "mg" },
      { name: "Vitamin B6", value: "20% AKG", unit: "mg" },
      { name: "Asam folat", value: "15% AKG", unit: "mcg" },
      { name: "Vitamin B12", value: "15% AKG", unit: "mcg" },
      { name: "Vitamin C", value: "30% AKG", unit: "mg" },
      { name: "Vitamin D3", value: "15% AKG", unit: "mcg" },
      { name: "Vitamin E", value: "15% AKG", unit: "mg" },
      { name: "Biotin", value: "10% AKG", unit: "mcg" },
      { name: "Kalium", value: "2% AKG", unit: "mg" },
      { name: "Kalsium", value: "15% AKG", unit: "mg" },
      { name: "Magnesium", value: "15% AKG", unit: "mg" },
      { name: "Fosfor", value: "20% AKG", unit: "mg" },
      { name: "Besi", value: "20% AKG", unit: "mg" },
      { name: "Yodium", value: "15% AKG", unit: "mcg" },
      { name: "Selenium", value: "15% AKG", unit: "mcg" },
      { name: "Kromium", value: "15% AKG" },
      { name: "Seng", value: "15% AKG", unit: "mg" },
    ],
    components: [
      { name: "Zat Gizi Lainnya", value: "-" },
    ],

    highlights: [
      {
        title: "Tinggi Kalori",
        description:
          "Membantu memenuhi kebutuhan energi harian.",
        icon:
          "/images/mednut/products/icons/entramix/tinggi-kalori.svg",
      },
      {
        title: "Nutrisi Lengkap dan Seimbang",
        description:
          "Mengandung kombinasi zat gizi untuk mendukung kebutuhan nutrisi tubuh.",
        icon:
          "/images/mednut/products/icons/entramix/sumber-kalsium.svg",
      },
      {
        title: "Inulin",
        description:
          "Prebiotik untuk saluran cerna.",
        icon:
          "/images/mednut/products/icons/entramix/serat-pangan-inulin.svg",
      },
    ],
  },


  entrasoy: {
    productInformation: {
      background:
        "Entrasoy by Entramix merupakan formula dengan 100% protein nabati dari isolat protein kedelai. Entrasoy mengandung tinggi protein, tinggi serat pangan, sumber 12 vitamin dan 8 mineral. Entrasoy bebas laktosa, bebas gluten, dan bebas kolesterol.",

      servingInstruction:
        "Untuk menyajikan 180 mL larutan, tambahkan satu (1) Sachet ENTRASOY by Entramix (± 40 Gram) ke dalam 160 mL air matang hangat, aduk hingga larut.",

      servingPer100ml:
        "Mengikuti kebutuhan",

      osmolalityByFlavor: [
        { flavor: "Almond Soya", value: "374 mOsm/L" },
      ],

      flavors: [
        "Almond Soya",
      ],

      availability:
        "Boks",

      packaging:
        "Gramasi 200 Gram (5 Sachet x 40 Gram).",

      storage:
        "Simpan di tempat yang kering, bersih, dan jangan terkena sinar matahari langsung. Jangan dikonsumsi apabila terjadi perubahan yang mencolok pada bau, rasa, atau warna.",

      composition:
        "Sari Kacang Kedelai Bubuk, Maltodekstrin, Isolat Protein Kedelai, Serat Pangan (mengandung Inulin), Sukrosa, Perisa Sintetik, Pengemulsi Nabati, Bubuk Almond, Pemanis Alami Glikosida Steviol, Premiks Mineral dan Vitamin.",

      specificComposition: ["Mengandung isoflavon"],
    },

    displayName: "Entrasoy",
    category: "Plant Based Nutrition Formula",

    title: "Nutrition Facts",

    subtitle:
      "Informasi nutrisi lengkap Entrasoy dengan protein nabati dari isolat protein kedelai.",

    serving:
      "Per Sajian Entrasoy",

    variants: [
      {
        name: "Almond Soya",
        image:
          "/images/mednut/products/front/entrasoy.png",
      },
    ],

    disclaimer: [
      "* Persen AKG berdasarkan kebutuhan energi 2150 kkal.",
    ],

    nutrition: [
      { name: "Energi", value: "160", unit: "kkal" },
      { name: "Energi dari lemak", value: "30", unit: "kkal" },
      { name: "Lemak total", value: "3.5", unit: "g" },
      { name: "Lemak tak jenuh tunggal", value: "0.5", unit: "g" },
      { name: "Lemak tak jenuh ganda", value: "1.5", unit: "g" },
      { name: "Omega 3", value: "0", unit: "mg" },
      { name: "Omega 6", value: "0", unit: "mg" },
      { name: "Lemak trans", value: "0", unit: "g" },
      { name: "Kolesterol", value: "0", unit: "mg" },
      { name: "Lemak Jenuh", value: "1", unit: "g" },
      { name: "MCT", value: "0", unit: "g" },
      { name: "Protein", value: "9", unit: "g" },
      { name: "KH total", value: "25", unit: "g" },
      { name: "Serat Pangan", value: "2.5", unit: "g" },
      { name: "Inulin", value: "2", unit: "g" },
      { name: "Gula Total", value: "6", unit: "g" },
      { name: "Laktosa", value: "0", unit: "g" },
      { name: "Garam / Natrium", value: "130", unit: "mg" },
    ],

    vitamins: [
      { name: "Vitamin A", value: "72", unit: "mcg" },
      { name: "Vitamin B1", value: "0.15", unit: "mg" },
      { name: "Vitamin B2", value: "0.18", unit: "mg" },
      { name: "Vitamin B3", value: "2.1", unit: "mg" },
      { name: "Vitamin B5", value: "0.5", unit: "mg" },
      { name: "Vitamin B6", value: "0.18", unit: "mg" },
      { name: "Asam folat", value: "44", unit: "mcg" },
      { name: "Vitamin B12", value: "0.27", unit: "mcg" },
      { name: "Vitamin C", value: "9", unit: "mg" },
      { name: "Vitamin D3", value: "1.6", unit: "mcg" },
      { name: "Vitamin E", value: "1.6", unit: "mg" },
      { name: "Biotin", value: "3.2", unit: "mcg" },
      { name: "Kalium", value: "300", unit: "mg" },
      { name: "Kalsium", value: "133", unit: "mg" },
      { name: "Magnesium", value: "66", unit: "mg" },
      { name: "Fosfor", value: "84", unit: "mg" },
      { name: "Besi", value: "3.1", unit: "mg" },
      { name: "Yodium", value: "17", unit: "mcg" },
      { name: "Selenium", value: "3", unit: "mcg" },
      { name: "Kromium", value: "Tidak diukur" },
      { name: "Seng", value: "1.5", unit: "mg" },
    ],
    components: [
      { name: "Zat Gizi Lainnya", value: null },
    ],
  },

  hepatosol: {
    productInformation: {
      osmolalityByFlavor: [
        { flavor: "Vanilla", value: "429 mOsm/L" },
        { flavor: "Coklat", value: "420 mOsm/L" },
      ],
      background:
        "Hepatosol merupakan nutrisi yang diperkaya BCAA dan Lemak Rantai Sedang (MCT) yang dapat membantu mempercepat pemulihan yang dikonsumsi sebagai kudapan malam (late evening snack) sebelum beristirahat.",

      servingInstruction:
        "Untuk menyajikan 363 mL larutan, tambahkan satu (1) Sachet HEPATOSOL (± 80 Gram) ke dalam 300 mL air matang hangat, aduk hingga larut.",

      servingPer100ml:
        "22 Gram serbuk ke 83 mL air",

      flavors: [
        "Vanilla",
        "Coklat",
      ],

      availability:
        "Boks",

      packaging:
        "Gramasi 240 Gram (3 Sachet x 80 Gram).",

      storage:
        "Simpan di tempat yang kering, bersih, dan jangan terkena sinar matahari langsung. Jangan dikonsumsi apabila terjadi perubahan yang mencolok pada bau, rasa, atau warna.",

      composition:
        "Maltodekstrin, Bubuk MCT (mengandung Protein Susu), Sukrosa, Isolat Protein Whey, Konsentrat Protein Whey, Inulin, Premiks Asam Amino (BCAA), Natrium Klorida, Kalsium Karbonat, Mononatrium Fosfat, Bubuk Lemak Nabati (mengandung Protein Susu), Premiks Vitamin & Mineral, Perisa Sintetik (Vanila & Susu).",
    },

    displayName: "Hepatosol",
    category: "Clinical Nutrition Formula",

    variants: [
      {
        name: "Vanila",
        image:
          "/images/mednut/products/front/hepatosol-vanila.png",
      },
      {
        name: "Cokelat",
        image:
          "/images/mednut/products/front/hepatosol-cokelat.png",
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
    serving: "Per Sajian Hepatosol",

    highlightTitle:
      "Mengapa Hepatosol?",

    highlightSubtitle:
      "Formula nutrisi klinis yang diformulasikan untuk membantu memenuhi kebutuhan pasien dengan gangguan fungsi hati ringan hingga moderate.",

    nutrition: [
      { name: "Energi", value: "380", unit: "kkal" },
      { name: "Energi dari lemak", value: "140", unit: "kkal" },
      { name: "Lemak total", value: "15", unit: "g" },
      { name: "Lemak tak jenuh tunggal", value: "0", unit: "g" },
      { name: "Lemak tak jenuh ganda", value: "0", unit: "g" },
      { name: "Omega 3", value: "0", unit: "mg" },
      { name: "Omega 6", value: "0", unit: "mg" },
      { name: "Lemak trans", value: "0", unit: "g" },
      { name: "Kolesterol", value: "2", unit: "mg" },
      { name: "Lemak Jenuh", value: "15", unit: "g" },
      { name: "MCT", value: "12", unit: "g" },
      { name: "Protein", value: "11", unit: "g" },
      { name: "KH total", value: "49", unit: "g" },
      { name: "Serat Pangan", value: "2", unit: "g" },
      { name: "Inulin", value: "-", unit: "g" },
      { name: "Gula Total", value: "23", unit: "g" },
      { name: "Laktosa", value: "0", unit: "g" },
      { name: "Garam / Natrium", value: "170", unit: "mg" },
    ],

    vitamins: [
      { name: "Vitamin A", value: "93", unit: "mcg" },
      { name: "Vitamin B1", value: "0.18", unit: "mg" },
      { name: "Vitamin B2", value: "0.2", unit: "mg" },
      { name: "Vitamin B3", value: "1.8", unit: "mg" },
      { name: "Vitamin B5", value: "0.77", unit: "mg" },
      { name: "Vitamin B6", value: "0.14", unit: "mg" },
      { name: "Asam folat", value: "58", unit: "mcg" },
      { name: "Vitamin B12", value: "0.3", unit: "mcg" },
      { name: "Vitamin C", value: "11", unit: "mg" },
      { name: "Vitamin D3", value: "2.3", unit: "mcg" },
      { name: "Vitamin E", value: "2.2", unit: "mg" },
      { name: "Biotin", value: "3.7", unit: "mcg" },
      { name: "Kalium", value: "60", unit: "mg" },
      { name: "Kalsium", value: "150", unit: "mg" },
      { name: "Magnesium", value: "Tidak diukur", unit: "mg" },
      { name: "Fosfor", value: "82", unit: "mg" },
      { name: "Besi", value: "3.4", unit: "mg" },
      { name: "Yodium", value: "18", unit: "mcg" },
      { name: "Selenium", value: "Tidak diukur", unit: "mcg" },
      { name: "Kromium", value: "Tidak diukur" },
      { name: "Seng", value: "1.3", unit: "mg" },
    ],

    components: [
      { name: "Zat Gizi Lainnya", value: "Valin 0,6 g, Isoleusin 0,8 g, Leusin 1,22 g" },
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
        icon: "/images/mednut/products/icons/hepatosol/bebas-laktosa-gluten.svg",
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



  nephrisol: {
    displayName: "Nephrisol",
    category: "Clinical Nutrition Formula",

    productInformation: {
      background:
        "Nephrisol diformulasikan secara khusus untuk membantu memenuhi kebutuhan gizi pasien ginjal kronik tahap pradialisis dengan diet rendah protein dan tinggi kalori serta berbagai mikronutrien yang sesuai. Nephrisol merupakan sumber 13 vitamin dan 6 mineral, rendah laktosa, dan sumber serat pangan.",

      servingInstruction:
        "Untuk menyajikan 250 mL larutan, tambahkan satu (1) Sachet NEPHRISOL (± 67 Gram) ke dalam 200 mL air matang hangat, aduk hingga larut.",

      servingPer100ml:
        "29 Gram serbuk ke 78 mL air",

      osmolalityByFlavor: [
        { flavor: "Vanilla", value: "438 mOsm/L" },
        { flavor: "Cappuccino", value: "608 mOsm/L" },
      ],

      flavors: [
        "Vanilla",
        "Cappuccino",
      ],

      availability:
        "Boks",

      packaging:
        "Gramasi 201 Gram (3 Sachet x 67 Gram).",

      storage:
        "Simpan di tempat yang kering, bersih, dan jangan terkena sinar matahari langsung. Jangan dikonsumsi apabila terjadi perubahan yang mencolok pada bau, rasa, atau warna.",

      composition:
        "Base Bubuk (mengandung Susu, Antioksidan Askorbil Palmitat dan dl Alfa Tokoferol), Isomaltulosa, Serat Pangan (mengandung Inulin), Trigliserida Rantai Sedang (mengandung Susu), Premiks Asam Amino, Perisa Sintetik (mengandung Pewarna Alami Karamel IV, Pengawet Kalium Sorbat), Pemanis Alami Glikosida Steviol, Premiks Mineral dan Vitamin.",
    },

    variants: [
      {
        name: "Cappuccino",
        image:
          "/images/mednut/products/front/nephrisol-cappucino.png",
      },
      {
        name: "Vanilla",
        image:
          "/images/mednut/products/front/nephrisol-vanila.png",
      },
    ],

    title: "Nutrition Facts",
    subtitle:
      "Informasi nutrisi lengkap untuk membantu memenuhi kebutuhan pasien ginjal kronik tahap pradialisis.",

    serving: "Per Sajian Nephrisol",

    nutrition: [
      { name: "Energi", value: "301.5", unit: "kkal" },
      { name: "Energi dari lemak", value: "100.5", unit: "kkal" },
      { name: "Lemak total", value: "10.72", unit: "g" },
      { name: "Lemak tak jenuh tunggal", value: "4.69", unit: "g" },
      { name: "Lemak tak jenuh ganda", value: "2.68", unit: "g" },
      { name: "Omega 3", value: "Tidak diukur", unit: "mg" },
      { name: "Omega 6", value: "Tidak diukur", unit: "mg" },
      { name: "Lemak trans", value: "0", unit: "g" },
      { name: "Kolesterol", value: "7.37", unit: "mg" },
      { name: "Lemak Jenuh", value: "3.015", unit: "g" },
      { name: "MCT", value: "Tidak diukur", unit: "g" },
      { name: "Protein", value: "5.36", unit: "g" },
      { name: "KH total", value: "44.89", unit: "g" },
      { name: "Serat Pangan", value: "2.68", unit: "g" },
      { name: "Inulin", value: "2.68", unit: "g" },
      { name: "Gula Total", value: "16.08", unit: "g" },
      { name: "Laktosa", value: "0", unit: "g" },
      { name: "Garam / Natrium", value: "46.9", unit: "mg" },
    ],

    vitamins: [
      { name: "Vitamin A", value: "93.8", unit: "mcg" },
      { name: "Vitamin B1", value: "0.1943", unit: "mg" },
      { name: "Vitamin B2", value: "0.1943", unit: "mg" },
      { name: "Vitamin B3", value: "1.608", unit: "mg" },
      { name: "Vitamin B5", value: "0.804", unit: "mg" },
      { name: "Vitamin B6", value: "1.005", unit: "mg" },
      { name: "Asam folat", value: "174.2", unit: "mcg" },
      { name: "Vitamin B12", value: "0.335", unit: "mcg" },
      { name: "Vitamin C", value: "12.73", unit: "mg" },
      { name: "Vitamin D3", value: "2.077", unit: "mcg" },
      { name: "Vitamin E", value: "2.077", unit: "mg" },
      { name: "Biotin", value: "4.154", unit: "mcg" },
      { name: "Kalium", value: "241.2", unit: "mg" },
      { name: "Kalsium", value: "165.49", unit: "mg" },
      { name: "Magnesium", value: "27.47", unit: "mg" },
      { name: "Fosfor", value: "148.74", unit: "mg" },
      { name: "Besi", value: "3.149", unit: "mg" },
      { name: "Yodium", value: "20.77", unit: "mcg" },
      { name: "Selenium", value: "4.221", unit: "mcg" },
      { name: "Kromium", value: "Tidak diukur" },
      { name: "Seng", value: "1.809", unit: "mg" },
    ],

    components: [
      { name: "Zat Gizi Lainnya", value: "Vitamin K1 10 mcg" },
    ],

    whySubtitle:
      "Formulasi nutrisi yang dirancang untuk mendukung kebutuhan penyakit ginjal kronik stadium pradialisis",

    highlights: [
      {
        title: "Kandungan Mikronutrien",
        description:
          "Memiliki kandungan natrium, kalium, dan fosfor yang rendah.",
        icon:
          "/images/client-assets/icon/NEPHRISOL/NEW ICON/Kandungan Mikronutrien.svg",
      },
      {
        title: "Tinggi Energi",
        description:
          "Membantu pemenuhan kalori harian yang meningkat.",
        icon:
          "/images/mednut/products/icons/nephrisol-d/tinggi-energi.svg",
      },
    ],
  },

  "nephrisol-d": {
    displayName: "Nephrisol-D",
    category: "Clinical Nutrition Formula",

    productInformation: {
      background:
        "Nephrisol-D diformulasikan khusus untuk membantu memenuhi kebutuhan gizi pasien penyakit ginjal kronik dengan terapi dialisis (CAPD dan HD). Formula ini memiliki kandungan tinggi kalori dan protein, rendah laktosa, serta diperkaya dengan vitamin, mineral, dan serat pangan.",

      servingInstruction:
        "Untuk menyajikan 200 mL larutan, tambahkan satu (1) Sachet NEPHRISOL-D (± 70 Gram) ke dalam 150 mL air matang hangat, aduk hingga larut.",

      servingPer100ml:
        "35 Gram serbuk ke 75 mL air",

      osmolalityByFlavor: [
        { flavor: "Vanilla", value: "478 mOsm/L" },
        { flavor: "Cappuccino", value: "490 mOsm/L" },
      ],

      flavors: [
        "Vanilla",
        "Cappuccino",
      ],

      availability:
        "Boks",

      packaging:
        "Gramasi 210 Gram (3 Sachet x 70 Gram).",

      storage:
        "Simpan di tempat yang kering, bersih, dan jangan terkena sinar matahari langsung. Jangan dikonsumsi apabila terjadi perubahan yang mencolok pada bau, rasa, atau warna.",

      composition:
        "Base Bubuk, Serat Pangan (mengandung Inulin), Isomaltulosa, Lemak Trigliserida Rantai Sedang, Premiks Asam Amino, Perisa Sintetik (mengandung Pemanis Alami Glikosida Steviol), Pemanis Alami Glikosida Steviol, Premiks Mineral dan Vitamin.",
    },

    variants: [
      {
        name: "Vanilla",
        image:
          "/images/mednut/products/front/nephrisol-d-vanila.png",
      },
      {
        name: "Cappuccino",
        image:
          "/images/mednut/products/front/nephrisol-d-cappucino.png",
      },
    ],

    disclaimer: [
      "* Persen AKG berdasarkan kebutuhan energi 2150 kkal.",
    ],

    targetAudience: {
      title: "Siapa yang Membutuhkan Nephrisol-D?",
      description:
        "Formula nutrisi klinis untuk membantu memenuhi kebutuhan pasien penyakit ginjal kronik dengan terapi dialisis.",
    },

    title: "Nutrition Facts",
    subtitle:
      "Informasi nutrisi lengkap untuk membantu memenuhi kebutuhan penyakit ginjal kronik",

    serving: "Per Sajian Nephrisol-D",

    nutrition: [
      { name: "Energi", value: "315", unit: "kkal" },
      { name: "Energi dari lemak", value: "100.8", unit: "kkal" },
      { name: "Lemak total", value: "11.2", unit: "g" },
      { name: "Lemak tak jenuh tunggal", value: "4.2", unit: "g" },
      { name: "Lemak tak jenuh ganda", value: "2.45", unit: "g" },
      { name: "Omega 3", value: "Tidak diukur", unit: "mg" },
      { name: "Omega 6", value: "Tidak diukur", unit: "mg" },
      { name: "Lemak trans", value: "0", unit: "g" },
      { name: "Kolesterol", value: "24.5", unit: "mg" },
      { name: "Lemak Jenuh", value: "4.2", unit: "g" },
      { name: "MCT", value: "Tidak diukur", unit: "g" },
      { name: "Protein", value: "11.9", unit: "g" },
      { name: "KH total", value: "42", unit: "g" },
      { name: "Serat Pangan", value: "4.2", unit: "g" },
      { name: "Inulin", value: "4.2", unit: "g" },
      { name: "Gula Total", value: "6.3", unit: "g" },
      { name: "Laktosa", value: "0", unit: "g" },
      { name: "Garam / Natrium", value: "84", unit: "mg" },
    ],

    vitamins: [
      { name: "Vitamin A", value: "87.5", unit: "mcg" },
      { name: "Vitamin B1", value: "0.189", unit: "mg" },
      { name: "Vitamin B2", value: "0.203", unit: "mg" },
      { name: "Vitamin B3", value: "2.45", unit: "mg" },
      { name: "Vitamin B5", value: "0.7", unit: "mg" },
      { name: "Vitamin B6", value: "0.525", unit: "mg" },
      { name: "Asam folat", value: "101.5", unit: "mcg" },
      { name: "Vitamin B12", value: "0.336", unit: "mcg" },
      { name: "Vitamin C", value: "11.9", unit: "mg" },
      { name: "Vitamin D3", value: "1.96", unit: "mcg" },
      { name: "Vitamin E", value: "1.89", unit: "mg" },
      { name: "Biotin", value: "4.2", unit: "mcg" },
      { name: "Kalium", value: "101.5", unit: "mg" },
      { name: "Kalsium", value: "205", unit: "mg" },
      { name: "Magnesium", value: "21", unit: "mg" },
      { name: "Fosfor", value: "126", unit: "mg" },
      { name: "Besi", value: "2.87", unit: "mg" },
      { name: "Yodium", value: "21", unit: "mcg" },
      { name: "Selenium", value: "3.92", unit: "mcg" },
      { name: "Kromium", value: "Tidak diukur" },
      { name: "Seng", value: "1.82", unit: "mg" },
    ],

    components: [
      { name: "Zat Gizi Lainnya", value: "Vitamin K 7 mcg" },
    ],

    highlights: [
      {
        title: "Rendah Gula dan Laktosa",
        description:
          "Diformulasikan rendah gula dan rendah laktosa untuk mendukung toleransi konsumsi.",
        icon:
          "/images/client-assets/icon/NEPHRISOL/Website Icon-18.svg",
      },
      {
        title: "Tinggi Energi",
        description:
          "Membantu pemenuhan kalori harian yang meningkat.",
        icon:
          "/images/mednut/products/icons/nephrisol-d/tinggi-energi.svg",
      },
      {
        title: "Tinggi Protein",
        description:
          "Membantu memenuhi kebutuhan protein penyakit ginjal kronik stadium dialisis.",
        icon:
          "/images/mednut/products/icons/nephrisol-d/tinggi-protein.svg",
      },
      {
        title: "Kandungan Mikronutrien",
        description:
          "Memiliki kandungan natrium, kalium, dan fosfor yang rendah.",
        icon:
          "/images/client-assets/icon/NEPHRISOL/NEW ICON/Kandungan Mikronutrien.svg",
      },
    ],
  },



  oligo: {
    displayName: "Oligo",
    category: "Clinical Nutrition Formula",

    productInformation: {
      background:
        "Oligo merupakan formula oligomerik dengan kandungan makronutrien cepat serap dengan mikronutrien yang lengkap. Oligo mengandung protein berbasis peptida / oligomerik, lemak rantai sedang dan karbohidrat sederhana menjadi solusi pada pasien dengan gangguan penyerapan saluran cerna.",

      servingInstruction:
        "Untuk menyajikan 250 mL larutan, tambahkan satu (1) Sachet OLIGO (± 55 Gram) ke dalam 200 mL air matang hangat, aduk hingga larut.",

      servingPer100ml:
        "25 Gram serbuk ke 80 mL air",

      osmolalityByFlavor: [
        { flavor: "Tropical Banana", value: "353 mOsm/L" },
      ],

      flavors: [
        "Tropical Banana",
      ],

      availability:
        "Boks",

      packaging:
        "Gramasi 165 Gram (3 Sachet x 55 Gram)",

      storage:
        "Simpan di tempat yang kering, bersih, dan jangan terkena sinar matahari langsung. Jangan dikonsumsi apabila terjadi perubahan yang mencolok pada bau, rasa, atau warna.",

      composition:
        "Maltodekstrin, Protein Whey Terhidrolisa, Lemak Trigliserida Rantai Sedang (mengandung Protein Susu), Isomaltulosa, Bubuk Lemak Nabati, Sukrosa, DHA (mengandung antioksidan Natrium Askorbat, dl-Alfa Tokoferol, Askorbil Palmitat, dan Protein Susu), Perisa Sintetik, Bubuk Pisang, Premiks Mineral & Vitamin.",
    },

    variants: [
      {
        name: "Tropical Banana",
        image:
          "/images/mednut/products/front/oligo.png",
      },
    ],

    targetAudience: {
      title: "Siapa yang Membutuhkan Oligo?",
      description:
        "Formula nutrisi oligomerik untuk membantu memenuhi kebutuhan nutrisi pada kondisi gangguan pengosongan lambung dan malabsorbsi saluran cerna.",
    },

    title: "Nutrition Facts",
    subtitle:
      "Informasi kandungan gizi Oligo per sajian.",
    serving: "Per Sajian Oligo",

    nutrition: [
      { name: "Energi", value: "250", unit: "kkal" },
      { name: "Energi dari lemak", value: "90", unit: "kkal" },
      { name: "Lemak total", value: "10", unit: "g" },
      { name: "Lemak tak jenuh tunggal", value: "1", unit: "g" },
      { name: "Lemak tak jenuh ganda", value: "0.5", unit: "g" },
      { name: "Omega 3", value: "80", unit: "mg" },
      { name: "Omega 6", value: "280", unit: "mg" },
      { name: "Lemak trans", value: "0", unit: "g" },
      { name: "Kolesterol", value: "25", unit: "mg" },
      { name: "Lemak Jenuh", value: "8", unit: "g" },
      { name: "MCT", value: "7.5", unit: "g" },
      { name: "Protein", value: "10", unit: "g" },
      { name: "KH total", value: "31", unit: "g" },
      { name: "Serat Pangan", value: "0", unit: "g" },
      { name: "Inulin", value: "0", unit: "g" },
      { name: "Gula Total", value: "8", unit: "g" },
      { name: "Laktosa", value: "1", unit: "g" },
      { name: "Garam / Natrium", value: "90", unit: "mg" },
    ],

    vitamins: [
      { name: "Vitamin A", value: "63", unit: "mcg" },
      { name: "Vitamin B1", value: "0.13", unit: "mg" },
      { name: "Vitamin B2", value: "0.15", unit: "mg" },
      { name: "Vitamin B3", value: "2.1", unit: "mg" },
      { name: "Vitamin B5", value: "0.48", unit: "mg" },
      { name: "Vitamin B6", value: "0.16", unit: "mg" },
      { name: "Asam folat", value: "40", unit: "mcg" },
      { name: "Vitamin B12", value: "0.25", unit: "mcg" },
      { name: "Vitamin C", value: "23", unit: "mg" },
      { name: "Vitamin D3", value: "1.4", unit: "mcg" },
      { name: "Vitamin E", value: "1.3", unit: "mg" },
      { name: "Biotin", value: "2.9", unit: "mcg" },
      { name: "Kalium", value: "125", unit: "mg" },
      { name: "Kalsium", value: "98", unit: "mg" },
      { name: "Magnesium", value: "35", unit: "mg" },
      { name: "Fosfor", value: "64", unit: "mg" },
      { name: "Besi", value: "2", unit: "mg" },
      { name: "Yodium", value: "16", unit: "mcg" },
      { name: "Selenium", value: "2.8", unit: "mcg" },
      { name: "Kromium", value: "2.5" },
      { name: "Seng", value: "2.5", unit: "mg" },
    ],

    components: [
      { name: "Zat Gizi Lainnya", value: "DHA 32 mg, EPA 5 mg" },
    ],

    highlightTitle:
      "Mengapa Oligo?",

    highlightSubtitle:
      "Formula oligomerik dengan makronutrien cepat serap untuk mendukung kebutuhan nutrisi pada gangguan saluran cerna.",

    highlights: [
      {
        title: "Protein Whey",
        description:
          "Protein berbasis peptida / oligomerik yang membantu mendukung proses penyerapan.",
        icon:
          "/images/mednut/products/icons/oligo/protein-terhidrolisa.svg",
      },
      {
        title: "Rasa Tropical Banana",
        description:
          "Memberikan pengalaman rasa yang lebih nikmat saat dikonsumsi.",
        icon:
          "/images/mednut/products/icons/oligo/rasa-tropical-banana.svg",
      },
      {
        title: "Lemak MCT",
        description:
          "Mengandung lemak rantai sedang yang mudah dan cepat diserap.",
        icon:
          "/images/mednut/products/icons/oligo/lemak-mct.svg",
      },
    ],
  },

  "hepatosol-lola": {
    displayName: "Hepatosol LOLA",

    productInformation: {
      osmolalityByFlavor: [
        { flavor: "Jeruk", value: "470 mOsm/L" },
      ],
      background:
        "Hepatosol LOLA nutrisi untuk gangguan fungsi hati berat. Dengan kombinasi kandungan BCAA dan LOLA yang membantu menurunkan kadar amonia dalam darah, memperbaiki keseimbangan nitrogen dan rasio Fischer serta membantu menurunkan pemecahan protein sebagai sumber protein otot. Hepatosol LOLA juga dapat dikonsumsi sebagai kudapan malam (late evening snack) sebelum beristirahat.",

      servingInstruction:
        "Untuk menyajikan 303 mL larutan, tambahkan satu (1) Sachet HEPATOSOL LOLA (± 83 Gram) ke dalam 250 mL air matang hangat, aduk hingga larut.",

      servingPer100ml:
        "27 Gram serbuk ke 83 mL air",

      flavors: [
        "Jeruk",
      ],

      availability:
        "Boks",

      packaging:
        "Gramasi 249 Gram (3 Sachet x 83 Gram).",

      storage:
        "Simpan di tempat yang kering, bersih, dan jangan terkena sinar matahari langsung. Jangan dikonsumsi apabila terjadi perubahan yang mencolok pada bau, rasa, atau warna.",

      composition:
        "Dekstrin, Maltodekstrin, Konsentrat Protein Whey, Bubuk MCT, Inulin, Premiks Asam Amino, Natrium Klorida, Mononatrium Fosfat, Kalsium Karbonat, Trikalsium Fosfat",

      specificComposition: ["MCT, BCAA, LOLA, Inulin"],
    },

    category: "Clinical Nutrition Formula",

    variants: [
      {
        name: "Jeruk",
        image:
          "/images/mednut/products/front/hepatosol-lola.png",
      },
    ],

    disclaimer: [
      "* Persen AKG berdasarkan kebutuhan energi 2150 Kkal.",
      "** Middle Chain Triglycerides.",
    ],

    targetAudience: {
      title: "Siapa yang Membutuhkan Hepatosol LOLA?",
      description:
        "Formula nutrisi klinis spesifik untuk membantu memenuhi kebutuhan pasien dengan gangguan fungsi hati berat.",
    },

    title: "Nutrition Facts",
    subtitle:
      "Informasi nutrisi lengkap untuk pasien dengan gangguan fungsi hati berat.",
    serving: "Per Sajian Hepatosol LOLA",

    highlightTitle:
      "Mengapa Hepatosol LOLA?",

    highlightSubtitle:
      "Formula nutrisi klinis spesifik untuk membantu memenuhi kebutuhan pasien dengan gangguan fungsi hati berat.",

    nutrition: [
      { name: "Energi", value: "340", unit: "kkal" },
      { name: "Energi dari lemak", value: "60", unit: "kkal" },
      { name: "Lemak total", value: "6", unit: "g" },
      { name: "Lemak tak jenuh tunggal", value: "0.4", unit: "g" },
      { name: "Lemak tak jenuh ganda", value: "0", unit: "g" },
      { name: "Omega 3", value: "0", unit: "mg" },
      { name: "Omega 6", value: "0", unit: "mg" },
      { name: "Lemak trans", value: "0", unit: "g" },
      { name: "Kolesterol", value: "4", unit: "mg" },
      { name: "Lemak Jenuh", value: "5", unit: "g" },
      { name: "MCT", value: "5", unit: "g" },
      { name: "Protein", value: "13", unit: "g" },
      { name: "KH total", value: "59", unit: "g" },
      { name: "Serat Pangan", value: "2", unit: "g" },
      { name: "Inulin", value: "-", unit: "g" },
      { name: "Gula Total", value: "2", unit: "g" },
      { name: "Laktosa", value: "0", unit: "g" },
      { name: "Garam / Natrium", value: "180", unit: "mg" },
    ],

    vitamins: [
      { name: "Vitamin A", value: "97", unit: "mcg" },
      { name: "Vitamin B1", value: "0.21", unit: "mg" },
      { name: "Vitamin B2", value: "0.21", unit: "mg" },
      { name: "Vitamin B3", value: "1.9", unit: "mg" },
      { name: "Vitamin B5", value: "0.76", unit: "mg" },
      { name: "Vitamin B6", value: "0.14", unit: "mg" },
      { name: "Asam folat", value: "61", unit: "mcg" },
      { name: "Vitamin B12", value: "0.3", unit: "mcg" },
      { name: "Vitamin C", value: "12", unit: "mg" },
      { name: "Vitamin D3", value: "2.4", unit: "mcg" },
      { name: "Vitamin E", value: "2.2", unit: "mg" },
      { name: "Biotin", value: "3.7", unit: "mcg" },
      { name: "Kalium", value: "66", unit: "mg" },
      { name: "Kalsium", value: "149", unit: "mg" },
      { name: "Magnesium", value: "Tidak diukur", unit: "mg" },
      { name: "Fosfor", value: "103", unit: "mg" },
      { name: "Besi", value: "3.6", unit: "mg" },
      { name: "Yodium", value: "19", unit: "mcg" },
      { name: "Selenium", value: "Tidak diukur", unit: "mcg" },
      { name: "Kromium", value: "Tidak diukur" },
      { name: "Seng", value: "1.6", unit: "mg" },
    ],

    components: [
      { name: "Zat Gizi Lainnya", value: "Valin 1 g, Isoleusin 0,71 g, Leusin 0,64 g" },
    ],

    highlights: [
      {
        title: "Tinggi Kalori",
        description:
          "Membantu memenuhi kebutuhan energi harian.",
        icon:
          "/images/client-assets/icon/HEPATOSOL/NEW ICON/Tinggi Kalori.svg",
      },
      {
        title: "Tinggi Protein dan BCAA",
        description:
          "Membantu memenuhi kebutuhan protein serta mendukung pemeliharaan massa otot.",
        icon:
          "/images/client-assets/icon/HEPATOSOL/NEW ICON/Diperkaya BCAA.svg",
      },
      {
        title: "Sumber Lemak MCT",
        description:
          "Mengandung lemak rantai sedang sebagai sumber energi.",
        icon:
          "/images/client-assets/icon/HEPATOSOL/NEW ICON/sumber-lemak-mct.svg",
      },
      {
        title: "LOLA",
        description:
          "Mengandung L-Ornithine L-Aspartate (LOLA) yang membantu mendukung metabolisme amonia.",
        icon:
          "/images/client-assets/icon/HEPATOSOL/NEW ICON/Diperkaya BCAA.svg",
      },
    ],
  }
,

  "peptisol": {
    displayName: "Peptisol",

    productInformation: {
      osmolalityByFlavor: [
        { flavor: "Coklat", value: "478 mOsm/L" },
        { flavor: "Vanilla", value: "474 mOsm/L" },
      ],
      background:
        "Peptisol merupakan nutrisi enteral tinggi protein (13 Gram/saji) dengan formula rendah residu untuk membantu memenuhi kebutuhan diet tinggi protein pada fase pemulihan, pasca pembedahan, sarkopenia, peningkatan kebutuhan protein, serta kondisi yang membutuhkan dukungan nutrisi tinggi protein.",

      servingInstruction:
        "Untuk menyajikan 260 mL larutan, tambahkan satu (1) Sachet PEPTISOL (± 60 Gram) ke dalam 210 mL air matang hangat, aduk hingga larut.",

      servingPer100ml:
        "22 Gram serbuk ke 80 mL air",

      flavors: [
        "Vanilla",
        "Coklat",
      ],

      availability:
        "Boks",

      packaging:
        "Gramasi 180 Gram (3 Sachet x 60 Gram).",

      storage:
        "Simpan di tempat yang kering, bersih, dan hindari paparan sinar matahari langsung.",

      composition:
        "Base Bubuk (mengandung Protein Susu), Bubuk Kakao, Isolat Protein Kedelai, Perisa Sintetik, Penstabil Mononatrium Fosfat, Premiks Mineral dan Vitamin.",

      specificComposition: ["Whey, Kasein, 5 Vitamin dan 4 Mineral"],
    },

    category: "Recovery Nutrition Formula",

    variants: [
      {
        name: "Vanilla",
        image:
          "/images/mednut/products/front/peptisol-vanila.png",
      },
      {
        name: "Coklat",
        image:
          "/images/mednut/products/front/peptisol-cokelat.png",
      },
    ],

    targetAudience: {
      title: "Siapa yang Membutuhkan Peptisol?",
      description:
        "Nutrisi tinggi protein untuk membantu memenuhi kebutuhan protein pada fase pemulihan dan kondisi dengan kebutuhan protein meningkat.",
    },

    title: "Nutrition Facts",

    subtitle:
      "Informasi nutrisi lengkap Peptisol per sajian.",

    serving:
      "Per Sajian Peptisol",

    nutrition: [
      { name: "Energi", value: "240", unit: "kkal" },
      { name: "Energi dari lemak", value: "20", unit: "kkal" },
      { name: "Lemak total", value: "2", unit: "g" },
      { name: "Lemak tak jenuh tunggal", value: "1", unit: "g" },
      { name: "Lemak tak jenuh ganda", value: "0", unit: "g" },
      { name: "Omega 3", value: "0", unit: "mg" },
      { name: "Omega 6", value: "0", unit: "mg" },
      { name: "Lemak trans", value: "0", unit: "g" },
      { name: "Kolesterol", value: "15", unit: "mg" },
      { name: "Lemak Jenuh", value: "1", unit: "g" },
      { name: "MCT", value: "0", unit: "g" },
      { name: "Protein", value: "13", unit: "g" },
      { name: "KH total", value: "40", unit: "g" },
      { name: "Serat Pangan", value: "0", unit: "g" },
      { name: "Inulin", value: "0", unit: "g" },
      { name: "Gula Total", value: "12", unit: "g" },
      { name: "Laktosa", value: "0", unit: "g" },
      { name: "Garam / Natrium", value: "140", unit: "mg" },
    ],

    vitamins: [
      { name: "Vitamin A", value: "300", unit: "mcg" },
      { name: "Vitamin B1", value: "0.28", unit: "mg" },
      { name: "Vitamin B2", value: "0.24", unit: "mg" },
      { name: "Vitamin B3", value: "3", unit: "mg" },
      { name: "Vitamin B5", value: "Tidak diukur", unit: "mg" },
      { name: "Vitamin B6", value: "0.39", unit: "mg" },
      { name: "Asam folat", value: "Tidak diukur", unit: "mcg" },
      { name: "Vitamin B12", value: "0.24", unit: "mcg" },
      { name: "Vitamin C", value: "9", unit: "mg" },
      { name: "Vitamin D3", value: "0.6", unit: "mcg" },
      { name: "Vitamin E", value: "1.5", unit: "mg" },
      { name: "Biotin", value: "Tidak diukur", unit: "mcg" },
      { name: "Kalium", value: "94", unit: "mg" },
      { name: "Kalsium", value: "110", unit: "mg" },
      { name: "Magnesium", value: "35", unit: "mg" },
      { name: "Fosfor", value: "105", unit: "mg" },
      { name: "Besi", value: "1.32", unit: "mg" },
      { name: "Yodium", value: "22.5", unit: "mcg" },
      { name: "Selenium", value: "Tidak diukur", unit: "mcg" },
      { name: "Kromium", value: "Tidak diukur" },
      { name: "Seng", value: "0.78", unit: "mg" },
    ],

    components: [
      { name: "Zat Gizi Lainnya", value: "-" },
    ],

    highlightTitle:
      "Mengapa Peptisol?",

    highlightSubtitle:
      "Formula tinggi protein dengan dukungan zinc untuk membantu proses pemulihan.",

    highlights: [
      {
        title: "Tinggi Protein",
        description:
          "Mengandung 13 Gram protein per sajian.",
        icon:
          "/images/client-assets/icon/PEPTISOL/NEW ICON/Tinggi Protein 13 grsaji.svg",
      },
      {
        title: "Rendah Residu",
        description:
          "Untuk endoskopi dan operasi.",
        icon:
          "/images/mednut/products/icons/oligo/rendah-residu-cepat-serap.svg",
      },
      {
        title: "Mengandung Zinc",
        description:
          "Membantu mendukung proses pemulihan luka.",
        icon:
          "/images/mednut/products/icons/peptisol/tinggi-zinc.svg",
      },
    ],
  },

  "pulmosol": {
    displayName: "Pulmosol",

    productInformation: {
      background:
        "Pulmosol merupakan nutrisi rendah karbohidrat dan tinggi lemak yang membantu meminimalkan produksi CO₂ dari metabolisme zat gizi, sehingga mendukung pemenuhan kebutuhan nutrisi pada pasien dengan gangguan pernapasan, khususnya yang mengalami sesak napas.",

      servingInstruction:
        "Untuk menyajikan 240 mL larutan, tambahkan satu (1) Sachet PULMOSOL (± 50 Gram) ke dalam 200 mL air matang hangat, aduk hingga larut.",

      servingPer100ml:
        "21 Gram serbuk ke 83 mL air",

      osmolalityByFlavor: [
        { flavor: "Creamy Vanilla", value: "470 mOsm/L" },
      ],

      flavors: [
        "Creamy Vanilla",
      ],

      availability:
        "Boks",

      packaging:
        "Gramasi 150 Gram (3 Sachet x 50 Gram).",

      storage:
        "Simpan di tempat yang kering, bersih, dan jangan terkena sinar matahari langsung.",

      composition:
        "Base bubuk, MCT, isolat protein kedelai, serat pangan inulin, bubuk DHA (mengandung antioksidan askorbil palmitat), natrium askorbat, tokoferol, perisa sintetik, penstabil nabati, steviol, premiks vitamin mineral",

      specificComposition: ["DHA, EPA, Isoleusin, Leusin, Valin, Omega 3, Omega 6, MCT - rendah karbohidrat, tinggi lemak baik"],
    },

    category: "Respiratory Nutrition Formula",

    variants: [
      {
        name: "Creamy Vanilla",
        image:
          "/images/mednut/products/front/pulmosol.png",
      },
    ],

    title: "Nutrition Facts",
    subtitle:
      "Informasi nutrisi lengkap Pulmosol per sajian.",

    serving:
      "Per Sajian Pulmosol",

    nutrition: [
      { name: "Energi", value: "240", unit: "kkal" },
      { name: "Energi dari lemak", value: "100", unit: "kkal" },
      { name: "Lemak total", value: "11", unit: "g" },
      { name: "Lemak tak jenuh tunggal", value: "4.5", unit: "g" },
      { name: "Lemak tak jenuh ganda", value: "2.5", unit: "g" },
      { name: "Omega 3", value: "360", unit: "mg" },
      { name: "Omega 6", value: "1600", unit: "mg" },
      { name: "Lemak trans", value: "0", unit: "g" },
      { name: "Kolesterol", value: "15", unit: "mg" },
      { name: "Lemak Jenuh", value: "3.5", unit: "g" },
      { name: "MCT", value: "1.25", unit: "g" },
      { name: "Protein", value: "11.5", unit: "g" },
      { name: "KH total", value: "23", unit: "g" },
      { name: "Serat Pangan", value: "1.5", unit: "g" },
      { name: "Inulin", value: "1", unit: "g" },
      { name: "Gula Total", value: "7", unit: "g" },
      { name: "Laktosa", value: "1", unit: "g" },
      { name: "Garam / Natrium", value: "50", unit: "mg" },
    ],

    vitamins: [
      { name: "Vitamin A", value: "77", unit: "mcg" },
      { name: "Vitamin B1", value: "0.2", unit: "mg" },
      { name: "Vitamin B2", value: "0.2", unit: "mg" },
      { name: "Vitamin B3", value: "1.6", unit: "mg" },
      { name: "Vitamin B5", value: "0.65", unit: "mg" },
      { name: "Vitamin B6", value: "0.15", unit: "mg" },
      { name: "Asam folat", value: "58", unit: "mcg" },
      { name: "Vitamin B12", value: "0.4", unit: "mcg" },
      { name: "Vitamin C", value: "30", unit: "mg" },
      { name: "Vitamin D3", value: "2.25", unit: "mcg" },
      { name: "Vitamin E", value: "1.7", unit: "mg" },
      { name: "Biotin", value: "2.75", unit: "mcg" },
      { name: "Kalium", value: "90", unit: "mg" },
      { name: "Kalsium", value: "130", unit: "mg" },
      { name: "Magnesium", value: "40", unit: "mg" },
      { name: "Fosfor", value: "80", unit: "mg" },
      { name: "Besi", value: "1.6", unit: "mg" },
      { name: "Yodium", value: "18", unit: "mcg" },
      { name: "Selenium", value: "Tidak diukur", unit: "mcg" },
      { name: "Kromium", value: "Tidak diukur" },
      { name: "Seng", value: "2.5", unit: "mg" },
    ],

    components: [
      { name: "Zat Gizi Lainnya", value: "DHA 60 mg, EPA 12 mg, Isoleusin 0,7 gram, Leusin 1,2 gram, Valin 0,7 gram" },
    ],

    highlightTitle:
      "Mengapa Pulmosol?",

    highlightSubtitle:
      "Formula nutrisi khusus untuk mendukung kebutuhan pasien dengan gangguan pernapasan.",

    highlights: [
      {
        title: "Rendah Karbohidrat",
        description:
          "Membantu meminimalkan produksi CO₂ dari metabolisme zat gizi.",
        icon:
          "/images/mednut/products/icons/pulmosol/karbohidrat-rendah.svg",
      },
      {
        title: "Tinggi Protein",
        description:
          "Untuk pemulihan otot-otot pernapasan dan mencegah sarcopenia.",
        icon:
          "/images/mednut/products/icons/pulmosol/tinggi-protein.svg",
      },
      {
        title: "Tinggi Lemak",
        description:
          "Mengandung lemak baik untuk kebutuhan energi.",
        icon:
          "/images/mednut/products/icons/pulmosol/tinggi-lemak.svg",
      },
    ],
  },

  "peptibren": {
    displayName: "Peptibren",

    productInformation: {
      background:
        "Peptibren merupakan nutrisi tinggi energi dan tinggi protein yang membantu memenuhi kebutuhan nutrisi pasien dengan gangguan neurologis seperti stroke, Alzheimer dan demensia dengan kesulitan menelan atau disfagia. Peptibren mengandung nutrien spesifik Kolin, Fosfatidilserin, dan Uridin Monofosfat yang membantu mendukung pemulihan fungsi saraf.",

      servingInstruction:
        "1 Sachet dilarutkan ke 200 mL air menghasilkan 250 mL larutan",

      servingPer100ml:
        "26 Gram serbuk ke 80 mL air",

      flavors: [
        "Vanila",
        "Kacang Hijau",
      ],

      availability:
        "Boks",

      packaging:
        "Gramasi 195 Gram (3 Sachet x 65 Gram).",

      storage:
        "Simpan di tempat yang kering, bersih, dan hindari terkena sinar matahari langsung.",

      composition:
        "Maltodekstrin, Bubuk Lemak Nabati, Inulin, Sukrosa, Konsentrat Protein Whey, Dekstrin, Isomaltulosa, Sorbitol, Bubuk Ekstrak Malt,",

      specificComposition: ["Protein Whey, Kolin Bitartrat, Premiks Vitamin & Mineral"],
    },

    category:
      "Neurological Nutrition Formula",

    variants: [
      {
        name: "Vanila",
        image:
          "/images/mednut/products/front/peptibren-vanila.png",
      },
      {
        name: "Kacang Hijau",
        image:
          "/images/mednut/products/front/peptibren-kacang-hijau.png",
      },
    ],

    title:
      "Nutrition Facts",

    subtitle:
      "Informasi nutrisi lengkap untuk mendukung kebutuhan energi dan protein pasien dengan gangguan neurologis.",

    serving:
      "Per Sajian Peptibren",

    nutrition: [
      { name: "Energi", value: "273", unit: "kkal" },
      { name: "Energi dari lemak", value: "62", unit: "kkal" },
      { name: "Lemak total", value: "7", unit: "g" },
      { name: "Lemak tak jenuh tunggal", value: "3.3", unit: "g" },
      { name: "Lemak tak jenuh ganda", value: "2", unit: "g" },
      { name: "Omega 3", value: "266.5", unit: "mg" },
      { name: "Omega 6", value: "1,4 g", unit: "mg" },
      { name: "Lemak trans", value: "0", unit: "g" },
      { name: "Kolesterol", value: "0", unit: "mg" },
      { name: "Lemak Jenuh", value: "1.3", unit: "g" },
      { name: "MCT", value: "0", unit: "g" },
      { name: "Protein", value: "15", unit: "g" },
      { name: "KH total", value: "37", unit: "g" },
      { name: "Serat Pangan", value: "4", unit: "g" },
      { name: "Inulin", value: "4", unit: "g" },
      { name: "Gula Total", value: "8", unit: "g" },
      { name: "Laktosa", value: "0", unit: "g" },
      { name: "Garam / Natrium", value: "59", unit: "mg" },
    ],

    vitamins: [
      { name: "Vitamin A", value: "117", unit: "mcg" },
      { name: "Vitamin B1", value: "0.2", unit: "mg" },
      { name: "Vitamin B2", value: "0.2", unit: "mg" },
      { name: "Vitamin B3", value: "2.9", unit: "mg" },
      { name: "Vitamin B5", value: "0.8", unit: "mg" },
      { name: "Vitamin B6", value: "0.3", unit: "mg" },
      { name: "Asam folat", value: "Tidak diukur", unit: "mcg" },
      { name: "Vitamin B12", value: "0.5", unit: "mcg" },
      { name: "Vitamin C", value: "16.9", unit: "mg" },
      { name: "Vitamin D3", value: "2.9", unit: "mcg" },
      { name: "Vitamin E", value: "2.7", unit: "mg" },
      { name: "Biotin", value: "5.2", unit: "mcg" },
      { name: "Kalium", value: "117", unit: "mg" },
      { name: "Kalsium", value: "266.5", unit: "mg" },
      { name: "Magnesium", value: "58.5", unit: "mg" },
      { name: "Fosfor", value: "185.3", unit: "mg" },
      { name: "Besi", value: "3.1", unit: "mg" },
      { name: "Yodium", value: "32.5", unit: "mcg" },
      { name: "Selenium", value: "4.9", unit: "mcg" },
      { name: "Kromium", value: "Tidak diukur" },
      { name: "Seng", value: "2.6", unit: "mg" },
    ],

    components: [
      { name: "Zat Gizi Lainnya", value: "Choline 148 mg, Phosphatidylserine 41 mg, Uridine Monophosphate 32 mg" },
    ],

    highlightTitle:
      "Mengapa Peptibren?",

    highlightSubtitle:
      "Formula nutrisi spesifik untuk mendukung kebutuhan energi, protein, dan nutrisi neurologis.",

    highlights: [
      {
        title: "Tinggi Protein",
        description:
          "Mengandung protein untuk membantu memenuhi kebutuhan nutrisi pasien.",
        icon:
          "/images/client-assets/icon/PEPTISOL/NEW ICON/Tinggi Protein 13 grsaji.svg",
      },
      {
        title: "DHA & Omega 3",
        description:
          "Mengandung DHA dan Omega 3 untuk mendukung fungsi neurologis.",
        icon:
          "/images/mednut/products/icons/entrakid/dha-omega-3.svg",
      },
      {
        title: "Dual Protein Source",
        description:
          "Kombinasi sumber protein untuk mendukung pemenuhan nutrisi.",
        icon:
          "/images/client-assets/icon/PEPTISOL/NEW ICON/Dual Protein Source 2.svg",
      },
    ],
  },

};
