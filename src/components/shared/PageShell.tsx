import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { TopBar } from "@/components/layout/TopBar";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f4fbf8] text-[#111827]">
      <TopBar />
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
