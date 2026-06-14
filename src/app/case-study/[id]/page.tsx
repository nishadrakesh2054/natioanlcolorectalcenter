import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTitle from "@/components/layout/PageTitle";
import ArticleDetailSection from "@/components/sections/ArticleDetailSection";
import { caseStudies, formatCaseStudyDate, getCaseStudyById } from "@/lib/caseStudies";

type CaseStudyDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ id: String(study.id) }));
}

export async function generateMetadata({ params }: CaseStudyDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const study = getCaseStudyById(Number(id));

  if (!study) {
    return { title: "Case Study Not Found" };
  }

  return {
    title: study.title,
    description: study.excerpt,
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const { id } = await params;
  const study = getCaseStudyById(Number(id));

  if (!study) {
    notFound();
  }

  return (
    <>
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
          { icon: "bi bi-calendar", label: "Published", value: formatCaseStudyDate(study.publishedAt) },
        ]}
        content={study.content}
        blocks={study.blocks}
        backHref="/case-study"
        backLabel="All Case Studies"
      />
    </>
  );
}
