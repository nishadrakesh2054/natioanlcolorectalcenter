import { caseServices } from "@/lib/caseServices";
import { colorectalDiseases } from "@/lib/colorectalDiseases";
import { doctors } from "@/lib/doctors";

export type SiteStat = {
  id: string;
  end: number;
  label: string;
  icon: string;
};

export const siteStats: SiteStat[] = [
  {
    id: "doctors",
    end: doctors.length,
    label: "Expert Doctors",
    icon: "bi bi-person-badge",
  },
  {
    id: "services",
    end: caseServices.length,
    label: "Medical Services",
    icon: "bi bi-heart-pulse",
  },
  {
    id: "conditions",
    end: colorectalDiseases.length,
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
