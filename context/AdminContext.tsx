"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SiteContent, getContent, saveContent, isAdminLoggedIn, adminLogin, adminLogout } from "@/lib/content";

type AdminContextType = {
  isAdmin: boolean;
  content: SiteContent;
  login: (password: string) => boolean;
  logout: () => void;
  updateContent: (newContent: Partial<SiteContent>) => void;
};

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, setContent] = useState<SiteContent>(getContent());

  useEffect(() => {
    setIsAdmin(isAdminLoggedIn());
    setContent(getContent());
  }, []);

  const login = (password: string) => {
    const ok = adminLogin(password);
    if (ok) setIsAdmin(true);
    return ok;
  };

  const logout = () => {
    adminLogout();
    setIsAdmin(false);
  };

  const updateContent = (newContent: Partial<SiteContent>) => {
    const merged = { ...content, ...newContent };
    setContent(merged);
    saveContent(merged);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, content, login, logout, updateContent }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
}
