"use server";

import { redirect } from "next/navigation";
import {
  readFimaStorage,
  writeFimaStorage,
} from "@/lib/cms/fima-storage";

export async function saveFimaRecipe(
  formData: FormData
) {
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
      .filter(Boolean),
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

  redirect(`/cms/support-system/fima/${slug}/edit?saved=1`);
}
