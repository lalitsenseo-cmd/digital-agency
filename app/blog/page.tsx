import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getBlogPosts } from "@/lib/get-blog-posts";
import type { Metadata } from "next";
import { getPageData, buildMetadata } from "@/lib/get-page-data";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("blog");
  return buildMetadata(page, {
    title: "Blog | NexGen Digital",
    description: "Digital marketing tips, guides, and case studies.",
  });
}

const categoryColors: Record<string, string> = {
  "SEO": "#2563eb",
  "Google Ads": "#16a34a",
  "Social Media": "#7c3aed",
  "Web Development": "#dc2626",
  "Python": "#d97706",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

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
            {posts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem", color: "#9ca3af" }}>
                <p style={{ fontSize: "1.1rem" }}>No blog posts yet.</p>
                <p style={{ fontSize: "14px", marginTop: "0.5rem" }}>Admin dashboard se articles add karo!</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
                {posts.map((post) => {
                  const color = categoryColors[post.category] || "#2563eb";
                  const date = new Date(post.published_at).toISOString().split("T")[0];
                  return (
                    <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", cursor: "pointer", transition: "transform 0.2s" }}>
                        {post.cover_image ? (
                          <img src={post.cover_image} alt={post.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                        ) : (
                          <div style={{ height: "8px", background: color }} />
                        )}
                        <div style={{ padding: "1.5rem" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                            <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "999px", background: `${color}15`, color }}>{post.category}</span>
                            <span style={{ fontSize: "12px", color: "#9ca3af" }}>{date}</span>
                          </div>
                          <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "16px", fontWeight: 700, color: "#0f1117", marginBottom: "0.75rem", lineHeight: 1.4 }}>{post.title}</h2>
                          <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6, marginBottom: "1.25rem" }}>{post.description}</p>
                          <span style={{ fontSize: "13px", fontWeight: 600, color, cursor: "pointer" }}>Read More →</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}