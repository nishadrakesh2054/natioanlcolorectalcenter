import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import AboutSection from "@/components/sections/AboutSection";
import StatsSection from "@/components/sections/StatsSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "NCRC is Nepal's first dedicated colorectal center offering screenings, diagnostics, surgical care, and ongoing management of colorectal diseases.",
  keywords: [
    "colorectal care Nepal",
    "NCRC",
    "colon cancer",
    "rectal cancer",
    "colorectal surgery",
    "screenings",
    "diagnostics",
  ],
};

export default function AboutPage() {
  return (
    <>
      <PageTitle title="About Us" />
      <AboutSection />
      <StatsSection />
    </>
  );
}
