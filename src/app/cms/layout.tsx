import type { Metadata } from "next";
import "./cms-theme.css";

export const metadata: Metadata = {
  title: { absolute: "CMS | Medikal Nutrience" },
  robots: { index: false, follow: false, noarchive: true },
};

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return <div className="cms-app">{children}</div>;
}
