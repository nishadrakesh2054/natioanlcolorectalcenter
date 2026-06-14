import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTitle from "@/components/layout/PageTitle";
import DoctorDetailSection from "@/components/sections/DoctorDetailSection";
import { doctors, getDoctorById } from "@/lib/doctors";

type DoctorDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return doctors.map((doctor) => ({ id: String(doctor.id) }));
}

export async function generateMetadata({ params }: DoctorDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const doctor = getDoctorById(Number(id));

  if (!doctor) {
    return { title: "Doctor Not Found" };
  }

  return {
    title: doctor.name,
    description: `${doctor.role} at NCRC. ${doctor.special}`,
  };
}

export default async function DoctorDetailPage({ params }: DoctorDetailPageProps) {
  const { id } = await params;
  const doctor = getDoctorById(Number(id));

  if (!doctor) {
    notFound();
  }

  return (
    <>
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
