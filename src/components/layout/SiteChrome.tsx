"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ScrollTop from "@/components/layout/ScrollTop";
import SkipToContent from "@/components/layout/SkipToContent";
import MedilabScripts from "@/components/MedilabScripts";
import { isAdminRoute } from "@/lib/routeAssets";
import type { SpecialtyNavItem } from "@/lib/doctor-specialty";
import type { DiseaseNavItem } from "@/lib/types/disease-nav";

type SiteChromeProps = {
  children: React.ReactNode;
  diseaseNav: DiseaseNavItem[];
  specialtyNav: SpecialtyNavItem[];
};

export default function SiteChrome({ children, diseaseNav, specialtyNav }: SiteChromeProps) {
  const pathname = usePathname();
  const adminRoute = isAdminRoute(pathname);

  if (adminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <SkipToContent />
      <Suspense fallback={null}>
        <Header diseaseNav={diseaseNav} specialtyNav={specialtyNav} />
      </Suspense>
      <main id="main-content" className="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <ScrollTop />
      <MedilabScripts />
    </>
  );
}
