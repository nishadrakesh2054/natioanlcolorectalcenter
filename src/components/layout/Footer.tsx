import Link from "next/link";
import SocialLinks from "@/components/layout/SocialLinks";
import SiteImage from "@/components/ui/SiteImage";
import { siteContact } from "@/lib/siteContact";

export default function Footer() {
  return (
    <footer id="footer" className="footer light-background">
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6 footer-about">
            <Link href="/" className="logo d-flex align-items-center">
              <SiteImage
                src={siteContact.logo}
                alt={siteContact.shortName}
                width={72}
                height={72}
                autoSize
              />
              <span className="sitename">{siteContact.shortName}</span>
            </Link>
            <p className="footer-brand-name mb-0">{siteContact.name}</p>
            <div className="footer-contact pt-3">
              <p>{siteContact.address.line1}</p>
              <p>{siteContact.address.line2}</p>
              <p className="mt-3">
                <strong>Phone:</strong>{" "}
                <a href={`tel:${siteContact.phones.telRakesh}`}>{siteContact.phones.display}</a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>
              </p>
            </div>
            <SocialLinks className="d-flex mt-4" />
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About us</Link>
              </li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/appointment">Appointment</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li>
                <Link href="/services">Medical Care</Link>
              </li>
              <li>
                <Link href="/departments">Colorectal Disease</Link>
              </li>
              <li>
                <Link href="/doctors">Doctors</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/gallery">Gallery</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Contact Us</h4>
            <ul>
              <li>
                <a href={`tel:${siteContact.phones.telRakesh}`}>9817073670</a>
              </li>
              <li>
                <a href={`tel:${siteContact.phones.telBinay}`}>9861555976</a>
              </li>
              <li>
                <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>
          © <span>Copyright</span>{" "}
          <strong className="px-1 sitename">NationalColorectalSurgeon</strong>{" "}
          <span>All Rights Reserved</span>
        </p>
        <div className="credits">
          Design By:{" "}
          <a href="https://rakeshsahani.com.np/" target="_blank" rel="noopener noreferrer">
            Rakesh Kumar Sahani
          </a>
        </div>
      </div>
    </footer>
  );
}
