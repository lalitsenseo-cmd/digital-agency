import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WhatsAppButton } from "@/components/PremiumFeatures";
import { ArrowRight, Phone, TrendingUp, Shield, Zap, Award, Calendar, User, Clock } from "lucide-react";
import Link from "next/link";
import { getPostBySlug, getRelatedPosts, getPostSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Phrase/slug ko saaf label me badalta hai (focus keyword ya slug dono chalega):
// "seo tips for small business" / "seo-tips-for-small-business" -> "SEO Tips for Small Business"
function prettifyLabel(text: string): string {
  const small = new Set(["for","and","in","of","to","the","a","an","on","with","vs","or","at","by"]);
  const acronyms: Record<string, string> = { seo:"SEO", ppc:"PPC", sem:"SEM", smm:"SMM", ai:"AI", roi:"ROI", ux:"UX", ui:"UI", b2b:"B2B", b2c:"B2C", faq:"FAQ", cms:"CMS", url:"URL", sql:"SQL", api:"API" };
  return text.trim().split(/[\s-]+/).map((w, i) => {
    const lw = w.toLowerCase();
    if (acronyms[lw]) return acronyms[lw];
    if (i !== 0 && small.has(lw)) return lw;
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  }).join(" ");
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

const categoryColors: Record<string, string> = {
  "SEO": "#2563eb",
  "Google Ads": "#16a34a",
  "Social Media": "#7c3aed",
  "Web Development": "#dc2626",
  "Python": "#d97706",
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };

  const seo = post.seo || {};
  const metaTitle = seo.metaTitle || `${post.title} | Clickbriz Digital Blog`;
  const metaDesc = seo.metaDescription || post.description;
  const canonical = seo.canonical || `https://www.clickbriz.com/blog/${params.slug}`;
  const ogImage = seo.ogImage || post.coverImage;

  return {
    title: metaTitle,
    description: metaDesc,
    alternates: { canonical },
    robots: seo.noindex ? "noindex,nofollow" : "index,follow",
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

const stats = [
  { value: "120+", label: "Clients Ranked"     },
  { value: "4.9★", label: "Google Rating"      },
  { value: "6+",   label: "Years Experience"   },
  { value: "300%", label: "Avg Traffic Growth" },
];

const features = [
  { icon: TrendingUp, title: "Performance Focused", desc: "Every strategy tied to measurable business outcomes"     },
  { icon: Shield,     title: "100% White-Hat",      desc: "No shortcuts — only sustainable, Google-approved tactics" },
  { icon: Zap,        title: "Fast Implementation", desc: "Quick wins first, long-term compounding results"          },
  { icon: Award,      title: "Proven Results",      desc: "120+ businesses ranked on Page 1 of Google"              },
];

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const date = new Date(post.publishedDate).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
  const readTime = calculateReadTime(post.contentHtml || "");

  // Related posts from Keystatic files
  const relatedBlogs = await getRelatedPosts(post.category, params.slug, 3);

  // ── Structured data: BlogPosting + BreadcrumbList + WebPage ──
  const siteUrl = "https://www.clickbriz.com";
  const postUrl = `${siteUrl}/blog/${params.slug}`;
  const crumbLabel = prettifyLabel(post.seo?.focusKeyword || params.slug);
  const metaTitle = post.seo?.metaTitle || post.title;
  const metaDescription = post.seo?.metaDescription || post.description || "";
  const imageUrl = post.coverImage
    ? (post.coverImage.startsWith("http") ? post.coverImage : `${siteUrl}${post.coverImage}`)
    : `${siteUrl}/SEO_Services_Click_Briz.jpg`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": postUrl,
        url: postUrl,
        name: metaTitle,
        description: metaDescription,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${siteUrl}/#website` },
        breadcrumb: { "@id": `${postUrl}#breadcrumb` },
        primaryImageOfPage: { "@type": "ImageObject", url: imageUrl },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${postUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
          { "@type": "ListItem", position: 3, name: crumbLabel },
        ],
      },
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: metaDescription,
        image: imageUrl,
        datePublished: post.publishedDate || undefined,
        dateModified: post.publishedDate || undefined,
        author: { "@type": "Person", name: post.author || "Lalit Sen" },
        publisher: {
          "@type": "Organization",
          name: "Clickbriz Digital",
          logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
        },
        mainEntityOfPage: { "@id": postUrl },
        articleSection: post.category,
        inLanguage: "en-IN",
      },
    ],
  };

  // FAQ schema sirf tab jab post me asli FAQs hon (Google rule: visible content match kare)
  const faqs = post.faqs || [];
  if (faqs.length > 0) {
    jsonLd["@graph"].push({
      "@type": "FAQPage",
      "@id": `${postUrl}#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    } as any);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WhatsAppButton />
      <Navbar />

      <style suppressHydrationWarning>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        body { background:#fff !important; }
        .sp { font-family:'Inter',sans-serif; background:#fff; color:#1e293b; }
        .sp-hero { background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 40%, #6d28d9 100%); padding: 9rem 2rem 5rem; position: relative; overflow: hidden; }
        .sp-hero::after { content:''; position:absolute; inset:0; background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); pointer-events:none; }
        .sp-hero-inner { max-width:1100px; margin:0 auto; position:relative; z-index:2; }
        .sp-breadcrumb { display:flex; align-items:center; gap:8px; margin-bottom:1.5rem; flex-wrap:wrap; }
        .sp-breadcrumb a { font-size:13px; color:rgba(255,255,255,0.7); text-decoration:none; transition:color 0.2s; }
        .sp-breadcrumb a:hover { color:#fff; }
        .sp-breadcrumb-sep { color:rgba(255,255,255,0.4); font-size:13px; }
        .sp-breadcrumb-cur { font-size:13px; color:#fff; font-weight:600; }
        .sp-hero-grid { display:grid; grid-template-columns:1fr 380px; gap:4rem; align-items:center; }
        .sp-hero-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.2); padding:7px 16px; border-radius:999px; margin-bottom:1.5rem; backdrop-filter:blur(10px); }
        .sp-hero-badge-dot { width:7px; height:7px; background:#60a5fa; border-radius:50%; box-shadow:0 0 8px #60a5fa; }
        .sp-hero-badge-text { font-size:11px; font-weight:700; color:#bfdbfe; letter-spacing:1.5px; text-transform:uppercase; }
        .sp-h1 { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(2rem,4vw,3rem); font-weight:800; color:#fff; line-height:1.15; letter-spacing:-0.03em; margin:0 0 1.25rem; }
        .sp-hero-meta { display:flex; align-items:center; gap:1.25rem; margin-bottom:1.5rem; flex-wrap:wrap; }
        .sp-hero-meta-item { display:flex; align-items:center; gap:6px; color:rgba(255,255,255,0.85); font-size:13px; font-weight:500; }
        .sp-hero-desc { font-size:1.05rem; color:rgba(255,255,255,0.8); line-height:1.75; margin-bottom:2rem; max-width:520px; }
        .sp-hero-btns { display:flex; gap:12px; flex-wrap:wrap; }
        .sp-btn-primary { background:#fff; color:#1e3a8a; padding:13px 26px; border-radius:10px; font-weight:700; font-size:14px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:all 0.25s; box-shadow:0 4px 20px rgba(0,0,0,0.2); }
        .sp-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(0,0,0,0.3); }
        .sp-btn-secondary { background:rgba(255,255,255,0.1); color:#fff; padding:13px 22px; border-radius:10px; font-weight:600; font-size:14px; text-decoration:none; border:1px solid rgba(255,255,255,0.25); display:inline-flex; align-items:center; gap:8px; transition:all 0.25s; backdrop-filter:blur(10px); }
        .sp-btn-secondary:hover { background:rgba(255,255,255,0.18); }
        .sp-hero-card { background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); border-radius:20px; backdrop-filter:blur(16px); animation:fadeUp 0.8s ease-out 0.2s both; overflow:hidden; }
        .sp-hero-card img { width:100%; height:380px; object-fit:cover; display:block; }
        .sp-statsbar { background:#1e3a8a; padding:1.75rem 2rem; }
        .sp-statsbar-inner { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; }
        .sp-stat { text-align:center; }
        .sp-stat-val { font-family:'Plus Jakarta Sans',sans-serif; font-size:2rem; font-weight:800; color:#fff; }
        .sp-stat-lbl { font-size:12px; color:#93c5fd; margin-top:2px; font-weight:500; }
        .sp-features { background:#f8fafc; padding:4rem 2rem; }
        .sp-features-inner { max-width:1100px; margin:0 auto; }
        .sp-features-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:20px; }
        .sp-feature-card { background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:1.5rem; transition:all 0.25s; }
        .sp-feature-card:hover { border-color:#3b82f6; box-shadow:0 8px 30px rgba(59,130,246,0.12); transform:translateY(-3px); }
        .sp-feature-icon { width:44px; height:44px; border-radius:10px; background:linear-gradient(135deg,#1e3a8a,#3730a3); display:flex; align-items:center; justify-content:center; margin-bottom:1rem; box-shadow:0 4px 14px rgba(30,58,138,0.3); }
        .sp-feature-title { font-size:15px; font-weight:700; color:#1e293b; margin-bottom:6px; }
        .sp-feature-desc { font-size:13px; color:#64748b; line-height:1.6; }
        .sp-content-wrap { max-width:1100px; margin:0 auto; padding:5rem 2rem; display:grid; grid-template-columns:1fr 300px; gap:4rem; align-items:start; }
        .sp-article { color:#334155; font-size:16px; line-height:1.85; }
        .sp-article h2 { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(1.4rem,2.5vw,1.85rem); font-weight:700; color:#1e3a8a; line-height:1.2; letter-spacing:-0.02em; margin:3rem 0 1.1rem; padding-bottom:0.75rem; border-bottom:2px solid #e2e8f0; }
        .sp-article h2:first-child { margin-top:0; }
        .sp-article h3 { font-family:'Plus Jakarta Sans',sans-serif; font-size:1.15rem; font-weight:700; color:#3730a3; margin:1.75rem 0 0.85rem; display:flex; align-items:center; gap:10px; }
        .sp-article h3::before { content:''; width:8px; height:8px; background:linear-gradient(135deg,#1e3a8a,#6d28d9); border-radius:50%; flex-shrink:0; box-shadow:0 0 0 3px rgba(59,130,246,0.15); }
        .sp-article p { margin-bottom:1.4rem; color:#475569; font-size:16px; line-height:1.9; max-width:680px; }
        .sp-article strong { color:#0f172a; font-weight:700; }
        .sp-article ul { margin:1rem 0 1.75rem; padding:0; list-style:none; display:flex; flex-direction:column; gap:8px; }
        .sp-article ul li { position:relative; padding:12px 16px 12px 46px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; color:#334155; font-size:15px; line-height:1.6; transition:all 0.2s; }
        .sp-article ul li::before { content:''; position:absolute; left:14px; top:50%; transform:translateY(-50%); width:20px; height:20px; background:linear-gradient(135deg,#1e3a8a,#3730a3); border-radius:50%; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:center; background-size:10px; box-shadow:0 2px 8px rgba(30,58,138,0.3); }
        .sp-article ul li:hover { border-color:#93c5fd; background:#eff6ff; transform:translateX(3px); }
        .sp-article ol { margin:1rem 0 1.75rem; padding:0; list-style:none; counter-reset:step; display:flex; flex-direction:column; gap:10px; }
        .sp-article ol li { position:relative; padding:16px 18px 16px 62px; background:#f8fafc; border:1px solid #e2e8f0; border-left:3px solid #1e3a8a; border-radius:10px; color:#334155; font-size:15px; line-height:1.65; counter-increment:step; transition:all 0.2s; }
        .sp-article ol li::before { content:counter(step); position:absolute; left:14px; top:50%; transform:translateY(-50%); width:34px; height:34px; background:linear-gradient(135deg,#1e3a8a,#3730a3); color:#fff; border-radius:8px; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:14px; font-family:'Plus Jakarta Sans',sans-serif; box-shadow:0 3px 10px rgba(30,58,138,0.3); }
        .sp-article ol li:hover { background:#eff6ff; border-left-color:#3b82f6; }
        .sp-article a { color:#2563eb; text-decoration:underline; text-underline-offset:3px; text-decoration-thickness:1.5px; font-weight:600; transition:color 0.2s; }
        .sp-article a:hover { color:#1d4ed8; }
        .sp-article table { width:100%; border-collapse:collapse; margin:1.75rem 0 2rem; font-size:15px; box-shadow:0 2px 14px rgba(0,0,0,0.05); border-radius:10px; overflow:hidden; }
        .sp-article thead { background:linear-gradient(135deg,#1e3a8a,#3730a3); }
        .sp-article th { color:#fff; font-weight:700; text-align:left; padding:13px 16px; font-family:'Plus Jakarta Sans',sans-serif; font-size:14px; }
        .sp-article td { padding:12px 16px; border-top:1px solid #e2e8f0; color:#475569; line-height:1.6; }
        .sp-article tbody tr:nth-child(even) { background:#f8fafc; }
        .sp-article tbody tr:hover { background:#eff6ff; }
        .sp-article blockquote { margin:1.75rem 0; padding:1.1rem 1.6rem; background:#eff6ff; border-left:4px solid #1e3a8a; border-radius:0 10px 10px 0; color:#1e293b; font-style:italic; box-shadow:0 2px 12px rgba(30,58,138,0.06); }
        .sp-article blockquote p { margin:0; color:#1e293b; max-width:none; font-size:16px; line-height:1.8; }
        .sp-article blockquote p + p { margin-top:0.8rem; }
        .sp-sidebar { position:sticky; top:120px; }
        .sp-sidebar-card { background:#fff; border:1px solid #e2e8f0; border-radius:16px; padding:1.5rem; margin-bottom:1.25rem; box-shadow:0 4px 20px rgba(0,0,0,0.06); }
        .sp-sidebar-card-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:14px; font-weight:800; color:#0f172a; margin-bottom:1rem; padding-bottom:0.75rem; border-bottom:2px solid #e2e8f0; }
        .sp-sidebar-item { display:flex; align-items:center; gap:10px; padding:8px 0; border-bottom:1px solid #f1f5f9; font-size:13px; color:#475569; }
        .sp-sidebar-item:last-child { border-bottom:none; }
        .sp-sidebar-dot { width:8px; height:8px; border-radius:50%; background:linear-gradient(135deg,#1e3a8a,#6d28d9); flex-shrink:0; }
        .sp-cta-card { background:linear-gradient(135deg,#1e3a8a,#3730a3); border-radius:16px; padding:1.75rem; text-align:center; margin-bottom:1.25rem; }
        .sp-cta-card h3 { font-family:'Plus Jakarta Sans',sans-serif; font-size:16px; font-weight:800; color:#fff; margin-bottom:0.5rem; }
        .sp-cta-card p { font-size:13px; color:rgba(255,255,255,0.75); margin-bottom:1.25rem; line-height:1.6; }
        .sp-cta-card-btn { display:block; background:#fff; color:#1e3a8a; padding:11px 20px; border-radius:10px; font-weight:700; font-size:14px; text-decoration:none; text-align:center; transition:all 0.2s; box-shadow:0 4px 14px rgba(0,0,0,0.15); }
        .sp-cta-card-btn:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(0,0,0,0.2); }
        .sp-cta-section { background:linear-gradient(135deg,#1e3a8a 0%,#3730a3 50%,#6d28d9 100%); padding:5rem 2rem; text-align:center; position:relative; overflow:hidden; }
        .sp-cta-section::before { content:''; position:absolute; top:-100px; right:-100px; width:400px; height:400px; background:radial-gradient(circle,rgba(255,255,255,0.08) 0%,transparent 70%); border-radius:50%; }
        .sp-cta-inner { max-width:600px; margin:0 auto; position:relative; z-index:2; }
        .sp-cta-inner h2 { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(1.8rem,3vw,2.4rem); font-weight:800; color:#fff; margin-bottom:1rem; }
        .sp-cta-inner p { color:rgba(255,255,255,0.8); font-size:16px; margin-bottom:2rem; line-height:1.7; }
        .sp-cta-btns { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
        .sp-related-blogs { background:#f8fafc; padding:5rem 2rem; }
        .sp-related-inner { max-width:1100px; margin:0 auto; }
        .sp-related-head { text-align:center; margin-bottom:3rem; }
        .sp-related-badge { display:inline-flex; align-items:center; gap:6px; background:#eff6ff; border:1px solid #bfdbfe; padding:6px 14px; border-radius:999px; font-size:11px; font-weight:700; color:#1e3a8a; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:1rem; }
        .sp-related-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(1.6rem,3vw,2.2rem); font-weight:800; color:#0f172a; margin:0 0 0.75rem; }
        .sp-related-desc { color:#64748b; font-size:16px; max-width:550px; margin:0 auto; }
        .sp-related-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:24px; }
        .sp-blog-card { background:#fff; border:1px solid #e2e8f0; border-radius:16px; overflow:hidden; transition:all 0.3s; display:flex; flex-direction:column; text-decoration:none; color:inherit; }
        .sp-blog-card:hover { transform:translateY(-6px); box-shadow:0 20px 50px rgba(30,58,138,0.15); border-color:#bfdbfe; }
        .sp-blog-card-img { width:100%; height:200px; background:linear-gradient(135deg,#1e3a8a,#6d28d9); display:flex; align-items:center; justify-content:center; font-size:48px; color:rgba(255,255,255,0.5); position:relative; overflow:hidden; }
        .sp-blog-card-img img { width:100%; height:100%; object-fit:cover; }
        .sp-blog-card-body { padding:1.5rem; flex:1; display:flex; flex-direction:column; }
        .sp-blog-card-category { display:inline-block; font-size:10px; font-weight:700; padding:4px 10px; border-radius:999px; letter-spacing:1px; text-transform:uppercase; margin-bottom:0.75rem; align-self:flex-start; }
        .sp-blog-card-title { font-family:'Plus Jakarta Sans',sans-serif; font-size:1.05rem; font-weight:700; color:#0f172a; line-height:1.35; margin-bottom:0.6rem; }
        .sp-blog-card-excerpt { font-size:13px; color:#64748b; line-height:1.6; margin-bottom:1rem; flex:1; }
        .sp-blog-card-meta { display:flex; align-items:center; gap:12px; padding-top:1rem; border-top:1px solid #f1f5f9; font-size:11px; color:#94a3b8; flex-wrap:wrap; }
        .sp-blog-card-meta-item { display:flex; align-items:center; gap:4px; }
        .sp-related-cta { text-align:center; margin-top:2.5rem; }
        .sp-view-all-btn { display:inline-flex; align-items:center; gap:8px; background:#fff; color:#1e3a8a; padding:12px 28px; border-radius:10px; font-weight:700; font-size:14px; text-decoration:none; border:2px solid #1e3a8a; transition:all 0.25s; }
        .sp-view-all-btn:hover { background:#1e3a8a; color:#fff; transform:translateY(-2px); }
        @media(max-width:900px) { .sp-hero-grid { grid-template-columns:1fr; } .sp-hero-card { display:none; } .sp-content-wrap { grid-template-columns:1fr; } .sp-sidebar { position:static; } .sp-statsbar-inner { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:640px) { .sp-hero { padding:7rem 1.25rem 3.5rem; } .sp-content-wrap { padding:3rem 1.25rem; } }
      `}</style>

      <div className="sp">
        {/* HERO — title, author, date sab Supabase se */}
        <section className="sp-hero">
          <div className="sp-hero-inner">
            <div className="sp-breadcrumb">
              <Link href="/" style={{fontSize:"13px",color:"rgba(255,255,255,0.7)",textDecoration:"none"}}>Home</Link>
              <span className="sp-breadcrumb-sep">/</span>
              <Link href="/blog" style={{fontSize:"13px",color:"rgba(255,255,255,0.7)",textDecoration:"none"}}>Blog</Link>
              <span className="sp-breadcrumb-sep">/</span>
              <span className="sp-breadcrumb-cur">{prettifyLabel(post.seo?.focusKeyword || params.slug)}</span>
            </div>

            <div className="sp-hero-grid">
              <div style={{animation:"fadeUp 0.7s ease-out both"}}>
                <div className="sp-hero-badge">
                  <span className="sp-hero-badge-dot" />
                  <span className="sp-hero-badge-text">{post.category}</span>
                </div>

                <h1 className="sp-h1">{post.title}</h1>

                <div className="sp-hero-meta">
                  <div className="sp-hero-meta-item"><User size={14} /> {post.author}</div>
                  <div className="sp-hero-meta-item"><Calendar size={14} /> {date}</div>
                  <div className="sp-hero-meta-item"><Clock size={14} /> {readTime}</div>
                </div>

                {post.description && <p className="sp-hero-desc">{post.description}</p>}

                <div className="sp-hero-btns">
                  <a href="/contact" className="sp-btn-primary">Free SEO Audit <ArrowRight size={15} /></a>
                  <a href="tel:+918527004901" className="sp-btn-secondary"><Phone size={14} /> Call Now</a>
                </div>
              </div>

              {post.coverImage && (
                <div className="sp-hero-card">
                  <img src={post.coverImage} alt={post.title} />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <div className="sp-statsbar">
          <div className="sp-statsbar-inner">
            {stats.map((s, i) => (
              <div key={i} className="sp-stat">
                <div className="sp-stat-val">{s.value}</div>
                <div className="sp-stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <section className="sp-features">
          <div className="sp-features-inner">
            <div className="sp-features-grid">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="sp-feature-card">
                    <div className="sp-feature-icon"><Icon size={22} color="#fff" /></div>
                    <div className="sp-feature-title">{f.title}</div>
                    <div className="sp-feature-desc">{f.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* MAIN ARTICLE CONTENT (FROM SUPABASE) + SIDEBAR */}
        <main>
          <div className="sp-content-wrap">
            <article
              className="sp-article"
              dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
            />

            <aside className="sp-sidebar">
              <div className="sp-cta-card">
                <h3>Free SEO Audit Worth ₹5,000</h3>
                <p>Find out exactly what's holding your website back from ranking on Google.</p>
                <a href="/contact" className="sp-cta-card-btn">Get Free Audit →</a>
              </div>

              <div className="sp-sidebar-card" style={{textAlign:"center", background:"linear-gradient(135deg,#1e3a8a,#3730a3)", border:"none"}}>
                <img src="/founder.png" alt="Lalit Sen — Founder, Click Briz" style={{width:"100px",height:"100px",borderRadius:"50%",objectFit:"cover",objectPosition:"top",border:"3px solid #93c5fd",boxShadow:"0 4px 20px rgba(30,58,138,0.3)",marginBottom:"1rem"}} />
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"15px",color:"#fff",marginBottom:"4px"}}>Lalit Sen</div>
                <div style={{fontSize:"12px",color:"#93c5fd",fontWeight:600,marginBottom:"8px"}}>Founder & SEO Strategist</div>
                <div style={{fontSize:"12px",color:"rgba(255,255,255,0.75)",lineHeight:1.6}}>6+ years of experience helping Faridabad businesses rank on Google.</div>
              </div>

              <div className="sp-sidebar-card">
                <div className="sp-sidebar-card-title">📋 Our Services</div>
                {[
                  { label: "SEO Services", href: "/seo-services" },
                  { label: "Google Ads (PPC)", href: "/google-ads" },
                  { label: "Social Media Marketing", href: "/social-media-marketing" },
                  { label: "Website Development", href: "/website-development" },
                  { label: "Content Writing", href: "/content-writing" },
                  { label: "Branding", href: "/branding" },
                ].map((s, i) => (
                  <Link key={i} href={s.href} className="sp-sidebar-item" style={{textDecoration:"none",color:"#475569"}}>
                    <span className="sp-sidebar-dot" />{s.label}
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </main>

        {/* FAQ SECTION (sirf jab FAQs hon) */}
        {faqs.length > 0 && (
          <section style={{maxWidth:"820px",margin:"0 auto",padding:"1rem 2rem 3rem"}}>
            <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"1.6rem",fontWeight:800,color:"#0f172a",marginBottom:"1.5rem"}}>
              Frequently Asked Questions
            </h2>
            <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
              {faqs.map((f, i) => (
                <details key={i} style={{border:"1px solid #e2e8f0",borderRadius:"12px",padding:"1rem 1.25rem",background:"#fff",boxShadow:"0 2px 10px rgba(30,58,138,0.05)"}}>
                  <summary style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"15px",color:"#1e3a8a",cursor:"pointer",listStyle:"none"}}>
                    {f.question}
                  </summary>
                  <p style={{marginTop:"0.75rem",fontSize:"14px",color:"#475569",lineHeight:1.7,whiteSpace:"pre-line"}}>
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* FINAL CTA */}
        <section className="sp-cta-section">
          <div className="sp-cta-inner">
            <h2>Ready to Rank #1 in Faridabad?</h2>
            <p>Get a free SEO audit worth ₹5,000 — no strings attached. Let's make your business the #1 choice on Google.</p>
            <div className="sp-cta-btns">
              <a href="/contact" className="sp-btn-primary">Get Free SEO Audit <ArrowRight size={15} /></a>
              <a href="tel:+918527004901" className="sp-btn-secondary"><Phone size={14} /> +91 85270 04901</a>
            </div>
          </div>
        </section>

        {/* RELATED BLOGS FROM SUPABASE */}
        {relatedBlogs && relatedBlogs.length > 0 && (
          <section className="sp-related-blogs">
            <div className="sp-related-inner">
              <div className="sp-related-head">
                <div className="sp-related-badge">📚 Continue Reading</div>
                <h2 className="sp-related-title">More from Our Blog</h2>
                <p className="sp-related-desc">Expert SEO tips, digital marketing insights, and growth strategies for your business.</p>
              </div>

              <div className="sp-related-grid">
                {relatedBlogs.map((blog: any, i: number) => {
                  const blogColor = categoryColors[blog.category] || "#2563eb";
                  const blogDate = new Date(blog.publishedDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
                  const blogReadTime = calculateReadTime(blog.description || "");
                  return (
                    <Link key={i} href={`/blog/${blog.slug}`} className="sp-blog-card">
                      <div className="sp-blog-card-img">
                        {blog.coverImage ? <img src={blog.coverImage} alt={blog.title} /> : "📝"}
                      </div>
                      <div className="sp-blog-card-body">
                        <span className="sp-blog-card-category" style={{background: `${blogColor}15`, color: blogColor}}>
                          {blog.category}
                        </span>
                        <h3 className="sp-blog-card-title">{blog.title}</h3>
                        <p className="sp-blog-card-excerpt">{blog.description}</p>
                        <div className="sp-blog-card-meta">
                          <div className="sp-blog-card-meta-item"><User size={11} /> {blog.author}</div>
                          <div className="sp-blog-card-meta-item"><Calendar size={11} /> {blogDate}</div>
                          <div className="sp-blog-card-meta-item"><Clock size={11} /> {blogReadTime}</div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="sp-related-cta">
                <Link href="/blog" className="sp-view-all-btn">
                  View All Blog Posts <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </>
  );
}