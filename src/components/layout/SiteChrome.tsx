"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Preloader from "@/components/layout/Preloader";
import ScrollTop from "@/components/layout/ScrollTop";
import MedilabScripts from "@/components/MedilabScripts";

function isAdminRoute(pathname: string) {
  return pathname === "/login" || pathname.startsWith("/dashboard");
}

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const adminRoute = isAdminRoute(pathname);

  if (adminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
      <ScrollTop />
      <Preloader />
      <MedilabScripts />
    </>
  );
}
