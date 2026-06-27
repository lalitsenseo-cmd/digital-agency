import React from "react";
import { SITE } from "./site";

// Undefined/empty values hata deta hai (saaf JSON ke liye)
function clean<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj, (_k, v) => (v === "" || v == null ? undefined : v)));
}

// ── Reusable nodes ──
export function localBusinessNode() {
  const a = SITE.address;
  return {
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#localbusiness`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    image: SITE.image,
    logo: SITE.logo,
    description: SITE.description,
    telephone: SITE.telephone,
    email: SITE.email,
    priceRange: SITE.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: a.streetAddress,
      addressLocality: a.addressLocality,
      addressRegion: a.addressRegion,
      postalCode: a.postalCode,
      addressCountry: a.addressCountry,
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.latitude, longitude: SITE.geo.longitude },
    areaServed: SITE.areaServed.map((n) => ({ "@type": "City", name: n })),
    founder: { "@type": "Person", name: SITE.founderName },
    sameAs: SITE.sameAs,
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#localbusiness` },
    inLanguage: "en-IN",
  };
}

export function breadcrumbNode(pageUrl: string, items: { name: string; url?: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.url ? { item: it.url } : {}),
    })),
  };
}

export function webPageNode(opts: {
  url: string; name: string; description?: string; type?: string; hasBreadcrumb?: boolean;
}) {
  return {
    "@type": opts.type || "WebPage",
    "@id": opts.url,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    inLanguage: "en-IN",
    ...(opts.hasBreadcrumb ? { breadcrumb: { "@id": `${opts.url}#breadcrumb` } } : {}),
  };
}

export function serviceNode(opts: {
  url: string; name: string; serviceType: string; description?: string; areaServed?: string;
}) {
  return {
    "@type": "Service",
    "@id": `${opts.url}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: opts.url,
    provider: { "@id": `${SITE.url}/#localbusiness` },
    areaServed: opts.areaServed
      ? { "@type": "City", name: opts.areaServed }
      : SITE.areaServed.map((n) => ({ "@type": "City", name: n })),
  };
}

export function faqNode(pageUrl: string, faqs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

// ── JsonLd component — @graph ko ek script tag me render karta hai ──
export function JsonLd({ graph }: { graph: any[] }) {
  const data = clean({ "@context": "https://schema.org", "@graph": graph });
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
