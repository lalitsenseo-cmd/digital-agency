// ─── SEO Data Types ───────────────────────────────────────
export interface PageSEO {
  id: string
  url: string
  title: string
  description: string
  keyword: string
  canonical: string
  robots: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  schema: string
  content: string
  status: 'published' | 'draft'
  lastModified: string
}

export interface SiteSettings {
  siteName: string
  tagline: string
  siteUrl: string
  separator: string
  indexSite: boolean
  followLinks: boolean
  gscVerification: string
  analyticsId: string
}

// ─── Default Page SEO Data ─────────────────────────────────
export const defaultPages: PageSEO[] = [
  {
    id: 'home',
    url: '/',
    title: 'Clickbriz Digital — SEO, Ads, Web & Python Agency | Faridabad',
    description: 'Top-rated digital marketing agency in Faridabad. SEO, Google Ads, Social Media, Website Development and Python Automation for Indian businesses.',
    keyword: 'digital marketing agency faridabad',
    canonical: 'https://Clickbriz-digital-psi.vercel.app/',
    robots: 'index,follow',
    ogTitle: 'Clickbriz Digital — Digital Marketing That Works',
    ogDescription: 'SEO, Google Ads, Social Media & Python Automation for Indian businesses.',
    ogImage: '/og-home.jpg',
    schema: 'Organization',
    content: '',
    status: 'published',
    lastModified: new Date().toISOString(),
  },
  {
    id: 'seo-services',
    url: '/seo-services',
    title: 'SEO Services Faridabad — Rank Higher on Google | Clickbriz Digital',
    description: 'Expert SEO services in Faridabad — on-page, off-page, technical SEO and local SEO strategies to grow your organic traffic and generate more leads.',
    keyword: 'seo services faridabad',
    canonical: 'https://Clickbriz-digital-psi.vercel.app/seo-services',
    robots: 'index,follow',
    ogTitle: 'SEO Services Faridabad | Clickbriz Digital',
    ogDescription: 'Grow organic traffic with expert SEO services in Faridabad.',
    ogImage: '/og-seo.jpg',
    schema: 'Service',
    content: '',
    status: 'published',
    lastModified: new Date().toISOString(),
  },
  {
    id: 'google-ads',
    url: '/google-ads',
    title: 'Google Ads PPC Agency Faridabad — Real Leads & Sales | Clickbriz',
    description: 'ROI-focused Google Ads and Meta Ads management. Smart bidding, landing page optimization, and transparent reporting for maximum ROAS.',
    keyword: 'google ads agency faridabad',
    canonical: 'https://Clickbriz-digital-psi.vercel.app/google-ads',
    robots: 'index,follow',
    ogTitle: 'Google Ads Agency Faridabad | Clickbriz Digital',
    ogDescription: 'ROI-focused PPC campaigns that bring real leads and sales.',
    ogImage: '/og-ads.jpg',
    schema: 'Service',
    content: '',
    status: 'published',
    lastModified: new Date().toISOString(),
  },
  {
    id: 'social-media-marketing',
    url: '/social-media-marketing',
    title: 'Social Media Marketing Faridabad — Instagram Facebook | Clickbriz',
    description: 'Build your brand on Instagram, Facebook and LinkedIn with strategic content and paid campaigns by Clickbriz Digital.',
    keyword: 'social media marketing faridabad',
    canonical: 'https://Clickbriz-digital-psi.vercel.app/social-media-marketing',
    robots: 'index,follow',
    ogTitle: 'Social Media Marketing | Clickbriz Digital',
    ogDescription: 'Build your brand on Instagram, Facebook & LinkedIn.',
    ogImage: '/og-smm.jpg',
    schema: 'Service',
    content: '',
    status: 'published',
    lastModified: new Date().toISOString(),
  },
  {
    id: 'website-development',
    url: '/website-development',
    title: 'Website Development Faridabad — Next.js WordPress | Clickbriz',
    description: 'Fast, beautiful websites built with Next.js, React and WordPress. E-commerce, landing pages and corporate sites for businesses across India.',
    keyword: 'website development faridabad',
    canonical: 'https://Clickbriz-digital-psi.vercel.app/website-development',
    robots: 'index,follow',
    ogTitle: 'Website Development Faridabad | Clickbriz Digital',
    ogDescription: 'Fast, SEO-optimised websites with Next.js & WordPress.',
    ogImage: '/og-web.jpg',
    schema: 'Service',
    content: '',
    status: 'published',
    lastModified: new Date().toISOString(),
  },
  {
    id: 'python-development',
    url: '/python-development',
    title: 'Python Development — Automation Dashboards APIs | Clickbriz Digital',
    description: 'Custom Python automation, Streamlit dashboards, web scrapers and REST APIs to streamline business operations and save hours every week.',
    keyword: 'python automation development india',
    canonical: 'https://Clickbriz-digital-psi.vercel.app/python-development',
    robots: 'index,follow',
    ogTitle: 'Python Development & Automation | Clickbriz Digital',
    ogDescription: 'Custom Python scripts, dashboards and APIs for your business.',
    ogImage: '/og-python.jpg',
    schema: 'Service',
    content: '',
    status: 'published',
    lastModified: new Date().toISOString(),
  },
  {
    id: 'blog',
    url: '/blog',
    title: 'Digital Marketing Blog — SEO Tips & Strategies | Clickbriz Digital',
    description: 'Latest tips, case studies and insights on SEO, Google Ads, social media and web development from Clickbriz Digital Faridabad.',
    keyword: 'digital marketing blog india',
    canonical: 'https://Clickbriz-digital-psi.vercel.app/blog',
    robots: 'index,follow',
    ogTitle: 'Digital Marketing Blog | Clickbriz Digital',
    ogDescription: 'SEO tips, Google Ads strategies and marketing insights.',
    ogImage: '/og-blog.jpg',
    schema: 'Blog',
    content: '',
    status: 'published',
    lastModified: new Date().toISOString(),
  },
  {
    id: 'about',
    url: '/about',
    title: 'About Clickbriz Digital — Founded by Lalit Sen | Faridabad Agency',
    description: 'Learn about Clickbriz Digital, a results-driven digital marketing agency in Faridabad founded by Lalit Sen helping businesses grow online.',
    keyword: 'about Clickbriz digital lalit sen faridabad',
    canonical: 'https://Clickbriz-digital-psi.vercel.app/about',
    robots: 'index,follow',
    ogTitle: 'About Clickbriz Digital | Lalit Sen',
    ogDescription: 'Results-driven digital marketing agency in Faridabad.',
    ogImage: '/og-about.jpg',
    schema: 'Organization',
    content: '',
    status: 'published',
    lastModified: new Date().toISOString(),
  },
  {
    id: 'contact',
    url: '/contact',
    title: 'Contact Clickbriz Digital — Free Consultation | Faridabad',
    description: 'Get a free digital marketing consultation from Clickbriz Digital. Contact us on WhatsApp, email or phone — based in Faridabad.',
    keyword: 'contact Clickbriz digital faridabad',
    canonical: 'https://Clickbriz-digital-psi.vercel.app/contact',
    robots: 'index,follow',
    ogTitle: 'Contact Clickbriz Digital | Free Consultation',
    ogDescription: 'Get a free consultation from our Faridabad digital marketing team.',
    ogImage: '/og-contact.jpg',
    schema: 'LocalBusiness',
    content: '',
    status: 'published',
    lastModified: new Date().toISOString(),
  },
]

export const defaultSettings: SiteSettings = {
  siteName: 'Clickbriz Digital',
  tagline: 'Digital Marketing Agency in Faridabad',
  siteUrl: 'https://Clickbriz-digital-psi.vercel.app',
  separator: '—',
  indexSite: true,
  followLinks: true,
  gscVerification: '',
  analyticsId: '',
}

// ─── SEO Score Calculator ──────────────────────────────────
export function calcSEOScore(page: PageSEO): number {
  let score = 0
  const tl = page.title.length
  const dl = page.description.length

  if (tl >= 50 && tl <= 65) score += 25
  else if (tl > 0) score += 8

  if (dl >= 120 && dl <= 160) score += 25
  else if (dl > 0) score += 8

  const kw = page.keyword.toLowerCase().split(' ')[0]
  if (kw && page.title.toLowerCase().includes(kw)) score += 20
  if (kw && page.description.toLowerCase().includes(kw)) score += 15

  if (page.canonical) score += 10
  if (page.robots.includes('index')) score += 5

  return Math.min(score, 100)
}

// ─── Generate XML Sitemap ──────────────────────────────────
export function generateSitemap(pages: PageSEO[], baseUrl: string): string {
  const date = new Date().toISOString().split('T')[0]
  const urls = pages
    .filter(p => p.robots.includes('index'))
    .map(p => `  <url>
    <loc>${baseUrl}${p.url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${p.url === '/' ? '1.0' : '0.8'}</priority>
  </url>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}

// ─── Generate Robots.txt ───────────────────────────────────
export function generateRobots(baseUrl: string): string {
  return `User-agent: *
Allow: /

Disallow: /admin/
Disallow: /api/
Disallow: /_next/

Sitemap: ${baseUrl}/sitemap.xml`
}
