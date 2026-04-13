// app/api/sitemap/route.ts
// ─────────────────────────────────────────────
// Yeh route /api/sitemap pe XML sitemap return karta hai
// Aap next.config.ts mein redirect bhi laga sakte ho:
//   /sitemap.xml → /api/sitemap
// ─────────────────────────────────────────────

import { NextResponse } from 'next/server'
import { defaultPages, generateSitemap } from '@/lib/seo-data'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexgen-digital-psi.vercel.app'
  const sitemap = generateSitemap(defaultPages, baseUrl)

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
