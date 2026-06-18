"use client";

import MedilabForm from "@/components/forms/MedilabForm";
import type { AppointmentSelectOption } from "@/lib/appointmentOptions";
import { submitContactMessage } from "@/lib/contactMessages";
import { siteContact } from "@/lib/siteContact";

type ContactSectionProps = {
  departments: AppointmentSelectOption[];
  /** Plain ids (name, email, …) — use only on /contact where no other form exists */
  simpleFieldIds?: boolean;
};

function fieldId(simpleFieldIds: boolean, key: string) {
  return simpleFieldIds ? key : `contact-${key}`;
}

export default function ContactSection({
  departments,
  simpleFieldIds = false,
}: ContactSectionProps) {
  return (
    <section id="contact" className="contact section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Contact</h2>
        <p>Feel free to reach out to us with any questions or concerns!</p>
      </div>

      <div className="mb-5" data-aos="fade-up" data-aos-delay="200">
        <iframe
          style={{ border: 0, width: "100%", height: "270px" }}
          src={siteContact.mapEmbedUrl}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="NCRC location map"
        ></iframe>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-lg-4">
            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
              <i className="bi bi-geo-alt flex-shrink-0" aria-hidden="true"></i>
              <div>
                <h3>Location</h3>
                <p>
                  {siteContact.address.line1}
                  <br />
                  {siteContact.address.line2}
                </p>
              </div>
            </div>
            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
              <i className="bi bi-telephone flex-shrink-0" aria-hidden="true"></i>
              <div>
                <h3>Call Us</h3>
                <p>
                  Dr. Rakesh Shah:{" "}
                  <a href={`tel:${siteContact.phones.telRakesh}`}>{siteContact.phones.rakesh}</a>
                  <br />
                  Dr. Binay Yadav:{" "}
                  <a href={`tel:${siteContact.phones.telBinay}`}>{siteContact.phones.binay}</a>
                </p>
              </div>
            </div>
            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="500">
              <i className="bi bi-envelope flex-shrink-0" aria-hidden="true"></i>
              <div>
                <h3>Email Us</h3>
                <p>
                  <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <MedilabForm
              successMessage="Thank you! Your message has been sent. We will get back to you soon."
              onSubmit={submitContactMessage}
              className="php-email-form"
            >
              <div className="row">
                <div className="col-md-6 form-group">
                  <label htmlFor={fieldId(simpleFieldIds, "name")} className="visually-hidden">
                    Your name
                  </label>
                  <input
                    type="text"
                    id={fieldId(simpleFieldIds, "name")}
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    autoComplete="name"
                    required
                  />
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <label htmlFor={fieldId(simpleFieldIds, "email")} className="visually-hidden">
                    Your email
                  </label>
                  <input
                    type="email"
                    id={fieldId(simpleFieldIds, "email")}
                    className="form-control"
                    name="email"
                    placeholder="Your Email"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group mt-3">
                  <label htmlFor={fieldId(simpleFieldIds, "phone")} className="visually-hidden">
                    Your phone
                  </label>
                  <input
                    type="tel"
                    id={fieldId(simpleFieldIds, "phone")}
                    className="form-control"
                    name="phone"
                    placeholder="Your Phone"
                    autoComplete="tel"
                    required
                  />
                </div>
                <div className="col-md-6 form-group mt-3">
                  <label htmlFor={fieldId(simpleFieldIds, "department")} className="visually-hidden">
                    Department
                  </label>
                  <select
                    id={fieldId(simpleFieldIds, "department")}
                    className="form-select"
                    name="department"
                    required
                    defaultValue=""
                  >
                    <option value="">Select Department</option>
                    {departments.map((department) => (
                      <option key={department.value} value={department.value}>
                        {department.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group mt-3">
                <label htmlFor={fieldId(simpleFieldIds, "message")} className="visually-hidden">
                  Message
                </label>
                <textarea
                  id={fieldId(simpleFieldIds, "message")}
                  className="form-control"
                  name="message"
                  rows={6}
                  placeholder="Message"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button type="submit">Send Message</button>
              </div>
            </MedilabForm>
          </div>
        </div>
      </div>
    </section>
  );
}
