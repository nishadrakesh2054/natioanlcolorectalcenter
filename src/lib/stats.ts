import { fetchColorectalDiseases, fetchDoctors, fetchServices } from "@/lib/supabase/fetch-content";

export type SiteStat = {
  id: string;
  end: number;
  label: string;
  icon: string;
};

export async function getSiteStats(): Promise<SiteStat[]> {
  const [doctors, services, diseases] = await Promise.all([
    fetchDoctors(),
    fetchServices(),
    fetchColorectalDiseases(),
  ]);

  return [
    {
      id: "doctors",
      end: doctors.length,
      label: "Expert Doctors",
      icon: "bi bi-person-badge",
    },
    {
      id: "services",
      end: services.length,
      label: "Medical Services",
      icon: "bi bi-heart-pulse",
    },
    {
      id: "conditions",
      end: diseases.length,
      label: "Colorectal Conditions",
      icon: "bi bi-journal-medical",
    },
    {
      id: "experience",
      end: 15,
      label: "Years of Experience",
      icon: "bi bi-award",
    },
  ];
}
