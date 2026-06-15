import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import FaqSection from "@/components/sections/FaqSection";
import { JsonLd, faqPageJsonLd } from "@/components/seo/JsonLd";
import { publicPageSeo } from "@/lib/seo";
import { fetchFaqs } from "@/lib/supabase/fetch-content";

export const metadata: Metadata = publicPageSeo.faq;
export const revalidate = 300;

export default async function FaqPage() {
  const items = await fetchFaqs();

  return (
    <>
      <JsonLd data={faqPageJsonLd(items)} />
      <PageTitle title="FAQ" />
      <FaqSection items={items} />
    </>
  );
}
