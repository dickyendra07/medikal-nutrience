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



  nephrisol: {
    displayName: "Nephrisol",
    category: "Clinical Nutrition Formula",

    productInformation: {
      background:
        "Nephrisol diformulasikan secara khusus untuk membantu memenuhi kebutuhan gizi pasien ginjal kronik tahap pradialisis dengan diet rendah protein dan tinggi kalori serta berbagai mikronutrien yang sesuai. Nephrisol merupakan sumber 13 vitamin dan 6 mineral, rendah laktosa, dan sumber serat pangan.",

      servingInstruction:
        "1 sachet dilarutkan ke dalam 200 ml air menghasilkan 250 ml larutan.",

      servingPer100ml:
        "29 gram serbuk ke 78 ml air.",

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
        "Base bubuk (mengandung susu, antioksidan askorbil palmitat dan alfa tokoferol), isomaltulosa, serat pangan inulin, trigliserida, MCT, premiks asam amino, perisa sintetik, kalium sorbat, steviol, premiks vitamin mineral.",

      specificComposition: [
        "9 jenis Asam amino esensial",
        "11 jenis asam amino non esensial",
      ],
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

    serving: "Per Sajian Mengandung",

    nutrition: [
      { name: "Energi Total", value: "301.5", unit: "kkal" },
      { name: "Energi dari Lemak", value: "100.5", unit: "kkal" },
      { name: "Lemak Total", value: "10.72", unit: "g" },
      { name: "Protein", value: "5.36", unit: "g" },
      { name: "Karbohidrat Total", value: "44.89", unit: "g" },
      { name: "Serat Pangan", value: "2.68", unit: "g" },
      { name: "Inulin", value: "2.68", unit: "g" },
      { name: "Gula Total", value: "16.08", unit: "g" },
      { name: "Laktosa", value: "0", unit: "g" },
      { name: "Natrium", value: "46.9", unit: "mg" },
    ],

    vitamins: [
      { name: "Vitamin A", value: "360", unit: "mcg" },
      { name: "Vitamin B1", value: "0.5", unit: "mg" },
      { name: "Vitamin B2", value: "0.5", unit: "mg" },
      { name: "Vitamin B3", value: "6", unit: "mg" },
      { name: "Vitamin B5", value: "2.5", unit: "mg" },
      { name: "Vitamin B6", value: "0.5", unit: "mg" },
      { name: "Asam Folat", value: "100", unit: "mcg" },
      { name: "Vitamin B12", value: "1", unit: "mcg" },
      { name: "Vitamin C", value: "30", unit: "mg" },
      { name: "Vitamin D3", value: "5", unit: "mcg" },
      { name: "Vitamin E", value: "6", unit: "mg" },
      { name: "Biotin", value: "30", unit: "mcg" },
      { name: "Kalium", value: "200", unit: "mg" },
      { name: "Kalsium", value: "120", unit: "mg" },
      { name: "Magnesium", value: "50", unit: "mg" },
      { name: "Fosfor", value: "80", unit: "mg" },
      { name: "Besi", value: "3", unit: "mg" },
      { name: "Yodium", value: "50", unit: "mcg" },
      { name: "Seng", value: "3", unit: "mg" },
    ],

    components: [
      { name: "DHA", value: "60", unit: "mg" },
      { name: "EPA", value: "12", unit: "mg" },
      { name: "Isoleusin", value: "0.7", unit: "g" },
      { name: "Leusin", value: "1.2", unit: "g" },
      { name: "Valin", value: "0.7", unit: "g" },
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
        "1 sachet dilarutkan ke dalam 150 ml air menghasilkan 200 ml larutan.",

      servingPer100ml:
        "35 gram serbuk ke 75 ml air.",

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
        "Base bubuk, serat pangan inulin, isomaltulosa, MCT, perisa, steviol, premiks vitamin dan mineral.",

      specificComposition: [
        "9 Asam Amino Esensial",
        "11 Asam Amino Non Esensial",
        "Inulin",
        "MCT",
      ],
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

    serving: "Per Sajian Mengandung",

    nutrition: [
      { name: "Energi Total", value: "315", unit: "kkal" },
      { name: "Energi dari Lemak", value: "100,8", unit: "kkal" },
      { name: "Lemak Total", value: "11,2", unit: "g" },
      { name: "Lemak Tak Jenuh Tunggal", value: "4,2", unit: "g" },
      { name: "Lemak Tak Jenuh Ganda", value: "2,45", unit: "g" },
      { name: "Lemak Trans", value: "0", unit: "g" },
      { name: "Kolesterol", value: "24,5", unit: "mg" },
      { name: "Lemak Jenuh", value: "4,2", unit: "g" },
      { name: "Protein", value: "11,9", unit: "g" },
      { name: "Karbohidrat Total", value: "42", unit: "g" },
      { name: "Serat Pangan", value: "4,2", unit: "g" },
      { name: "Inulin", value: "4,2", unit: "g" },
      { name: "Total Gula", value: "6,3", unit: "g" },
      { name: "Laktosa", value: "0", unit: "g" },
      { name: "Natrium", value: "84", unit: "mg" },
    ],

    vitamins: [
      { name: "Vitamin A", value: "300", unit: "mcg" },
      { name: "Vitamin B1", value: "0,5", unit: "mg" },
      { name: "Vitamin B2", value: "0,6", unit: "mg" },
      { name: "Vitamin B3", value: "8", unit: "mg" },
      { name: "Vitamin B5", value: "3", unit: "mg" },
      { name: "Vitamin B6", value: "0,7", unit: "mg" },
      { name: "Asam Folat", value: "120", unit: "mcg" },
      { name: "Vitamin B12", value: "1,2", unit: "mcg" },
      { name: "Vitamin C", value: "40", unit: "mg" },
      { name: "Vitamin D3", value: "5", unit: "mcg" },
      { name: "Vitamin E", value: "6", unit: "mg" },
      { name: "Vitamin K", value: "7", unit: "mcg" },
      { name: "Biotin", value: "15", unit: "mcg" },
    ],

    components: [
      { name: "9 Asam Amino Esensial", value: "9", unit: "jenis" },
      { name: "11 Asam Amino Non Esensial", value: "11", unit: "jenis" },
    ],

    highlights: [
      {
        title: "Rendah Protein",
        description:
          "Disesuaikan untuk kebutuhan pasien dengan kondisi ginjal tertentu.",
        icon:
          "/images/client-assets/icon/NEPHRISOL/NEW ICON/Rendah Protein.svg",
      },
      {
        title: "Kandungan Mikronutrien",
        description:
          "Mengandung vitamin dan mineral untuk mendukung pemenuhan nutrisi.",
        icon:
          "/images/client-assets/icon/NEPHRISOL/NEW ICON/Kandungan Mikronutrien.svg",
      },
      {
        title: "Khusus untuk Ginjal Non Dialisis",
        description:
          "Formula nutrisi klinis untuk kebutuhan pasien ginjal.",
        icon:
          "/images/client-assets/icon/NEPHRISOL/NEW ICON/Khusus untuk Ginjal Non Dialisis.svg",
      },
      {
        title: "Vitamin dan Mineral",
        description:
          "Diperkaya dengan vitamin dan mineral.",
        icon:
          "/images/client-assets/icon/NEPHRISOL/NEW ICON/Dengan 13 Vitamin dan 6 Mineral.svg",
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
        "1 sachet dilarutkan ke 200 ml air menghasilkan 250 ml larutan.",

      servingPer100ml:
        "25 gram serbuk ke 80 ml air.",

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
        "Maltodekstrin, Protein Whey Terhidrolisa, Lemak MCT, Isomaltulosa, Sukrosa, Vitamin & Mineral, DHA, Bubuk Pisang.",

      specificComposition: [
        "MCT",
        "Whey Terhidrolisa",
        "Omega 3",
        "Omega 6",
      ],
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
      { name: "Energi dari Lemak", value: "90", unit: "kkal" },
      { name: "Lemak Total", value: "10", unit: "g" },
      { name: "Lemak Tak Jenuh Tunggal", value: "1", unit: "g" },
      { name: "Lemak Tak Jenuh Ganda", value: "0,5", unit: "g" },
      { name: "Omega 3", value: "80", unit: "mg" },
      { name: "Omega 6", value: "280", unit: "mg" },
      { name: "Lemak Trans", value: "0", unit: "g" },
      { name: "Kolesterol", value: "25", unit: "mg" },
      { name: "Lemak Jenuh", value: "8", unit: "g" },
      { name: "MCT", value: "7,5", unit: "g" },
      { name: "Protein", value: "10", unit: "g" },
      { name: "Karbohidrat Total", value: "31", unit: "g" },
      { name: "Serat Pangan", value: "0", unit: "g" },
      { name: "Inulin", value: "0", unit: "g" },
      { name: "Gula Total", value: "8", unit: "g" },
      { name: "Laktosa", value: "1", unit: "g" },
      { name: "Garam / Natrium", value: "90", unit: "mg" },
    ],

    vitamins: [
      { name: "Vitamin A", value: "63", unit: "mcg" },
      { name: "Vitamin B1", value: "0,13", unit: "mg" },
      { name: "Vitamin B2", value: "0,15", unit: "mg" },
      { name: "Vitamin B3", value: "2,1", unit: "mg" },
      { name: "Vitamin B5", value: "0,48", unit: "mg" },
      { name: "Vitamin B6", value: "0,16", unit: "mg" },
      { name: "Asam Folat", value: "40", unit: "mcg" },
      { name: "Vitamin B12", value: "0,25", unit: "mcg" },
      { name: "Vitamin C", value: "23", unit: "mg" },
      { name: "Vitamin D3", value: "1,4", unit: "mcg" },
      { name: "Vitamin E", value: "1,3", unit: "mg" },
      { name: "Biotin", value: "2,9", unit: "mcg" },
      { name: "Kalium", value: "125", unit: "mg" },
      { name: "Kalsium", value: "98", unit: "mg" },
      { name: "Magnesium", value: "35", unit: "mg" },
      { name: "Fosfor", value: "64", unit: "mg" },
      { name: "Besi", value: "2", unit: "mg" },
      { name: "Yodium", value: "16", unit: "mcg" },
      { name: "Selenium", value: "2,8", unit: "mcg" },
      { name: "Kromium", value: "2,5" },
      { name: "Seng", value: "2,5", unit: "mg" },
    ],

    components: [
      { name: "DHA", value: "32", unit: "mg" },
      { name: "EPA", value: "5", unit: "mg" },
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
,

  "peptisol": {
    displayName: "Peptisol",

    productInformation: {
      background:
        "Peptisol merupakan nutrisi enteral tinggi protein (13 gram/saji) dengan formula rendah residu untuk membantu memenuhi kebutuhan diet tinggi protein pada fase pemulihan, pasca pembedahan, sarkopenia, peningkatan kebutuhan protein, serta kondisi yang membutuhkan dukungan nutrisi tinggi protein.",

      servingInstruction:
        "1 sachet dilarutkan ke dalam 200 ml air menghasilkan 250 ml larutan.",

      servingPer100ml:
        "22 gram serbuk ke 80 ml air.",

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
        "Maltodekstrin, Protein Whey Terhidrolisa, Lemak MCT, Isomaltulosa, Sukrosa, Vitamin & Mineral, DHA, Bubuk Pisang.",

      specificComposition: [
        "Whey",
        "Kasein",
        "Vitamin",
        "Mineral",
      ],
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
      "Per Sajian Mengandung",

    nutrition: [
      { name: "Energi Total", value: "240", unit: "kkal" },
      { name: "Energi dari Lemak", value: "20", unit: "kkal" },
      { name: "Lemak Total", value: "2", unit: "g" },
      { name: "Protein", value: "13", unit: "g" },
      { name: "Karbohidrat Total", value: "40", unit: "g" },
      { name: "Total Gula", value: "12", unit: "g" },
      { name: "Laktosa", value: "0", unit: "g" },
      { name: "Serat Pangan", value: "0", unit: "g" },
      { name: "Garam (Natrium)", value: "140", unit: "mg" },
    ],

    vitamins: [
      { name: "Vitamin A", value: "300", unit: "mcg" },
      { name: "Vitamin B1", value: "0,28", unit: "mg" },
      { name: "Vitamin B2", value: "0,24", unit: "mg" },
      { name: "Vitamin B3", value: "3", unit: "mg" },
      { name: "Vitamin B6", value: "0,39", unit: "mg" },
      { name: "Vitamin B12", value: "0,24", unit: "mcg" },
      { name: "Vitamin C", value: "9", unit: "mg" },
      { name: "Vitamin D3", value: "0,6", unit: "mcg" },
      { name: "Vitamin E", value: "1,5", unit: "mg" },
    ],

    components: [
      { name: "Zinc", value: "0,78", unit: "mg" },
      { name: "Kalsium", value: "110", unit: "mg" },
      { name: "Magnesium", value: "35", unit: "mg" },
      { name: "Fosfor", value: "105", unit: "mg" },
      { name: "Kalium", value: "94", unit: "mg" },
      { name: "Besi", value: "1,32", unit: "mg" },
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
          "/images/client-assets/icon/PEPTISOL/NEW ICON/Tinggi Zinc (20% AKG).svg",
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
        "Pulmosol sebagai dukungan nutrisi bagi orang dewasa malnutrisi dengan komposisi tinggi protein, tinggi vitamin D, rendah natrium, sumber 10 vitamin dan 5 mineral. Pulmosol digunakan sebagai makanan tambahan atau pengganti makanan total yang dikhususkan untuk gangguan pernapasan dan pulmonologi seperti TB, PPOK, Asma, Pneumonia, serta pasien ventilator.",

      servingInstruction:
        "1 sachet dilarutkan ke dalam 200 ml air menghasilkan 240 ml larutan.",

      servingPer100ml:
        "21 gram serbuk ke 83 ml air.",

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
        "Base bubuk, MCT, isolat protein kedelai, serat pangan inulin, bubuk DHA, natrium askorbat, tokoferol, perisa sintetik, penstabil nabati, steviol, premiks vitamin mineral.",

      specificComposition: [
        "DHA",
        "EPA",
        "Isoleusin",
        "Leusin",
        "Valin",
        "Omega 3",
        "Omega 6",
        "MCT",
      ],
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
      "Per Sajian Mengandung",

    nutrition: [
      { name: "Energi Total", value: "240", unit: "kkal" },
      { name: "Energi dari Lemak", value: "100", unit: "kkal" },
      { name: "Lemak Total", value: "11", unit: "g" },
      { name: "Protein", value: "11,5", unit: "g" },
      { name: "Karbohidrat Total", value: "23", unit: "g" },
      { name: "Total Gula", value: "7", unit: "g" },
      { name: "Laktosa", value: "1", unit: "g" },
      { name: "Serat Pangan", value: "1,5", unit: "g" },
      { name: "Garam (Natrium)", value: "50", unit: "mg" },
    ],

    vitamins: [
      { name: "Vitamin D", value: "tinggi", unit: "" },
      { name: "10 Vitamin", value: "1", unit: "formula" },
      { name: "5 Mineral", value: "1", unit: "formula" },
    ],

    components: [
      { name: "Omega 3", value: "360", unit: "mg" },
      { name: "Omega 6", value: "1600", unit: "mg" },
      { name: "MCT", value: "1,25", unit: "g" },
      { name: "DHA", value: "", unit: "" },
      { name: "EPA", value: "", unit: "" },
    ],

    highlightTitle:
      "Keunggulan Utama Pulmosol",

    highlightSubtitle:
      "Formula nutrisi khusus untuk mendukung kebutuhan pasien dengan gangguan pernapasan.",

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
        "1 sachet dilarutkan ke dalam 200 ml air menghasilkan 250 ml larutan.",

      servingPer100ml:
        "26 gram serbuk ke dalam 80 ml air.",

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
        "Maltodekstrin, Bubuk Lemak Nabati, Inulin, Sukrosa, Konsentrat Protein Whey, Dekstrin, Isomaltulosa, Sorbitol, Bubuk Ekstrak Malt.",

      specificComposition: [
        "Protein Whey",
        "Kolin Bitartrat",
        "Fosfatidilserin",
        "Uridin Monofosfat",
      ],
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
      "Per Sajian Mengandung",

    nutrition: [
      { name: "Energi Total", value: "273", unit: "kkal" },
      { name: "Energi dari Lemak", value: "62", unit: "kkal" },
      { name: "Lemak Total", value: "7", unit: "g" },
      { name: "Lemak Tak Jenuh Tunggal", value: "3.3", unit: "g" },
      { name: "Lemak Tak Jenuh Ganda", value: "2", unit: "g" },
      { name: "Omega 3", value: "266.5", unit: "mg" },
      { name: "Omega 6", value: "1.4", unit: "g" },
      { name: "Lemak Trans", value: "0", unit: "g" },
      { name: "Protein", value: "15", unit: "g" },
      { name: "Karbohidrat Total", value: "37", unit: "g" },
      { name: "Serat Pangan", value: "4", unit: "g" },
      { name: "Inulin", value: "4", unit: "g" },
      { name: "Gula Total", value: "8", unit: "g" },
      { name: "Laktosa", value: "0", unit: "g" },
      { name: "Natrium", value: "59", unit: "mg" },
    ],

    vitamins: [
      { name: "Vitamin A", value: "150", unit: "mcg" },
      { name: "Vitamin B1", value: "0.21", unit: "mg" },
      { name: "Vitamin B2", value: "0.4", unit: "mg" },
      { name: "Vitamin B3", value: "3", unit: "mg" },
      { name: "Vitamin B5", value: "0.75", unit: "mg" },
      { name: "Vitamin B6", value: "0.26", unit: "mg" },
      { name: "Vitamin B12", value: "0.36", unit: "mcg" },
      { name: "Vitamin C", value: "27", unit: "mg" },
      { name: "Vitamin D3", value: "0.9", unit: "mcg" },
      { name: "Vitamin E", value: "2.25", unit: "mg" },
      { name: "Biotin", value: "4.5", unit: "mcg" },
    ],

    components: [
      { name: "DHA", value: "14", unit: "mg" },
      { name: "Kalium", value: "282", unit: "mg" },
      { name: "Kalsium", value: "165", unit: "mg" },
      { name: "Magnesium", value: "14", unit: "mg" },
      { name: "Fosfor", value: "175", unit: "mg" },
      { name: "Besi", value: "2.2", unit: "mg" },
      { name: "Yodium", value: "22.5", unit: "mcg" },
      { name: "Selenium", value: "2.4", unit: "mcg" },
      { name: "Seng", value: "3.25", unit: "mg" },
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
          "/images/client-assets/icon/ENTRAKID/NEW ICON/DHA & Omega 3.svg",
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
