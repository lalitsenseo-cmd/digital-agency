import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const revalidate = 0;

export default function Home() {
  return (
    <main style={{ background: "#080808", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <Services />
      <Work />
      <Pricing />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
