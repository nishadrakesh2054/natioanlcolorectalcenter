import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import DiseaseCardGrid from "@/components/sections/DiseaseCardGrid";
import { publicPageSeo } from "@/lib/seo";
import { fetchColorectalDiseases } from "@/lib/supabase/fetch-content";

export const metadata: Metadata = publicPageSeo.colorectalDisease;
export const revalidate = 60;

export default async function ColorectalDiseasePage() {
  const diseases = await fetchColorectalDiseases();

  return (
    <>
      <PageTitle title="Colorectal Disease" />
      <section className="crc-disease-index section light-background">
        <div className="container" data-aos="fade-up">
          <p className="crc-disease-index-intro">
            Browse colorectal conditions treated at NCRC, or choose one from the{" "}
            <strong>Colorectal Disease</strong> menu in the header.
          </p>
          <DiseaseCardGrid diseases={diseases} />
        </div>
      </section>
    </>
  );
}
