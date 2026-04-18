import { supabase } from '@/lib/supabase';

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  content: string;
  cover_image: string | null;
  author: string;
  published: boolean;
  published_at: string;
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('getBlogPosts error:', error);
    return [];
  }
  return (data as BlogPost[]) || [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) return null;
  return data as BlogPost;
}