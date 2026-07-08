import { promises as fs } from "fs";
import path from "path";
import { PageShell } from "@/components/shared/PageShell";
import { PageHero } from "@/components/shared/PageHero";
import { PharmacyLocator } from "@/components/pages/pharmacies/PharmacyLocator";
import { pharmacies, type PharmacyPartner } from "@/data/pharmacies";

type CmsPharmacyDraft = {
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

async function getPharmacyDrafts() {
  try {
    const file = await fs.readFile(
      path.join(process.cwd(), "src/data/cms/cms-pharmacies.json"),
      "utf8"
    );

    if (!file.trim()) {
      return {};
    }

    return JSON.parse(file) as Record<string, CmsPharmacyDraft>;
  } catch {
    return {};
  }
}

export default async function ApotekResmiPage() {
  const drafts = await getPharmacyDrafts();

  const staticPharmacies: PharmacyPartner[] = pharmacies.map((partner) => {
    const draft = drafts[String(partner.no)];

    if (!draft) {
      return partner;
    }

    return {
      ...partner,
      no: draft.no,
      name: draft.name,
      onlineStore: draft.onlineStore,
      area: draft.area,
      city: draft.city,
      pic: draft.pic,
      status: draft.status,
      contactType: draft.contactType,
      stock: draft.stock,
      logo: draft.logo || undefined,
    };
  });

  const staticNos = new Set(pharmacies.map((partner) => String(partner.no)));

  const cmsCreatedPharmacies: PharmacyPartner[] = Object.entries(drafts)
    .filter(([key, draft]) => !staticNos.has(key) && draft.status !== "Draft")
    .map(([, draft]) => ({
      no: draft.no,
      name: draft.name,
      onlineStore: draft.onlineStore,
      area: draft.area,
      city: draft.city,
      pic: draft.pic,
      status: draft.status,
      contactType: draft.contactType,
      stock: draft.stock,
      logo: draft.logo || undefined,
    }));

  const viewPharmacies: PharmacyPartner[] = [
    ...staticPharmacies,
    ...cmsCreatedPharmacies,
  ]
    .filter((partner) => partner.status !== "Draft" && partner.status !== "Deleted")
    .sort((a, b) => a.no - b.no);

  return (
    <PageShell>
      <PageHero
        eyebrow="Apotek Resmi"
        title="Temukan Kanal Pembelian Resmi Medikal Nutrience"
        description="Pastikan Anda membeli produk Medikal Nutrience melalui apotek, marketplace, dan mitra resmi untuk menjaga keaslian produk."
      />

      <PharmacyLocator initialPharmacies={viewPharmacies} />
    </PageShell>
  );
}
