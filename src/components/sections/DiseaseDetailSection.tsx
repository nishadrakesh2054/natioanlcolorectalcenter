import Link from "next/link";
import SocialLinks from "@/components/layout/SocialLinks";
import DiseaseDetailContent from "@/components/sections/DiseaseDetailContent";
import SiteImage from "@/components/ui/SiteImage";
import type { ColorectalDisease } from "@/lib/types/colorectal-disease";

type DiseaseDetailSectionProps = {
  disease: ColorectalDisease;
};

export default function DiseaseDetailSection({ disease }: DiseaseDetailSectionProps) {
  return (
    <section className="service-detail section light-background">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4" data-aos="fade-up">
            <aside className="service-detail-sidebar">
              <div className="service-detail-hero">
                <div className="disease-detail-photo">
                  <SiteImage src={disease.image} alt={disease.title.trim()} width={320} height={320} fluid />
                </div>
                <span className="service-detail-label">Colorectal Disease</span>
                <h3>{disease.title.trim()}</h3>
                <p>{disease.description}</p>

                <div className="doctor-detail-social-links">
                  <p className="doctor-detail-social-title">Connect on Social Media</p>
                  <SocialLinks />
                </div>

                <div className="service-detail-actions">
                  <Link href="/appointment" className="cta-btn">
                    Make an Appointment
                  </Link>
                  <Link href="/departments" className="cta-btn cta-btn-outline">
                    All Diseases
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          <div className="col-lg-8" data-aos="fade-up" data-aos-delay="100">
            <DiseaseDetailContent disease={disease} />
          </div>
        </div>
      </div>
    </section>
  );
}
