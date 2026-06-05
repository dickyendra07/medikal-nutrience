import { PageShell } from "@/components/shared/PageShell";
import { SupportSystemDetailTemplate } from "@/components/pages/support-system/SupportSystemDetailTemplate";
import { getSupportItemBySlug } from "@/data/support-system";

export default function DapurSehatFimaPage() {
  const item = getSupportItemBySlug("dapur-sehat-fima");

  if (!item) return null;

  return (
    <PageShell>
      <SupportSystemDetailTemplate item={item} />
    </PageShell>
  );
}
