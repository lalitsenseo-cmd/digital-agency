"use client";
import { Send, MessageCircle, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";

export default function Contact() {
  const { content } = useAdmin();
  const c = content.contact;
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" style={{ padding: "5rem 2rem", background: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Contact Us</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif" }}>Let's Grow Your Business</h2>
          <p style={{ color: "#6b7280", marginTop: "0.5rem" }}>Free consultation — we'll get back within 24 hours.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "flex-start" }}>
          <div>
            {[
              { icon: MessageCircle, label: "WhatsApp", value: c.whatsapp, href: `https://wa.me/${c.whatsapp.replace(/\D/g,"")}`, color: "#25D366" },
              { icon: Mail, label: "Email", value: c.email, href: `mailto:${c.email}`, color: "#2563eb" },
              { icon: Phone, label: "Phone", value: c.phone, href: `tel:${c.phone.replace(/\D/g,"")}`, color: "#7c3aed" },
            ].map(ci => {
              const Icon = ci.icon;
              return (
                <a key={ci.label} href={ci.href} style={{
                  display: "flex", alignItems: "center", gap: "14px",
                  padding: "16px", background: "#f8f9fb",
                  border: "1px solid #e5e7eb", borderRadius: "12px",
                  marginBottom: "12px", textDecoration: "none",
                  transition: "border-color 0.2s, transform 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = ci.color + "60"; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.transform = "translateX(0)"; }}
                >
                  <div style={{ width: "42px", height: "42px", background: ci.color + "15", border: `1px solid ${ci.color}30`, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={18} color={ci.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{ci.label}</div>
                    <div style={{ fontSize: "14px", color: "#374151", fontWeight: 600 }}>{ci.value}</div>
                  </div>
                </a>
              );
            })}
          </div>
          <div style={{ background: "#f8f9fb", border: "1px solid #e5e7eb", borderRadius: "20px", padding: "2rem" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#16a34a", fontSize: "1.4rem", marginBottom: "0.5rem" }}>Message Sent!</h3>
                <p style={{ color: "#6b7280" }}>We'll get back within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <h3 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "18px", fontWeight: 800, marginBottom: "4px" }}>Free Consultation</h3>
                {[{ k: "name", p: "Your Name", t: "text" }, { k: "email", p: "Email Address", t: "email" }].map(f => (
                  <input key={f.k} type={f.t} placeholder={f.p} required value={form[f.k as keyof typeof form]}
                    onChange={e => setForm({ ...form, [f.k]: e.target.value })}
                    style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "11px 14px", fontSize: "14px", fontFamily: "Inter, sans-serif", outline: "none" }} />
                ))}
                <select required value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                  style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "11px 14px", fontSize: "14px", fontFamily: "Inter, sans-serif", outline: "none", color: form.service ? "#374151" : "#9ca3af" }}>
                  <option value="" disabled>Select a Service</option>
                  {content.services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                </select>
                <textarea placeholder="Tell us about your project..." required rows={4} value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "11px 14px", fontSize: "14px", fontFamily: "Inter, sans-serif", outline: "none", resize: "vertical" }} />
                <button type="submit" style={{
                  background: "#2563eb", border: "none", borderRadius: "10px", padding: "13px",
                  color: "#fff", fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "15px",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  boxShadow: "0 4px 16px rgba(37,99,235,0.3)",
                }}>
                  <Send size={15} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
