"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import type { CaseService } from "@/lib/types/case-service";
import SiteImage from "@/components/ui/SiteImage";

type ServicesBrowseSectionProps = {
  services: CaseService[];
};

type ServiceDetailGroup = {
  title: string;
  icon: string;
  items: string[];
};

function getServiceGroups(service: CaseService): ServiceDetailGroup[] {
  const groups: ServiceDetailGroup[] = [];

  if (service.symptoms?.length) {
    groups.push({ title: "Symptoms", icon: "bi bi-heart-pulse", items: service.symptoms });
  }

  if (service.procedures?.length) {
    groups.push({ title: "Procedures", icon: "bi bi-clipboard2-pulse", items: service.procedures });
  }

  if (service.risks?.length) {
    groups.push({ title: "Risks", icon: "bi bi-exclamation-triangle", items: service.risks });
  }

  return groups;
}

export default function ServicesBrowseSection({ services }: ServicesBrowseSectionProps) {
  const [activeId, setActiveId] = useState(services[0]?.id ?? 1);
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const activeService =
    services.find((service) => service.id === activeId) ?? services[0];
  const detailGroups = activeService ? getServiceGroups(activeService) : [];

  useLayoutEffect(() => {
    const updateLayout = () => {
      const nav = navRef.current;
      const panel = panelRef.current;

      if (!nav || !panel) {
        return;
      }

      const isMobile = window.matchMedia("(max-width: 991px)").matches;
      const navHeight = nav.offsetHeight;

      if (isMobile) {
        panel.style.minHeight = "";
        panel.style.height = "";
      } else {
        panel.style.minHeight = `${navHeight}px`;
        panel.style.height = `${navHeight}px`;
      }
    };

    updateLayout();

    const nav = navRef.current;
    const observer = nav ? new ResizeObserver(updateLayout) : null;
    if (nav && observer) {
      observer.observe(nav);
    }

    window.addEventListener("resize", updateLayout);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateLayout);
    };
  }, [activeId]);

  return (
    <section id="services" className="services section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Services</h2>
        <p>
          Comprehensive colorectal diagnostic and treatment services at National Colorectal
          Center.
        </p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="colorectal-disease-layout services-browse-layout">
          <nav ref={navRef} className="colorectal-disease-nav" aria-label="NCRC services">
            {services.map((service, index) => (
              <button
                key={service.id}
                type="button"
                className={`colorectal-disease-nav-item${
                  activeId === service.id ? " active" : ""
                }`}
                aria-current={activeId === service.id ? "true" : undefined}
                onClick={() => setActiveId(service.id)}
              >
                <span className="colorectal-disease-nav-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="colorectal-disease-nav-label">{service.title}</span>
                <i
                  className="bi bi-chevron-right colorectal-disease-nav-arrow"
                  aria-hidden="true"
                ></i>
              </button>
            ))}
          </nav>

          <div ref={panelRef} className="colorectal-disease-panel services-browse-panel">
            {activeService && (
            <div ref={bodyRef} className="services-browse-panel-body">
              <div className="services-browse-hero">
                <div className="services-browse-icon">
                  <SiteImage
                    src={activeService.icon}
                    alt=""
                    width={72}
                    height={72}
                    aria-hidden
                  />
                </div>
                <div>
                  <span className="services-browse-label">NCRC Service</span>
                  <h3>{activeService.title}</h3>
                </div>
              </div>

              <p className="services-browse-summary">{activeService.description}</p>

              {activeService.recoveryTime && (
                <div className="services-browse-recovery">
                  <i className="bi bi-clock" aria-hidden="true"></i>
                  <div>
                    <span>Recovery Time</span>
                    <strong>{activeService.recoveryTime}</strong>
                  </div>
                </div>
              )}

              {detailGroups.length > 0 && (
                <div className="services-browse-groups">
                  {detailGroups.map((group) => (
                    <article className="services-browse-group" key={group.title}>
                      <div className="services-browse-group-head">
                        <i className={group.icon} aria-hidden="true"></i>
                        <h4>{group.title}</h4>
                      </div>
                      <ul>
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              )}

              <div className="services-browse-actions">
                <Link href={`/services/${activeService.id}`} className="cta-btn">
                  View Full Details
                </Link>
                <Link href="/appointment" className="cta-btn cta-btn-outline">
                  Book Appointment
                </Link>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
