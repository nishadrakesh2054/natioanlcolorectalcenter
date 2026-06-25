import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTitle from "@/components/layout/PageTitle";
import ColorectalDiseaseDetailSection from "@/components/sections/ColorectalDiseaseDetailSection";
import { JsonLd, breadcrumbJsonLd, medicalWebPageJsonLd } from "@/components/seo/JsonLd";
import { getColorectalDiseasePath, COLORECTAL_DISEASE_INDEX_PATH } from "@/lib/disease-utils";
import { createPageMetadata } from "@/lib/seo";
import {
  fetchColorectalDiseaseBySlug,
  fetchColorectalDiseases,
} from "@/lib/supabase/fetch-content";

type ColorectalDiseaseDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const diseases = await fetchColorectalDiseases();
  return diseases.map((disease) => ({ slug: disease.slug }));
}

export async function generateMetadata({
  params,
}: ColorectalDiseaseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const disease = await fetchColorectalDiseaseBySlug(slug);

  if (!disease) {
    return { title: "Disease Not Found" };
  }

  const path = getColorectalDiseasePath(disease.slug);

  return createPageMetadata({
    title: disease.title.trim(),
    description: disease.description,
    path,
    image: disease.image,
    keywords: [disease.title, disease.category, "colorectal disease", "NCRC"],
  });
}

export default async function ColorectalDiseaseDetailPage({
  params,
}: ColorectalDiseaseDetailPageProps) {
  const { slug } = await params;
  const disease = await fetchColorectalDiseaseBySlug(slug);

  if (!disease) {
    notFound();
  }

  const path = getColorectalDiseasePath(disease.slug);
  const title = disease.title.trim();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Colorectal Disease", path: COLORECTAL_DISEASE_INDEX_PATH },
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
          { label: "Colorectal Disease", href: COLORECTAL_DISEASE_INDEX_PATH },
        ]}
      />
      <ColorectalDiseaseDetailSection disease={disease} />
    </>
  );
}
