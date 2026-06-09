import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
      <body>{children}</body>
    </html>
  );
}
