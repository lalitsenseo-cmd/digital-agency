import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getBlogPosts } from "@/lib/get-blog-posts";
import { getPageData, buildMetadata } from "@/lib/get-page-data";
import { WhatsAppButton } from "@/components/PremiumFeatures";
import { Sparkles, Calendar, ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("blog");
  return buildMetadata(page, {
    title: "Blog | Clickbriz Digital",
    description: "Digital marketing tips, guides, and case studies.",
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <WhatsAppButton />
      <Navbar />

      <style>{`
        @keyframes glowPulse { 0%,100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        @keyframes shimmerBlog { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes fadeInUpBlog { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blogCardIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        body { background: #0A0A0A !important; }

        .blog-page-wrapper { background: #0A0A0A; color: #fff; font-family: 'Inter', sans-serif; min-height: 100vh; }

        .blog-hero-sec {
          position: relative;
          padding: 8rem 2rem 4rem;
          background: radial-gradient(ellipse at top, #1c1410 0%, #0a0a0a 50%, #000000 100%);
          overflow: hidden;
        }
        .blog-hero-orb1 {
          position: absolute; top: 10%; right: 10%; width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.35) 0%, transparent 70%);
          border-radius: 50%; filter: blur(60px);
          animation: glowPulse 4s ease-in-out infinite;
          pointer-events: none;
        }
        .blog-hero-orb2 {
          position: absolute; bottom: -10%; left: 5%; width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(234, 88, 12, 0.25) 0%, transparent 70%);
          border-radius: 50%; filter: blur(80px);
          animation: glowPulse 6s ease-in-out infinite;
          pointer-events: none;
        }
        .blog-hero-inner {
          position: relative; z-index: 2;
          max-width: 900px; margin: 0 auto;
          text-align: center;
          animation: fadeInUpBlog 0.8s ease-out;
        }
        .blog-hero-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(249, 115, 22, 0.15);
          border: 1px solid rgba(249, 115, 22, 0.3);
          padding: 8px 18px; border-radius: 999px;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
        }
        .blog-hero-dot {
          width: 8px; height: 8px; background: #F97316;
          border-radius: 50%; box-shadow: 0 0 12px #F97316;
        }
        .blog-hero-pill-text {
          font-size: 12px; font-weight: 600; color: #FDBA74;
          letter-spacing: 1.5px; text-transform: uppercase;
        }
        .blog-hero-h1 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2.5rem, 5vw, 3.75rem);
          font-weight: 800; color: #fff;
          line-height: 1.1; letter-spacing: -0.03em;
          margin: 0 0 1.5rem;
        }
        .blog-hero-gradient-text {
          background: linear-gradient(135deg, #F97316 0%, #FB923C 50%, #FED7AA 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerBlog 4s linear infinite;
        }
        .blog-hero-desc-text {
          font-size: 1.2rem; color: #A3A3A3;
          max-width: 650px; margin: 0 auto;
          line-height: 1.7;
        }

        .blog-posts-sec {
          position: relative;
          padding: 5rem 2rem;
          background: linear-gradient(180deg, #0A0A0A 0%, #171717 50%, #0A0A0A 100%) !important;
          overflow: hidden;
        }
        .blog-posts-sec::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 400px; height: 2px;
          background: linear-gradient(90deg, transparent, #F97316, transparent);
        }
        .blog-posts-container {
          max-width: 1200px; margin: 0 auto;
          position: relative; z-index: 2;
        }
        .blog-posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }

        .blog-post-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          border-radius: 20px !important;
          overflow: hidden !important;
          text-decoration: none !important;
          display: block !important;
          position: relative;
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
          animation: blogCardIn 0.5s ease-out both;
        }
        .blog-post-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #F97316 0%, #EA580C 100%);
          z-index: 3;
        }
        .blog-post-card:hover {
          transform: translateY(-6px);
          border-color: rgba(249, 115, 22, 0.4) !important;
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.06) 0%, rgba(234, 88, 12, 0.02) 100%) !important;
          box-shadow: 0 20px 60px rgba(249, 115, 22, 0.25);
        }

        .blog-post-img-wrap {
          position: relative;
          width: 100%;
          height: 200px;
          background: linear-gradient(135deg, #1c1410 0%, #0A0A0A 100%);
          overflow: hidden;
        }
        .blog-post-img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          transition: transform 0.5s ease;
        }
        .blog-post-card:hover .blog-post-img {
          transform: scale(1.05);
        }
        .blog-post-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 88, 12, 0.05) 100%);
        }
        .blog-post-placeholder-icon {
          width: 72px; height: 72px;
          background: linear-gradient(135deg, #F97316, #EA580C);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(249, 115, 22, 0.5);
        }

        .blog-post-body {
          padding: 1.5rem 1.75rem 1.75rem !important;
        }
        .blog-post-meta {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          margin-bottom: 1rem !important;
        }
        .blog-post-cat {
          display: inline-flex !important;
          align-items: center !important;
          gap: 5px;
          background: rgba(249, 115, 22, 0.12) !important;
          border: 1px solid rgba(249, 115, 22, 0.25) !important;
          color: #FDBA74 !important;
          padding: 5px 12px !important;
          border-radius: 999px !important;
          font-size: 10px !important;
          font-weight: 800 !important;
          letter-spacing: 1.2px !important;
          text-transform: uppercase !important;
        }
        .blog-post-date {
          display: inline-flex !important;
          align-items: center !important;
          gap: 5px;
          font-size: 11px !important;
          color: #71717A !important;
          font-weight: 500;
        }
        .blog-post-h2 {
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          font-size: 1.125rem !important;
          font-weight: 700 !important;
          color: #fff !important;
          line-height: 1.4 !important;
          letter-spacing: -0.01em;
          margin: 0 0 0.75rem !important;
          transition: color 0.3s ease;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .blog-post-card:hover .blog-post-h2 {
          color: #FB923C !important;
        }
        .blog-post-excerpt {
          font-size: 13px !important;
          color: #A3A3A3 !important;
          line-height: 1.65 !important;
          margin: 0 0 1.25rem !important;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .blog-post-readmore {
          display: inline-flex !important;
          align-items: center !important;
          gap: 6px;
          color: #FB923C !important;
          font-size: 13px !important;
          font-weight: 700 !important;
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          letter-spacing: 0.3px;
          transition: gap 0.3s ease;
        }
        .blog-post-card:hover .blog-post-readmore {
          gap: 10px;
        }

        .blog-empty-wrap {
          text-align: center;
          padding: 5rem 2rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
          border: 1px dashed rgba(249, 115, 22, 0.3);
          border-radius: 20px;
        }
        .blog-empty-ico {
          width: 72px; height: 72px;
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(234, 88, 12, 0.1));
          border: 1px solid rgba(249, 115, 22, 0.3);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }
        .blog-empty-h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 0.75rem;
        }
        .blog-empty-p {
          color: #A3A3A3;
          font-size: 14px;
          line-height: 1.6;
        }

        @media (max-width: 640px) {
          .blog-hero-sec { padding: 6rem 1.25rem 3rem; }
          .blog-posts-sec { padding: 3rem 1.25rem; }
          .blog-post-body { padding: 1.25rem 1.5rem 1.5rem !important; }
        }
      `}</style>

      <div className="blog-page-wrapper">
        <main>

          <section className="blog-hero-sec">
            <div className="blog-hero-orb1"></div>
            <div className="blog-hero-orb2"></div>
            <div className="blog-hero-inner">
              <div className="blog-hero-pill">
                <span className="blog-hero-dot"></span>
                <span className="blog-hero-pill-text">Our Blog</span>
              </div>
              <h1 className="blog-hero-h1">
                Digital Marketing{' '}
                <span className="blog-hero-gradient-text">Tips & Insights</span>
              </h1>
              <p className="blog-hero-desc-text">
                Expert guides on SEO, Google Ads, Social Media, and more — practical insights for Indian businesses looking to grow online.
              </p>
            </div>
          </section>

          <section className="blog-posts-sec">
            <div className="blog-posts-container">
              {posts.length === 0 ? (
                <div className="blog-empty-wrap">
                  <div className="blog-empty-ico">
                    <BookOpen size={32} color="#FB923C" strokeWidth={2} />
                  </div>
                  <h3 className="blog-empty-h3">No Blog Posts Yet</h3>
                  <p className="blog-empty-p">
                    We're cooking up some amazing content. Check back soon!
                  </p>
                </div>
              ) : (
                <div className="blog-posts-grid">
                  {posts.map((post) => {
                    const date = new Date(post.published_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    });
                    return (
                      <Link key={post.id} href={`/blog/${post.slug}`} className="blog-post-card">
                        <div className="blog-post-img-wrap">
                          {post.cover_image ? (
                            <img src={post.cover_image} alt={post.title} className="blog-post-img" />
                          ) : (
                            <div className="blog-post-placeholder">
                              <div className="blog-post-placeholder-icon">
                                <Sparkles size={32} color="#fff" strokeWidth={2} />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="blog-post-body">
                          <div className="blog-post-meta">
                            <span className="blog-post-cat">{post.category}</span>
                            <span className="blog-post-date">
                              <Calendar size={11} />
                              {date}
                            </span>
                          </div>
                          <h2 className="blog-post-h2">{post.title}</h2>
                          <p className="blog-post-excerpt">{post.description}</p>
                          <span className="blog-post-readmore">
                            Read More <ArrowRight size={13} />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

        </main>
      </div>
      <Footer />
    </>
  );
}