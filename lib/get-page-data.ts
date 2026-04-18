import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface PageData {
  id: string;
  url: string;
  title: string;
  description: string;
  keyword: string;
  canonical: string;
  robots: string;
  og_title: string;
  og_description: string;
  og_image: string;
  content: string;
}

export async function getPageData(pageId: string): Promise<PageData | null> {
  try {
    const { data, error } = await supabase
      .from('seo_pages')
      .select('*')
      .eq('id', pageId)
      .single();
    if (error || !data) return null;
    return data as PageData;
  } catch {
    return null;
  }
}

export function buildMetadata(page: PageData | null, fallback: { title: string; description: string }) {
  if (!page) return { title: fallback.title, description: fallback.description };
  return {
    title: page.title || fallback.title,
    description: page.description || fallback.description,
    alternates: { canonical: page.canonical },
    robots: page.robots || 'index,follow',
    openGraph: {
      title: page.og_title || page.title,
      description: page.og_description || page.description,
    },
  };
}