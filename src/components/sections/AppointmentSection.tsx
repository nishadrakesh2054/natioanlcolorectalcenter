"use client";

import MedilabForm from "@/components/forms/MedilabForm";
import type { AppointmentSelectOption } from "@/lib/appointmentOptions";
import { submitAppointmentRequest } from "@/lib/appointmentRequests";

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
        <MedilabForm
          successMessage="Thank you! Your appointment request has been received. Our team will contact you shortly."
          onSubmit={submitAppointmentRequest}
        >
          <div className="row">
            <div className="col-md-4 form-group">
              <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
            </div>
            <div className="col-md-4 form-group mt-3 mt-md-0">
              <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
            </div>
            <div className="col-md-4 form-group mt-3 mt-md-0">
              <input type="tel" className="form-control" name="phone" id="phone" placeholder="Your Phone" required />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 form-group mt-3">
              <input
                type="datetime-local"
                name="date"
                className="form-control datepicker"
                id="date"
                required
              />
            </div>
            <div className="col-md-4 form-group mt-3">
              <select name="department" id="department" className="form-select" required defaultValue="">
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department.value} value={department.value}>
                    {department.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4 form-group mt-3">
              <select name="doctor" id="doctor" className="form-select" required defaultValue="">
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.value} value={doctor.value}>
                    {doctor.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group mt-3">
            <textarea className="form-control" name="message" rows={5} placeholder="Message (Optional)"></textarea>
          </div>
          <div className="text-center">
            <button type="submit">Make an Appointment</button>
          </div>
        </MedilabForm>
      </div>
    </section>
  );
}
