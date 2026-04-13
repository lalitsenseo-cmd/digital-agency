// app/api/seo/route.ts
// ─────────────────────────────────────────────────────────────
// Yeh API route SEO data ko read/write karta hai
// GET  → /api/seo         → saare pages ka SEO data return karta hai
// POST → /api/seo         → page ka SEO data update karta hai
//
// NOTE: Vercel par file system write nahi hota (read-only)
// Isliye production mein Vercel KV ya MongoDB use karein.
// Local development ke liye file system kaam karta hai.
// ─────────────────────────────────────────────────────────────

import { NextResponse } from 'next/server'
import { defaultPages, defaultSettings } from '@/lib/seo-data'

// In-memory store (development ke liye)
// Production mein → Vercel KV / MongoDB / Supabase use karein
let seoStore = {
  pages: [...defaultPages],
  settings: { ...defaultSettings },
  robotsTxt: `User-agent: *\nAllow: /\n\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: https://nexgen-digital-psi.vercel.app/sitemap.xml`,
}

// GET → seo data fetch karo
export async function GET() {
  return NextResponse.json({
    success: true,
    data: seoStore,
  })
}

// POST → seo data update karo
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, payload } = body

    switch (type) {
      case 'UPDATE_PAGE':
        const pageIndex = seoStore.pages.findIndex(p => p.id === payload.id)
        if (pageIndex !== -1) {
          seoStore.pages[pageIndex] = {
            ...seoStore.pages[pageIndex],
            ...payload,
            lastModified: new Date().toISOString(),
          }
        }
        break

      case 'UPDATE_SETTINGS':
        seoStore.settings = { ...seoStore.settings, ...payload }
        break

      case 'UPDATE_ROBOTS':
        seoStore.robotsTxt = payload.robotsTxt
        break

      case 'UPDATE_CONTENT':
        const contentIndex = seoStore.pages.findIndex(p => p.id === payload.id)
        if (contentIndex !== -1) {
          seoStore.pages[contentIndex].content = payload.content
          seoStore.pages[contentIndex].lastModified = new Date().toISOString()
        }
        break

      default:
        return NextResponse.json({ success: false, error: 'Unknown type' }, { status: 400 })
    }

    return NextResponse.json({ success: true, data: seoStore })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
