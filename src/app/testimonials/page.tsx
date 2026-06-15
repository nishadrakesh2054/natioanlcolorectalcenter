import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { publicPageSeo } from "@/lib/seo";
import { fetchTestimonials } from "@/lib/supabase/fetch-content";

export const metadata: Metadata = publicPageSeo.testimonials;
export const revalidate = 300;

export default async function TestimonialsPage() {
  const items = await fetchTestimonials();

  return (
    <>
      <PageTitle title="Testimonials" />
      <TestimonialsSection items={items} />
    </>
  );
}
