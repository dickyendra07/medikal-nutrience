"use server";

import { promises as fs } from "fs";
import path from "path";
import { redirect } from "next/navigation";
import { isCmsAuthenticated } from "@/lib/cms/auth";

type PharmacyDraft = {
  no: number;
  name: string;
  onlineStore: string;
  area: string;
  city: string;
  pic: string;
  status: string;
  contactType: string;
  stock: string[];
  logo: string;
  updatedAt: string;
};

const cmsPharmaciesPath = path.join(
  process.cwd(),
  "src/data/cms/cms-pharmacies.json"
);

async function readDrafts(): Promise<Record<string, PharmacyDraft>> {
  try {
    const file = await fs.readFile(cmsPharmaciesPath, "utf8");

    if (!file.trim()) {
      return {};
    }

    return JSON.parse(file) as Record<string, PharmacyDraft>;
  } catch {
    return {};
  }
}

async function writeDrafts(drafts: Record<string, PharmacyDraft>) {
  await fs.mkdir(path.dirname(cmsPharmaciesPath), { recursive: true });
  await fs.writeFile(cmsPharmaciesPath, JSON.stringify(drafts, null, 2));
}

function parseStock(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function savePharmacyDraft(formData: FormData) {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const originalNo = String(formData.get("originalNo") ?? "");
  const no = Number(formData.get("no") ?? originalNo);

  if (!originalNo || Number.isNaN(no)) {
    throw new Error("Nomor apotek tidak valid.");
  }

  const draft: PharmacyDraft = {
    no,
    name: String(formData.get("name") ?? "").trim(),
    onlineStore: String(formData.get("onlineStore") ?? "").trim(),
    area: String(formData.get("area") ?? "").trim(),
    city: String(formData.get("city") ?? "").trim(),
    pic: String(formData.get("pic") ?? "").trim(),
    status: String(formData.get("status") ?? "").trim(),
    contactType: String(formData.get("contactType") ?? "").trim(),
    stock: parseStock(formData.get("stock")),
    logo: String(formData.get("logo") ?? "").trim(),
    updatedAt: new Date().toISOString(),
  };

  const drafts = await readDrafts();
  drafts[originalNo] = draft;

  await writeDrafts(drafts);

  redirect(`/cms/pharmacies/${originalNo}/edit?saved=1`);
}


export async function deletePharmacyDraft(formData: FormData) {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const originalNo = String(formData.get("originalNo") ?? "");

  if (!originalNo) {
    throw new Error("Nomor apotek tidak valid.");
  }

  const drafts = await readDrafts();

  if (drafts[originalNo]) {
    delete drafts[originalNo];
    await writeDrafts(drafts);
  }

  redirect(`/cms/pharmacies/${originalNo}/edit?reset=1`);
}
