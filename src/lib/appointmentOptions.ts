export type AppointmentSelectOption = {
  value: string;
  label: string;
};

import { fetchDoctors, fetchServices } from "@/lib/supabase/fetch-content";

export async function getAppointmentDepartments(): Promise<AppointmentSelectOption[]> {
  const services = await fetchServices();
  return services.map((service) => ({
    value: String(service.id),
    label: service.title,
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
