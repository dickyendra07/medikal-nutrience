import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "CMS | Medikal Nutrience" },
  robots: { index: false, follow: false, noarchive: true },
};

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
