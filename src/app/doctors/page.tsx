import type { Metadata } from "next";
import { Suspense } from "react";
import PageTitle from "@/components/layout/PageTitle";
import DoctorsBrowseSection from "@/components/sections/DoctorsBrowseSection";
import { findSpecialtyBySlug } from "@/lib/doctor-specialty";
import { publicPageSeo } from "@/lib/seo";
import { fetchDoctors } from "@/lib/supabase/fetch-content";

export const metadata: Metadata = publicPageSeo.doctors;
export const revalidate = 60;

type DoctorsPageProps = {
  searchParams: Promise<{ specialty?: string }>;
};

export default async function DoctorsPage({ searchParams }: DoctorsPageProps) {
  const doctors = await fetchDoctors();
  const { specialty } = await searchParams;
  const activeSpecialty = findSpecialtyBySlug(doctors, specialty);
  const pageTitle = activeSpecialty ? `${activeSpecialty.name} Specialists` : "Doctors";

  return (
    <>
      <PageTitle title={pageTitle} />
      <Suspense fallback={null}>
        <DoctorsBrowseSection doctors={doctors} />
      </Suspense>
    </>
  );
}
