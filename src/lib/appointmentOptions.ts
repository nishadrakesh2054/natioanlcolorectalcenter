import { fetchColorectalDiseases, fetchDoctors } from "@/lib/supabase/fetch-content";

export type AppointmentSelectOption = {
  value: string;
  label: string;
};

export async function getAppointmentDepartments(): Promise<AppointmentSelectOption[]> {
  const diseases = await fetchColorectalDiseases();
  return diseases.map((disease) => ({
    value: String(disease.id),
    label: disease.title.trim(),
  }));
}

export async function getAppointmentDoctors(): Promise<AppointmentSelectOption[]> {
  const doctors = await fetchDoctors();
  return [
    ...doctors.map((doctor) => ({
      value: String(doctor.id),
      label: doctor.name,
    })),
    { value: "any-available", label: "Any Available Specialist" },
  ];
}

export async function getContactDepartments(): Promise<AppointmentSelectOption[]> {
  const departments = await getAppointmentDepartments();
  return [{ value: "general-inquiry", label: "General Inquiry" }, ...departments];
}

export function getOptionLabel(
  options: AppointmentSelectOption[],
  value: string
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}
