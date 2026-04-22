export type Service = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  tags: string[];
  color: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  result: string;
  desc: string;
  color: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
};

export type PricingPlan = {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  desc: string;
  features: string[];
  popular: boolean;
  color: string;
};

export type BlogPost = {
  id: string;
  title: string;
  category: string;
  desc: string;
  content: string;
  date: string;
  published: boolean;
  slug: string;
};

export type ServicePageContent = {
  id: string;
  slug: string;
  heroTitle: string;
  heroDesc: string;
  offers: { title: string; desc: string }[];
  benefits: string[];
  faqs: { q: string; a: string }[];
};

export type SiteContent = {
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    stat1: string; stat1label: string;
    stat2: string; stat2label: string;
    stat3: string; stat3label: string;
    stat4: string; stat4label: string;
  };
  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
  pricing: PricingPlan[];
  contact: { phone: string; email: string; whatsapp: string; };
  blogPosts: BlogPost[];
  servicePages: ServicePageContent[];
};

export const defaultContent: SiteContent = {
  hero: {
    badge: "Top Rated Digital Agency",
    headline: "Grow Your Business With Digital Marketing That Works",
    subheadline: "SEO, Google Ads, Social Media, Website Development & Python Automation — complete digital solutions for Indian businesses.",
    stat1: "50+", stat1label: "Happy Clients",
    stat2: "3×", stat2label: "Avg. ROI",
    stat3: "98%", stat3label: "Client Retention",
    stat4: "5★", stat4label: "Rated Agency",
  },
  services: [
    { id: "s1", icon: "Search", title: "SEO Services", desc: "Rank higher on Google. On-page, off-page, technical SEO, local SEO, and full keyword strategy.", tags: ["On-Page SEO", "Link Building", "Technical Audit", "Local SEO"], color: "#2563eb" },
    { id: "s2", icon: "TrendingUp", title: "Google Ads (PPC)", desc: "ROI-focused Google, Meta & LinkedIn ad campaigns that bring real leads and sales.", tags: ["Google Ads", "Meta Ads", "LinkedIn Ads", "Retargeting"], color: "#16a34a" },
    { id: "s3", icon: "Share2", title: "Social Media Marketing", desc: "Content strategy, posting, community management, and growth across all platforms.", tags: ["Instagram", "Facebook", "LinkedIn", "YouTube"], color: "#7c3aed" },
    { id: "s4", icon: "Globe", title: "Website Development", desc: "Full custom websites — WordPress, React/Next.js, landing pages. Mobile-first, fast, and beautiful.", tags: ["Next.js", "WordPress", "Landing Pages", "E-commerce"], color: "#dc2626" },
    { id: "s5", icon: "Cpu", title: "Python Development", desc: "Automation scripts, data dashboards, web scrapers, APIs, and custom tools for your business.", tags: ["Automation", "Data Analysis", "Web Scraping", "APIs"], color: "#d97706" },
    { id: "s6", icon: "Code2", title: "Full Digital Package", desc: "End-to-end digital presence — strategy, build, launch, and scale. One agency, everything covered.", tags: ["Strategy", "Branding", "Email Marketing", "Analytics"], color: "#0891b2" },
  ],
  projects: [
    { id: "p1", title: "E-Commerce SEO — 3× Organic Traffic", category: "SEO", result: "+312% traffic in 4 months", desc: "Full SEO overhaul for a fashion brand — technical fixes, content strategy, 200+ backlinks.", color: "#2563eb" },
    { id: "p2", title: "Google Ads Campaign — ₹2L → ₹18L Revenue", category: "Paid Ads", result: "9× ROAS achieved", desc: "Rebuilt campaigns for a local coaching institute. Smart bidding + landing page optimization.", color: "#16a34a" },
    { id: "p3", title: "Restaurant Chain — Full Digital Presence", category: "Full Package", result: "0 to 5K monthly orders online", desc: "Website + Google My Business + Meta Ads + WhatsApp Marketing for 3 locations.", color: "#d97706" },
    { id: "p4", title: "Python Automation — Sales Dashboard", category: "Python Dev", result: "Saved 30 hrs/week manual work", desc: "Built a Streamlit dashboard with automated Excel reports, email alerts, and data pipeline.", color: "#0891b2" },
    { id: "p5", title: "Real Estate Website — Next.js", category: "Web Dev", result: "90+ Lighthouse score", desc: "Custom Next.js website with property listings, contact forms, WhatsApp integration.", color: "#dc2626" },
    { id: "p6", title: "LinkedIn B2B Lead Generation", category: "Social Media", result: "120+ leads in 60 days", desc: "Full LinkedIn strategy — profile optimization, content, outreach sequences for SaaS client.", color: "#7c3aed" },
  ],
  testimonials: [
    { id: "t1", name: "Rahul Sharma", role: "Owner, FashionHub", text: "In just 3 months, our Google traffic tripled. Best investment we made for our store.", rating: 5 },
    { id: "t2", name: "Priya Gupta", role: "Founder, EduEdge Coaching", text: "Our Google Ads now bring 40+ leads daily. Clickbriz completely transformed our admissions.", rating: 5 },
    { id: "t3", name: "Amit Verma", role: "Director, BuildRight Infra", text: "They built our website and handled all social media. Highly professional and results-driven.", rating: 5 },
    { id: "t4", name: "Sneha Joshi", role: "CEO, DataWorks Solutions", text: "The Python automation dashboard they built saved us 30+ hours every week. Incredible work.", rating: 5 },
  ],
  pricing: [
    { id: "pr1", name: "Starter", priceMonthly: 9999, priceYearly: 7999, desc: "Perfect for small businesses getting started online.", features: ["SEO Audit + Basic Optimization", "1 Social Media Platform", "Monthly Performance Report", "Google My Business Setup", "5 Blog Articles / Month", "Email Support"], popular: false, color: "#6b7280" },
    { id: "pr2", name: "Growth", priceMonthly: 24999, priceYearly: 19999, desc: "For businesses ready to scale aggressively.", features: ["Full SEO (On + Off + Technical)", "Google + Meta Ads Management", "3 Social Media Platforms", "Weekly Reports + Strategy Calls", "Landing Page Design", "WhatsApp Marketing Setup", "Email Automation", "Priority Support"], popular: true, color: "#2563eb" },
    { id: "pr3", name: "Enterprise", priceMonthly: 54999, priceYearly: 44999, desc: "Full-service digital transformation for serious brands.", features: ["Everything in Growth", "Custom Website Development", "Python Automation / Dashboard", "Dedicated Account Manager", "Daily Monitoring & Reporting", "A/B Testing & CRO", "Competitor Intelligence", "24/7 Priority Support"], popular: false, color: "#7c3aed" },
  ],
  contact: { phone: "+91 85270 04901", email: "clickbriz@gmail.com", whatsapp: "+91 85270 04901" },
  blogPosts: [
    { id: "b1", title: "10 SEO Tips to Rank Your Business on Google in 2025", category: "SEO", desc: "Learn the most effective SEO strategies that are working right now.", content: "Write your full article content here...", date: "2024-12-01", published: true, slug: "seo-tips-rank-google-2025" },
    { id: "b2", title: "How to Run Google Ads on a Small Budget in India", category: "Google Ads", desc: "A practical guide to running profitable Google Ads campaigns with budgets as low as ₹500/day.", content: "Write your full article content here...", date: "2024-11-15", published: true, slug: "google-ads-small-budget-india" },
  ],
  servicePages: [
    {
      id: "sp1", slug: "seo-services",
      heroTitle: "SEO Services That Actually Rank Your Website on Google",
      heroDesc: "We use proven, white-hat SEO strategies to get your website ranking on the first page of Google — driving more organic traffic, leads, and revenue.",
      offers: [
        { title: "SEO Audit & Strategy", desc: "Complete website analysis — technical issues, content gaps, backlink profile, and competitor research." },
        { title: "On-Page SEO", desc: "Optimize every page — title tags, meta descriptions, headings, content, internal linking, and image optimization." },
        { title: "Technical SEO", desc: "Fix site speed, mobile-friendliness, crawlability, schema markup, Core Web Vitals." },
        { title: "Off-Page SEO & Link Building", desc: "Build high-quality backlinks from authoritative websites to increase domain authority." },
        { title: "Local SEO", desc: "Dominate local search results — Google My Business optimization, local citations, reviews management." },
        { title: "Monthly Reporting", desc: "Clear reports showing keyword rankings, traffic growth, conversions, and ROI every month." },
      ],
      benefits: ["100% White-Hat, Google-safe techniques", "Dedicated SEO specialist for your account", "Keyword research for your exact market", "Transparent monthly progress reports", "No long-term lock-in contracts", "Results typically visible in 3-6 months", "Local SEO for Indian markets", "Competitor analysis included"],
      faqs: [
        { q: "How long does SEO take to show results?", a: "Most clients start seeing improvements in 3-4 months. Significant ranking improvements typically happen in 6-12 months." },
        { q: "How much do your SEO services cost?", a: "Our SEO packages start from ₹9,999/month. Contact us for a custom quote." },
        { q: "Do you guarantee first page rankings?", a: "No ethical SEO agency can guarantee specific rankings. We guarantee consistent, transparent work using proven strategies." },
        { q: "Will you work on my existing website?", a: "Yes! We work with all types of websites — WordPress, custom HTML, Shopify, Wix, and more." },
      ],
    },
    {
      id: "sp2", slug: "google-ads",
      heroTitle: "Google Ads & Paid Advertising That Delivers Real ROI",
      heroDesc: "We create and manage high-converting Google Ads, Meta Ads, and LinkedIn campaigns that bring qualified leads to your business.",
      offers: [
        { title: "Google Search Ads", desc: "Show up at the top of Google when customers search for your products or services." },
        { title: "Meta & Instagram Ads", desc: "Targeted Facebook and Instagram ads to reach your ideal audience." },
        { title: "Google Display Ads", desc: "Visual banner ads across millions of websites to build brand awareness." },
        { title: "YouTube Advertising", desc: "Video ads on YouTube to reach a massive audience." },
        { title: "Campaign Optimization", desc: "Continuous A/B testing, bid adjustments, and landing page optimization." },
        { title: "Conversion Tracking", desc: "Full setup of conversion tracking with weekly detailed performance reports." },
      ],
      benefits: ["Google Certified Ads specialist", "No setup fees", "Campaigns live within 48 hours", "Weekly optimization and reporting", "Landing page recommendations included", "Retargeting campaigns setup", "Full transparency on ad spend", "Minimum budget: ₹15,000/month"],
      faqs: [
        { q: "How much should I spend on Google Ads?", a: "We recommend a minimum of ₹15,000-20,000/month in ad spend to see meaningful results." },
        { q: "How quickly will I see results?", a: "Unlike SEO, paid ads can bring results within days of launch." },
        { q: "Do you manage Meta ads too?", a: "Yes! We manage Google Ads, Meta Ads, LinkedIn Ads, and YouTube campaigns." },
        { q: "Can I see exactly where my money is going?", a: "Absolutely. You have full access to your ad accounts at all times." },
      ],
    },
    {
      id: "sp3", slug: "social-media-marketing",
      heroTitle: "Social Media Marketing That Builds Real Brand Presence",
      heroDesc: "We create engaging content, grow your followers, and turn your social media channels into a powerful lead generation machine.",
      offers: [
        { title: "Content Strategy & Calendar", desc: "Monthly content plan with post ideas, captions, hashtags, and scheduling." },
        { title: "Graphic Design & Reels", desc: "Eye-catching posts, stories, carousels, and short video reels." },
        { title: "Community Management", desc: "Respond to comments, messages, and mentions every day." },
        { title: "Instagram Growth Strategy", desc: "Hashtag research, profile optimization, and engagement tactics." },
        { title: "LinkedIn B2B Marketing", desc: "Professional content and outreach strategy for B2B businesses." },
        { title: "Monthly Analytics Report", desc: "Detailed report covering reach, engagement, follower growth, and top posts." },
      ],
      benefits: ["Content creation included", "Posting 15-30 times per month", "Platform-specific strategy", "Dedicated content manager", "Brand voice development", "Competitor analysis every quarter", "Hashtag research and optimization", "Crisis management support"],
      faqs: [
        { q: "Which platforms do you manage?", a: "We manage Instagram, Facebook, LinkedIn, Twitter/X, and YouTube." },
        { q: "Do you create the content?", a: "We handle everything — copywriting, graphic design, video editing, and posting." },
        { q: "How many posts per month?", a: "Starter: 12 posts, Growth: 20 posts, Enterprise: 30+ posts across platforms." },
        { q: "How long before we see follower growth?", a: "Clients typically see 20-40% follower growth in the first 3 months." },
      ],
    },
    {
      id: "sp4", slug: "website-development",
      heroTitle: "Website Development That Looks Great and Converts Visitors",
      heroDesc: "We build fast, beautiful, and SEO-ready websites that represent your brand professionally and turn visitors into paying customers.",
      offers: [
        { title: "WordPress Websites", desc: "Custom WordPress websites with premium themes, plugins, and easy admin panel." },
        { title: "Next.js / React Websites", desc: "Modern, lightning-fast websites built with Next.js and React." },
        { title: "Landing Pages", desc: "High-converting landing pages for Google Ads and lead generation." },
        { title: "E-Commerce Websites", desc: "Full online stores with payment gateway integration and inventory management." },
        { title: "Website Redesign", desc: "Transform your old website into a modern, fast, mobile-friendly one." },
        { title: "Maintenance & Support", desc: "Ongoing maintenance — updates, security, backups, and technical support." },
      ],
      benefits: ["Mobile-first, fully responsive design", "SEO-optimized from day one", "Fast loading — under 3 seconds", "SSL certificate and security setup", "Google Analytics integration", "Contact forms and WhatsApp button", "1 month free support after launch", "Training to manage your website"],
      faqs: [
        { q: "How long does it take to build a website?", a: "A standard business website takes 2-3 weeks. E-commerce takes 4-6 weeks." },
        { q: "How much does a website cost?", a: "Basic websites start from ₹15,000. E-commerce from ₹35,000. Contact us for a quote." },
        { q: "Do you provide hosting?", a: "We recommend and help setup hosting on Hostinger or SiteGround." },
        { q: "Will I be able to update the website myself?", a: "Yes! WordPress has an easy admin panel and we provide training." },
      ],
    },
    {
      id: "sp5", slug: "python-development",
      heroTitle: "Python Development — Automate Your Business and Save Hours Every Week",
      heroDesc: "We build custom Python tools, automation scripts, data dashboards, and APIs that eliminate repetitive work.",
      offers: [
        { title: "Business Automation", desc: "Automate repetitive tasks — Excel reports, email sending, data entry, invoice generation." },
        { title: "Data Dashboards (Streamlit)", desc: "Interactive web dashboards to visualize your business data in real time." },
        { title: "Web Scraping", desc: "Extract data from websites, competitor pricing, leads, and market data." },
        { title: "API Development", desc: "Build REST APIs to connect your systems and mobile apps." },
        { title: "Data Analysis & Reports", desc: "Analyze your business data and generate automated PDF/Excel reports." },
        { title: "WhatsApp & Telegram Bots", desc: "Custom chatbots for customer support and lead collection." },
      ],
      benefits: ["Clean, documented, maintainable code", "Free support for 30 days after delivery", "Source code ownership — yours forever", "Regular progress updates", "Works on Windows, Mac, and Linux", "Deployment on cloud if needed", "Video walkthrough of the tool", "Scalable solutions"],
      faqs: [
        { q: "What kind of Python projects do you take?", a: "Automation scripts, data analysis, web scraping, REST APIs, dashboards, and bots." },
        { q: "How much does a Python project cost?", a: "Simple scripts start from ₹5,000. Complex projects range from ₹20,000-80,000." },
        { q: "How long does a Python project take?", a: "Simple scripts: 2-5 days. Medium: 1-2 weeks. Complex: 3-6 weeks." },
        { q: "Do I need technical knowledge to use the tool?", a: "No! We build tools with simple interfaces and provide full training." },
      ],
    },
  ],
};

export function getContent(): SiteContent {
  if (typeof window === "undefined") return defaultContent;
  try {
    const stored = localStorage.getItem("Clickbriz_content");
    if (!stored) return defaultContent;
    const parsed = JSON.parse(stored);
    return {
      ...defaultContent,
      ...parsed,
      blogPosts: parsed.blogPosts || defaultContent.blogPosts,
      servicePages: parsed.servicePages || defaultContent.servicePages,
    };
  } catch { return defaultContent; }
}

export function saveContent(content: SiteContent): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("Clickbriz_content", JSON.stringify(content));
}

export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem("Clickbriz_admin") === "true";
}

export function adminLogin(password: string): boolean {
  const ADMIN_PASSWORD = "Clickbriz@admin123";
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem("Clickbriz_admin", "true");
    return true;
  }
  return false;
}

export function adminLogout(): void {
  sessionStorage.removeItem("Clickbriz_admin");
}
