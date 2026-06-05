import { PageShell } from "@/components/shared/PageShell";
import { CorporatePageTemplate } from "@/components/pages/corporate/CorporatePageTemplate";
import { corporatePages } from "@/data/corporate-pages";

export default function KontakPage() {
  return (
    <PageShell>
      <CorporatePageTemplate page={corporatePages.kontak} />
    </PageShell>
  );
}
