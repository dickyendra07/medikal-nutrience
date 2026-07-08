import { notFound } from "next/navigation";
import { PageShell } from "@/components/shared/PageShell";
import { ProductDetailTemplate } from "@/components/pages/product-detail/ProductDetailTemplate";
import { getProductBySlug, productDetails } from "@/data/product-details";
import { promises as fs } from "fs";
import path from "path";

type CmsProductDraft = {
  slug: string;
  name: string;
  category: string;
  heroTitle: string;
  description: string;
  ctaLabel: string;
  status: "published" | "draft" | "review";
  updatedAt: string;
};

async function getProductDraft(slug: string) {
  try {
    const file = await fs.readFile(
      path.join(process.cwd(), "src/data/cms/cms-products.json"),
      "utf8"
    );
    const drafts = JSON.parse(file) as Record<string, CmsProductDraft>;
    const draft = drafts[slug];

    if (!draft || draft.status !== "published") {
      return null;
    }

    return draft;
  } catch {
    return null;
  }
}


type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return productDetails.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan",
    };
  }

  const draft = await getProductDraft(slug);
  const viewProduct = draft
    ? {
        ...product,
        name: draft.name,
        slug: draft.slug,
        category: draft.category,
        heroTitle: draft.heroTitle,
        description: draft.description,
        ctaLabel: draft.ctaLabel,
      }
    : product;

  return {
    title: `${viewProduct.name} | Medikal Nutrience`,
    description: viewProduct.description,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const draft = await getProductDraft(slug);
  const viewProduct = draft
    ? {
        ...product,
        name: draft.name,
        slug: draft.slug,
        category: draft.category,
        heroTitle: draft.heroTitle,
        description: draft.description,
        ctaLabel: draft.ctaLabel,
      }
    : product;

  return (
    <PageShell>
      <ProductDetailTemplate product={viewProduct} />
    </PageShell>
  );
}
