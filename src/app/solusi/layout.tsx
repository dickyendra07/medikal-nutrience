import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solusi Nutrisi",
  description:
    "Temukan solusi nutrisi berdasarkan kebutuhan tubuh dan kondisi kesehatan bersama Medikal Nutrience.",
  openGraph: {
    title: "Solusi Nutrisi | Medikal Nutrience",
    description: "Temukan solusi nutrisi berdasarkan kebutuhan tubuh dan kondisi kesehatan bersama Medikal Nutrience.",
  },
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
