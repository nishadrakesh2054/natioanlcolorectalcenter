import { redirect } from "next/navigation";
import {
  COLORECTAL_DISEASE_INDEX_PATH,
  getColorectalDiseasePath,
} from "@/lib/disease-utils";
import { fetchColorectalDiseaseById } from "@/lib/supabase/fetch-content";

type LegacyDepartmentsPageProps = {
  searchParams: Promise<{ disease?: string }>;
};

export default async function LegacyDepartmentsPage({
  searchParams,
}: LegacyDepartmentsPageProps) {
  const { disease } = await searchParams;

  if (disease) {
    const record = await fetchColorectalDiseaseById(Number(disease));
    if (record) {
      redirect(getColorectalDiseasePath(record.slug));
    }
  }

  redirect(COLORECTAL_DISEASE_INDEX_PATH);
}
