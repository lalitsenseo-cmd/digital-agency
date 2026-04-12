import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | NexGen Digital Marketing Agency Faridabad",
  description: "NexGen Digital is founded by Lalit Sen — a results-driven digital marketing agency in Faridabad helping businesses grow online with SEO, Ads, Web Development and more.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "68px", fontFamily: "Inter, sans-serif" }}>
        <section style={{ background: "linear-gradient(135deg, #eff6ff 0%, #fff 100%)", padding: "4rem 2rem", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>About Us</p>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif", color: "#0f1117", marginBottom: "1.25rem" }}>
              NexGen Digital — Faridabad ki #1 Digital Marketing Agency
            </h1>
            <p style={{ color: "#6b7280", fontSize: "1.05rem", lineHeight: 1.7 }}>
              Founded by <strong>Lalit Sen</strong>, NexGen Digital helps businesses across Faridabad, Delhi NCR and India grow their revenue through smart, data-driven digital strategies.
            </p>
          </div>
        </section>

        <section style={{ padding: "4rem 2rem", background: "#fff" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "center" }}>
            <div>
              {/* Founder card */}
              <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, fontSize: "22px", color: "#fff" }}>L</span>
                </div>
                <div>
                  <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, fontSize: "18px", color: "#0f1117" }}>Lalit Sen</div>
                  <div style={{ fontSize: "13px", color: "#2563eb", fontWeight: 600 }}>Founder & Digital Marketing Expert</div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>Faridabad, Haryana</div>
                </div>
              </div>

              <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, marginBottom: "1.25rem" }}>Our Story</h2>
              <p style={{ color: "#6b7280", lineHeight: 1.8, marginBottom: "1rem" }}>
                NexGen Digital ki shuruat Faridabad se hui — ek mission ke saath ki local businesses ko bhi world-class digital marketing mile. Bahut zyada overpriced agencies, zero transparency, aur no real results — yeh sab dekha aur badlne ka decide kiya.
              </p>
              <p style={{ color: "#6b7280", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                Aaj hum SEO, Google Ads, Social Media, Website Development aur Python Automation — sab ek jagah pe dete hain. Har client ke liye dedicated team aur clear reporting.
              </p>
              {["Results-first approach — we measure everything", "No jargon — clear communication always", "Transparent pricing — no hidden fees", "Long-term partnerships, not one-time projects"].map(p => (
                <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
                  <CheckCircle size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "3px" }} />
                  <span style={{ fontSize: "14px", color: "#374151", fontWeight: 500 }}>{p}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[
                { n: "50+", l: "Happy Clients", c: "#2563eb", bg: "#eff6ff" },
                { n: "3×", l: "Average ROI", c: "#16a34a", bg: "#f0fdf4" },
                { n: "₹2Cr+", l: "Ad Spend Managed", c: "#7c3aed", bg: "#f5f3ff" },
                { n: "98%", l: "Client Retention", c: "#dc2626", bg: "#fef2f2" },
              ].map(s => (
                <div key={s.l} style={{ background: s.bg, borderRadius: "14px", padding: "1.5rem", textAlign: "center", border: `1px solid ${s.c}20` }}>
                  <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "2rem", fontWeight: 800, color: s.c }}>{s.n}</div>
                  <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px", fontWeight: 500 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "4rem 2rem", background: "#f8f9fb", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, marginBottom: "0.75rem" }}>Ready to Grow?</h2>
            <p style={{ color: "#6b7280", marginBottom: "2rem" }}>Let's discuss how we can help your business get more leads and revenue online.</p>
            <a href="/contact" style={{
              background: "#2563eb", color: "#fff", padding: "14px 32px",
              borderRadius: "10px", fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: "15px", display: "inline-block", textDecoration: "none",
              boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
            }}>Get Free Consultation →</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
