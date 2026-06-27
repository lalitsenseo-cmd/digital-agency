// ───────────────────────────────────────────────────────────────
// Internal pages list — rich editor ke link-picker me yeh dropdown
// dikhti hai. Naya page add karna ho to bas niche ek line jod do:
//   { label: "Page ka naam", path: "/page-url", group: "Services" },
// ───────────────────────────────────────────────────────────────

export type InternalPage = {
  label: string;
  path: string;
  group: string;
};

export const internalPages: InternalPage[] = [
  // Main pages
  { label: "Home", path: "/", group: "Main" },
  { label: "About", path: "/about", group: "Main" },
  { label: "Contact", path: "/contact", group: "Main" },
  { label: "Blog", path: "/blog", group: "Main" },

  // Services
  { label: "SEO Services", path: "/seo-services", group: "Services" },
  { label: "Technical SEO", path: "/technical-seo", group: "Services" },
  { label: "Local SEO", path: "/local-seo", group: "Services" },
  { label: "Amazon SEO", path: "/amazon-seo", group: "Services" },
  { label: "Ecommerce SEO", path: "/ecommerce-seo", group: "Services" },
  { label: "SEO Audit", path: "/seo-audit", group: "Services" },
  { label: "Google Ads", path: "/google-ads", group: "Services" },
  { label: "Meta Ads", path: "/meta-ads", group: "Services" },
  { label: "YouTube Ads", path: "/youtube-ads", group: "Services" },
  { label: "Ecommerce PPC", path: "/ecommerce-ppc", group: "Services" },
  { label: "Social Media Marketing", path: "/social-media-marketing", group: "Services" },
  { label: "Instagram Marketing", path: "/instagram-marketing", group: "Services" },
  { label: "Website Development", path: "/website-development", group: "Services" },
  { label: "WordPress Development", path: "/wordpress-development", group: "Services" },
  { label: "Ecommerce Development", path: "/ecommerce-development", group: "Services" },
  { label: "Python Development", path: "/python-development", group: "Services" },
  { label: "Content Writing", path: "/content-writing", group: "Services" },
  { label: "Branding", path: "/branding", group: "Services" },

  // Location pages
  { label: "SEO Services in Delhi", path: "/seo-services-in-delhi", group: "Locations" },
  { label: "SEO Services in Delhi NCR", path: "/seo-services-in-delhi-ncr", group: "Locations" },
  { label: "SEO Services in Faridabad", path: "/seo-services-in-faridabad", group: "Locations" },
  { label: "SEO Services in Gurgaon", path: "/seo-services-in-gurgaon", group: "Locations" },
  { label: "SEO Services in Noida", path: "/seo-services-in-noida", group: "Locations" },
  { label: "SEO Services in Ghaziabad", path: "/seo-services-in-gaziabad", group: "Locations" },
  { label: "SEO Services in Ballabgarh", path: "/seo-services-in-ballabgarh", group: "Locations" },
];