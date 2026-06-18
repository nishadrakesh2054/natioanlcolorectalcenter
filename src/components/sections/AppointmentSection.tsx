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
              <label htmlFor="name" className="visually-hidden">
                Your name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                placeholder="Your Name"
                autoComplete="name"
                required
              />
            </div>
            <div className="col-md-4 form-group mt-3 mt-md-0">
              <label htmlFor="email" className="visually-hidden">
                Your email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="Your Email"
                autoComplete="email"
                required
              />
            </div>
            <div className="col-md-4 form-group mt-3 mt-md-0">
              <label htmlFor="phone" className="visually-hidden">
                Your phone
              </label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                id="phone"
                placeholder="Your Phone"
                autoComplete="tel"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 form-group mt-3">
              <label htmlFor="date" className="visually-hidden">
                Preferred date and time
              </label>
              <input
                type="datetime-local"
                name="date"
                className="form-control datepicker"
                id="date"
                required
              />
            </div>
            <div className="col-md-4 form-group mt-3">
              <label htmlFor="department" className="visually-hidden">
                Colorectal disease
              </label>
              <select name="department" id="department" className="form-select" required defaultValue="">
                <option value="">Select colorectal disease</option>
                {departments.map((department) => (
                  <option key={department.value} value={department.value}>
                    {department.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4 form-group mt-3">
              <label htmlFor="doctor" className="visually-hidden">
                Specialist
              </label>
              <select name="doctor" id="doctor" className="form-select" required defaultValue="">
                <option value="">Select specialist doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.value} value={doctor.value}>
                    {doctor.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="appointment-message" className="visually-hidden">
              Message (optional)
            </label>
            <textarea
              id="appointment-message"
              className="form-control"
              name="message"
              rows={5}
              placeholder="Message (Optional)"
            ></textarea>
          </div>
          <div className="text-center">
            <button type="submit">Make an Appointment</button>
          </div>
        </MedilabForm>
      </div>
    </section>
  );
}
