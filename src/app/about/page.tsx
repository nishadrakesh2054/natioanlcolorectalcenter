import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import AboutSection from "@/components/sections/AboutSection";
import StatsSection from "@/components/sections/StatsSection";
import { publicPageSeo } from "@/lib/seo";
import { getSiteStats } from "@/lib/stats";

export const metadata: Metadata = publicPageSeo.about;
export const revalidate = 300;

export default async function AboutPage() {
  const stats = await getSiteStats();

  return (
    <>
      <PageTitle title="About Us" />
      <AboutSection />
      <StatsSection stats={stats} />
    </>
  );
}
