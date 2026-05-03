import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { AdminProvider } from "@/context/AdminContext";
import AdminBar from "@/components/AdminBar";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Exitintentpopup from "@/components/Exitintentpopup";

export const metadata: Metadata = {
  title: "Clickbriz Digital — SEO, Ads, Web & Python Development Agency in Faridabad",
  description: "Clickbriz Digital is a results-driven digital marketing agency in Faridabad.",
};

const GA_ID = "G-YE1CKM6JVQ";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Clickbriz Digital Marketing Agency",
      "image": "https://www.clickbriz.com/logo.png",
      "url": "https://www.clickbriz.com",
      "telephone": "+918527004901",
      "email": "clickbriz@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Faridabad",
        "addressLocality": "Faridabad",
        "addressRegion": "Haryana",
        "postalCode": "121001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.4089,
        "longitude": 77.3178
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
          "opens": "10:00",
          "closes": "19:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "10:00",
          "closes": "17:00"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/clickbriz",
        "https://www.instagram.com/clickbriz"
      ],
      "priceRange": "₹₹",
      "servesCuisine": null,
      "areaServed": [
        "Faridabad", "Delhi", "Noida", "Gurgaon", "Ghaziabad", "Ballabgarh"
      ]
    })
  }}
/>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body>
        <AdminProvider>
          <TopBar />
          <Navbar />
          {children}
          <AdminBar />
          <Exitintentpopup/>
        </AdminProvider>
      </body>
    </html>
  );
}