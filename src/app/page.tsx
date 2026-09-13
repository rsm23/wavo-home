import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import SocialProofBar from "@/components/sections/SocialProofBar";
import LiquiditySimulator from "@/components/sections/LiquiditySimulator";
import CorePillarsBento from "@/components/sections/CorePillarsBento";
import ProcessPipeline from "@/components/sections/ProcessPipeline";
import ProductCatalogHub from "@/components/sections/ProductCatalogHub";
import EligibilityQuiz from "@/components/sections/EligibilityQuiz";
import TestimonialsWall from "@/components/sections/TestimonialsWall";
import ErpIntegrationTerminal from "@/components/sections/ErpIntegrationTerminal";
import FaqSection from "@/components/sections/FaqSection";
import BlogInsights from "@/components/sections/BlogInsights";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#fafbfe] dark:bg-[#08090d] text-[#0c111d] dark:text-[#f8fafc]">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <SocialProofBar />
        <LiquiditySimulator />
        <CorePillarsBento />
        <ProcessPipeline />
        <ProductCatalogHub />
        <EligibilityQuiz />
        <TestimonialsWall />
        <ErpIntegrationTerminal />
        <FaqSection />
        <BlogInsights />
      </main>
      <Footer />
    </div>
  );
}
