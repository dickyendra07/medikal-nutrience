import { notFound } from "next/navigation";
import { PageShell } from "@/components/shared/PageShell";
import { SolutionDetailTemplate } from "@/components/pages/solutions/SolutionDetailTemplate";
import { getSolutionBySlug, solutionDetails } from "@/data/solutions";

type SolutionDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return solutionDetails.map((solution) => ({
    slug: solution.slug,
  }));
}

export async function generateMetadata({ params }: SolutionDetailPageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return {
      title: "Solusi Tidak Ditemukan",
    };
  }

  return {
    title: `${solution.shortTitle} | Solusi Medikal Nutrience`,
    description: solution.description,
  };
}

export default async function SolutionDetailPage({
  params,
}: SolutionDetailPageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  return (
    <PageShell>
      <SolutionDetailTemplate solution={solution} />
    </PageShell>
  );
}
