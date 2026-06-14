import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export const metadata: Metadata = {
  title: "Testimonials",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageTitle title="Testimonials" />
      <TestimonialsSection />
    </>
  );
}
