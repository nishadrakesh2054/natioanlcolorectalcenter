import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import AppointmentSection from "@/components/sections/AppointmentSection";

export const metadata: Metadata = {
  title: "Appointment",
};

export default function AppointmentPage() {
  return (
    <>
      <PageTitle title="Appointment" />
      <AppointmentSection />
    </>
  );
}
