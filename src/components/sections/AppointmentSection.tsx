import AppointmentForm from "@/components/sections/AppointmentForm";
import type { AppointmentSelectOption } from "@/lib/appointmentOptions";

type AppointmentSectionProps = {
  departments: AppointmentSelectOption[];
  doctors: AppointmentSelectOption[];
};

export default function AppointmentSection({
  departments,
  doctors,
}: AppointmentSectionProps) {
  return (
    <section id="appointment" className="appointment section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Appointment</h2>
        <p>Book a consultation with our colorectal specialists at NCRC.</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <AppointmentForm departments={departments} doctors={doctors} />
      </div>
    </section>
  );
}
