import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { AdminProvider } from "@/context/AdminContext";
import AdminBar from "@/components/AdminBar";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Clickbriz Digital — SEO, Ads, Web & Python Development Agency in Faridabad",
  description: "Clickbriz Digital is a results-driven digital marketing agency in Faridabad. We provide SEO, Google Ads, Social Media Marketing, Website Development and Python automation services.",
};

const GA_ID = "G-YE1CKM6JVQ";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
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
        </AdminProvider>
      </body>
    </html>
  );
}