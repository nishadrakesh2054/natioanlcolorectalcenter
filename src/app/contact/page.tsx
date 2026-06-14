import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <PageTitle title="Contact" />
      <ContactSection />
    </>
  );
}
