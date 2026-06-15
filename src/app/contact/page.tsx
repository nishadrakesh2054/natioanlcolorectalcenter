import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import ContactSection from "@/components/sections/ContactSection";
import { publicPageSeo } from "@/lib/seo";

export const metadata: Metadata = publicPageSeo.contact;
export const revalidate = 300;

export default function ContactPage() {
  return (
    <>
      <PageTitle title="Contact" />
      <ContactSection />
    </>
  );
}
