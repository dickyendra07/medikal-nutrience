"use server";

import { promises as fs } from "fs";
import path from "path";
import { redirect } from "next/navigation";
import { isCmsAuthenticated } from "@/lib/cms/auth";

type ProductDraft = {
  slug: string;
  name: string;
  category: string;
  heroTitle: string;
  description: string;
  ctaLabel: string;
  status: "published" | "draft" | "review";
  updatedAt: string;
};

const cmsProductsPath = path.join(
  process.cwd(),
  "src/data/cms/cms-products.json"
);

async function readDrafts(): Promise<Record<string, ProductDraft>> {
  try {
    const file = await fs.readFile(cmsProductsPath, "utf8");
    return JSON.parse(file) as Record<string, ProductDraft>;
  } catch {
    return {};
  }
}

async function writeDrafts(drafts: Record<string, ProductDraft>) {
  await fs.mkdir(path.dirname(cmsProductsPath), { recursive: true });
  await fs.writeFile(cmsProductsPath, JSON.stringify(drafts, null, 2));
}

export async function saveProductDraft(formData: FormData) {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const originalSlug = String(formData.get("originalSlug") ?? "");
  const slug = String(formData.get("slug") ?? "").trim();

  if (!originalSlug || !slug) {
    throw new Error("Slug produk tidak valid.");
  }

  const draft: ProductDraft = {
    slug,
    name: String(formData.get("name") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    heroTitle: String(formData.get("heroTitle") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    ctaLabel: String(formData.get("ctaLabel") ?? "").trim(),
    status: String(formData.get("status") ?? "draft") as ProductDraft["status"],
    updatedAt: new Date().toISOString(),
  };

  const drafts = await readDrafts();
  drafts[originalSlug] = draft;

  await writeDrafts(drafts);

  redirect(`/cms/products/${originalSlug}/edit?saved=1`);
}
