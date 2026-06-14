import Link from "next/link";
import SocialLinks from "@/components/layout/SocialLinks";
import SiteImage from "@/components/ui/SiteImage";

export type ArticleDetailMeta = {
  icon: string;
  label: string;
  value: string;
};

export type ArticleDetailBlock = {
  title: string;
  icon: string;
  items: string[];
};

type ArticleDetailSectionProps = {
  label: string;
  title: string;
  image: string;
  imageAlt: string;
  summary: string;
  meta: ArticleDetailMeta[];
  content: string[];
  blocks?: ArticleDetailBlock[];
  tags?: string[];
  backHref: string;
  backLabel: string;
};

export default function ArticleDetailSection({
  label,
  title,
  image,
  imageAlt,
  summary,
  meta,
  content,
  blocks = [],
  tags = [],
  backHref,
  backLabel,
}: ArticleDetailSectionProps) {
  return (
    <section className="article-detail section light-background">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4" data-aos="fade-up">
            <aside className="article-detail-sidebar">
              <div className="article-detail-hero">
                <div className="article-detail-image">
                  <SiteImage src={image} alt={imageAlt} width={640} height={480} fluid />
                </div>
                <span className="article-detail-label">{label}</span>
                <h3>{title}</h3>
                <p>{summary}</p>

                <div className="article-detail-meta-list">
                  {meta.map((item) => (
                    <div className="article-detail-highlight" key={item.label}>
                      <i className={item.icon} aria-hidden="true"></i>
                      <div>
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                      </div>
                    </div>
                  ))}
                </div>

                {tags.length > 0 && (
                  <div className="article-detail-tags">
                    {tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                )}

                <div className="doctor-detail-social-links">
                  <p className="doctor-detail-social-title">Connect on Social Media</p>
                  <SocialLinks />
                </div>

                <div className="article-detail-actions">
                  <Link href="/appointment" className="cta-btn">
                    Make an Appointment
                  </Link>
                  <Link href={backHref} className="cta-btn cta-btn-outline">
                    {backLabel}
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          <div className="col-lg-8" data-aos="fade-up" data-aos-delay="100">
            <div className="article-detail-content">
              {content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {blocks.length > 0 && (
              <div className="row gy-4 mt-1">
                {blocks.map((block) => (
                  <div className="col-md-6" key={block.title}>
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
