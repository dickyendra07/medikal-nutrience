import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { TopBar } from "@/components/layout/TopBar";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { Hero } from "@/components/sections/Hero";
import { ProductHighlight } from "@/components/sections/ProductHighlight";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { SupportSystem } from "@/components/sections/SupportSystem";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4fbf8] text-[#111827]">
      <TopBar />
      <Navbar />
      <Hero />
      <ProductHighlight />
      <SolutionSection />
      <SupportSystem />
      <ConsultationCTA />
      <Footer />
    </main>
  );
}
