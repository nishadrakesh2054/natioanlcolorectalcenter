import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";

export const metadata: Metadata = {
  title: "Case Study",
  description: "Clinical case studies and treatment outcomes from NCRC.",
};

export default function CaseStudyPage() {
  return (
    <>
      <PageTitle title="Case Study" />
      <CaseStudiesSection />
    </>
  );
}
