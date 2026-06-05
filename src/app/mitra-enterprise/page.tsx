import { PageShell } from "@/components/shared/PageShell";
import { CorporatePageTemplate } from "@/components/pages/corporate/CorporatePageTemplate";
import { corporatePages } from "@/data/corporate-pages";

export default function MitraEnterprisePage() {
  return (
    <PageShell>
      <CorporatePageTemplate page={corporatePages.mitraEnterprise} />
    </PageShell>
  );
}
