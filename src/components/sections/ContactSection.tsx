"use client";

import MedilabForm from "@/components/forms/MedilabForm";
import { submitContactMessage } from "@/lib/contactMessages";
import { siteContact } from "@/lib/siteContact";

export default function ContactSection() {
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
          frameBorder="0"
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
              <i className="bi bi-geo-alt flex-shrink-0"></i>
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
              <i className="bi bi-telephone flex-shrink-0"></i>
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
              <i className="bi bi-envelope flex-shrink-0"></i>
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
              <div className="row gy-4" data-aos="fade-up" data-aos-delay="200">
                <div className="col-md-6">
                  <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                </div>
                <div className="col-md-6">
                  <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                </div>

                <div className="col-md-6">
                  <input type="text" className="form-control" name="phone" placeholder="Your Phone" required />
                </div>
                <div className="col-md-6">
                  <input type="text" className="form-control" name="department" placeholder="Department" required />
                </div>

                <div className="col-md-12">
                  <textarea className="form-control" name="message" rows={6} placeholder="Message" required></textarea>
                </div>
                <div className="col-md-12 text-center">
                  <button type="submit">Send Message</button>
                </div>
              </div>
            </MedilabForm>
          </div>
        </div>
      </div>
    </section>
  );
}
