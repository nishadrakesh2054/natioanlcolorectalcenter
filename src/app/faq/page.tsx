import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import FaqSection from "@/components/sections/FaqSection";

export const metadata: Metadata = {
  title: "FAQ",
};

export default function FaqPage() {
  return (
    <>
      <PageTitle title="FAQ" />
      <FaqSection />
    </>
  );
}
