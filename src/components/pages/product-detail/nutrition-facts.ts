import type {
  NutritionItem,
  ProductNutrition,
} from "@/data/product-nutrition";

const SODIUM_NAME = "Garam / Natrium";

// "Vitamin K1 10 mcg" -> { name: "Vitamin K1", value: "10", unit: "mcg" }
const COMPONENT_PATTERN = /^(.+?)\s+(\d[\d.,]*)\s*([A-Za-zµ]+)$/;

function normalizeUnit(unit: string) {
  return unit.toLowerCase() === "gram" ? "g" : unit;
}

function expandComponent(component: NutritionItem): NutritionItem[] {
  const raw = component.value;

  if (raw === null || raw === undefined) return [];

  const text = raw.trim();

  // "-" marks an empty source cell, so there is no row to show.
  if (text === "" || text === "-") return [];

  // Split on commas that start a new label ("..., Isoleusin 0,8 g") but not on
  // decimal commas ("0,6 g").
  return text.split(/,\s*(?=[A-Za-z])/).map((part) => {
    const match = COMPONENT_PATTERN.exec(part.trim());

    if (!match) {
      return { name: part.trim(), value: "" };
    }

    return {
      name: match[1],
      value: match[2],
      unit: normalizeUnit(match[3]),
    };
  });
}

/**
 * Splits the stored nutrition data into the two tables shown on the site:
 * Makronutrien and Mikronutrien. Sodium and "Zat Gizi Lainnya" belong in
 * Mikronutrien, so they are moved here instead of being duplicated in data.
 */
export function getNutritionTables(data: ProductNutrition) {
  const sodium = data.nutrition.find((item) => item.name === SODIUM_NAME);
  const macros = data.nutrition.filter((item) => item.name !== SODIUM_NAME);

  const micros = [...data.vitamins];

  if (sodium) {
    const potassiumIndex = micros.findIndex((item) => item.name === "Kalium");

    if (potassiumIndex === -1) {
      micros.push(sodium);
    } else {
      micros.splice(potassiumIndex, 0, sodium);
    }
  }

  for (const component of data.components ?? []) {
    micros.push(...expandComponent(component));
  }

  return { macros, micros };
}

/** Indonesian decimal separator: 301.5 -> 301,5. Non-numeric text is untouched. */
export function formatDecimal(value: string | null) {
  if (value === null) return value;

  return /^-?\d+\.\d+$/.test(value.trim()) ? value.trim().replace(".", ",") : value;
}
