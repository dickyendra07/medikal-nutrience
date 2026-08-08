import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produk Nutrisi",
  description:
    "Jelajahi produk Medikal Nutrience untuk kebutuhan nutrisi anak, dewasa, lansia, dan kondisi kesehatan khusus.",
  openGraph: {
    title: "Produk Nutrisi | Medikal Nutrience",
    description: "Jelajahi produk Medikal Nutrience untuk kebutuhan nutrisi anak, dewasa, lansia, dan kondisi kesehatan khusus.",
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
