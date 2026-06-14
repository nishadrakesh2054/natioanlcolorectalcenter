import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTitle from "@/components/layout/PageTitle";
import DiseaseDetailSection from "@/components/sections/DiseaseDetailSection";
import {
  colorectalDiseases,
  getColorectalDiseaseById,
} from "@/lib/colorectalDiseases";

type DiseaseDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return colorectalDiseases.map((disease) => ({ id: String(disease.id) }));
}

export async function generateMetadata({ params }: DiseaseDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const disease = getColorectalDiseaseById(Number(id));

  if (!disease) {
    return { title: "Disease Not Found" };
  }

  return {
    title: disease.title.trim(),
    description: disease.description,
  };
}

export default async function DiseaseDetailPage({ params }: DiseaseDetailPageProps) {
  const { id } = await params;
  const disease = getColorectalDiseaseById(Number(id));

  if (!disease) {
    notFound();
  }

  return (
    <>
      <PageTitle
        title={disease.title.trim()}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Colorectal Disease", href: "/departments" },
        ]}
      />
      <DiseaseDetailSection disease={disease} />
    </>
  );
}
