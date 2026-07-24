import { FeatureGridSection } from "@/components/shared/FeatureGridSection";

const solutions = [
  {
    title: "Ginjal",
    description:
      "Solusi nutrisi untuk kebutuhan kondisi ginjal.",
    href: "/solusi/ginjal",
    color:"#5b0ca8",
    soft:"#f3e8ff",
  },
  {
    title: "Hati / Liver",
    description:
      "Dukungan nutrisi untuk kebutuhan fungsi hati.",
    href: "/solusi/hati-liver",
    color:"#ef1f2d",
    soft:"#fee2e2",
  },
  {
    title: "Syaraf & Otak",
    description:
      "Nutrisi pendukung untuk kondisi neurologi.",
    href:"/produk/peptibren",
    color:"#2563eb",
    soft:"#dbeafe",
  },
  {
    title:"Pernafasan",
    description:
      "Formula nutrisi untuk kebutuhan pernafasan.",
    href:"/produk/pulmosol",
    color:"#1e3a8a",
    soft:"#dbeafe",
  },
  {
    title:"Pencernaan",
    description:
      "Nutrisi yang mudah diserap tubuh.",
    href:"/produk/oligo",
    color:"#d85b70",
    soft:"#fce7f3",
  },
];

export function SolutionSection(){

  return (
    <FeatureGridSection
      eyebrow="Solusi Kesehatan"
      title="Solusi Nutrisi Berdasarkan Kebutuhan Tubuh"
      description="
      Setiap kondisi membutuhkan pendekatan nutrisi yang berbeda.
      Temukan solusi yang sesuai dengan kebutuhan Anda.
      "
      introButton="Lihat Semua Solusi"
      introHref="/solusi"
      items={solutions}
    />
  );
}
