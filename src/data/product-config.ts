export type ProductNutritionType =
  | "standard"
  | "clinical";

export type ProductConfig = {
  productInformation?: boolean;
  nutritionFacts?: boolean;
  variants?: boolean;
  nutritionType?: ProductNutritionType;
  // Template sections default to visible; set false to remove them.
  showNeeds?: boolean; // "Siapa yang Membutuhkan [Produk]?"
  showBenefits?: boolean; // "Keunggulan Produk" / "Keunggulan Utama [Produk]"
};

export const productConfig: Record<string, ProductConfig> = {

  peptibren: {
    productInformation: true,
    nutritionFacts: true,
    variants: true,
    nutritionType: "clinical",
    showNeeds: false,
    showBenefits: false,
  },

  entrakid: {
    productInformation: true,
    nutritionFacts: true,
    variants: true,
    nutritionType: "standard",
    showNeeds: false,
    showBenefits: false,
  },

  entramix: {
    productInformation: true,
    nutritionFacts: true,
    variants: true,
    nutritionType: "clinical",
    showNeeds: false,
    showBenefits: false,
  },

  entrasoy: {
    productInformation: true,
    nutritionFacts: true,
    variants: true,
    nutritionType: "clinical",
    showNeeds: false,
    showBenefits: false,
  },

  hepatosol: {
    productInformation: true,
    nutritionFacts: true,
    variants: true,
    nutritionType: "clinical",
    showNeeds: false,
    showBenefits: false,
  },

  "hepatosol-lola": {
    productInformation: true,
    nutritionFacts: true,
    variants: true,
    nutritionType: "clinical",
    showNeeds: false,
    showBenefits: false,
  },

  "nephrisol-d": {
    productInformation: true,
    nutritionFacts: true,
    variants: true,
    nutritionType: "clinical",
    showNeeds: false,
    showBenefits: false,
  },

  peptisol: {
    productInformation: true,
    nutritionFacts: true,
    variants: true,
    nutritionType: "clinical",
    showNeeds: false,
    showBenefits: false,
  },

  pulmosol: {
    productInformation: true,
    nutritionFacts: true,
    variants: true,
    nutritionType: "clinical",
    showNeeds: false,
    showBenefits: false,
  },

  oligo: {
    productInformation: true,
    nutritionFacts: true,
    variants: true,
    nutritionType: "clinical",
    showNeeds: false,
    showBenefits: false,
  },

  nephrisol: {
    productInformation: true,
    nutritionFacts: true,
    variants: true,
    nutritionType: "clinical",
    showNeeds: false,
    showBenefits: false,
  },
};
