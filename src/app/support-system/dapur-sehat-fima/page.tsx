import { PageShell } from "@/components/shared/PageShell";
import { SupportSystemDetailTemplate } from "@/components/pages/support-system/SupportSystemDetailTemplate";
import { getSupportItemBySlug } from "@/data/support-system";
import { getFimaRecipes } from "@/lib/cms/fima-storage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Dapur Sehat FIMA | Medikal Nutrience" },
  description:
    "Temukan inspirasi menu sehat dan resep praktis dari Dapur Sehat FIMA Medikal Nutrience.",
  openGraph: {
    title: "Dapur Sehat FIMA | Medikal Nutrience",
    description: "Temukan inspirasi menu sehat dan resep praktis dari Dapur Sehat FIMA Medikal Nutrience.",
  },
};

export default async function DapurSehatFimaPage() {
  const item = getSupportItemBySlug("dapur-sehat-fima");

  if (!item) return null;

  const recipes = (await getFimaRecipes()).filter(
    (recipe) => recipe.status === "Published"
  );

  return (
    <PageShell>
      <SupportSystemDetailTemplate item={item} fimaRecipes={recipes} />
    </PageShell>
  );
}
