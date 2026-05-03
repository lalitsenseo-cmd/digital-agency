import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WhatsAppButton } from "@/components/PremiumFeatures";
import { getPageData, buildMetadata } from "@/lib/get-page-data";
import { ArrowRight, Phone, CheckCircle, TrendingUp, Shield, Zap, Star, Award } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("seo-services");
  return buildMetadata(page, {
    title: "SEO Services for Business Growth | Clickbriz Digital",
    description: "SEO services help improve website visibility on search engines. Includes keyword research, audit, on-page SEO, and link building for better rankings.",
  });
}

const SEO_CONTENT = `
<h2>SEO Services That Drive Organic Traffic, Rankings, and Qualified Leads</h2>
<p>If your website isn't showing up when potential customers are searching for what you offer, you're losing business to competitors who invested in search. SEO services exist to change that — systematically, sustainably, and with measurable results.</p>

<h2>What Our SEO Services Deliver</h2>
<p>The goal of any serious SEO engagement isn't rankings for their own sake. What businesses actually need is qualified traffic that converts into leads, sales, and revenue.</p>
<ul>
  <li><strong>Sustainable traffic growth.</strong> Unlike paid media, organic traffic doesn't stop the moment your budget does. Strong SEO compounds over time — pages that rank well continue to attract visitors month after month.</li>
  <li><strong>Higher-quality leads.</strong> Search intent is one of the most powerful filters in digital marketing. Someone searching with buying intent is far further along the journey than someone who saw a display ad.</li>
  <li><strong>Improved brand visibility.</strong> Showing up consistently across relevant search queries builds brand familiarity and trust with your target audience.</li>
  <li><strong>Better ranking positions across your full funnel.</strong> Good SEO covers the entire customer journey — from awareness-stage blog content to bottom-of-funnel service pages.</li>
  <li><strong>Long-term compounding growth.</strong> Early wins build domain authority. Authority improves new page rankings faster. Better rankings attract more links. Links increase authority further.</li>
</ul>

<h2>Our SEO Services</h2>
<img 
  src="/Our_SEO_Services.jpg" 
  alt="Our SEO Services — Keyword Research, Content, Backlinks, Technical SEO" 
  style="width:100%; border-radius:16px; margin:1.5rem 0 2rem; box-shadow:0 10px 40px rgba(30,58,138,0.2);"
/>
<h3>Technical SEO Services</h3>
<p>Technical SEO is the foundation. Without it, everything else — content, links, keyword targeting — underperforms.</p>
<ul>
  <li><strong>Crawlability and indexation.</strong> We audit how search engine bots move through your site, identify crawl traps, review robots.txt configurations, and resolve XML sitemap issues.</li>
  <li><strong>Core Web Vitals and page experience.</strong> Google's page experience signals — LCP, INP, and CLS — directly influence rankings. We identify bottlenecks and resolve them.</li>
  <li><strong>Site architecture.</strong> A flat, logical site architecture ensures link equity flows efficiently across your domain.</li>
  <li><strong>Schema markup.</strong> Structured data helps search engines understand your content and can unlock rich results in the SERPs.</li>
  <li><strong>Canonicalization and duplicate content.</strong> Duplicate content dilutes crawl budget and confuses ranking signals. We implement clear canonical signals.</li>
  <li><strong>Redirect management.</strong> Broken redirect chains, redirect loops, and improperly implemented 301s all leak ranking authority.</li>
</ul>

<h3>On-Page SEO Services</h3>
<p>On-page SEO is where strategy meets content. It's the process of making individual pages maximally relevant to the searches they're trying to capture.</p>
<ul>
  <li><strong>Keyword mapping.</strong> We map specific keywords to specific pages based on search intent, competition, and content format.</li>
  <li><strong>Search intent alignment.</strong> Matching format and depth of your content to what searchers actually want is one of the most underrated ranking factors.</li>
  <li><strong>Title tags and meta descriptions.</strong> Well-written title tags directly influence click-through rates from search results.</li>
  <li><strong>Internal linking.</strong> Strategic internal linking distributes authority to high-priority pages and gives search engines clear signals about site structure.</li>
  <li><strong>Content structure.</strong> Heading hierarchy, paragraph length, use of lists — all affect readability and how search engines parse content.</li>
  <li><strong>Topical relevance and entity optimization.</strong> Modern algorithms reward comprehensive coverage of topics, not just isolated keyword placement.</li>
</ul>

<h3>Off-Page SEO Services</h3>
<p>Off-page SEO encompasses everything that happens outside your website to build its authority and reputation in the eyes of search engines.</p>
<ul>
  <li><strong>Authority building through high-quality link acquisition.</strong> A single contextual link from a respected industry publication can outweigh dozens of low-quality directory links.</li>
  <li><strong>Digital PR.</strong> We identify linkable asset opportunities and place them with journalists covering topics relevant to your industry.</li>
  <li><strong>Brand signals.</strong> Mentions of your brand name, even without a direct link, contribute to your entity authority.</li>
  <li><strong>Competitive link gap analysis.</strong> We analyze where your competitors are acquiring links and identify opportunities you're missing.</li>
</ul>

<h3>SEO Audit Services</h3>
<p>An SEO audit is a structured diagnostic of your website's current organic search performance. Our audit process covers:</p>
<ul>
  <li>Technical diagnostics: crawlability, indexation, site speed, Core Web Vitals, redirect health, schema implementation</li>
  <li>On-page analysis: keyword mapping gaps, intent misalignment, thin or duplicate content</li>
  <li>Content assessment: existing page performance, underperforming assets, content gaps</li>
  <li>Backlink profile review: authority distribution, toxic link risk, competitor gap analysis</li>
  <li>Opportunity prioritization: a roadmap ranked by impact and implementation effort</li>
</ul>

<h3>Keyword Research Services</h3>
<p>Keyword research is the intelligence layer that underpins your entire content and optimization strategy.</p>
<ul>
  <li><strong>Commercial intent keywords.</strong> Queries that signal buying intent — users evaluating options or ready to purchase.</li>
  <li><strong>Informational keywords and topic clusters.</strong> Builds topical authority and creates pathways toward commercial pages.</li>
  <li><strong>Keyword difficulty and opportunity assessment.</strong> Honest assessment given your current domain authority and competitive landscape.</li>
  <li><strong>Gap analysis.</strong> Benchmark your keyword coverage against competitors to identify traffic opportunities.</li>
  <li><strong>Keyword mapping to content types.</strong> Every cluster maps to a specific format — service page, guide, comparison, or landing page.</li>
</ul>

<h3>Content Optimization Services</h3>
<p>Many businesses have a significant content investment that isn't performing. Content optimization improves existing pages rather than starting from scratch.</p>
<ul>
  <li><strong>Performance review.</strong> Identify pages with rankings or traffic that can be grown with targeted optimization.</li>
  <li><strong>Search intent realignment.</strong> Content written without close attention to intent often fails to rank, even if it's high quality.</li>
  <li><strong>Content depth and gap analysis.</strong> Identify where your pages are thinner than competing content.</li>
  <li><strong>Refresh strategy.</strong> Older content loses rankings over time. A structured refresh program protects rankings you've already earned.</li>
</ul>

<h2>Our SEO Process</h2>
<ol>
  <li><strong>Discovery and business alignment.</strong> We understand your commercial objectives, target audience, competitive landscape, and how organic search fits your broader strategy.</li>
  <li><strong>Technical audit.</strong> Comprehensive audit covering crawlability, indexation, site speed, Core Web Vitals, architecture, duplicate content, and structured data.</li>
  <li><strong>Competitor analysis.</strong> We analyze your top organic competitors — keyword coverage, content strategy, backlink profiles, and technical health.</li>
  <li><strong>Keyword research and mapping.</strong> A comprehensive keyword map assigning target queries to specific pages across the site.</li>
  <li><strong>Content planning.</strong> A roadmap identifying pages to create, optimize, and consolidate — driven by keyword data and intent analysis.</li>
  <li><strong>Implementation and prioritization.</strong> High-impact, low-effort fixes come first. Clear briefs for development and content teams.</li>
  <li><strong>Authority building.</strong> Link acquisition strategy tailored to your industry, content assets, and current authority position.</li>
  <li><strong>Reporting, analysis, and iteration.</strong> Monthly reporting covering organic traffic, keyword visibility, ranking movement, and conversions.</li>
</ol>

<h2>Why Businesses Choose Our SEO Agency</h2>
<ul>
  <li><strong>Transparent process.</strong> You'll always know what work is being done, what it's intended to achieve, and how it's performing.</li>
  <li><strong>Manual audits and genuine strategic thinking.</strong> Our audits are informed by tools and completed by people who understand what the data means in context.</li>
  <li><strong>Business-first orientation.</strong> We optimize for traffic from people who have a realistic chance of becoming your customers.</li>
  <li><strong>No shortcuts.</strong> We don't use private blog networks, spammy links, cloaking, or doorway pages.</li>
  <li><strong>Realistic expectations.</strong> We won't tell you you'll rank number one in thirty days. We will tell you what realistic progress looks like.</li>
</ul>

<h2>Industries We Work With</h2>
<h3>SaaS</h3>
<p>We help SaaS companies build keyword strategies covering the full buying journey, from problem-awareness content to feature and comparison pages.</p>
<h3>Ecommerce</h3>
<p>Category visibility, product discoverability, and technical health at scale for both independent retailers and large multichannel brands.</p>
<h3>Local Businesses</h3>
<p>Google Business Profile optimization, local citation consistency, review signals, and proximity-based ranking factors for Faridabad and NCR businesses.</p>
<h3>B2B Services</h3>
<p>Content architectures that address the full range of queries buyers use across complex, multi-stakeholder buying journeys.</p>
<h3>Professional Services</h3>
<p>We help law firms, accounting practices, and consulting firms build content that positions them as authoritative voices in their domain.</p>

<h2>Frequently Asked Questions</h2>
<h3>How long does SEO take to show results?</h3>
<p>Most businesses see measurable improvements in keyword visibility between 3–6 months. Significant growth typically emerges at 6–12 months.</p>
<h3>What do SEO services cost?</h3>
<p>Pricing varies based on scope, site complexity, market competitiveness, and strategic involvement. We provide transparent, custom pricing based on proper assessment of your needs.</p>
<h3>Can SEO generate leads for my business?</h3>
<p>Yes — when targeting keywords with genuine buying intent and pages designed to convert that traffic into enquiries and sales.</p>
<h3>Do small businesses need SEO?</h3>
<p>Yes. A well-optimized small business website can outrank larger competitors for relevant local or niche queries.</p>
<h3>How do I choose an SEO agency?</h3>
<p>Look for transparency about process and methodology. Be cautious of agencies guaranteeing specific rankings or promising unrealistic timelines.</p>
`;

const stats = [
  { value: "120+", label: "Clients Ranked" },
  { value: "4.9★", label: "Google Rating" },
  { value: "6+", label: "Years Experience" },
  { value: "300%", label: "Avg Traffic Growth" },
];

const features = [
  { icon: TrendingUp, title: "Performance Focused", desc: "Every strategy tied to measurable business outcomes" },
  { icon: Shield, title: "100% White-Hat", desc: "No shortcuts — only sustainable, Google-approved tactics" },
  { icon: Zap, title: "Fast Implementation", desc: "Quick wins first, long-term compounding results" },
  { icon: Award, title: "Proven Results", desc: "120+ businesses ranked on Page 1 of Google" },
];

export default async function SEOPage() {
  return (
    <>
      <WhatsAppButton />
      <Navbar />

      <style suppressHydrationWarning>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }

        body { background:#fff !important; }
        .sp { font-family:'Inter',sans-serif; background:#fff; color:#1e293b; }

        /* ── HERO ── */
        .sp-hero {
          background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 40%, #6d28d9 100%);
          padding: 9rem 2rem 5rem;
          position: relative; overflow: hidden;
        }
        .sp-hero::after {
          content:''; position:absolute; inset:0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events:none;
        }
        .sp-hero-inner { max-width:1100px; margin:0 auto; position:relative; z-index:2; }
        .sp-breadcrumb { display:flex; align-items:center; gap:8px; margin-bottom:1.5rem; }
        .sp-breadcrumb a { font-size:13px; color:rgba(255,255,255,0.7); text-decoration:none; transition:color 0.2s; }
        .sp-breadcrumb a:hover { color:#fff; }
        .sp-breadcrumb-sep { color:rgba(255,255,255,0.4); font-size:13px; }
        .sp-breadcrumb-cur { font-size:13px; color:#fff; font-weight:600; }

        .sp-hero-grid { display:grid; grid-template-columns:1fr 380px; gap:4rem; align-items:center; }
        .sp-hero-badge {
          display:inline-flex; align-items:center; gap:8px;
          background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.2);
          padding:7px 16px; border-radius:999px; margin-bottom:1.5rem;
          backdrop-filter:blur(10px);
        }
        .sp-hero-badge-dot { width:7px; height:7px; background:#60a5fa; border-radius:50%; box-shadow:0 0 8px #60a5fa; }
        .sp-hero-badge-text { font-size:11px; font-weight:700; color:#bfdbfe; letter-spacing:1.5px; text-transform:uppercase; }
        .sp-h1 {
          font-family:'Plus Jakarta Sans',sans-serif;
          font-size:clamp(2.2rem,4vw,3.2rem);
          font-weight:800; color:#fff; line-height:1.1;
          letter-spacing:-0.03em; margin:0 0 1.25rem;
        }
        .sp-h1-accent { color:#93c5fd; }
        .sp-hero-desc { font-size:1.05rem; color:rgba(255,255,255,0.8); line-height:1.75; margin-bottom:2rem; max-width:520px; }
        .sp-hero-btns { display:flex; gap:12px; flex-wrap:wrap; }
        .sp-btn-primary {
          background:#fff; color:#1e3a8a;
          padding:13px 26px; border-radius:10px;
          font-weight:700; font-size:14px; text-decoration:none;
          display:inline-flex; align-items:center; gap:8px;
          transition:all 0.25s; box-shadow:0 4px 20px rgba(0,0,0,0.2);
        }
        .sp-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(0,0,0,0.3); }
        .sp-btn-secondary {
          background:rgba(255,255,255,0.1); color:#fff;
          padding:13px 22px; border-radius:10px;
          font-weight:600; font-size:14px; text-decoration:none;
          border:1px solid rgba(255,255,255,0.25);
          display:inline-flex; align-items:center; gap:8px;
          transition:all 0.25s; backdrop-filter:blur(10px);
        }
        .sp-btn-secondary:hover { background:rgba(255,255,255,0.18); }

        /* Hero card */
        .sp-hero-card {
          background:rgba(255,255,255,0.1);
          border:1px solid rgba(255,255,255,0.2);
          border-radius:20px; padding:2rem;
          backdrop-filter:blur(16px);
          animation:fadeUp 0.8s ease-out 0.2s both;
        }
        .sp-hero-card-title { font-size:13px; font-weight:700; color:#bfdbfe; letter-spacing:1px; text-transform:uppercase; margin-bottom:1.25rem; }
        .sp-hero-stat { display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.1); }
        .sp-hero-stat:last-child { border-bottom:none; }
        .sp-hero-stat-label { font-size:13px; color:rgba(255,255,255,0.7); }
        .sp-hero-stat-value { font-size:14px; font-weight:700; color:#fff; }
        .sp-hero-stat-badge {
          font-size:11px; font-weight:700; padding:3px 10px;
          border-radius:999px; background:rgba(34,197,94,0.2);
          color:#86efac; border:1px solid rgba(34,197,94,0.3);
        }

        /* STATS BAR */
        .sp-statsbar {
          background:#1e3a8a; padding:1.75rem 2rem;
        }
        .sp-statsbar-inner { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; }
        .sp-stat { text-align:center; }
        .sp-stat-val { font-family:'Plus Jakarta Sans',sans-serif; font-size:2rem; font-weight:800; color:#fff; }
        .sp-stat-lbl { font-size:12px; color:#93c5fd; margin-top:2px; font-weight:500; }

        /* FEATURES */
        .sp-features { background:#f8fafc; padding:4rem 2rem; }
        .sp-features-inner { max-width:1100px; margin:0 auto; }
        .sp-features-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:20px; }
        .sp-feature-card {
          background:#fff; border:1px solid #e2e8f0; border-radius:14px;
          padding:1.5rem; transition:all 0.25s;
        }
        .sp-feature-card:hover { border-color:#3b82f6; box-shadow:0 8px 30px rgba(59,130,246,0.12); transform:translateY(-3px); }
        .sp-feature-icon {
          width:44px; height:44px; border-radius:10px;
          background:linear-gradient(135deg,#1e3a8a,#3730a3);
          display:flex; align-items:center; justify-content:center; margin-bottom:1rem;
          box-shadow:0 4px 14px rgba(30,58,138,0.3);
        }
        .sp-feature-title { font-size:15px; font-weight:700; color:#1e293b; margin-bottom:6px; }
        .sp-feature-desc { font-size:13px; color:#64748b; line-height:1.6; }

        /* MAIN CONTENT */
        .sp-content-wrap { max-width:1100px; margin:0 auto; padding:5rem 2rem; display:grid; grid-template-columns:1fr 300px; gap:4rem; align-items:start; }
        .sp-article { color:#334155; font-size:16px; line-height:1.85; }

        .sp-article h2 {
          font-family:'Plus Jakarta Sans',sans-serif;
          font-size:clamp(1.4rem,2.5vw,1.85rem);
          font-weight:700;          /* ← 800 se 700 karo */
          color:#1e3a8a;            /* ← black se blue karo */
          line-height:1.2;
          letter-spacing:-0.02em; margin:3rem 0 1.1rem;
          padding-bottom:0.75rem;
          border-bottom:2px solid #e2e8f0;
        }
        .sp-article h2:first-child { margin-top:0; }

        .sp-article h3 {
          font-family:'Plus Jakarta Sans',sans-serif;
          font-size:1.1rem; font-weight:600; color:#3730a3;
          margin:1.75rem 0 0.65rem;
          display:flex; align-items:center; gap:8px;
        }
        .sp-article h3::before {
          content:''; width:6px; height:6px;
          background:linear-gradient(135deg,#1e3a8a,#6d28d9);
          border-radius:50%; flex-shrink:0;
        }
        .sp-article p {
        margin-bottom: 1.4rem;
        color: #475569;
        font-size: 16px;
        line-height: 1.9;          /* ← 1.85 se 1.9 */
        max-width: 680px;          /* ← reading width limit */
      }
        .sp-article strong { color:#0f172a; font-weight:700; }

        .sp-article ul { margin:1rem 0 1.75rem; padding:0; list-style:none; display:flex; flex-direction:column; gap:8px; }
        .sp-article ul li {
          position:relative; padding:12px 16px 12px 46px;
          background:#f8fafc; border:1px solid #e2e8f0;
          border-radius:10px; color:#334155;
          font-size:15px; line-height:1.6;
          transition:all 0.2s;
        }
        .sp-article ul li::before {
          content:''; position:absolute; left:14px; top:50%; transform:translateY(-50%);
          width:20px; height:20px;
          background:linear-gradient(135deg,#1e3a8a,#3730a3);
          border-radius:50%;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat:no-repeat; background-position:center; background-size:10px;
          box-shadow:0 2px 8px rgba(30,58,138,0.3);
        }
        .sp-article ul li:hover { border-color:#93c5fd; background:#eff6ff; transform:translateX(3px); }

        .sp-article ol { margin:1rem 0 1.75rem; padding:0; list-style:none; counter-reset:step; display:flex; flex-direction:column; gap:10px; }
        .sp-article ol li {
          position:relative; padding:16px 18px 16px 62px;
          background:#f8fafc; border:1px solid #e2e8f0;
          border-left:3px solid #1e3a8a;
          border-radius:10px; color:#334155;
          font-size:15px; line-height:1.65;
          counter-increment:step; transition:all 0.2s;
        }
        .sp-article ol li::before {
          content:counter(step); position:absolute;
          left:14px; top:50%; transform:translateY(-50%);
          width:34px; height:34px;
          background:linear-gradient(135deg,#1e3a8a,#3730a3);
          color:#fff; border-radius:8px;
          display:flex; align-items:center; justify-content:center;
          font-weight:800; font-size:14px;
          font-family:'Plus Jakarta Sans',sans-serif;
          box-shadow:0 3px 10px rgba(30,58,138,0.3);
        }
        .sp-article ol li:hover { background:#eff6ff; border-left-color:#3b82f6; }

        /* SIDEBAR */
        .sp-sidebar { position:sticky; top:120px; }
        .sp-sidebar-card {
          background:#fff; border:1px solid #e2e8f0;
          border-radius:16px; padding:1.5rem;
          margin-bottom:1.25rem;
          box-shadow:0 4px 20px rgba(0,0,0,0.06);
        }
        .sp-sidebar-card-title {
          font-family:'Plus Jakarta Sans',sans-serif;
          font-size:14px; font-weight:800; color:#0f172a;
          margin-bottom:1rem; padding-bottom:0.75rem;
          border-bottom:2px solid #e2e8f0;
        }
        .sp-sidebar-item {
          display:flex; align-items:center; gap:10px;
          padding:8px 0; border-bottom:1px solid #f1f5f9;
          font-size:13px; color:#475569;
        }
        .sp-sidebar-item:last-child { border-bottom:none; }
        .sp-sidebar-dot { width:8px; height:8px; border-radius:50%; background:linear-gradient(135deg,#1e3a8a,#6d28d9); flex-shrink:0; }
        .sp-cta-card {
          background:linear-gradient(135deg,#1e3a8a,#3730a3);
          border-radius:16px; padding:1.75rem;
          text-align:center;
        }
        .sp-cta-card h3 { font-family:'Plus Jakarta Sans',sans-serif; font-size:16px; font-weight:800; color:#fff; margin-bottom:0.5rem; }
        .sp-cta-card p { font-size:13px; color:rgba(255,255,255,0.75); margin-bottom:1.25rem; line-height:1.6; }
        .sp-cta-card-btn {
          display:block; background:#fff; color:#1e3a8a;
          padding:11px 20px; border-radius:10px;
          font-weight:700; font-size:14px; text-decoration:none;
          text-align:center; transition:all 0.2s;
          box-shadow:0 4px 14px rgba(0,0,0,0.15);
        }
        .sp-cta-card-btn:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(0,0,0,0.2); }

        /* CTA SECTION */
        .sp-cta-section {
          background:linear-gradient(135deg,#1e3a8a 0%,#3730a3 50%,#6d28d9 100%);
          padding:5rem 2rem; text-align:center;
          position:relative; overflow:hidden;
        }
        .sp-cta-section::before {
          content:''; position:absolute; top:-100px; right:-100px;
          width:400px; height:400px;
          background:radial-gradient(circle,rgba(255,255,255,0.08) 0%,transparent 70%);
          border-radius:50%;
        }
        .sp-cta-inner { max-width:600px; margin:0 auto; position:relative; z-index:2; }
        .sp-cta-inner h2 { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(1.8rem,3vw,2.4rem); font-weight:800; color:#fff; margin-bottom:1rem; }
        .sp-cta-inner p { color:rgba(255,255,255,0.8); font-size:16px; margin-bottom:2rem; line-height:1.7; }
        .sp-cta-btns { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }

        @media(max-width:900px) {
          .sp-hero-grid { grid-template-columns:1fr; }
          .sp-hero-card { display:none; }
          .sp-content-wrap { grid-template-columns:1fr; }
          .sp-sidebar { position:static; }
          .sp-statsbar-inner { grid-template-columns:repeat(2,1fr); }
        }
        @media(max-width:640px) {
          .sp-hero { padding:7rem 1.25rem 3.5rem; }
          .sp-content-wrap { padding:3rem 1.25rem; }
        }

        .internal-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: #1e3a8a;
          text-decoration: none;
          transition: all 0.2s;
        }
        .internal-link:hover {
          background: #eff6ff;
          border-color: #93c5fd;
        }

      `}</style>

      <div className="sp">

        {/* HERO */}
        <section className="sp-hero">
          <div className="sp-hero-inner">
            <div className="sp-breadcrumb">
              <Link href="/" className="sp-breadcrumb-a" style={{fontSize:"13px",color:"rgba(255,255,255,0.7)",textDecoration:"none"}}>Home</Link>
              <span className="sp-breadcrumb-sep">/</span>
              <span className="sp-breadcrumb-cur">SEO Services</span>
            </div>
            <div className="sp-hero-grid">
              <div style={{animation:"fadeUp 0.7s ease-out both"}}>
                <div className="sp-hero-badge">
                  <span className="sp-hero-badge-dot" />
                  <span className="sp-hero-badge-text">Faridabad's #1 SEO Agency</span>
                </div>
                <h1 className="sp-h1">
                  SEO Services That Drive <span className="sp-h1-accent">Organic Growth</span> & Real Results
                </h1>
                <p className="sp-hero-desc">
                  Data-driven SEO strategies covering on-page, off-page, and technical SEO to improve rankings, increase traffic, and drive conversions.
                </p>
                <div className="sp-hero-btns">
                  <a href="/contact" className="sp-btn-primary">
                    Get Free SEO Audit <ArrowRight size={15} />
                  </a>
                  <a href="tel:+918527004901" className="sp-btn-secondary">
                    <Phone size={14} /> Call Now
                  </a>
                </div>
              </div>

              {/* Hero Card */}
              <div
                className="sp-hero-card"
                style={{
                  padding: 0,
                  overflow: "hidden",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                }}
              >
                <img
                  src="/SEO_Services_Click_Briz.jpg"
                  alt="SEO Services Clickbriz"
                  style={{
                    width: "100%",
                    height: "380px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
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

        {/* MAIN CONTENT + SIDEBAR */}
        <main>
          <div className="sp-content-wrap">
            {/* Article */}
            <article
              className="sp-article"
              dangerouslySetInnerHTML={{ __html: SEO_CONTENT }}
            />

            {/* Sidebar */}
            <aside className="sp-sidebar">

              {/* 1. CTA CARD — TOP */}
              <div className="sp-cta-card" style={{ marginBottom: "1.25rem" }}>
                <h3>Free SEO Audit</h3>
                <p>Find out exactly what's holding your website back from ranking.</p>
                <a href="/contact" className="sp-cta-card-btn">Get Free Audit →</a>
              </div>


              {/* 2. FOUNDER CARD */}
              <div className="sp-sidebar-card" style={{ 
                textAlign: "center", 
                padding: "1.5rem",
                background: "linear-gradient(135deg, #1e3a8a, #3730a3)",
                border: "none",
              }}>
                <img
                  src="/founder.png"
                  alt="Lalit Sen — Founder, Clickbriz Digital"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "top",
                    border: "3px solid #93c5fd",
                    boxShadow: "0 4px 20px rgba(30,58,138,0.3)",
                    marginBottom: "1rem",
                  }}
                />
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "15px", color: "#fff", marginBottom: "4px" }}>
                  Lalit Sen
                </div>
                <div style={{ fontSize: "12px", color: "#93c5fd", fontWeight: 600, marginBottom: "8px" }}>
                  Founder & SEO Strategist
                </div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                  With 6+ years of experience in SEO and digital marketing, we specialize in building sustainable organic growth and measurable search performance.
                </div>
              </div>

              {/* 3. SERVICES LIST */}
              <div className="sp-sidebar-card">
                <div className="sp-sidebar-card-title">📋 Our SEO Services</div>
                {["Technical SEO","On-Page SEO","Off-Page SEO","SEO Audit","Keyword Research","Content Optimization","Local SEO","Ecommerce SEO"].map((s, i) => (
                  <div key={i} className="sp-sidebar-item">
                    <span className="sp-sidebar-dot" />
                    {s}
                  </div>
                ))}
              </div>

              {/* 4. QUICK RESULTS */}
              <div className="sp-sidebar-card">
                <div className="sp-sidebar-card-title">⚡ Quick Results</div>
                {["3-6 months: First rankings","6-12 months: Significant growth","12+ months: Market dominance"].map((s, i) => (
                  <div key={i} className="sp-sidebar-item">
                    <span className="sp-sidebar-dot" />
                    {s}
                  </div>
                ))}
              </div>

            </aside>
          </div>
        </main>

{/* PRICING SECTION */}
<section style={{ background: "#f8fafc", padding: "4rem 2rem" }}>
  <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#eff6ff", border: "1px solid #bfdbfe", padding: "6px 14px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, color: "#1e3a8a", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "1rem" }}>
        💰 Pricing
      </div>
      <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 800, color: "#0f172a", margin: "0 0 0.75rem" }}>
        SEO Services Pricing
      </h2>
      <p style={{ color: "#64748b", fontSize: "16px", maxWidth: "550px", margin: "0 auto" }}>
        Transparent pricing — no hidden fees. Choose a plan that fits your business goals.
      </p>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", alignItems: "start" }}>
      
      {/* STARTER */}
      <div style={{ background: "#fff", border: "2px solid #e2e8f0", borderRadius: "16px", padding: "2rem", position: "relative" }}>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "20px", fontWeight: 800, color: "#1e3a8a", marginBottom: "6px" }}>Starter</h3>
        <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "1.5rem" }}>Perfect for small businesses getting started online.</p>
        <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid #e2e8f0" }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "2.5rem", fontWeight: 800, color: "#0f172a" }}>₹6,500</span>
          <span style={{ fontSize: "14px", color: "#64748b" }}>/mo</span>
        </div>
        {[
          "SEO Audit + Basic Optimization",
          "Keyword Research (10–15 keywords)",
          "Meta Title & Description Optimization",
          "Google Search Console & Analytics Setup",
          "Google Business Profile Setup",
        ].map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
            <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "linear-gradient(135deg,#1e3a8a,#3730a3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
              <span style={{ color: "#fff", fontSize: "11px" }}>✓</span>
            </div>
            <span style={{ fontSize: "14px", color: "#334155" }}>{f}</span>
          </div>
        ))}
        <a href="/contact" style={{ display: "block", marginTop: "1.5rem", textAlign: "center", padding: "12px", borderRadius: "10px", background: "#eff6ff", color: "#1e3a8a", fontWeight: 700, fontSize: "14px", textDecoration: "none", border: "2px solid #bfdbfe" }}>
          Get Started →
        </a>
      </div>

      {/* GROWTH — MOST POPULAR */}
      <div style={{ background: "linear-gradient(135deg, #1e3a8a, #3730a3)", border: "2px solid #3730a3", borderRadius: "16px", padding: "2rem", position: "relative", boxShadow: "0 20px 60px rgba(30,58,138,0.3)" }}>
        <div style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#fff", fontSize: "11px", fontWeight: 800, padding: "5px 16px", borderRadius: "999px", letterSpacing: "1px", whiteSpace: "nowrap" }}>
          ⚡ MOST POPULAR
        </div>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "6px" }}>Growth</h3>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", marginBottom: "1.5rem" }}>For businesses ready to scale aggressively.</p>
        <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "2.5rem", fontWeight: 800, color: "#fff" }}>₹15,999</span>
          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>/mo</span>
        </div>
        {[
          "Full SEO (On-Page, Off-Page & Technical)",
          "Advanced Keyword Research (25–40 keywords)",
          "Meta Optimization + Content Optimization (up to 15 pages)",
          "Google Ads or Meta Ads Management",
        ].map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
            <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
              <span style={{ color: "#fff", fontSize: "11px" }}>✓</span>
            </div>
            <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>{f}</span>
          </div>
        ))}
        <a href="/contact" style={{ display: "block", marginTop: "1.5rem", textAlign: "center", padding: "12px", borderRadius: "10px", background: "#fff", color: "#1e3a8a", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
          Get Started →
        </a>
      </div>

      {/* ENTERPRISE */}
      <div style={{ background: "#fff", border: "2px solid #e2e8f0", borderRadius: "16px", padding: "2rem", position: "relative" }}>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "20px", fontWeight: 800, color: "#1e3a8a", marginBottom: "6px" }}>Enterprise</h3>
        <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "1.5rem" }}>Full-service digital transformation for serious brands.</p>
        <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid #e2e8f0" }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "2.5rem", fontWeight: 800, color: "#0f172a" }}>₹28,000</span>
          <span style={{ fontSize: "14px", color: "#64748b" }}>/mo</span>
        </div>
        {[
          "Everything in Growth",
          "Advanced SEO Strategy (On-Page, Off-Page, Technical & Content)",
          "Python Automation / Dashboard",
          "10–15 Quality Backlinks / Month",
          "High-Intent Keyword Expansion (50+)",
        ].map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
            <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "linear-gradient(135deg,#1e3a8a,#3730a3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
              <span style={{ color: "#fff", fontSize: "11px" }}>✓</span>
            </div>
            <span style={{ fontSize: "14px", color: "#334155" }}>{f}</span>
          </div>
        ))}
        <a href="/contact" style={{ display: "block", marginTop: "1.5rem", textAlign: "center", padding: "12px", borderRadius: "10px", background: "#eff6ff", color: "#1e3a8a", fontWeight: 700, fontSize: "14px", textDecoration: "none", border: "2px solid #bfdbfe" }}>
          Get Started →
        </a>
      </div>

    </div>
  </div>
</section>

{/* WHY CHOOSE US */}
<section style={{ background: "#f8fafc", padding: "4rem 2rem" }}>
  <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#eff6ff", border: "1px solid #bfdbfe", padding: "6px 14px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, color: "#1e3a8a", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "1rem" }}>
        ⭐ Why Choose Us
      </div>
      <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 800, color: "#0f172a", margin: "0 0 0.75rem" }}>
        Why Businesses Choose Clickbriz
      </h2>
      <p style={{ color: "#64748b", fontSize: "16px", maxWidth: "550px", margin: "0 auto" }}>
        We don't just rank websites — we grow businesses.
      </p>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
      {[
        { icon: "🎯", title: "Business-First Approach", desc: "Every strategy tied to your revenue goals — not just rankings." },
        { icon: "🔍", title: "Manual Audits", desc: "Real experts analyze your site — not just automated tool reports." },
        { icon: "📊", title: "Transparent Reporting", desc: "Monthly reports showing exactly what's working and what's improving." },
        { icon: "⚡", title: "Fast Implementation", desc: "Quick wins first — high impact fixes prioritized from day one." },
        { icon: "🛡️", title: "100% White-Hat", desc: "No shortcuts, no penalties — only Google-approved SEO tactics." },
        { icon: "📈", title: "Realistic Expectations", desc: "Honest timelines and projections based on your actual market." },
      ].map((item, i) => (
        <div key={i} style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: "14px",
          padding: "1.5rem",
          borderLeft: "4px solid #1e3a8a",
          transition: "all 0.25s",
          boxShadow: "0 2px 12px rgba(30,58,138,0.06)",
        }}>
          <div style={{ fontSize: "28px", marginBottom: "0.75rem" }}>{item.icon}</div>
          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: "15px", color: "#0f172a", marginBottom: "6px" }}>
            {item.title}
          </div>
          <div style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.65 }}>
            {item.desc}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
{/* BOTTOM CTA */}
        <section className="sp-cta-section">
          <div className="sp-cta-inner">
            <h2>Ready to Dominate Google Search?</h2>
            <p>Get a free SEO audit and a custom strategy designed for your business goals.</p>
            <div className="sp-cta-btns">
              <a href="/contact" className="sp-btn-primary">
                Get Free SEO Audit <ArrowRight size={15} />
              </a>
              <a href="tel:+918527004901" className="sp-btn-secondary">
                <Phone size={14} /> +91 85270 04901
              </a>
            </div>
          </div>
        </section>

        {/* INTERNAL LINKS SECTION */}
        <section style={{ background: "#eff6ff", padding: "3rem 2rem", borderTop: "1px solid #bfdbfe" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "16px", fontWeight: 700, color: "#1e3a8a", marginBottom: "1.5rem" }}>
              SEO Services Across India
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px" }}>
              {[
                { label: "SEO Services in Faridabad", href: "/seo-services-in-faridabad" },
                { label: "SEO Services in Noida", href: "/seo-services-in-noida" },
                { label: "SEO Services in Delhi", href: "/seo-services-in-delhi" },
                { label: "SEO Services in Delhi/NCR", href: "/seo-services-in-delhi-ncr" },
                { label: "SEO Services in Gurgaon", href: "/seo-services-in-gurgaon" },
                { label: "SEO Services in Ballabgarh", href: "/seo-services-in-ballabgarh" },
                { label: "SEO Services in Naharpar Faridabad", href: "/seo-services-in-naharpar-faridabad" },
                { label: "SEO Services in Ghaziabad", href: "/seo-services-in-ghaziabad" },
              ].map((item, i) => (
                <a key={i} href={item.href} className="internal-link">
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#1e3a8a", flexShrink: 0 }} />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}