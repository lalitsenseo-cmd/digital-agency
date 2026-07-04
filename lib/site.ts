// ── Click Briz business info — schema (structured data) yahan se banta hai ──
// Kuch fields (street address, postal code, hours) abhi placeholder hain —
// inhe apne asli details se bhar dena to schema aur strong ho jaayega.

export const SITE = {
  url: "https://www.clickbriz.com",
  name: "Clickbriz Digital",
  legalName: "Click Briz Digital Agency",
  description:
    "Click Briz is a digital marketing agency in Faridabad offering SEO, Google Ads, social media marketing, and website development to help businesses grow online.",
  logo: "https://www.clickbriz.com/logo.png",
  image: "https://www.clickbriz.com/SEO_Services_Click_Briz.jpg",
  telephone: "+91-85270-04901",
  email: "clickbriz@gmail.com",
  priceRange: "₹₹",
  founderName: "Lalit Sen",
  // Address — streetAddress aur postalCode apne asli se bhar dena
  address: {
    streetAddress: "", // jaise: "Sector 16, Near XYZ"
    addressLocality: "Faridabad",
    addressRegion: "Haryana",
    postalCode: "", // jaise: "121002"
    addressCountry: "IN",
  },
  geo: {
    latitude: 28.4089, // Faridabad approx — apne exact se badal sakte ho
    longitude: 77.3178,
  },
  areaServed: ["Faridabad", "Delhi NCR", "Delhi", "Noida", "Gurgaon", "Ghaziabad", "Ballabgarh"],
  sameAs: [
    "https://www.facebook.com/profile.php?id=61562934023885",
    "https://www.instagram.com/click_briz_digital_marketing/",
    "https://www.linkedin.com/company/clickbriz/",
    "https://www.youtube.com/@clickbriz",
  ],
};
