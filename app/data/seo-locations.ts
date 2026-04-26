// app/_data/seo-locations.ts
// Naye cities add karne ke liye bas yahan add karo

export type SeoLocation = {
  slug: string;          // URL mein use hoga: /seo-services/faridabad
  city: string;          // Display name
  state: string;
  nearby?: string[];     // Nearby areas for content
  population?: string;
  businessHubs?: string[];
};

export const seoLocations: SeoLocation[] = [
  {
    slug: "seo-services-in-faridabad",
    city: "Faridabad",
    state: "Haryana",
    nearby: ["Ballabgarh", "NIT Faridabad", "Sector 15", "Old Faridabad"],
    population: "1.8M+",
    businessHubs: ["Sector 20-21 Industrial Area", "NHPC Chowk", "Crown Interiorz Mall"],
  },
  {
    slug: "seo-services-in-noida",
    city: "Noida",
    state: "Uttar Pradesh",
    nearby: ["Greater Noida", "Noida Extension", "Sector 62", "Sector 18"],
    population: "640K+",
    businessHubs: ["Sector 62 IT Hub", "Sector 18 Market", "Film City"],
  },
  {
    slug: "seo-services-in-delhi",
    city: "Delhi",
    state: "Delhi",
    nearby: ["Connaught Place", "Karol Bagh", "Lajpat Nagar", "Dwarka"],
    population: "20M+",
    businessHubs: ["Connaught Place", "Nehru Place IT Market", "Okhla Industrial Area"],
  },
  {
    slug: "seo-services-in-delhi-ncr",
    city: "Delhi/NCR",
    state: "Delhi NCR",
    nearby: ["Noida", "Gurgaon", "Faridabad", "Ghaziabad"],
    population: "46M+",
    businessHubs: ["Cyber City Gurgaon", "Noida Sector 62", "Connaught Place"],
  },
  {
    slug: "seo-services-in-ballabgarh",
    city: "Ballabgarh",
    state: "Haryana",
    nearby: ["Faridabad", "Palwal", "Sector 3 Ballabgarh"],
    population: "150K+",
    businessHubs: ["Ballabgarh Industrial Estate", "Main Market Ballabgarh"],
  },
  {
    slug: "seo-services-in-naharpar-faridabad",
    city: "Naharpar Faridabad",
    state: "Haryana",
    nearby: ["Greater Faridabad", "Tigaon", "Sector 121"],
    population: "200K+",
    businessHubs: ["Omaxe World Street", "Ansal Plaza Naharpar"],
  },
  {
    slug: "seo-services-in-gurgaon",
    city: "Gurgaon",
    state: "Haryana",
    nearby: ["Cyber City", "MG Road", "Sohna Road", "Golf Course Road"],
    population: "1.5M+",
    businessHubs: ["Cyber City", "Udyog Vihar", "DLF Cyber Hub"],
  },
  {
    slug: "seo-services-in-ghaziabad",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    nearby: ["Indirapuram", "Vaishali", "Raj Nagar Extension"],
    population: "1.6M+",
    businessHubs: ["Mohan Nagar Industrial Area", "GT Road Business District"],
  },
  // ── Add karte raho as many as you want ──
];

// Slug se location find karo
export function getLocationBySlug(slug: string): SeoLocation | undefined {
  return seoLocations.find(l => l.slug === slug);
}

// generateStaticParams ke liye
export function getAllLocationSlugs() {
  return seoLocations.map(l => ({ location: l.slug }));
}