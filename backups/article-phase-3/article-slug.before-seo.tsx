import { notFound } from "next/navigation";
import { ArticleDetailPage } from "@/components/pages/articles/ArticleDetailPage";
import { getArticleBySlug } from "@/data/articles";

export function generateStaticParams() {
  return [
    {
      slug: "pentingnya-protein-saat-masa-pemulihan",
    },
    {
      slug: "memahami-kebutuhan-nutrisi-pasien-ginjal",
    },
    {
      slug: "cara-memilih-nutrisi-sesuai-kondisi-tubuh",
    },
    {
      slug: "nutrisi-untuk-lansia-agar-tetap-aktif",
    },
    {
      slug: "mengatasi-anak-susah-makan",
    },
    {
      slug: "mengenal-hepatosol-dukungan-nutrisi-hati",
    },
    {
      slug: "mengenal-produk-peptisol",
    },
    {
      slug: "tips-menjaga-pola-makan-seimbang",
    },
  ];
}

export default async function ArticleDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ArticleDetailPage article={article} />;
}
