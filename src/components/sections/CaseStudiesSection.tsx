import Link from "next/link";
import SiteImage from "@/components/ui/SiteImage";
import { caseStudies, formatCaseStudyDate } from "@/lib/caseStudies";

export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="article-listing section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Case Studies</h2>
        <p>
          Sample clinical journeys showing how NCRC evaluates, treats, and follows up colorectal
          conditions.
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {caseStudies.map((study, index) => (
            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay={(index % 3) * 100 + 100}
              key={study.id}
            >
              <article className="article-listing-card h-100">
                <Link href={`/case-study/${study.id}`} className="article-listing-image">
                  <SiteImage src={study.image} alt={study.title} width={640} height={360} fluid />
                </Link>
                <div className="article-listing-body">
                  <div className="article-listing-meta">
                    <span>{formatCaseStudyDate(study.publishedAt)}</span>
                    <span>{study.condition}</span>
                  </div>
                  <h3>
                    <Link href={`/case-study/${study.id}`}>{study.title}</Link>
                  </h3>
                  <p>{study.excerpt}</p>
                  <div className="article-listing-footer">
                    <span>{study.doctor}</span>
                    <Link href={`/case-study/${study.id}`} className="article-listing-link">
                      View Case
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
