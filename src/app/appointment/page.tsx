import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import AppointmentSection from "@/components/sections/AppointmentSection";
import { getAppointmentDepartments, getAppointmentDoctors } from "@/lib/appointmentOptions";
import { publicPageSeo } from "@/lib/seo";

export const metadata: Metadata = publicPageSeo.appointment;
export const revalidate = 60;

export default async function AppointmentPage() {
  const [departments, doctors] = await Promise.all([
    getAppointmentDepartments(),
    getAppointmentDoctors(),
  ]);

  return (
    <>
      <PageTitle title="Appointment" />
      <AppointmentSection departments={departments} doctors={doctors} />
    </>
  );
}
