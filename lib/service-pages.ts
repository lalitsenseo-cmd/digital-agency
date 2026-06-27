import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../keystatic.config";
import Markdoc from "@markdoc/markdoc";
import type { ServicePageData } from "../components/ServicePageTemplate";

const reader = createReader(process.cwd(), keystaticConfig);

export type ServicePageSeo = {
  focusKeyword?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
};

export type ServicePageFull = ServicePageData & {
  slug: string;
  title: string;
  published: boolean;
  seo?: ServicePageSeo;
};

export async function getServicePageSlugs(): Promise<string[]> {
  return reader.collections.servicePages.list();
}

export async function getServicePage(slug: string): Promise<ServicePageFull | null> {
  const entry = await reader.collections.servicePages.read(slug);
  if (!entry) return null;

  const { node } = await entry.content();
  const contentHtml = Markdoc.renderers.html(Markdoc.transform(node));

  const e = entry as any;
  return {
    slug,
    title: typeof e.title === "string" ? e.title : e.title?.name ?? slug,
    published: e.published ?? false,
    locationName: e.locationName || "",
    serviceType: e.serviceType || "SEO",
    pageTitle: e.pageTitle || "",
    breadcrumbParentLabel: e.breadcrumbParentLabel || "",
    breadcrumbParentHref: e.breadcrumbParentHref || "",
    heroBadge: e.heroBadge || "",
    heroTitle: e.heroTitle || "",
    heroAccent: e.heroAccent || "",
    heroDesc: e.heroDesc || "",
    heroImage: e.heroImage || "",
    contentHtml,
    faqs: Array.isArray(e.faqs) ? e.faqs.filter((f: any) => f?.question && f?.answer).map((f: any) => ({ question: f.question, answer: f.answer })) : [],
    stats: e.stats || [],
    features: e.features || [],
    servicesList: e.servicesList || [],
    areasList: e.areasList || [],
    timelineList: e.timelineList || [],
    ctaCardHeading: e.ctaCardHeading || "",
    ctaCardText: e.ctaCardText || "",
    bottomCtaHeading: e.bottomCtaHeading || "",
    bottomCtaText: e.bottomCtaText || "",
    seo: e.seo || {},
  };
}
