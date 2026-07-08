import { notFound } from "next/navigation";
import { PageShell } from "@/components/shared/PageShell";
import { SolutionDetailTemplate } from "@/components/pages/solutions/SolutionDetailTemplate";
import { getSolutionBySlug, solutionDetails } from "@/data/solutions";
import { promises as fs } from "fs";
import path from "path";

type CmsSolutionDraft = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  problemTitle: string;
  problems: string[];
  educationTitle: string;
  educationPoints: string[];
  status: "published" | "draft" | "review";
  updatedAt: string;
};

async function getSolutionDraft(slug: string) {
  try {
    const file = await fs.readFile(
      path.join(process.cwd(), "src/data/cms/cms-solutions.json"),
      "utf8"
    );
    const drafts = JSON.parse(file) as Record<string, CmsSolutionDraft>;
    const draft = drafts[slug];

    if (!draft || draft.status !== "published") {
      return null;
    }

    return draft;
  } catch {
    return null;
  }
}

function mergeSolutionDraft<T extends NonNullable<ReturnType<typeof getSolutionBySlug>>>(
  solution: T,
  draft: CmsSolutionDraft | null
) {
  if (!draft) {
    return solution;
  }

  return {
    ...solution,
    slug: draft.slug,
    title: draft.title,
    shortTitle: draft.shortTitle,
    eyebrow: draft.eyebrow,
    description: draft.description,
    problemTitle: draft.problemTitle,
    problems: draft.problems,
    educationTitle: draft.educationTitle,
    educationPoints: draft.educationPoints,
  };
}


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

  const draft = await getSolutionDraft(slug);
  const viewSolution = mergeSolutionDraft(solution, draft);

  return {
    title: `${viewSolution.shortTitle} | Solusi Medikal Nutrience`,
    description: viewSolution.description,
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

  const draft = await getSolutionDraft(slug);
  const viewSolution = mergeSolutionDraft(solution, draft);

  return (
    <PageShell>
      <SolutionDetailTemplate solution={viewSolution} />
    </PageShell>
  );
}
