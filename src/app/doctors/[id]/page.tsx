import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTitle from "@/components/layout/PageTitle";
import DoctorDetailSection from "@/components/sections/DoctorDetailSection";
import { JsonLd, breadcrumbJsonLd, physicianJsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import { fetchDoctorById, fetchDoctors } from "@/lib/supabase/fetch-content";

type DoctorDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const doctors = await fetchDoctors();
  return doctors.map((doctor) => ({ id: String(doctor.id) }));
}

export async function generateMetadata({ params }: DoctorDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const doctor = await fetchDoctorById(Number(id));

  if (!doctor) {
    return { title: "Doctor Not Found" };
  }

  return createPageMetadata({
    title: doctor.name,
    description: `${doctor.role} at NCRC — ${doctor.special}`,
    path: `/doctors/${doctor.id}`,
    image: doctor.img,
    keywords: [doctor.name, doctor.role, doctor.category, "NCRC doctor"],
  });
}

export default async function DoctorDetailPage({ params }: DoctorDetailPageProps) {
  const { id } = await params;
  const doctor = await fetchDoctorById(Number(id));

  if (!doctor) {
    notFound();
  }

  const path = `/doctors/${doctor.id}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Doctors", path: "/doctors" },
            { name: doctor.name, path },
          ]),
          physicianJsonLd({
            name: doctor.name,
            description: `${doctor.role} — ${doctor.special}`,
            path,
            image: doctor.img,
            role: doctor.role,
            email: doctor.email,
            phone: doctor.phoneNo,
          }),
        ]}
      />
      <PageTitle
        title={doctor.name}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Doctors", href: "/doctors" },
        ]}
      />
      <DoctorDetailSection doctor={doctor} />
    </>
  );
}
