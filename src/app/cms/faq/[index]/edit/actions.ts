"use server";

import { promises as fs } from "fs";
import path from "path";
import { redirect } from "next/navigation";
import { isCmsAuthenticated } from "@/lib/cms/auth";

type FaqDraft = {
  index: number;
  category: string;
  question: string;
  answer: string;
  ctaLabel: string;
  ctaHref: string;
  status: "published" | "draft" | "review";
  updatedAt: string;
};

const cmsFaqsPath = path.join(process.cwd(), "src/data/cms/cms-faqs.json");

async function readDrafts(): Promise<Record<string, FaqDraft>> {
  try {
    const file = await fs.readFile(cmsFaqsPath, "utf8");
    return JSON.parse(file) as Record<string, FaqDraft>;
  } catch {
    return {};
  }
}

async function writeDrafts(drafts: Record<string, FaqDraft>) {
  await fs.mkdir(path.dirname(cmsFaqsPath), { recursive: true });
  await fs.writeFile(cmsFaqsPath, JSON.stringify(drafts, null, 2));
}

export async function saveFaqDraft(formData: FormData) {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const originalIndex = String(formData.get("originalIndex") ?? "");
  const indexNumber = Number(originalIndex);

  if (!originalIndex || Number.isNaN(indexNumber)) {
    throw new Error("Index FAQ tidak valid.");
  }

  const draft: FaqDraft = {
    index: indexNumber,
    category: String(formData.get("category") ?? "").trim(),
    question: String(formData.get("question") ?? "").trim(),
    answer: String(formData.get("answer") ?? "").trim(),
    ctaLabel: String(formData.get("ctaLabel") ?? "").trim(),
    ctaHref: String(formData.get("ctaHref") ?? "").trim(),
    status: String(formData.get("status") ?? "published") as FaqDraft["status"],
    updatedAt: new Date().toISOString(),
  };

  const drafts = await readDrafts();
  drafts[originalIndex] = draft;

  await writeDrafts(drafts);

  redirect(`/cms/faq/${originalIndex}/edit?saved=1`);
}
