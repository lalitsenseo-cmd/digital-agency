import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { getServicePage, getServicePageSlugs } from "@/lib/service-pages";

// Sirf in slugs ke pages banenge; baaki sab routes pehle jaise chalte rahenge.
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getServicePageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = await getServicePage(params.slug);
  if (!page) return { title: "Page Not Found" };
  const seo = page.seo || {};
  const title = seo.metaTitle || page.title;
  const description = seo.metaDescription || page.heroDesc || "";
  const canonical = seo.canonical || `https://www.clickbriz.com/${params.slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    robots: seo.noindex ? "noindex,nofollow" : "index,follow",
    openGraph: {
      title,
      description,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
  };
}

export default async function DynamicServicePage({ params }: { params: { slug: string } }) {
  const page = await getServicePage(params.slug);
  if (!page || !page.published) notFound();

  return <ServicePageTemplate data={page} />;
}
