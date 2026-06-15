import Link from "next/link";
import SocialLinks from "@/components/layout/SocialLinks";
import SiteImage from "@/components/ui/SiteImage";
import type { CaseService } from "@/lib/types/case-service";

type DetailBlock = {
  title: string;
  icon: string;
  items: string[];
};

type ServiceDetailSectionProps = {
  service: CaseService;
};

function buildDetailBlocks(service: CaseService): DetailBlock[] {
  const blocks: DetailBlock[] = [];

  if (service.symptoms?.length) {
    blocks.push({
      title: "Symptoms",
      icon: "bi bi-heart-pulse",
      items: service.symptoms,
    });
  }

  if (service.procedures?.length) {
    blocks.push({
      title: "Procedures",
      icon: "bi bi-person-badge",
      items: service.procedures,
    });
  }

  if (service.risks?.length) {
    blocks.push({
      title: "Risks",
      icon: "bi bi-exclamation-triangle",
      items: service.risks,
    });
  }

  return blocks;
}

export default function ServiceDetailSection({ service }: ServiceDetailSectionProps) {
  const blocks = buildDetailBlocks(service);

  return (
    <section className="service-detail section light-background">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4" data-aos="fade-up">
            <aside className="service-detail-sidebar">
              <div className="service-detail-hero">
                <div className="service-detail-hero-icon">
                  <SiteImage src={service.icon} alt={service.title} width={96} height={96} />
                </div>
                <span className="service-detail-label">NCRC Service</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>

                {service.recoveryTime && (
                  <div className="service-detail-highlight">
                    <i className="bi bi-clock" aria-hidden="true"></i>
                    <div>
                      <span>Recovery Time</span>
                      <strong>{service.recoveryTime}</strong>
                    </div>
                  </div>
                )}

                <div className="doctor-detail-social-links">
                  <p className="doctor-detail-social-title">Connect on Social Media</p>
                  <SocialLinks />
                </div>

                <div className="service-detail-actions">
                  <Link href="/appointment" className="cta-btn">
                    Make an Appointment
                  </Link>
                  <Link href="/services" className="cta-btn cta-btn-outline">
                    All Services
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          <div className="col-lg-8" data-aos="fade-up" data-aos-delay="100">
            {blocks.length > 0 ? (
              <div className="row gy-4">
                {blocks.map((block) => (
                  <div
                    className={`col-md-${blocks.length === 1 ? "12" : "6"}`}
                    key={block.title}
                  >
                    <article className="service-detail-block">
                      <div className="service-detail-block-head">
                        <i className={block.icon} aria-hidden="true"></i>
                        <h4>{block.title}</h4>
                      </div>
                      <ul>
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  </div>
                ))}
              </div>
            ) : (
              <div className="service-detail-overview">
                <h4>Overview</h4>
                <p className="mb-0">{service.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
