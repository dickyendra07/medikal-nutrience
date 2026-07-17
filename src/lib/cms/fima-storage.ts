import { promises as fs } from "fs";
import path from "path";
import {
  fimaRecipes,
  type FimaRecipe,
} from "@/data/dapur-sehat-fima";

export type CmsFimaRecipe = FimaRecipe & {
  status: "Published" | "Draft" | "Hidden";
  updatedAt: string | null;
};

type CmsFimaStorage = Record<string, CmsFimaRecipe>;

const filePath = path.join(
  process.cwd(),
  "src/data/cms/cms-fima-recipes.json"
);

export async function readFimaStorage(): Promise<CmsFimaStorage> {
  try {
    const file = await fs.readFile(filePath, "utf8");

    return JSON.parse(file) as CmsFimaStorage;
  } catch {
    return {};
  }
}

export async function writeFimaStorage(
  data: CmsFimaStorage
) {
  await fs.writeFile(
    filePath,
    JSON.stringify(data, null, 2),
    "utf8"
  );
}

export async function getFimaRecipes() {
  const storage = await readFimaStorage();

  return fimaRecipes.map((recipe) => {
    return (
      storage[recipe.slug] ?? {
        ...recipe,
        status: "Published",
        updatedAt: null,
      }
    );
  });
}

export async function getFimaRecipeBySlug(
  slug: string
) {
  const storage = await readFimaStorage();

  const original = fimaRecipes.find(
    (recipe) => recipe.slug === slug
  );

  if (!original) {
    return null;
  }

  return (
    storage[slug] ?? {
      ...original,
      status: "Published",
      updatedAt: null,
    }
  );
}
