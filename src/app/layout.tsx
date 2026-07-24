import type { Metadata } from "next";
import "./globals.css";
import { RevealProvider } from "@/components/shared/RevealProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://medikal-nutrience.vercel.app"),

  title: "Medikal Nutrience",

  description:
    "Medikal Nutrience menghadirkan solusi nutrisi untuk berbagai kebutuhan tubuh dan kondisi kesehatan.",
};

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
