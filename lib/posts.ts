import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../keystatic.config";
import Markdoc from "@markdoc/markdoc";

const reader = createReader(process.cwd(), keystaticConfig);

export type PostSeo = {
  focusKeyword?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
};

export type PostMeta = {
  slug: string;
  title: string;
  category: string;
  description: string;
  author: string;
  coverImage: string | null;
  publishedDate: string;
  published: boolean;
  faqs?: { question: string; answer: string }[];
  seo?: PostSeo;
};

export type FullPost = PostMeta & { contentHtml: string };

function toMeta(slug: string, entry: any): PostMeta {
  return {
    slug,
    title: typeof entry.title === "string" ? entry.title : entry.title?.name ?? slug,
    category: entry.category ?? "SEO",
    description: entry.description ?? "",
    author: entry.author ?? "",
    coverImage: entry.coverImage ?? null,
    publishedDate: entry.publishedDate ?? "",
    published: entry.published ?? false,
    faqs: Array.isArray(entry.faqs)
      ? entry.faqs.filter((f: any) => f?.question && f?.answer).map((f: any) => ({ question: f.question, answer: f.answer }))
      : [],
    seo: entry.seo ?? {},
  };
}

// Sirf published posts, newest first
export async function getAllPosts(): Promise<PostMeta[]> {
  const all = await reader.collections.posts.all();
  return all
    .map((p) => toMeta(p.slug, p.entry))
    .filter((p) => p.published)
    .sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1));
}

export async function getPostSlugs(): Promise<string[]> {
  return reader.collections.posts.list();
}

export async function getPostBySlug(slug: string): Promise<FullPost | null> {
  const entry = await reader.collections.posts.read(slug);
  if (!entry) return null;

  const { node } = await entry.content();
  const errors = Markdoc.validate(node);
  if (errors.length) {
    console.error("Markdoc errors in", slug, errors);
  }
  const renderable = Markdoc.transform(node);
  const contentHtml = Markdoc.renderers.html(renderable);

  return { ...toMeta(slug, entry), contentHtml };
}

export async function getRelatedPosts(
  category: string,
  currentSlug: string,
  limit = 3
): Promise<PostMeta[]> {
  const all = await getAllPosts();
  const same = all.filter((p) => p.category === category && p.slug !== currentSlug);
  if (same.length >= limit) return same.slice(0, limit);
  const others = all.filter((p) => p.slug !== currentSlug && !same.includes(p));
  return [...same, ...others].slice(0, limit);
}
