"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAdmin } from "@/context/AdminContext";

const categoryColors: Record<string, string> = {
  "SEO": "#2563eb", "Google Ads": "#16a34a", "Social Media": "#7c3aed",
  "Web Development": "#dc2626", "Python": "#d97706",
};

export default function BlogPage() {
  const { content } = useAdmin();
  const published = (content.blogPosts || []).filter(p => p.published);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "68px", fontFamily: "Inter, sans-serif" }}>
        <section style={{ background: "#f8f9fb", padding: "3rem 2rem", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Our Blog</p>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif", color: "#0f1117", marginBottom: "1rem" }}>
              Digital Marketing Tips & Insights
            </h1>
            <p style={{ color: "#6b7280", fontSize: "1.05rem" }}>Expert guides on SEO, Ads, Social Media, and more — for Indian businesses.</p>
          </div>
        </section>

        <section style={{ padding: "4rem 2rem", background: "#fff" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            {published.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem", color: "#9ca3af" }}>
                <p style={{ fontSize: "1.1rem" }}>No blog posts yet.</p>
                <p style={{ fontSize: "14px", marginTop: "0.5rem" }}>Admin dashboard se articles add karo!</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
                {published.map((post) => (
                  <div key={post.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden" }}>
                    <div style={{ height: "8px", background: categoryColors[post.category] || "#2563eb" }} />
                    <div style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "999px", background: `${categoryColors[post.category] || "#2563eb"}15`, color: categoryColors[post.category] || "#2563eb" }}>{post.category}</span>
                        <span style={{ fontSize: "12px", color: "#9ca3af" }}>{post.date}</span>
                      </div>
                      <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "16px", fontWeight: 700, color: "#0f1117", marginBottom: "0.75rem", lineHeight: 1.4 }}>{post.title}</h2>
                      <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6, marginBottom: "1.25rem" }}>{post.desc}</p>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: categoryColors[post.category] || "#2563eb", cursor: "pointer" }}>Read More →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
