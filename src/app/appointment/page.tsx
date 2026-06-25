import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import AppointmentAsidePanel from "@/components/sections/AppointmentAsidePanel";
import AppointmentForm from "@/components/sections/AppointmentForm";
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
      <section id="appointment" className="appointment section appointment--page">
        <div className="container section-title" data-aos="fade-up">
          <h2>Book Your Visit</h2>
          <p>
            Complete the form below or reach us directly. Our team will confirm your
            appointment and guide you through the next steps.
          </p>
        </div>

        <div className="container">
          <div className="row gy-4 appointment-layout">
            <div className="col-lg-7" data-aos="fade-up" data-aos-delay="100">
              <div className="appointment-form-card">
                <AppointmentForm departments={departments} doctors={doctors} />
              </div>
            </div>
            <div className="col-lg-5">
              <AppointmentAsidePanel />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
