import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgressBar } from "@/components/shared/ScrollProgressBar";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SocialProof } from "@/components/sections/SocialProof";
import { CTASection } from "@/components/sections/CTASection";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <Header />
      <main className="flex-1">
        <Hero />
        <Story />
        <Features />
        <HowItWorks />
        <SocialProof />
        <CTASection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
