// 📁 src/lib/get-blog-posts.ts
// Yeh file aapke existing get-blog-posts.ts ko replace karegi
// Naya function: getRelatedBlogPosts() add hua hai

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  author: string;
  cover_image?: string;
  published_at: string;
  created_at?: string;
}

// Existing function — single post fetch
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }

  return data;
}

// ✨ NEW FUNCTION — related posts fetch karne ke liye
export async function getRelatedBlogPosts(
  category: string,
  currentSlug: string,
  limit: number = 3
): Promise<BlogPost[]> {
  // Pehle same category ke posts try karein
  const { data: sameCategory, error: err1 } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("category", category)
    .neq("slug", currentSlug)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (err1) {
    console.error("Error fetching related posts:", err1);
    return [];
  }

  // Agar same category mein kafi posts hain toh wahi return karein
  if (sameCategory && sameCategory.length >= limit) {
    return sameCategory;
  }

  // Warna baaki posts se fill karein
  const existingSlugs = [currentSlug, ...(sameCategory?.map(p => p.slug) || [])];
  const remaining = limit - (sameCategory?.length || 0);

  const { data: otherPosts, error: err2 } = await supabase
    .from("blog_posts")
    .select("*")
    .not("slug", "in", `(${existingSlugs.map(s => `"${s}"`).join(",")})`)
    .order("published_at", { ascending: false })
    .limit(remaining);

  if (err2) {
    console.error("Error fetching other posts:", err2);
    return sameCategory || [];
  }

  return [...(sameCategory || []), ...(otherPosts || [])];
}

// Optional: Get all blog posts (for blog listing page)
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching all posts:", error);
    return [];
  }

  return data || [];
}