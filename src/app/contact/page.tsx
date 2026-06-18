import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import ContactSection from "@/components/sections/ContactSection";
import { getContactDepartments } from "@/lib/appointmentOptions";
import { publicPageSeo } from "@/lib/seo";

export const metadata: Metadata = publicPageSeo.contact;
export const revalidate = 60;

export default async function ContactPage() {
  const departments = await getContactDepartments();

  return (
    <>
      <PageTitle title="Contact" />
      <ContactSection departments={departments} simpleFieldIds />
    </>
  );
}
