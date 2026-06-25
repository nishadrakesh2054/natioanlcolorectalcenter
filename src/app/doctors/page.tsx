import type { Metadata } from "next";
import { Suspense } from "react";
import PageTitle from "@/components/layout/PageTitle";
import DoctorsBrowseSection from "@/components/sections/DoctorsBrowseSection";
import { findSpecialtyBySlug, getDoctorsSpecialtyPath } from "@/lib/doctor-specialty";
import { createPageMetadata, publicPageSeo } from "@/lib/seo";
import { fetchDoctors } from "@/lib/supabase/fetch-content";

export const revalidate = 60;

type DoctorsPageProps = {
  searchParams: Promise<{ specialty?: string }>;
};

export async function generateMetadata({ searchParams }: DoctorsPageProps): Promise<Metadata> {
  const doctors = await fetchDoctors();
  const { specialty } = await searchParams;
  const activeSpecialty = findSpecialtyBySlug(doctors, specialty);

  if (!activeSpecialty) {
    return publicPageSeo.doctors;
  }

  return createPageMetadata({
    title: `${activeSpecialty.name} Specialists`,
    description: `Meet our ${activeSpecialty.name.toLowerCase()} specialists at NCRC in Kathmandu.`,
    path: getDoctorsSpecialtyPath(activeSpecialty.slug),
    keywords: [
      activeSpecialty.name,
      "NCRC doctors",
      "colorectal specialists Nepal",
      "Kathmandu",
    ],
  });
}

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
