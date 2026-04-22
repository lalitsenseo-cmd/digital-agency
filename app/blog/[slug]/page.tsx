import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getBlogPostBySlug } from "@/lib/get-blog-posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 0;

const categoryColors: Record<string, string> = {
  "SEO": "#2563eb",
  "Google Ads": "#16a34a",
  "Social Media": "#7c3aed",
  "Web Development": "#dc2626",
  "Python": "#d97706",
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Clickbriz Digital Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const color = categoryColors[post.category] || "#2563eb";
  const date = new Date(post.published_at).toISOString().split("T")[0];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "68px", fontFamily: "Inter, sans-serif" }}>
        <article style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 2rem" }}>
          <Link href="/blog" style={{ color: "#6b7280", fontSize: "14px", textDecoration: "none", marginBottom: "1.5rem", display: "inline-block" }}>← Back to Blog</Link>

          <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "999px", background: `${color}15`, color, display: "inline-block", marginBottom: "1rem" }}>
            {post.category}
          </span>

          <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif", color: "#0f1117", marginBottom: "1rem", lineHeight: 1.2 }}>
            {post.title}
          </h1>

          <div style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "2rem" }}>
            By {post.author} · {date}
          </div>

          {post.cover_image && (
            <img src={post.cover_image} alt={post.title} style={{ width: "100%", borderRadius: "12px", marginBottom: "2rem" }} />
          )}

          <div
            style={{ color: "#374151", fontSize: "1.05rem", lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}