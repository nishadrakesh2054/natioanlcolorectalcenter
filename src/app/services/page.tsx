import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import ServicesSection from "@/components/sections/ServicesSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "NCRC services including colonoscopy, endoscopy, anal manometry, CRC screening, biofeedback, laser surgery, and more.",
};

export default function ServicesPage() {
  return (
    <>
      <PageTitle title="Services" />
      <ServicesSection />
    </>
  );
}
