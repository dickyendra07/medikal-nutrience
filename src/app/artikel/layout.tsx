import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel Nutrisi dan Kesehatan",
  description:
    "Baca informasi nutrisi dan edukasi kesehatan dari Medikal Nutrience untuk kehidupan yang lebih baik.",
  openGraph: {
    title: "Artikel Nutrisi dan Kesehatan | Medikal Nutrience",
    description: "Baca informasi nutrisi dan edukasi kesehatan dari Medikal Nutrience untuk kehidupan yang lebih baik.",
  },
};

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
