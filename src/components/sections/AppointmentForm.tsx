"use client";

import MedilabForm from "@/components/forms/MedilabForm";
import type { AppointmentSelectOption } from "@/lib/appointmentOptions";
import { submitAppointmentRequest } from "@/lib/appointmentRequests";

type AppointmentFormProps = {
  departments: AppointmentSelectOption[];
  doctors: AppointmentSelectOption[];
};

function FieldLabel({
  htmlFor,
  children,
  required = false,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="form-label appointment-form-label">
      {children}
      {required ? (
        <span className="appointment-form-required" aria-hidden="true">
          {" "}
          *
        </span>
      ) : null}
    </label>
  );
}

export default function AppointmentForm({ departments, doctors }: AppointmentFormProps) {
  return (
    <MedilabForm
      successMessage="Thank you! Your appointment request has been received. Our team will contact you shortly."
      onSubmit={submitAppointmentRequest}
    >
      <div className="row g-3 appointment-form-grid">
        <div className="col-md-6 form-group">
          <FieldLabel htmlFor="name" required>
            Name
          </FieldLabel>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Enter your full name"
            autoComplete="name"
            required
          />
        </div>
        <div className="col-md-6 form-group">
          <FieldLabel htmlFor="email" required>
            Email
          </FieldLabel>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            placeholder="Enter your email address"
            autoComplete="email"
            required
          />
        </div>
        <div className="col-md-6 form-group">
          <FieldLabel htmlFor="phone" required>
            Phone
          </FieldLabel>
          <input
            type="tel"
            className="form-control"
            name="phone"
            id="phone"
            placeholder="Enter your phone number"
            autoComplete="tel"
            required
          />
        </div>
        <div className="col-md-6 form-group">
          <FieldLabel htmlFor="age">Age</FieldLabel>
          <input
            type="text"
            name="age"
            className="form-control"
            id="age"
            placeholder="e.g. 35"
            autoComplete="off"
          />
        </div>
        <div className="col-md-6 form-group">
          <FieldLabel htmlFor="gender">Gender</FieldLabel>
          <input
            type="text"
            name="gender"
            className="form-control"
            id="gender"
            placeholder="e.g. Male / Female"
            autoComplete="sex"
          />
        </div>
        <div className="col-md-6 form-group">
          <FieldLabel htmlFor="weight">Weight</FieldLabel>
          <input
            type="text"
            name="weight"
            className="form-control"
            id="weight"
            placeholder="e.g. 65 kg"
            autoComplete="off"
          />
        </div>
        <div className="col-md-6 form-group">
          <FieldLabel htmlFor="date" required>
            Preferred date &amp; time
          </FieldLabel>
          <input
            type="datetime-local"
            name="date"
            className="form-control datepicker"
            id="date"
            required
          />
        </div>
        <div className="col-md-6 form-group">
          <FieldLabel htmlFor="department" required>
            Colorectal disease
          </FieldLabel>
          <select name="department" id="department" className="form-select" required defaultValue="">
            <option value="">Select colorectal disease</option>
            {departments.map((department) => (
              <option key={department.value} value={department.value}>
                {department.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6 form-group">
          <FieldLabel htmlFor="doctor" required>
            Specialist doctor
          </FieldLabel>
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
        <FieldLabel htmlFor="appointment-message">Describe your condition</FieldLabel>
        <textarea
          id="appointment-message"
          className="form-control"
          name="message"
          rows={5}
          placeholder="Describe your symptoms or concerns (optional)"
        ></textarea>
      </div>
      <div className="text-center">
        <button type="submit">Make an Appointment</button>
      </div>
    </MedilabForm>
  );
}
