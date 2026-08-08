import { PageShell } from "@/components/shared/PageShell";
import { CorporatePageTemplate } from "@/components/pages/corporate/CorporatePageTemplate";
import { corporatePages } from "@/data/corporate-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mitra Medis dan Enterprise",
  description:
    "Solusi kolaborasi nutrisi Medikal Nutrience untuk rumah sakit, klinik, apotek, dan perusahaan.",
  openGraph: {
    title: "Mitra Medis dan Enterprise | Medikal Nutrience",
    description: "Solusi kolaborasi nutrisi Medikal Nutrience untuk rumah sakit, klinik, apotek, dan perusahaan.",
  },
};

export default function MitraEnterprisePage() {
  return (
    <PageShell>
      <CorporatePageTemplate page={corporatePages.mitraEnterprise} />
    </PageShell>
  );
}
