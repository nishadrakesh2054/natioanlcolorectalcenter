import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import DepartmentsSection from "@/components/sections/DepartmentsSection";
import { publicPageSeo } from "@/lib/seo";
import { fetchColorectalDiseases } from "@/lib/supabase/fetch-content";

export const metadata: Metadata = publicPageSeo.departments;
export const revalidate = 60;

export default async function DepartmentsPage() {
  const diseases = await fetchColorectalDiseases();

  return (
    <>
      <PageTitle title="Colorectal Disease" />
      <DepartmentsSection diseases={diseases} />
    </>
  );
}
