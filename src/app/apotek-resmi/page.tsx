import { PageShell } from "@/components/shared/PageShell";
import { PageHero } from "@/components/shared/PageHero";
import { PharmacyLocator } from "@/components/pages/pharmacies/PharmacyLocator";

export default function ApotekResmiPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Apotek Resmi"
        title="Temukan Kanal Pembelian Resmi Medikal Nutrience"
        description="Pastikan Anda membeli produk Medikal Nutrience melalui apotek, marketplace, dan mitra resmi untuk menjaga keaslian produk."
      />

      <PharmacyLocator />
    </PageShell>
  );
}
