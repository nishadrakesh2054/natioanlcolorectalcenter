import { siteContact } from "@/lib/siteContact";

const appointmentSteps = [
  "Submit your appointment request using the form",
  "Our team will call you to confirm date and time",
  "Visit the clinic with any previous medical reports",
  "Receive expert consultation and treatment plan",
];

const directContactOptions = [
  {
    label: "Mobile Call",
    value: siteContact.phones.appointment,
    href: `tel:${siteContact.phones.appointmentTel}`,
    icon: "bi-telephone-fill",
    accent: "phone",
  },
  {
    label: "WhatsApp",
    value: siteContact.phones.appointment,
    href: siteContact.social.whatsapp,
    icon: "bi-whatsapp",
    accent: "whatsapp",
  },
  {
    label: "Viber",
    value: siteContact.phones.appointment,
    href: siteContact.social.viber,
    icon: "bi-chat-dots-fill",
    accent: "viber",
  },
  {
    label: "Email",
    value: siteContact.email,
    href: `mailto:${siteContact.email}`,
    icon: "bi-envelope-fill",
    accent: "email",
  },
] as const;

export default function AppointmentAsidePanel() {
  return (
    <aside className="appointment-aside" aria-label="Appointment information">
      <div className="appointment-aside-card" data-aos="fade-up" data-aos-delay="150">
        <h3 className="appointment-aside-title">Book Directly</h3>
        <p className="appointment-aside-lead">
          You can also reach us instantly using the options below.
        </p>
        <ul className="appointment-contact-list">
          {directContactOptions.map((option) => (
            <li key={option.label}>
              <a
                href={option.href}
                className={`appointment-contact-link appointment-contact-link--${option.accent}`}
                target={option.href.startsWith("http") ? "_blank" : undefined}
                rel={option.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <span className="appointment-contact-icon" aria-hidden="true">
                  <i className={`bi ${option.icon}`}></i>
                </span>
                <span className="appointment-contact-body">
                  <span className="appointment-contact-label">{option.label}</span>
                  <span className="appointment-contact-value">{option.value}</span>
                </span>
                <i className="bi bi-chevron-right appointment-contact-arrow" aria-hidden="true"></i>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="appointment-aside-card" data-aos="fade-up" data-aos-delay="200">
        <h3 className="appointment-aside-title">What to Expect</h3>
        <ol className="appointment-steps">
          {appointmentSteps.map((step) => (
            <li key={step}>
              <span className="appointment-step-marker" aria-hidden="true"></span>
              <span className="appointment-step-text">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="appointment-aside-card" data-aos="fade-up" data-aos-delay="250">
        <h3 className="appointment-aside-title">Clinic Location</h3>
        <div className="appointment-location">
          <span className="appointment-location-icon" aria-hidden="true">
            <i className="bi bi-geo-alt-fill"></i>
          </span>
          <p className="appointment-location-address">{siteContact.address.full}</p>
        </div>
        <a
          href={siteContact.mapDirectionsUrl}
          className="appointment-location-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-signpost-split" aria-hidden="true"></i>
          Get directions on Google Maps
        </a>
      </div>
    </aside>
  );
}
