"use server";

import { promises as fs } from "fs";
import path from "path";
import { redirect } from "next/navigation";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { pharmacies } from "@/data/pharmacies";

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
  source: "cms-created";
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

function getNextNo(drafts: Record<string, PharmacyDraft>) {
  const staticNos = pharmacies.map((item) => item.no);
  const draftNos = Object.values(drafts).map((item) => item.no);
  return Math.max(...staticNos, ...draftNos, 0) + 1;
}

export async function createPharmacyDraft(formData: FormData) {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const drafts = await readDrafts();
  const requestedNo = Number(formData.get("no") ?? 0);
  const no = requestedNo > 0 ? requestedNo : getNextNo(drafts);

  const draft: PharmacyDraft = {
    no,
    name: String(formData.get("name") ?? "").trim(),
    onlineStore: String(formData.get("onlineStore") ?? "").trim(),
    area: String(formData.get("area") ?? "").trim(),
    city: String(formData.get("city") ?? "").trim(),
    pic: String(formData.get("pic") ?? "").trim(),
    status: String(formData.get("status") ?? "Official Partner").trim(),
    contactType: String(formData.get("contactType") ?? "Apotek").trim(),
    stock: parseStock(formData.get("stock")),
    logo: String(formData.get("logo") ?? "").trim(),
    updatedAt: new Date().toISOString(),
    source: "cms-created",
  };

  if (!draft.name) {
    throw new Error("Nama partner wajib diisi.");
  }

  drafts[String(no)] = draft;

  await writeDrafts(drafts);

  redirect(`/cms/pharmacies?created=1`);
}
