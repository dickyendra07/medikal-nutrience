"use server";

import { promises as fs } from "fs";
import path from "path";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireCmsPermission } from "@/lib/cms/auth";
import { CMS_PERMISSIONS } from "@/lib/cms/permissions";

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
  const identity = await requireCmsPermission(CMS_PERMISSIONS.PRODUCT_EDIT);

  const originalSlug = String(formData.get("originalSlug") ?? "");
  const slug = String(formData.get("slug") ?? "").trim();

  if (!originalSlug || !slug) {
    throw new Error("Slug produk tidak valid.");
  }

  const requestedStatus = String(formData.get("status") ?? "draft") as ProductDraft["status"];
  const draft: ProductDraft = {
    slug,
    name: String(formData.get("name") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    heroTitle: String(formData.get("heroTitle") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    ctaLabel: String(formData.get("ctaLabel") ?? "").trim(),
    status: requestedStatus === "published" && !identity.permissions.includes(CMS_PERMISSIONS.PRODUCT_PUBLISH)
      ? "review"
      : requestedStatus,
    updatedAt: new Date().toISOString(),
  };

  const drafts = await readDrafts();
  drafts[originalSlug] = draft;

  await writeDrafts(drafts);

  revalidatePath("/produk");
  revalidatePath(`/produk/${originalSlug}`);
  if (slug !== originalSlug) revalidatePath(`/produk/${slug}`);
  redirect(`/cms/products/${originalSlug}/edit?saved=1`);
}


export async function deleteProductDraft(formData: FormData) {
  await requireCmsPermission(CMS_PERMISSIONS.PRODUCT_DELETE);

  const originalSlug = String(formData.get("originalSlug") ?? "");

  if (!originalSlug) {
    throw new Error("Slug produk tidak valid.");
  }

  const drafts = await readDrafts();

  if (drafts[originalSlug]) {
    delete drafts[originalSlug];
    await writeDrafts(drafts);
  }

  revalidatePath("/produk");
  revalidatePath(`/produk/${originalSlug}`);
  redirect(`/cms/products/${originalSlug}/edit?reset=1`);
}
