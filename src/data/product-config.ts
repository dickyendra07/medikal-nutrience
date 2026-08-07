export type ProductNutritionType =
  | "standard"
  | "clinical";

export type ProductConfig = {
  productInformation?: boolean;
  nutritionFacts?: boolean;
  variants?: boolean;
  nutritionType?: ProductNutritionType;
};

export const productConfig: Record<string, ProductConfig> = {
  entrakid: {
    nutritionFacts: true,
    variants: true,
    nutritionType: "standard",
  },

  entramix: {
    productInformation: true,
    nutritionFacts: true,
    variants: true,
    nutritionType: "clinical",
  },

  entrasoy: {
    productInformation: true,
    nutritionFacts: true,
    variants: true,
    nutritionType: "clinical",
  },

  hepatosol: {
    productInformation: true,
    nutritionFacts: true,
    variants: true,
    nutritionType: "clinical",
  },

  "hepatosol-lola": {
    productInformation: true,
    nutritionFacts: true,
    variants: true,
    nutritionType: "clinical",
  },

  "nephrisol-d": {
    productInformation: true,
    nutritionFacts: true,
    variants: true,
    nutritionType: "clinical",
  },

  oligo: {
    productInformation: true,
    nutritionFacts: true,
    variants: true,
    nutritionType: "clinical",
  },

  nephrisol: {
    productInformation: true,
    nutritionFacts: true,
    variants: true,
    nutritionType: "clinical",
  },
};
