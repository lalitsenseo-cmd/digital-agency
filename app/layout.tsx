import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { AdminProvider } from "@/context/AdminContext";
import { SiteHeader, SiteExtras } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Clickbriz Digital — SEO, Ads, Web & Python Development Agency in Faridabad",
  description: "Clickbriz Digital is a results-driven digital marketing agency in Faridabad.",
  icons: {
    icon: "/favicon.ico",        // ✅ YE ADD KARO
    shortcut: "/favicon.ico",    // ✅ YE ADD KARO
    apple: "/favicon.ico",       // ✅ YE ADD KARO
  },
};

const GA_ID = "G-YE1CKM6JVQ";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
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
          <SiteHeader />
          {children}
          <SiteExtras />
        </AdminProvider>
      </body>
    </html>
  );
}