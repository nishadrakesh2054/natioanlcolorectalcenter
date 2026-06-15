import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import { publicPageSeo } from "@/lib/seo";
import { fetchCaseStudies } from "@/lib/supabase/fetch-content";

export const metadata: Metadata = publicPageSeo.caseStudies;
export const revalidate = 300;

export default async function CaseStudyPage() {
  const studies = await fetchCaseStudies();

  return (
    <>
      <PageTitle title="Case Study" />
      <CaseStudiesSection studies={studies} />
    </>
  );
}
