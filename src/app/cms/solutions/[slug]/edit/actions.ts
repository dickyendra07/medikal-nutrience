"use server";

import { promises as fs } from "fs";
import path from "path";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireCmsPermission } from "@/lib/cms/auth";
import { CMS_PERMISSIONS } from "@/lib/cms/permissions";

type SolutionDraft = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  problemTitle: string;
  problems: string[];
  educationTitle: string;
  educationPoints: string[];
  status: "published" | "draft" | "review";
  updatedAt: string;
};

const cmsSolutionsPath = path.join(
  process.cwd(),
  "src/data/cms/cms-solutions.json"
);

async function readDrafts(): Promise<Record<string, SolutionDraft>> {
  try {
    const file = await fs.readFile(cmsSolutionsPath, "utf8");
    return JSON.parse(file) as Record<string, SolutionDraft>;
  } catch {
    return {};
  }
}

async function writeDrafts(drafts: Record<string, SolutionDraft>) {
  await fs.mkdir(path.dirname(cmsSolutionsPath), { recursive: true });
  await fs.writeFile(cmsSolutionsPath, JSON.stringify(drafts, null, 2));
}

function parseList(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function saveSolutionDraft(formData: FormData) {
  await requireCmsPermission(CMS_PERMISSIONS.SOLUTION_EDIT);

  const originalSlug = String(formData.get("originalSlug") ?? "");
  const slug = String(formData.get("slug") ?? "").trim();

  if (!originalSlug || !slug) {
    throw new Error("Slug solusi tidak valid.");
  }

  const draft: SolutionDraft = {
    slug,
    title: String(formData.get("title") ?? "").trim(),
    shortTitle: String(formData.get("shortTitle") ?? "").trim(),
    eyebrow: String(formData.get("eyebrow") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    problemTitle: String(formData.get("problemTitle") ?? "").trim(),
    problems: parseList(formData.get("problems")),
    educationTitle: String(formData.get("educationTitle") ?? "").trim(),
    educationPoints: parseList(formData.get("educationPoints")),
    status: String(formData.get("status") ?? "published") as SolutionDraft["status"],
    updatedAt: new Date().toISOString(),
  };

  const drafts = await readDrafts();
  drafts[originalSlug] = draft;

  await writeDrafts(drafts);

  revalidatePath("/solusi");
  revalidatePath(`/solusi/${originalSlug}`);
  if (slug !== originalSlug) revalidatePath(`/solusi/${slug}`);
  redirect(`/cms/solutions/${originalSlug}/edit?saved=1`);
}


export async function deleteSolutionDraft(formData: FormData) {
  await requireCmsPermission(CMS_PERMISSIONS.SOLUTION_DELETE);

  const originalSlug = String(formData.get("originalSlug") ?? "");

  if (!originalSlug) {
    throw new Error("Slug solusi tidak valid.");
  }

  const drafts = await readDrafts();

  if (drafts[originalSlug]) {
    delete drafts[originalSlug];
    await writeDrafts(drafts);
  }

  revalidatePath("/solusi");
  revalidatePath(`/solusi/${originalSlug}`);
  redirect(`/cms/solutions/${originalSlug}/edit?reset=1`);
}
