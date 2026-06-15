import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import DoctorsSection from "@/components/sections/DoctorsSection";
import { publicPageSeo } from "@/lib/seo";
import { fetchDoctors } from "@/lib/supabase/fetch-content";

export const metadata: Metadata = publicPageSeo.doctors;
export const revalidate = 300;

export default async function DoctorsPage() {
  const doctors = await fetchDoctors();

  return (
    <>
      <PageTitle title="Doctors" />
      <DoctorsSection doctors={doctors} />
    </>
  );
}
