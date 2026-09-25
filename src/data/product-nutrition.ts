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

// Source: Komposisi per Saji Dion_Website (2) (1).xlsx, Sheet1.
// Each product owns rows 13–52 (18 macros, 21 vitamins/minerals, 1 additional).
// Preserve source decimals, text, units and blanks without normalization.
// Serving instructions: row 3; per 100 ml: row 4; composition: rows 10–11.
export const productNutrition: Record<string, ProductNutrition> = {
  entrakid: {
    productInformation: {
      "servingInstruction": "3 sendok takar (+/- 45 g) dilarutkan ke 190 ml air menghasilkan 235 ml larutan",
      "servingPer100ml": "22 gram serbuk ke 90 ml air",
      "composition": "Susu bubuk, Protein Whey, Maltodekstrin, Lemak Nabati, SUkrosa, Serat Pangan, Perisa Sintetik, Premiks Mineral dan Vitamin",
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
      { name: "Kolestrol", value: "9 g", unit: "mg" },
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
        "1 sachet dilarutkan ke dalam 200 ml air menghasilkan 250 ml larutan",

      servingPer100ml:
        "23 gram serbuk ke 80 ml air",

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
        "Base bubuk maltodextrin, kalsium kaseinat, lemak nabati (mengandung protein susu dan antioksidan askorbil palmitat dan tokoferol, protein whey, MCT, serat pangan, sukrosa, premiks vitamin dan mineral",

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
      { name: "Energi dari lemak", value: "54", unit: "kkal" },
      { name: "Lemak total", value: "6", unit: "g" },
      { name: "Lemak tak jenuh tunggal", value: "0", unit: "g" },
      { name: "Lemak tak jenuh ganda", value: "0", unit: "g" },
      { name: "Omega 3", value: "72", unit: "mg" },
      { name: "Omega 6", value: "353", unit: "mg" },
      { name: "Lemak trans", value: "0", unit: "g" },
      { name: "Kolestrol", value: "10", unit: "mg" },
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
  },


  entrasoy: {
    productInformation: {
      background:
        "Entrasoy by Entramix merupakan formula dengan 100% protein nabati dari isolat protein kedelai. Entrasoy mengandung tinggi protein, tinggi serat pangan, sumber 12 vitamin dan 8 mineral. Entrasoy bebas laktosa, bebas gluten, dan bebas kolesterol.",

      servingInstruction:
        "1 sachet dilarutkan ke 160 ml air menghasilkan 180 ml larutan",

      servingPer100ml:
        "Mengikuti kebutuhan",

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
        "Sari kacang kedelai bubuk, maltodextrin, isolat protein kedelai, serat pangan, sukrosa, vitamin dan mineral, perisa sintetik, pengelmulsi nabati, bubuk almond, steviol, allergen",

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
      { name: "Energi dari lemak", value: "30", unit: "kkal" },
      { name: "Lemak total", value: "3.5", unit: "g" },
      { name: "Lemak tak jenuh tunggal", value: "0.5", unit: "g" },
      { name: "Lemak tak jenuh ganda", value: "1.5", unit: "g" },
      { name: "Omega 3", value: "0", unit: "mg" },
      { name: "Omega 6", value: "0", unit: "mg" },
      { name: "Lemak trans", value: "0", unit: "g" },
      { name: "Kolestrol", value: "0", unit: "mg" },
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
      background:
        "Hepatosol merupakan nutrisi adekuat dengan nutrien spesifik seperti BCAA dan Lemak Rantai Sedang (MCT) yang dapat membantu mempercepat pemulihan. Solusi untuk pemenuhan nutrisi malam hari sebelum beristirahat.",

      servingInstruction:
        "1 sachet dilarutkan ke 300 ml air menghasilkan 363 ml larutan",

      servingPer100ml:
        "22 gram serbuk ke 83 ml air",

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
        "Maltodekstrin, Bubuk MCT, Sukrosa, Isolat protein Whey, Konsentrat Protein Whey, Inulin, Premiks Asam Amino (BCAA), Natrium Klorida, Kalsium Karbonat, Mononatrium Fosfat, Bubuk Lemak Nabati, Vitamin & Mineral",

      specificComposition: ["MCT, BCAA, Inulin"],
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
    serving: "Per Sajian Hepatosol",

    highlightTitle:
      "Keunggulan Utama Hepatosol",

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
      { name: "Kolestrol", value: "2", unit: "mg" },
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
        "1 sachet dilarutkan ke dalam 200 ml air menghasilkan 250 ml larutan",

      servingPer100ml:
        "29 gram serbuk ke 78 ml air",

      osmolality:
        "555 mOsmol/kg air",

      flavors: [
        "Vanilla",
        "Cappuccino",
      ],

      availability:
        "Box",

      packaging:
        "Gramasi 201 gram (3 sachet x 67 gram).",

      storage:
        "Simpan di tempat yang kering, bersih, dan jangan terkena sinar matahari langsung. Jangan dikonsumsi apabila terjadi perubahan yang mencolok pada bau, rasa, atau warna.",

      composition:
        "Base bubuk (mengandung susu, antioksidan askorbil palmitat dan alfa tokoferol), isomaltulosa, serat pangan inulin, trigliserida, MCT, premiks asam amino, perisa sintetik, kalium sorbat, steviol, premiks vitamin mineral",

      specificComposition: ["9 jenis Asam amino esensial dan 11 jenis asam amino non esensial"],
    },

    variants: [
      {
        name: "Cappuccino",
        image:
          "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/NEPHRISOL/NEPHRISOL CAPPUCINO 1.png",
      },
      {
        name: "Cappuccino",
        image:
          "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/NEPHRISOL/NEPHRISOL CAPPUCINO 2.png",
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
      { name: "Kolestrol", value: "7.37", unit: "mg" },
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

    highlights: [
      {
        title: "Rendah Protein",
        description:
          "Formula nutrisi yang disesuaikan untuk kebutuhan pasien ginjal non dialisis.",
        icon:
          "/images/client-assets/icon/NEPHRISOL/NEW ICON/Rendah Protein.svg",
      },
      {
        title: "Kandungan Mikronutrien",
        description:
          "Mengandung mikronutrien yang sesuai untuk kebutuhan nutrisi klinis.",
        icon:
          "/images/client-assets/icon/NEPHRISOL/NEW ICON/Kandungan Mikronutrien.svg",
      },
      {
        title: "Khusus untuk Ginjal Non Dialisis",
        description:
          "Diformulasikan untuk pasien ginjal kronik tahap pradialisis.",
        icon:
          "/images/client-assets/icon/NEPHRISOL/NEW ICON/Khusus untuk Ginjal Non Dialisis.svg",
      },
      {
        title: "13 Vitamin dan 6 Mineral",
        description:
          "Sumber vitamin dan mineral untuk mendukung pemenuhan nutrisi.",
        icon:
          "/images/client-assets/icon/NEPHRISOL/NEW ICON/Dengan 13 Vitamin dan 6 Mineral.svg",
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
        "1 sachet dilarutkan ke dalam 150 ml air menghasilkan 200 ml larutan",

      servingPer100ml:
        "35 gram serbuk ke 75 ml air",

      osmolality:
        "487 mOsmol/kg air.",

      flavors: [
        "Vanilla",
        "Cappuccino",
      ],

      availability:
        "Box",

      packaging:
        "Gramasi 210 gram (3 sachet x 70 gram).",

      storage:
        "Simpan di tempat yang kering, bersih, dan jangan terkena sinar matahari langsung. Jangan dikonsumsi apabila terjadi perubahan yang mencolok pada bau, rasa, atau warna.",

      composition:
        "Base bubuk, serat pangan inulin, isomaltulosa, MCT, perisa, steviol, premiks vitamin dan mineral",

      specificComposition: ["9 jenis Asam amino esensial dan 11 jenis asam amino non esensial"],
    },

    variants: [
      {
        name: "Vanilla",
        image:
          "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/NEPHRISOL-D/NEPHRISOL-D VANILA 1.png",
      },
      {
        name: "Cappuccino",
        image:
          "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/NEPHRISOL-D/NEPHRISOL-D - CAPPUCINO 1.png",
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
      "Informasi nutrisi lengkap untuk membantu memenuhi kebutuhan pasien ginjal kronik dengan terapi dialisis.",

    serving: "Per Sajian Nephrisol D",

    nutrition: [
      { name: "Energi", value: "315", unit: "kkal" },
      { name: "Energi dari lemak", value: "100.8", unit: "kkal" },
      { name: "Lemak total", value: "11.2", unit: "g" },
      { name: "Lemak tak jenuh tunggal", value: "4.2", unit: "g" },
      { name: "Lemak tak jenuh ganda", value: "2.45", unit: "g" },
      { name: "Omega 3", value: "Tidak diukur", unit: "mg" },
      { name: "Omega 6", value: "Tidak diukur", unit: "mg" },
      { name: "Lemak trans", value: "0", unit: "g" },
      { name: "Kolestrol", value: "24.5", unit: "mg" },
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
        title: "Tinggi Kalori dan Protein",
        description:
          "Membantu memenuhi kebutuhan energi dan protein pasien yang menjalani terapi dialisis.",
        icon:
          "/images/client-assets/icon/NEPHRISOL/Website Icon-17.svg",
      },
      {
        title: "Rendah Laktosa",
        description:
          "Diformulasikan rendah laktosa untuk mendukung toleransi konsumsi.",
        icon:
          "/images/client-assets/icon/NEPHRISOL/Website Icon-18.svg",
      },
      {
        title: "Untuk Terapi Dialisis",
        description:
          "Formula nutrisi klinis untuk pasien penyakit ginjal kronik dengan terapi CAPD atau HD.",
        icon:
          "/images/client-assets/icon/NEPHRISOL/Website Icon-19.svg",
      },
      {
        title: "Diperkaya Vitamin dan Mineral",
        description:
          "Mengandung vitamin dan mineral untuk membantu melengkapi kebutuhan nutrisi harian.",
        icon:
          "/images/client-assets/icon/NEPHRISOL/Website Icon-20.svg",
      },
    ],
  },



  oligo: {
    displayName: "Oligo",
    category: "Clinical Nutrition Formula",

    productInformation: {
      background:
        "Oligo merupakan formula oligomerik dengan kandungan makronutrien cepat serap dengan mikronutrien yang lengkap. Oligo mengandung protein berbasis peptida / oligomerik, lemak rantai sedang dan karbohidrat sederhana menjadi solusi pada pasien dengan gangguan pengosongan lambung dan malabsorbsi saluran cerna.",

      servingInstruction:
        "1 sachet dilarutkan ke 200 ml air menghasilkan 250 ml larutan",

      servingPer100ml:
        "25 gram serbuk ke 80 ml air",

      osmolality:
        "353 mOsmol/kg air",

      flavors: [
        "Tropical Banana",
      ],

      availability:
        "Box",

      packaging:
        "Gramasi 165 gram (3 sachet x 55 gram)",

      storage:
        "Simpan di tempat yang kering, bersih, dan jangan terkena sinar matahari langsung. Jangan dikonsumsi apabila terjadi perubahan yang mencolok pada bau, rasa, atau warna.",

      composition:
        "Maltodekstrin, Protein Whey Terhidrolisa, Lemak MCT, Isomaltulosa, Sukrosa, Vitamin & Mineral, DHA, Bubuk Pisang",

      specificComposition: ["MCT, Whey Terhidrolisa, Omega 3, Omega 6"],
    },

    variants: [
      {
        name: "Tropical Banana",
        image:
          "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/OLIGO/OLIGO 1.png",
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
      { name: "Kolestrol", value: "25", unit: "mg" },
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
      "Keunggulan Utama Oligo",

    highlightSubtitle:
      "Formula oligomerik dengan makronutrien cepat serap untuk mendukung kebutuhan nutrisi pada gangguan saluran cerna.",

    highlights: [
      {
        title: "Protein Whey Terhidrolisa",
        description:
          "Protein berbasis peptida / oligomerik yang membantu mendukung proses penyerapan.",
        icon:
          "/images/mednut/products/icons/oligo/protein-terhidrolisa.svg",
      },
      {
        title: "Osmolalitas 353 mOsmol/kg",
        description:
          "Formula dengan osmolalitas 353 mOsmol/kg air.",
        icon:
          "/images/mednut/products/icons/oligo/osmolaritas-fisiologis.svg",
      },
      {
        title: "Lemak MCT",
        description:
          "Mengandung lemak rantai sedang sebagai bagian dari formula nutrisi Oligo.",
        icon:
          "/images/mednut/products/icons/oligo/lemak-mct.svg",
      },
      {
        title: "Formula Cepat Serap",
        description:
          "Makronutrien dirancang untuk mendukung kebutuhan pada kondisi gangguan pencernaan dan malabsorbsi.",
        icon:
          "/images/mednut/products/icons/oligo/rendah-residu-cepat-serap.svg",
      },
    ],
  },

  "hepatosol-lola": {
    displayName: "Hepatosol Lola",

    productInformation: {
      background:
        "Hepatosol LOLA merupakan nutrisi enteral yang lengkap untuk pasien dengan gangguan fungsi hati berat. Dengan kombinasi kandungan BCAA dan LOLA yang membantu menurunkan kadar amonia dalam darah, memperbaiki keseimbangan nitrogen dan rasio Fischer serta membantu menurunkan pemecahan protein sebagai sumber protein otot.",

      servingInstruction:
        "1 sachet dilarutkan ke 250 ml air menghasilkan 303 ml larutan",

      servingPer100ml:
        "27 gram serbuk ke 83 ml air",

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
        "Dekstrin, Maltodekstrin, Konsentrat Protein Whey, Bubuk MCT, Inulin, Premiks Asam Amino, Natrium Klorida, Mononatrium Fosfat, Kalsium Karbonat, Trikalsium Fosfat",

      specificComposition: ["MCT, BCAA, LOLA, Inulin"],
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
      "* Persen AKG berdasarkan kebutuhan energi 2150 Kkal.",
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
    serving: "Per Sajian Hepatosol LOLA",

    highlightTitle:
      "Keunggulan Utama Hepatosol Lola",

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
      { name: "Kolestrol", value: "4", unit: "mg" },
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
,

  "peptisol": {
    displayName: "Peptisol",

    productInformation: {
      background:
        "Peptisol merupakan nutrisi enteral tinggi protein (13 gram/saji) dengan formula rendah residu untuk membantu memenuhi kebutuhan diet tinggi protein pada fase pemulihan, pasca pembedahan, sarkopenia, peningkatan kebutuhan protein, serta kondisi yang membutuhkan dukungan nutrisi tinggi protein.",

      servingInstruction:
        "1 sachet dilarutkan ke 200 ml air menghasilkan 250 ml larutan",

      servingPer100ml:
        "22 gram serbuk ke 80 ml air",

      flavors: [
        "Vanilla",
        "Coklat",
      ],

      availability:
        "Box",

      packaging:
        "Gramasi 180 gram (3 sachet x 60 gram).",

      storage:
        "Simpan di tempat yang kering, bersih, dan hindari paparan sinar matahari langsung.",

      composition:
        "Base Bubuk, Isolat Protein Kedelai, Perisa Sintetik, Premiks Mineral dan Vitamin",

      specificComposition: ["Whey, Kasein, 5 Vitamin dan 4 Mineral"],
    },

    category: "Recovery Nutrition Formula",

    variants: [
      {
        name: "Vanilla",
        image:
          "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/PEPTISOL/Peptisol Vanila 1.png",
      },
      {
        name: "Coklat",
        image:
          "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/PEPTISOL/Peptisol Cokelat 1.png",
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
      { name: "Kolestrol", value: "15", unit: "mg" },
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
      "Keunggulan Utama Peptisol",

    highlightSubtitle:
      "Formula tinggi protein dengan dukungan zinc untuk membantu proses pemulihan.",

    highlights: [
      {
        title: "Tinggi Zinc",
        description:
          "Mengandung zinc untuk membantu mendukung proses pemulihan luka.",
        icon:
          "/images/mednut/products/icons/peptisol/tinggi-zinc.svg",
      },
      {
        title: "Tinggi Protein",
        description:
          "Mengandung 13 gram protein per sajian.",
        icon:
          "/images/client-assets/icon/PEPTISOL/NEW ICON/Tinggi Protein 13 grsaji.svg",
      },
      {
        title: "Rendah Laktosa",
        description:
          "Formula dengan kandungan laktosa rendah.",
        icon:
          "/images/client-assets/icon/PEPTISOL/NEW ICON/Rendah Laktosa 2.svg",
      },
      {
        title: "Dual Protein Source",
        description:
          "Menggunakan kombinasi sumber protein.",
        icon:
          "/images/client-assets/icon/PEPTISOL/NEW ICON/Dual Protein Source 2.svg",
      },
    ],
  },

  "pulmosol": {
    displayName: "Pulmosol",

    productInformation: {
      background:
        "Pulmosol sebagai dukungan nutrisi bagi orang dewasa malnutrisi dengan komposisi tinggi protein, tinggi vitamin D, rendah natrium, sumber 10 vitamin dan 5 mineral. Pulmosol digunakan sebagai makanan tambahan atau pengganti makanan total yang dikhususkan untuk gangguan pernafasan dan pulmonologi seperti TB, PPOK, Asma, Pneumonia, serta pasien ventilator.",

      servingInstruction:
        "1 sachet dilarutkan ke dalam 200 ml air menghasilkan 240 ml larutan",

      servingPer100ml:
        "21 gram serbuk ke 83 ml air",

      osmolality:
        "221 mOsmol/kg air.",

      flavors: [
        "Creamy Vanilla",
      ],

      availability:
        "Box",

      packaging:
        "Gramasi 150 gram (3 sachet x 50 gram).",

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
          "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/PULMOSOL/PULMOSOL 1.png",
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
      { name: "Kolestrol", value: "15", unit: "mg" },
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
      "Keunggulan Utama Pulmosol",

    highlightSubtitle:
      "Formula nutrisi khusus untuk mendukung kebutuhan pasien dengan gangguan pernafasan.",

    highlights: [
      {
        title: "Tinggi Protein",
        description:
          "Mendukung pemenuhan kebutuhan protein.",
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
      {
        title: "Karbohidrat Rendah",
        description:
          "Formula dengan komposisi karbohidrat terkontrol.",
        icon:
          "/images/mednut/products/icons/pulmosol/karbohidrat-rendah.svg",
      },
      {
        title: "Vitamin Mineral Antioksidan",
        description:
          "Diperkaya vitamin dan mineral untuk mendukung nutrisi.",
        icon:
          "/images/mednut/products/icons/pulmosol/vitamin-mineral-antioksidan.svg",
      },
    ],
  },

  "peptibren": {
    displayName: "Peptibren",

    productInformation: {
      background:
        "Peptibren merupakan nutrisi tinggi energi dan tinggi protein yang membantu memenuhi kebutuhan nutrisi pasien dengan gangguan neurologis seperti stroke, Alzheimer dan demensia dengan kesulitan menelan atau disfagia. Peptibren mengandung nutrien spesifik Kolin, Fosfatidilserin, dan Uridin Monofosfat yang membantu mendukung pemulihan fungsi saraf.",

      servingInstruction:
        "1 sachet dilarutkan ke 200 ml air menghasilkan 250 ml larutan",

      servingPer100ml:
        "26 gram serbuk ke 80 ml air",

      flavors: [
        "Vanila",
        "Kacang Hijau",
      ],

      availability:
        "Box",

      packaging:
        "Gramasi 195 gram (3 sachet x 65 gram).",

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
          "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/PEPTIBREN/PEPTIBREN VANILA 1.png",
      },
      {
        name: "Kacang Hijau",
        image:
          "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/PEPTIBREN/PEPTIBREN KACANG HIJAU 1.png",
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
      { name: "Kolestrol", value: "0", unit: "mg" },
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
      "Keunggulan Utama Peptibren",

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
