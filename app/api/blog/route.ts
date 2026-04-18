import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

// GET — saare posts fetch karo
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false })

    if (error) throw error
    return NextResponse.json({ success: true, data: data || [] })
  } catch (error) {
    console.error('Blog GET error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch' }, { status: 500 })
  }
}

// POST — create ya update
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, payload } = body

    if (type === 'CREATE') {
      const { error } = await supabaseAdmin.from('blog_posts').insert({
        id: payload.id || `post-${Date.now()}`,
        title: payload.title,
        slug: payload.slug,
        category: payload.category,
        description: payload.description,
        content: payload.content,
        cover_image: payload.cover_image || null,
        author: payload.author || 'Lalit Sen',
        published: payload.published ?? true,
        published_at: payload.published_at || new Date().toISOString(),
      })
      if (error) throw error
      revalidatePath('/blog')
      revalidatePath(`/blog/${payload.slug}`)
    }

    if (type === 'UPDATE') {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title: payload.title,
          slug: payload.slug,
          category: payload.category,
          description: payload.description,
          content: payload.content,
          cover_image: payload.cover_image || null,
          author: payload.author,
          published: payload.published,
        })
        .eq('id', payload.id)
      if (error) throw error
      revalidatePath('/blog')
      revalidatePath(`/blog/${payload.slug}`)
    }

    if (type === 'DELETE') {
      const { error } = await supabaseAdmin.from('blog_posts').delete().eq('id', payload.id)
      if (error) throw error
      revalidatePath('/blog')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Blog POST error:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}