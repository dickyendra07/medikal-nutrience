import type { Metadata } from "next";
import "./globals.css";
import { RevealProvider } from "@/components/shared/RevealProvider";
import { getSettings } from "@/lib/cms/settings-storage";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const title = settings.seoTitle || "Medikal Nutrience | Solusi Nutrisi Medis";
  const description =
    settings.seoDescription ||
    settings.siteDescription ||
    "Medikal Nutrience menghadirkan solusi nutrisi untuk berbagai kebutuhan tubuh dan kondisi kesehatan.";

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://medikal-nutrience.vercel.app"
    ),
    applicationName: settings.siteName || "Medikal Nutrience",
    title: { default: title, template: "%s | Medikal Nutrience" },
    description,
    keywords: ["nutrisi medis", "nutrisi keluarga", "Medikal Nutrience", "Kalbe"],
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName: settings.siteName || "Medikal Nutrience",
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <RevealProvider />
        {children}
      </body>
    </html>
  );
}
