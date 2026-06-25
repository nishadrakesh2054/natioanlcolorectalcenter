import { cache } from "react";
import { getDoctorSpecialties } from "@/lib/doctor-specialty";
import { fetchColorectalDiseases, fetchDoctors } from "@/lib/supabase/fetch-content";
import { toDiseaseNavItems } from "@/lib/types/disease-nav";

export const getPublicNav = cache(async function getPublicNav() {
  const [diseases, doctors] = await Promise.all([fetchColorectalDiseases(), fetchDoctors()]);

  return {
    diseaseNav: toDiseaseNavItems(diseases),
    specialtyNav: getDoctorSpecialties(doctors),
  };
});
