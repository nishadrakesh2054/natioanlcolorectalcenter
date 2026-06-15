import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTitle from "@/components/layout/PageTitle";
import DiseaseDetailSection from "@/components/sections/DiseaseDetailSection";
import { JsonLd, breadcrumbJsonLd, medicalWebPageJsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import {
  fetchColorectalDiseaseById,
  fetchColorectalDiseases,
} from "@/lib/supabase/fetch-content";

type DiseaseDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const revalidate = 300;

export async function generateStaticParams() {
  const diseases = await fetchColorectalDiseases();
  return diseases.map((disease) => ({ id: String(disease.id) }));
}

export async function generateMetadata({ params }: DiseaseDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const disease = await fetchColorectalDiseaseById(Number(id));

  if (!disease) {
    return { title: "Disease Not Found" };
  }

  return createPageMetadata({
    title: disease.title.trim(),
    description: disease.description,
    path: `/departments/${disease.id}`,
    image: disease.image,
    keywords: [disease.title, disease.category, "colorectal disease", "NCRC"],
  });
}

export default async function DiseaseDetailPage({ params }: DiseaseDetailPageProps) {
  const { id } = await params;
  const disease = await fetchColorectalDiseaseById(Number(id));

  if (!disease) {
    notFound();
  }

  const path = `/departments/${disease.id}`;
  const title = disease.title.trim();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Colorectal Disease", path: "/departments" },
            { name: title, path },
          ]),
          medicalWebPageJsonLd({
            title,
            description: disease.description,
            path,
            image: disease.image,
          }),
        ]}
      />
      <PageTitle
        title={title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Colorectal Disease", href: "/departments" },
        ]}
      />
      <DiseaseDetailSection disease={disease} />
    </>
  );
}
