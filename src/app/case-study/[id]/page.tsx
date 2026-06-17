import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTitle from "@/components/layout/PageTitle";
import ArticleDetailSection from "@/components/sections/ArticleDetailSection";
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata, resolveImageUrl } from "@/lib/seo";
import { formatCaseStudyDate } from "@/lib/types/case-study";
import { fetchCaseStudies, fetchCaseStudyById } from "@/lib/supabase/fetch-content";

type CaseStudyDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const studies = await fetchCaseStudies();
  return studies.map((study) => ({ id: String(study.id) }));
}

export async function generateMetadata({
  params,
}: CaseStudyDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const study = await fetchCaseStudyById(Number(id));

  if (!study) {
    return { title: "Case Study Not Found" };
  }

  return createPageMetadata({
    title: study.seo.metaTitle,
    description: study.seo.metaDescription,
    path: study.seo.canonicalPath,
    keywords: study.seo.metaKeywords,
    image: study.seo.ogImage,
    openGraphType: "article",
  });
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const { id } = await params;
  const study = await fetchCaseStudyById(Number(id));

  if (!study) {
    notFound();
  }

  const path = `/case-study/${study.id}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Case Study", path: "/case-study" },
            { name: study.title, path },
          ]),
          articleJsonLd({
            title: study.title,
            description: study.excerpt,
            path,
            image: resolveImageUrl(study.seo.ogImage),
            datePublished: study.publishedAt,
            author: study.doctor,
          }),
        ]}
      />
      <PageTitle
        title={study.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Case Study", href: "/case-study" },
        ]}
      />
      <ArticleDetailSection
        label="NCRC Case Study"
        title={study.title}
        image={study.image}
        imageAlt={study.title}
        summary={study.excerpt}
        meta={[
          { icon: "bi bi-person", label: "Patient Profile", value: study.patientProfile },
          { icon: "bi bi-heart-pulse", label: "Condition", value: study.condition },
          { icon: "bi bi-person-badge", label: "Lead Doctor", value: study.doctor },
          {
            icon: "bi bi-calendar",
            label: "Published",
            value: formatCaseStudyDate(study.publishedAt),
          },
        ]}
        content={study.content}
        blocks={study.blocks}
        backHref="/case-study"
        backLabel="All Case Studies"
      />
    </>
  );
}
