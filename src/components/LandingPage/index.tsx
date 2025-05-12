import { Header } from "@/components/LandingPage/header";
import { HeroSection } from "@/components/LandingPage/hero-section";
import { FeaturesSection } from "@/components/LandingPage/features-section";
import { DemoSection } from "@/components/LandingPage/demo-section";
import { TestimonialsSection } from "@/components/LandingPage/testimonials-section";
import { CtaSection } from "@/components/LandingPage/cta-section";
import { Footer } from "@/components/LandingPage/footer";
import { useTheme } from "next-themes";

export default function LandingPage() {

  return (
    <main className="container mx-auto min-h-screen bg-background px-4">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <DemoSection />

      {/* <TestimonialsSection /> */}
      
      <CtaSection />
      <Footer />
    </main>
  );
}
