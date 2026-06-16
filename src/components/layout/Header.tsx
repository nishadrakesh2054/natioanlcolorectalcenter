"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialLinks from "@/components/layout/SocialLinks";
import SiteImage from "@/components/ui/SiteImage";
import { siteContact } from "@/lib/siteContact";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/departments", label: "Colorectal Disease" },
  { href: "/services", label: "Services" },
  { href: "/doctors", label: "Doctors" },
  { href: "/blogs", label: "Blogs" },
  { href: "/case-study", label: "Case Study" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header id="header" className="header sticky-top">
      <div className="topbar d-flex align-items-center">
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <i className="bi bi-envelope d-flex align-items-center" aria-hidden="true">
              <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>
            </i>
            <i className="bi bi-phone d-flex align-items-center ms-4" aria-hidden="true">
              <a href={`tel:${siteContact.phones.telBinay}`}>{siteContact.phones.header}</a>
            </i>
          </div>
          <SocialLinks className="d-none d-md-flex align-items-center" />
        </div>
      </div>

      <div className="branding d-flex align-items-center">
        <div className="container position-relative d-flex align-items-center justify-content-between">
          <Link href="/" className="logo d-flex align-items-center me-auto">
            <SiteImage
              src={siteContact.logo}
              alt={siteContact.shortName}
              width={80}
              height={80}
              autoSize
            />
            <span className="sitename site-brand-name">
              <span className="site-brand-line">{siteContact.headerBrand.line1}</span>
              <span className="site-brand-line">{siteContact.headerBrand.line2}</span>
            </span>
          </Link>

          <nav id="navmenu" className="navmenu" aria-label="Primary navigation">
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={isActive(item.href) ? "active" : ""}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mobile-nav-toggle d-xl-none bi bi-list"
              aria-label="Open menu"
              aria-expanded="false"
              aria-controls="navmenu"
            />
          </nav>

          <Link className="cta-btn d-none d-sm-block" href="/appointment">
            Make an Appointment
          </Link>
        </div>
      </div>
    </header>
  );
}
