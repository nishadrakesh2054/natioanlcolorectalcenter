import Link from "next/link";
import SiteImage from "@/components/ui/SiteImage";
import { caseServices } from "@/lib/caseServices";

export default function ServicesSection() {
  return (
    <section id="services" className="services section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Services</h2>
        <p>
          Comprehensive colorectal diagnostic and treatment services at National Colorectal
          Center.
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {caseServices.map((service, index) => (
            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay={(index % 3) * 100 + 100}
              key={service.id}
            >
              <div className="service-item position-relative">
                <div className="icon">
                  <SiteImage
                    src={service.icon}
                    alt=""
                    className="service-item-icon"
                    width={64}
                    height={64}
                    aria-hidden
                  />
                </div>
                <Link href={`/services/${service.id}`} className="stretched-link">
                  <h3>{service.title}</h3>
                </Link>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
