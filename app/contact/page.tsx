"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Send, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import type { Metadata } from "next";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "68px", fontFamily: "Inter, sans-serif" }}>
        <section style={{ background: "linear-gradient(135deg, #eff6ff 0%, #fff 100%)", padding: "3.5rem 2rem 3rem", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif", color: "#0f1117", marginBottom: "1rem" }}>
              Let's Grow Your Business Together
            </h1>
            <p style={{ color: "#6b7280", fontSize: "1.05rem" }}>Free consultation — tell us about your business and we'll get back within 24 hours.</p>
          </div>
        </section>

        <section style={{ padding: "4rem 2rem", background: "#fff" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem" }}>
            {/* Contact info */}
            <div>
              <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem" }}>Get In Touch</h2>
              {[
                { icon: MessageCircle, label: "WhatsApp", value: "+91 85270 04901", href: "https://wa.me/918527004901", color: "#25D366" },
                { icon: Phone, label: "Phone", value: "+91 85270 04901", href: "tel:+918527004901", color: "#2563eb" },
                { icon: Mail, label: "Email", value: "lalitsen.seo@gmail.com", href: "mailto:lalitsen.seo@gmail.com", color: "#7c3aed" },
                { icon: MapPin, label: "Location", value: "Faridabad, Haryana (Remote Worldwide)", href: "#", color: "#dc2626" },
              ].map(c => {
                const Icon = c.icon;
                return (
                  <a key={c.label} href={c.href} style={{
                    display: "flex", alignItems: "center", gap: "14px",
                    padding: "14px 16px", background: "#f8f9fb",
                    border: "1px solid #e5e7eb", borderRadius: "12px",
                    marginBottom: "12px", textDecoration: "none",
                    transition: "border-color 0.2s, transform 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = c.color + "60"; e.currentTarget.style.transform = "translateX(4px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.transform = "translateX(0)"; }}
                  >
                    <div style={{ width: "40px", height: "40px", background: c.color + "15", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={18} color={c.color} />
                    </div>
                    <div>
                      <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{c.label}</div>
                      <div style={{ fontSize: "14px", color: "#374151", fontWeight: 600 }}>{c.value}</div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Form */}
            <div style={{ background: "#f8f9fb", border: "1px solid #e5e7eb", borderRadius: "20px", padding: "2rem" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                  <h3 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#16a34a", fontSize: "1.5rem", marginBottom: "0.5rem" }}>Message Sent!</h3>
                  <p style={{ color: "#6b7280" }}>We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSent(false)} style={{ marginTop: "1.5rem", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 24px", cursor: "pointer", fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif" }}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <h3 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "18px", fontWeight: 800, marginBottom: "4px" }}>Free Consultation Form</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    {[{ k: "name", p: "Your Name", t: "text" }, { k: "email", p: "Email Address", t: "email" }].map(f => (
                      <input key={f.k} type={f.t} placeholder={f.p} required value={form[f.k as keyof typeof form]}
                        onChange={e => setForm({ ...form, [f.k]: e.target.value })}
                        style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "11px 14px", fontSize: "14px", fontFamily: "Inter, sans-serif", outline: "none", width: "100%" }} />
                    ))}
                  </div>
                  <input type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "11px 14px", fontSize: "14px", fontFamily: "Inter, sans-serif", outline: "none" }} />
                  <select required value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                    style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "11px 14px", fontSize: "14px", fontFamily: "Inter, sans-serif", outline: "none", color: form.service ? "#374151" : "#9ca3af" }}>
                    <option value="" disabled>Select Service Needed</option>
                    <option value="seo">SEO Services</option>
                    <option value="ads">Google / Meta Ads</option>
                    <option value="smm">Social Media Marketing</option>
                    <option value="web">Website Development</option>
                    <option value="python">Python Development</option>
                    <option value="full">Full Digital Package</option>
                  </select>
                  <select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}
                    style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "11px 14px", fontSize: "14px", fontFamily: "Inter, sans-serif", outline: "none", color: form.budget ? "#374151" : "#9ca3af" }}>
                    <option value="" disabled>Monthly Budget Range</option>
                    <option value="under10k">Under ₹10,000</option>
                    <option value="10-25k">₹10,000 – ₹25,000</option>
                    <option value="25-50k">₹25,000 – ₹50,000</option>
                    <option value="50k+">₹50,000+</option>
                  </select>
                  <textarea placeholder="Tell us about your business and goals..." rows={4} value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "11px 14px", fontSize: "14px", fontFamily: "Inter, sans-serif", outline: "none", resize: "vertical" }} />
                  <button type="submit" style={{
                    background: "#2563eb", border: "none", borderRadius: "10px", padding: "14px",
                    color: "#fff", fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "15px",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
                    transition: "background 0.2s",
                  }}>
                    <Send size={15} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
