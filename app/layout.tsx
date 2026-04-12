import type { Metadata } from "next";
import "./globals.css";
import { AdminProvider } from "@/context/AdminContext";
import AdminBar from "@/components/AdminBar";

export const metadata: Metadata = {
  title: "NexGen Digital — SEO, Ads, Web & Python Development Agency in Faridabad",
  description: "NexGen Digital is a results-driven digital marketing agency in Faridabad. We provide SEO, Google Ads, Social Media Marketing, Website Development and Python automation services.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AdminProvider>
          {children}
          <AdminBar />
        </AdminProvider>
      </body>
    </html>
  );
}
