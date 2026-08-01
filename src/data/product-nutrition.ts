export type NutritionItem = {
  name: string;
  value: string;
  unit?: string;
  percentage?: string;
};

export type ProductNutrition = {
  title: string;
  subtitle: string;
  serving: string;
  nutrition: NutritionItem[];
  vitamins: NutritionItem[];
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
};
