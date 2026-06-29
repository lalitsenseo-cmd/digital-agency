import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WhatsAppButton } from "@/components/PremiumFeatures";
import Link from "next/link";
import type { Metadata } from "next";
import { getServicePageSlugs, getServicePage } from "@/lib/service-pages";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Sitemap | Clickbriz Digital — All Pages",
  description:
    "Browse every page on Clickbriz Digital — SEO services, location pages, paid ads, development services, and our latest blog posts. Find what you need in one place.",
  alternates: { canonical: "https://www.clickbriz.com/sitemap" },
  robots: "index,follow",
};

const prettify = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export default async function HtmlSitemapPage() {
  // Main / coded pages (Keystatic me nahi hain)
  const mainPages = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "All Services" },
    { href: "/seo-services", label: "SEO Services" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/seo-audit", label: "Free SEO Audit" },
  ];

  // Service pages — Keystatic se (sirf published)
  const slugs = await getServicePageSlugs();
  const pages = (
    await Promise.all(
      slugs.map(async (slug) => {
        const p = await getServicePage(slug);
        return p && p.published
          ? { slug, title: p.title || prettify(slug) }
          : null;
      })
    )
  ).filter(Boolean) as { slug: string; title: string }[];

  // City/location pages vs baaki services (slug se alag karte hain)
  const locationPages = pages
    .filter((p) => p.slug.startsWith("seo-services-in-"))
    .sort((a, b) => a.title.localeCompare(b.title));
  const servicePages = pages
    .filter((p) => !p.slug.startsWith("seo-services-in-"))
    .sort((a, b) => a.title.localeCompare(b.title));

  // Blog posts (getAllPosts sirf published deta hai, newest first)
  const posts = await getAllPosts();

  const Section = ({
    title,
    items,
  }: {
    title: string;
    items: { href: string; label: string }[];
  }) =>
    items.length === 0 ? null : (
      <div className="sm-section">
        <h2 className="sm-h2">{title}</h2>
        <ul className="sm-list">
          {items.map((it) => (
            <li key={it.href}>
              <Link href={it.href} className="sm-link">
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <>
      <Navbar />

      <style>{`
        body { background:#fff !important; }
        .sm-wrap { max-width:1100px; margin:0 auto; padding:7rem 2rem 4rem; }
        .sm-breadcrumb { font-size:13px; color:#94a3b8; margin-bottom:1rem; }
        .sm-breadcrumb a { color:#2563eb; text-decoration:none; }
        .sm-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:2.4rem; font-weight:800; color:#0f172a; margin-bottom:0.5rem; }
        .sm-sub { color:#64748b; font-size:16px; margin-bottom:3rem; max-width:640px; line-height:1.7; }
        .sm-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:2.5rem 3rem; }
        .sm-section { }
        .sm-h2 { font-family:'Plus Jakarta Sans',sans-serif; font-size:1.15rem; font-weight:700; color:#1e3a8a; margin-bottom:1rem; padding-bottom:0.6rem; border-bottom:2px solid #e2e8f0; display:flex; align-items:center; gap:8px; }
        .sm-h2::before { content:""; width:8px; height:8px; border-radius:50%; background:#e0521f; display:inline-block; }
        .sm-list { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:2px; }
        .sm-link { display:block; padding:7px 10px; border-radius:8px; color:#475569; text-decoration:none; font-size:15px; transition:all 0.2s; }
        .sm-link:hover { background:#eff6ff; color:#1d4ed8; transform:translateX(3px); }
        @media (max-width:760px) {
          .sm-wrap { padding:6rem 1.25rem 3rem; }
          .sm-grid { grid-template-columns:1fr; gap:2rem; }
          .sm-title { font-size:1.8rem; }
        }
      `}</style>

      <main className="sm-wrap">
        <div className="sm-breadcrumb">
          <Link href="/">Home</Link> / Sitemap
        </div>
        <h1 className="sm-title">Sitemap</h1>
        <p className="sm-sub">
          Every page on Clickbriz Digital in one place — services, locations we
          serve, and our latest blog posts.
        </p>

        <div className="sm-grid">
          <Section title="Main Pages" items={mainPages} />

          <Section
            title="Services"
            items={servicePages.map((p) => ({
              href: `/${p.slug}`,
              label: p.title,
            }))}
          />

          <Section
            title="Locations We Serve"
            items={locationPages.map((p) => ({
              href: `/${p.slug}`,
              label: p.title,
            }))}
          />

          <Section
            title="Blog Posts"
            items={posts.map((p) => ({
              href: `/blog/${p.slug}`,
              label: p.title,
            }))}
          />
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
