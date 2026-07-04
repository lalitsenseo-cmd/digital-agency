import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { WhatsAppButton } from "@/components/PremiumFeatures";
import { JsonLd, localBusinessNode, websiteNode } from "@/lib/schema";
import type { Metadata } from "next";
import StatsBar from "@/components/StatsBar";
import AboutSection from "@/components/AboutSection";
import CTAForm from "@/components/CTAForm";
import StatsNumbers from "@/components/StatsNumbers";
import TrustedBrands from "@/components/TrustedBrands";
import Industries from "@/components/Industries";

// ✅ Supabase hataya — direct hardcode
export const metadata: Metadata = {
  title: "Digital Marketing Agency | SEO Services | Clickbriz",
  description: "Grow your business with Clickbriz. We offer SEO, Google Ads, Social Media Marketing, Website Development, and Python Automation services.",
};

export default function Home() {
  return (
    <main style={{ background: "#080808", minHeight: "100vh" }}>
      <JsonLd graph={[localBusinessNode(), websiteNode()]} />
      <WhatsAppButton />
      <Navbar />
      <Hero />
      <StatsBar />
      <AboutSection />
      <CTAForm />
      <StatsNumbers />
      <TrustedBrands />
      <Services />
      <Industries />
      <Work />
      <Pricing />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}