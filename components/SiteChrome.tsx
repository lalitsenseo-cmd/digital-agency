"use client";

import { usePathname } from "next/navigation";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import AdminBar from "@/components/AdminBar";
import Exitintentpopup from "@/components/Exitintentpopup";

// /keystatic admin pe site ka TopBar/Navbar/popup nahi dikhna chahiye.
const isAdminRoute = (path: string | null) => !!path && path.startsWith("/keystatic");

export function SiteHeader() {
  const path = usePathname();
  if (isAdminRoute(path)) return null;
  return (
    <>
      <TopBar />
      <Navbar />
    </>
  );
}

export function SiteExtras() {
  const path = usePathname();
  if (isAdminRoute(path)) return null;
  return (
    <>
      <AdminBar />
      <Exitintentpopup />
    </>
  );
}
