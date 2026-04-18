// app/api/seo/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { defaultPages, defaultSettings } from '@/lib/seo-data'
import { revalidatePath } from 'next/cache'

// GET — saara SEO data fetch karo
export async function GET() {
  try {
    // Pages fetch karo
    const { data: pages, error: pagesError } = await supabase
      .from('seo_pages')
      .select('*')

    // Settings fetch karo
    const { data: settingsArr, error: settingsError } = await supabase
      .from('seo_settings')
      .select('*')
      .eq('id', 1)
      .single()

    // Agar pehli baar hai toh default data insert karo
    if (!pages || pages.length === 0) {
      await supabase.from('seo_pages').insert(
        defaultPages.map(p => ({
          id: p.id,
          url: p.url,
          title: p.title,
          description: p.description,
          keyword: p.keyword,
          canonical: p.canonical,
          robots: p.robots,
          og_title: p.ogTitle,
          og_description: p.ogDescription,
          og_image: p.ogImage,
          schema: p.schema,
          content: p.content,
          status: p.status,
        }))
      )
    }

    if (!settingsArr) {
      await supabase.from('seo_settings').insert({
        id: 1,
        site_name: defaultSettings.siteName,
        tagline: defaultSettings.tagline,
        site_url: defaultSettings.siteUrl,
        separator: defaultSettings.separator,
        robots_txt: `User-agent: *\nAllow: /\n\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: ${defaultSettings.siteUrl}/sitemap.xml`,
        gsc_verification: '',
        analytics_id: '',
      })
    }

    // Fresh data return karo
    const { data: freshPages } = await supabase.from('seo_pages').select('*')
    const { data: freshSettings } = await supabase.from('seo_settings').select('*').eq('id', 1).single()

    return NextResponse.json({
      success: true,
      data: {
        pages: freshPages || defaultPages,
        settings: freshSettings || defaultSettings,
      }
    })

  } catch (error) {
    console.error('GET error:', error)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}

// POST — data update karo
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, payload } = body

    if (type === 'UPDATE_PAGE') {
      const { error } = await supabase
        .from('seo_pages')
        .update({
          title: payload.title,
          description: payload.description,
          keyword: payload.keyword,
          canonical: payload.canonical,
          robots: payload.robots,
          og_title: payload.ogTitle,
          og_description: payload.ogDescription,
          og_image: payload.ogImage,
          last_modified: new Date().toISOString(),
        })
        .eq('id', payload.id)

      if (error) throw error
      revalidatePath(payload.url || '/')
      revalidatePath('/', 'layout')
    }

    if (type === 'UPDATE_CONTENT') {
      const { error } = await supabase
        .from('seo_pages')
        .update({
          content: payload.content,
          status: payload.status || 'published',
          last_modified: new Date().toISOString(),
        })
        .eq('id', payload.id)

      if (error) throw error
      const { data: pageData } = await supabase.from('seo_pages').select('url').eq('id', payload.id).single()
      revalidatePath(pageData?.url || '/')
      revalidatePath('/', 'layout')
    }

    if (type === 'UPDATE_SETTINGS') {
      const { error } = await supabase
        .from('seo_settings')
        .upsert({
          id: 1,
          site_name: payload.siteName,
          tagline: payload.tagline,
          site_url: payload.siteUrl,
          separator: payload.separator,
          gsc_verification: payload.gscVerification,
          analytics_id: payload.analyticsId,
        })

      if (error) throw error
      revalidatePath('/', 'layout')
    }

    if (type === 'UPDATE_ROBOTS') {
      const { error } = await supabase
        .from('seo_settings')
        .update({ robots_txt: payload.robotsTxt })
        .eq('id', 1)

      if (error) throw error
      revalidatePath('/robots.txt')
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('POST error:', error)
    return NextResponse.json({ success: false, error: 'Save failed' }, { status: 500 })
  }
}
