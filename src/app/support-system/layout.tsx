import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support System",
  description:
    "Gunakan kalkulator status gizi, inspirasi menu, edukasi, dan dukungan komunitas Medikal Nutrience.",
  openGraph: {
    title: "Support System | Medikal Nutrience",
    description: "Gunakan kalkulator status gizi, inspirasi menu, edukasi, dan dukungan komunitas Medikal Nutrience.",
  },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
