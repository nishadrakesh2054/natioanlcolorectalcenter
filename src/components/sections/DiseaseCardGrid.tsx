import Link from "next/link";
import SiteImage from "@/components/ui/SiteImage";
import {
  COLORECTAL_DISEASE_INDEX_PATH,
  getColorectalDiseasePath,
  truncateText,
} from "@/lib/disease-utils";
import { getDiseaseImages } from "@/lib/types/colorectal-disease";
import type { ColorectalDisease } from "@/lib/types/colorectal-disease";

type DiseaseCardGridProps = {
  diseases: ColorectalDisease[];
  showFooterLink?: boolean;
};

export default function DiseaseCardGrid({
  diseases,
  showFooterLink = false,
}: DiseaseCardGridProps) {
  return (
    <>
      <div className="row gy-4 disease-card-grid">
        {diseases.map((disease, index) => {
          const coverImage = getDiseaseImages(disease)[0] ?? "";
          const title = disease.title.trim();
          const href = getColorectalDiseasePath(disease.slug);

          return (
            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay={(index % 3) * 100 + 100}
              key={disease.id}
            >
              <article className="disease-card h-100">
                <Link href={href} className="disease-card-media" aria-label={`View ${title}`}>
                  {coverImage ? (
                    <SiteImage
                      src={coverImage}
                      alt={title}
                      width={480}
                      height={280}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      fluid
                    />
                  ) : (
                    <div className="disease-card-media-placeholder" aria-hidden="true">
                      <i className="bi bi-heart-pulse"></i>
                    </div>
                  )}
                  {disease.category.trim() && (
                    <span className="disease-card-category">{disease.category.trim()}</span>
                  )}
                </Link>

                <div className="disease-card-body">
                  <h3>
                    <Link href={href}>{title}</Link>
                  </h3>
                  <p>{truncateText(disease.description, 110)}</p>
                  <Link href={href} className="disease-card-link">
                    Learn more
                    <i className="bi bi-arrow-right" aria-hidden="true"></i>
                  </Link>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      {showFooterLink && (
        <div className="disease-card-grid-footer text-center">
          <Link href={COLORECTAL_DISEASE_INDEX_PATH} className="cta-btn cta-btn-outline">
            View all diseases
          </Link>
        </div>
      )}
    </>
  );
}
