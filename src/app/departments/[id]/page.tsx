import { notFound, redirect } from "next/navigation";
import { getColorectalDiseasePath } from "@/lib/disease-utils";
import { fetchColorectalDiseaseById } from "@/lib/supabase/fetch-content";

type LegacyDiseaseDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function LegacyDiseaseDetailPage({ params }: LegacyDiseaseDetailPageProps) {
  const { id } = await params;
  const disease = await fetchColorectalDiseaseById(Number(id));

  if (!disease) {
    notFound();
  }

  redirect(getColorectalDiseasePath(disease.slug));
}
