import { slugifyDiseaseTitle } from "@/lib/disease-utils";
import type { Doctor } from "@/lib/types/doctor";

export const DOCTORS_INDEX_PATH = "/doctors";

export type SpecialtyNavItem = {
  slug: string;
  name: string;
  count: number;
};

export function slugifySpecialty(name: string) {
  return slugifyDiseaseTitle(name);
}

export function getDoctorSpecialtyName(doctor: Doctor) {
  return doctor.category.trim() || doctor.role.trim();
}

export function getDoctorSpecialties(doctors: Doctor[]): SpecialtyNavItem[] {
  const groups = new Map<string, SpecialtyNavItem>();

  for (const doctor of doctors) {
    const name = getDoctorSpecialtyName(doctor);
    if (!name) {
      continue;
    }

    const slug = slugifySpecialty(name);
    const existing = groups.get(slug);

    if (existing) {
      existing.count += 1;
    } else {
      groups.set(slug, { slug, name, count: 1 });
    }
  }

  return [...groups.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function filterDoctorsBySpecialty(doctors: Doctor[], specialtySlug: string | null | undefined) {
  if (!specialtySlug) {
    return doctors;
  }

  return doctors.filter((doctor) => slugifySpecialty(getDoctorSpecialtyName(doctor)) === specialtySlug);
}

export function getDoctorsSpecialtyPath(slug: string) {
  return `${DOCTORS_INDEX_PATH}?specialty=${encodeURIComponent(slug)}`;
}

export function findSpecialtyBySlug(doctors: Doctor[], slug: string | null | undefined) {
  if (!slug) {
    return null;
  }

  return getDoctorSpecialties(doctors).find((item) => item.slug === slug) ?? null;
}
