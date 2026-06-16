"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ScrollTop from "@/components/layout/ScrollTop";
import SkipToContent from "@/components/layout/SkipToContent";
import MedilabScripts from "@/components/MedilabScripts";
import { isAdminRoute } from "@/lib/routeAssets";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const adminRoute = isAdminRoute(pathname);

  if (adminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <SkipToContent />
      <Header />
      <main id="main-content" className="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <ScrollTop />
      <MedilabScripts />
    </>
  );
}
