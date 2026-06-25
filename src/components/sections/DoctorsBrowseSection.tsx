"use client";

import { useSearchParams } from "next/navigation";
import DoctorsSection from "@/components/sections/DoctorsSection";
import { filterDoctorsBySpecialty, findSpecialtyBySlug } from "@/lib/doctor-specialty";
import type { Doctor } from "@/lib/types/doctor";

type DoctorsBrowseSectionProps = {
  doctors: Doctor[];
};

export default function DoctorsBrowseSection({ doctors }: DoctorsBrowseSectionProps) {
  const searchParams = useSearchParams();
  const specialtySlug = searchParams.get("specialty");
  const activeSpecialty = findSpecialtyBySlug(doctors, specialtySlug);
  const filteredDoctors = filterDoctorsBySpecialty(doctors, specialtySlug);

  return (
    <DoctorsSection
      doctors={filteredDoctors}
      activeSpecialty={activeSpecialty?.name ?? null}
    />
  );
}
