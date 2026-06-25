import Link from "next/link";
import SocialLinks from "@/components/layout/SocialLinks";
import SiteImage from "@/components/ui/SiteImage";
import { siteContact } from "@/lib/siteContact";

const usefulLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/appointment", label: "Appointment" },
];

const patientLinks = [
  { href: "/colorectal-disease", label: "Colorectal diseases" },
  { href: "/doctors", label: "Our doctors" },
  { href: "/faq", label: "FAQ" },
  { href: "/blogs", label: "Blogs" },
  { href: "/case-study", label: "Case studies" },
  { href: "/gallery", label: "Gallery" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="footer footer-enhanced">
      <div className="footer-enhanced-bg" aria-hidden="true">
        <span className="footer-enhanced-orb footer-enhanced-orb-one" />
        <span className="footer-enhanced-orb footer-enhanced-orb-two" />
      </div>

      <div className="footer-cta-band">
        <div className="container">
          <div className="footer-cta-inner">
            <div className="footer-cta-copy">
              <span className="footer-cta-label">Ready for expert care?</span>
              <p>Book a consultation with Nepal&apos;s dedicated colorectal specialists.</p>
            </div>
            <div className="footer-cta-actions">
              <Link href="/appointment" className="footer-cta-btn footer-cta-btn-primary">
                <i className="bi bi-calendar-check" aria-hidden="true"></i>
                Book appointment
              </Link>
              <a href={`tel:${siteContact.phones.telRakesh}`} className="footer-cta-btn footer-cta-btn-outline">
                <i className="bi bi-telephone" aria-hidden="true"></i>
                Call {siteContact.phones.display}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-main">
        <div className="row gy-5">
          <div className="col-lg-4 col-md-6 footer-brand-col">
            <Link href="/" className="footer-brand-logo">
              <SiteImage
                src={siteContact.logo}
                alt={siteContact.shortName}
                width={64}
                height={64}
                autoSize
              />
              <span className="footer-brand-text">
                <span className="footer-brand-short">{siteContact.shortName}</span>
                <span className="footer-brand-full">{siteContact.name}</span>
              </span>
            </Link>
            <p className="footer-brand-tagline">
              Dedicated colon, rectum, and anorectal care in Tinkune, Kathmandu.
            </p>
            <SocialLinks className="footer-social-links" />
          </div>

          <div className="col-6 col-md-3 col-lg-2 footer-links-col">
            <h4 className="footer-col-title">Useful links</h4>
            <ul className="footer-link-list">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-md-3 col-lg-3 footer-links-col">
            <h4 className="footer-col-title">Patient resources</h4>
            <ul className="footer-link-list">
              {patientLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 footer-contact-col">
            <h4 className="footer-col-title">Get in touch</h4>
            <ul className="footer-contact-list">
              <li>
                <span className="footer-contact-icon" aria-hidden="true">
                  <i className="bi bi-geo-alt-fill"></i>
                </span>
                <div>
                  <strong>Location</strong>
                  <p>
                    {siteContact.address.line1}
                    <br />
                    {siteContact.address.line2}, Kathmandu
                  </p>
                </div>
              </li>
              <li>
                <span className="footer-contact-icon" aria-hidden="true">
                  <i className="bi bi-telephone-fill"></i>
                </span>
                <div>
                  <strong>Phone</strong>
                  <p>
                    <a href={`tel:${siteContact.phones.telRakesh}`}>Dr. Rakesh: {siteContact.phones.rakesh}</a>
                    <br />
                    <a href={`tel:${siteContact.phones.telBinay}`}>Dr. Binay: {siteContact.phones.binay}</a>
                  </p>
                </div>
              </li>
              <li>
                <span className="footer-contact-icon" aria-hidden="true">
                  <i className="bi bi-envelope-fill"></i>
                </span>
                <div>
                  <strong>Email</strong>
                  <p>
                    <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copyright mb-0">
            © {year} <strong>{siteContact.name}</strong>. All rights reserved.
          </p>
          <p className="footer-credits mb-0">
            Design by{" "}
            <a href="https://rakeshsahani.com.np/" target="_blank" rel="noopener noreferrer">
              Rakesh Kumar Sahani
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
