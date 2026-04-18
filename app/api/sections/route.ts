import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

// GET all sections
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('site_sections')
      .select('*')
      .order('page_slug', { ascending: true });
    if (error) throw error;
    return NextResponse.json({ success: true, data: data || [] });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

// POST - update section
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, data: sectionData, page_slug } = body;

    if (!id || !sectionData) {
      return NextResponse.json({ success: false, error: 'Missing id or data' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('site_sections')
      .update({ data: sectionData })
      .eq('id', id);

    if (error) throw error;

    // Revalidate the affected page
    if (page_slug === 'home') {
      revalidatePath('/');
    } else if (page_slug) {
      revalidatePath(`/${page_slug}`);
    }
    revalidatePath('/', 'layout');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}