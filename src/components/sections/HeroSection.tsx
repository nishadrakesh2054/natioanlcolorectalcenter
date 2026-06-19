import Link from "next/link";
import { Fragment } from "react";
import SiteImage from "@/components/ui/SiteImage";
import { siteContact } from "@/lib/siteContact";

const careJourney = [
  {
    icon: "bi bi-person-check",
    title: "Consultation",
    text: "Your first visit with a specialist.",
  },
  {
    icon: "bi bi-shield-check",
    title: "Prevention",
    text: "Screening and early guidance.",
  },
  {
    icon: "bi bi-bandaid",
    title: "Treatment",
    text: "Care plans tailored to you.",
  },
  {
    icon: "bi bi-emoji-smile",
    title: "Recovery",
    text: "Follow-up until you're well.",
  },
];

export default function HeroSection() {
  return (
    <section id="hero" className="hero section light-background">
      <SiteImage
        src="/assets/img/hero-bg.jpg"
        alt="National Colorectal Center — expert colorectal care in Nepal"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={85}
        data-aos="fade-in"
      />

      <div className="container position-relative">
        <div className="content row gy-4">
          <div className="col-lg-8 col-md-11 d-flex align-items-stretch">
            <div className="hero-panel" data-aos="fade-up" data-aos-delay="150">
              <div className="hero-brand" aria-label={siteContact.name}>
                <span className="hero-brand-line">{siteContact.name}</span>
              </div>

              <h1 className="hero-heading pb-3">
                Expert colorectal care you can trust.
              </h1>

            

              <div className="hero-journey" aria-label="Patient care journey">
                {careJourney.map((step, index) => (
                  <Fragment key={step.title}>
                    <div className="hero-journey-step">
                      <div className="hero-journey-icon" aria-hidden="true">
                        <i className={step.icon}></i>
                      </div>
                      <strong>{step.title}</strong>
                      <span>{step.text}</span>
                    </div>
                    {index < careJourney.length - 1 && (
                      <div className="hero-journey-connector" aria-hidden="true">
                        <span className="hero-journey-line"></span>
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>

              <div className="hero-actions">
                <Link href="/appointment" className="hero-btn hero-btn-primary">
                  Book Appointment
                </Link>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
