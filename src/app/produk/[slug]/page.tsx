import { notFound } from "next/navigation";
import { PageShell } from "@/components/shared/PageShell";
import { ProductDetailTemplate } from "@/components/pages/product-detail/ProductDetailTemplate";
import { getProductBySlug, productDetails } from "@/data/product-details";

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

  return {
    title: `${product.name} | Medikal Nutrience`,
    description: product.description,
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

  return (
    <PageShell>
      <ProductDetailTemplate product={product} />
    </PageShell>
  );
}
