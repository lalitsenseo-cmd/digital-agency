import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { WhatsAppButton } from "@/components/PremiumFeatures";
import { Sparkles, Calendar, ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Clickbriz Digital",
  description: "Digital marketing tips, guides, and case studies.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <WhatsAppButton />
      <Navbar />

      <style suppressHydrationWarning>{`
        @keyframes fadeInUpBlog { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blogCardIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmerBlog { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }

        body { background: #fff !important; }
        .blog-page-wrapper { background: #fff; color: #0f172a; font-family: 'Inter', sans-serif; min-height: 100vh; }

        /* HERO — Dark Blue */
        .blog-hero-sec {
          position: relative;
          padding: 8rem 2rem 4rem;
          background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 40%, #3730a3 70%, #1e1b4b 100%);
          overflow: hidden;
        }
        .blog-hero-orb1 {
          position: absolute; top: 10%; right: 10%; width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(147,197,253,0.2) 0%, transparent 70%);
          border-radius: 50%; filter: blur(60px); pointer-events: none;
        }
        .blog-hero-orb2 {
          position: absolute; bottom: -10%; left: 5%; width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(55,48,163,0.25) 0%, transparent 70%);
          border-radius: 50%; filter: blur(80px); pointer-events: none;
        }
        .blog-hero-inner {
          position: relative; z-index: 2;
          max-width: 900px; margin: 0 auto;
          text-align: center;
          animation: fadeInUpBlog 0.8s ease-out;
        }
        .blog-hero-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 8px 18px; border-radius: 999px;
          margin-bottom: 2rem; backdrop-filter: blur(10px);
        }
        .blog-hero-dot {
          width: 8px; height: 8px; background: #93c5fd;
          border-radius: 50%; box-shadow: 0 0 12px #93c5fd;
        }
        .blog-hero-pill-text {
          font-size: 12px; font-weight: 600; color: #bfdbfe;
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
          background: linear-gradient(135deg, #93c5fd 0%, #bfdbfe 50%, #e0f2fe 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerBlog 4s linear infinite;
        }
        .blog-hero-desc-text {
          font-size: 1.2rem; color: rgba(255,255,255,0.8);
          max-width: 650px; margin: 0 auto; line-height: 1.7;
        }

        /* POSTS SECTION — Light */
        .blog-posts-sec {
          position: relative;
          padding: 5rem 2rem;
          background: #f8fafc;
          overflow: hidden;
        }
        .blog-posts-sec::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 400px; height: 2px;
          background: linear-gradient(90deg, transparent, #1e3a8a, transparent);
        }
        .blog-posts-container {
          max-width: 1200px; margin: 0 auto; position: relative; z-index: 2;
        }
        .blog-posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }

        /* BLOG CARD */
        .blog-post-card {
          background: #fff !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 20px !important;
          overflow: hidden !important;
          text-decoration: none !important;
          display: block !important;
          position: relative;
          transition: all 0.4s ease;
          animation: blogCardIn 0.5s ease-out both;
          box-shadow: 0 2px 12px rgba(30,58,138,0.06);
        }
        .blog-post-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #1e3a8a 0%, #3730a3 100%);
          z-index: 3;
        }
        .blog-post-card:hover {
          transform: translateY(-6px);
          border-color: #93c5fd !important;
          box-shadow: 0 20px 60px rgba(30,58,138,0.12);
        }

        .blog-post-img-wrap {
          position: relative; width: 100%; height: 200px;
          background: #eff6ff; overflow: hidden;
        }
        .blog-post-img {
          width: 100% !important; height: 100% !important;
          object-fit: cover !important; transition: transform 0.5s ease;
        }
        .blog-post-card:hover .blog-post-img { transform: scale(1.05); }
        .blog-post-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
        }
        .blog-post-placeholder-icon {
          width: 72px; height: 72px;
          background: linear-gradient(135deg, #1e3a8a, #3730a3);
          border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 10px 30px rgba(30,58,138,0.3);
        }

        .blog-post-body { padding: 1.5rem 1.75rem 1.75rem !important; }
        .blog-post-meta {
          display: flex !important; justify-content: space-between !important;
          align-items: center !important; margin-bottom: 1rem !important;
        }
        .blog-post-cat {
          display: inline-flex !important; align-items: center !important; gap: 5px;
          background: #eff6ff !important; border: 1px solid #bfdbfe !important;
          color: #1e3a8a !important; padding: 5px 12px !important;
          border-radius: 999px !important; font-size: 10px !important;
          font-weight: 800 !important; letter-spacing: 1.2px !important;
          text-transform: uppercase !important;
        }
        .blog-post-date {
          display: inline-flex !important; align-items: center !important; gap: 5px;
          font-size: 11px !important; color: #94a3b8 !important; font-weight: 500;
        }
        .blog-post-h2 {
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          font-size: 1.125rem !important; font-weight: 700 !important;
          color: #0f172a !important; line-height: 1.4 !important;
          letter-spacing: -0.01em; margin: 0 0 0.75rem !important;
          transition: color 0.3s ease;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .blog-post-card:hover .blog-post-h2 { color: #1e3a8a !important; }
        .blog-post-excerpt {
          font-size: 13px !important; color: #64748b !important;
          line-height: 1.65 !important; margin: 0 0 1.25rem !important;
          display: -webkit-box; -webkit-line-clamp: 3;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .blog-post-readmore {
          display: inline-flex !important; align-items: center !important; gap: 6px;
          color: #1e3a8a !important; font-size: 13px !important;
          font-weight: 700 !important; font-family: 'Plus Jakarta Sans', sans-serif !important;
          transition: gap 0.3s ease;
        }
        .blog-post-card:hover .blog-post-readmore { gap: 10px; }

        /* EMPTY STATE */
        .blog-empty-wrap {
          text-align: center; padding: 5rem 2rem;
          background: #fff; border: 1px dashed #bfdbfe; border-radius: 20px;
        }
        .blog-empty-ico {
          width: 72px; height: 72px;
          background: #eff6ff; border: 1px solid #bfdbfe;
          border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.5rem;
        }
        .blog-empty-h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.5rem; font-weight: 800; color: #0f172a; margin-bottom: 0.75rem;
        }
        .blog-empty-p { color: #64748b; font-size: 14px; line-height: 1.6; }

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
                    <BookOpen size={32} color="#1e3a8a" strokeWidth={2} />
                  </div>
                  <h3 className="blog-empty-h3">No Blog Posts Yet</h3>
                  <p className="blog-empty-p">
                    We're cooking up some amazing content. Check back soon!
                  </p>
                </div>
              ) : (
                <div className="blog-posts-grid">
                  {posts.map((post) => {
                    const date = new Date(post.publishedDate).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    });
                    return (
                      <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-post-card">
                        <div className="blog-post-img-wrap">
                          {post.coverImage ? (
                            <img src={post.coverImage} alt={post.title} className="blog-post-img" />
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