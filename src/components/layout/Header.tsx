"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import SocialLinks from "@/components/layout/SocialLinks";
import SiteImage from "@/components/ui/SiteImage";
import {
  DOCTORS_INDEX_PATH,
  getDoctorsSpecialtyPath,
} from "@/lib/doctor-specialty";
import {
  COLORECTAL_DISEASE_INDEX_PATH,
  getColorectalDiseasePath,
} from "@/lib/disease-utils";
import { siteContact } from "@/lib/siteContact";
import type { DiseaseNavItem } from "@/lib/types/disease-nav";
import type { SpecialtyNavItem } from "@/lib/doctor-specialty";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blogs", label: "Blogs" },
  { href: "/case-study", label: "Case Study" },
  { href: "/contact", label: "Contact" },
];

type HeaderProps = {
  diseaseNav: DiseaseNavItem[];
  specialtyNav: SpecialtyNavItem[];
};

export default function Header({ diseaseNav, specialtyNav }: HeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isColorectalActive =
    pathname === COLORECTAL_DISEASE_INDEX_PATH ||
    pathname.startsWith(`${COLORECTAL_DISEASE_INDEX_PATH}/`);

  const activeDiseaseSlug =
    pathname.startsWith(`${COLORECTAL_DISEASE_INDEX_PATH}/`)
      ? pathname.slice(COLORECTAL_DISEASE_INDEX_PATH.length + 1).split("/")[0]
      : null;

  const isDoctorsActive = pathname === DOCTORS_INDEX_PATH || pathname.startsWith(`${DOCTORS_INDEX_PATH}/`);
  const activeSpecialtySlug = pathname === DOCTORS_INDEX_PATH ? searchParams.get("specialty") : null;

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
              <span className="site-brand-line site-brand-line--sub">{siteContact.headerBrand.line2}</span>
            </span>
          </Link>

          <nav id="navmenu" className="navmenu" aria-label="Primary navigation">
            <ul>
              {navItems.slice(0, 2).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={isActive(item.href) ? "active" : ""}>
                    {item.label}
                  </Link>
                </li>
              ))}

              <li className="dropdown disease-nav-dropdown">
                <Link href={COLORECTAL_DISEASE_INDEX_PATH} className={isColorectalActive ? "active" : ""}>
                  <span>Colorectal Disease</span>
                  <i className="bi bi-chevron-down toggle-dropdown" aria-hidden="true"></i>
                </Link>
                <ul>
                  {diseaseNav.map((disease) => (
                    <li key={disease.id}>
                      <Link
                        href={getColorectalDiseasePath(disease.slug)}
                        className={activeDiseaseSlug === disease.slug ? "active" : ""}
                      >
                        {disease.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li>
                <Link href="/services" className={isActive("/services") ? "active" : ""}>
                  Services
                </Link>
              </li>

              <li className="dropdown specialty-nav-dropdown">
                <Link
                  href={DOCTORS_INDEX_PATH}
                  className={isDoctorsActive && !activeSpecialtySlug ? "active" : isDoctorsActive ? "active" : ""}
                >
                  <span>Doctors</span>
                  <i className="bi bi-chevron-down toggle-dropdown" aria-hidden="true"></i>
                </Link>
                <ul>
                  {specialtyNav.map((specialty) => (
                    <li key={specialty.slug}>
                      <Link
                        href={getDoctorsSpecialtyPath(specialty.slug)}
                        className={activeSpecialtySlug === specialty.slug ? "active" : ""}
                      >
                        {specialty.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {navItems.slice(3).map((item) => (
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
