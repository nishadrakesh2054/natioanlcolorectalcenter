import Link from "next/link";
import DiseaseDetailContent from "@/components/sections/DiseaseDetailContent";
import SiteImage from "@/components/ui/SiteImage";
import { COLORECTAL_DISEASE_INDEX_PATH } from "@/lib/disease-utils";
import { getDiseaseImageSlots } from "@/lib/types/colorectal-disease";
import type { ColorectalDisease } from "@/lib/types/colorectal-disease";

type ColorectalDiseaseDetailSectionProps = {
  disease: ColorectalDisease;
};

export default function ColorectalDiseaseDetailSection({
  disease,
}: ColorectalDiseaseDetailSectionProps) {
  const imageSlots = getDiseaseImageSlots(disease);
  const title = disease.title.trim();

  return (
    <section className="crc-disease-detail section light-background">
      <div className="container">
   

        <div className="row g-3 crc-disease-detail-images" data-aos="fade-up" data-aos-delay="50">
          {imageSlots.map((src, index) => (
            <div className="col-6 col-lg-3" key={`${title}-image-${index}`}>
              <figure className="crc-disease-detail-image-card">
                {src ? (
                  <SiteImage
                    src={src}
                    alt=""
                    width={360}
                    height={270}
                    className="crc-disease-detail-image"
                  />
                ) : (
                  <div className="crc-disease-detail-image-placeholder" aria-hidden="true">
                    <i className="bi bi-image"></i>
                  </div>
                )}
              </figure>
            </div>
          ))}
        </div>

        <div className="crc-disease-detail-intro" data-aos="fade-up" data-aos-delay="100">
          <div className="crc-disease-detail-intro-icon" aria-hidden="true">
            <i className="bi bi-clipboard2-pulse"></i>
          </div>
          <div className="crc-disease-detail-intro-copy">
            <span className="crc-disease-detail-intro-label">Overview</span>
            <p>{disease.description}</p>
          </div>
        </div>

        <div className="crc-disease-detail-actions" data-aos="fade-up" data-aos-delay="120">
          <Link href="/appointment" className="cta-btn">
            <i className="bi bi-calendar-check" aria-hidden="true"></i>
            Book Appointment
          </Link>
          <Link href={COLORECTAL_DISEASE_INDEX_PATH} className="cta-btn cta-btn-outline">
            <i className="bi bi-grid" aria-hidden="true"></i>
            All Conditions
          </Link>
        </div>

        <div className="crc-disease-detail-content" data-aos="fade-up" data-aos-delay="150">
          <DiseaseDetailContent disease={disease} variant="crc" />
        </div>
      </div>
    </section>
  );
}
