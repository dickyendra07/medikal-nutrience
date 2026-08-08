"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  readFimaStorage,
  writeFimaStorage,
} from "@/lib/cms/fima-storage";
import { requireCmsEditor } from "@/lib/cms/auth";

export async function saveFimaRecipe(
  formData: FormData
) {
  await requireCmsEditor();
  const slug = String(formData.get("slug"));

  const storage = await readFimaStorage();

  storage[slug] = {
    slug,
    title: String(formData.get("title")),
    category: String(formData.get("category")),
    readTime: String(formData.get("readTime")),
    image: String(formData.get("image")),
    excerpt: "",
    description: String(formData.get("description")),
    ingredients: String(formData.get("ingredients"))
      .split("\n")
      .map((ingredient) => ingredient.trim())
      .filter(Boolean)
      .map((ingredient) => {
        const [name, ...nutritionParts] = ingredient.split("|");
        return {
          name: name.trim(),
          nutrition: nutritionParts.join("|").trim(),
        };
      }),
    steps: String(formData.get("steps"))
      .split("\n")
      .filter(Boolean),
    nutritionNotes: String(formData.get("nutritionNotes"))
      .split("\n")
      .filter(Boolean),
    status: String(formData.get("status")) as
      | "Published"
      | "Draft"
      | "Hidden",
    updatedAt: new Date().toISOString(),
  };

  await writeFimaStorage(storage);

  revalidatePath("/support-system/dapur-sehat-fima");
  revalidatePath(`/support-system/dapur-sehat-fima/${slug}`);
  redirect(`/cms/support-system/fima/${slug}/edit?saved=1`);
}
