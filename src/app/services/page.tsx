import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import ServicesBrowseSection from "@/components/sections/ServicesBrowseSection";
import { publicPageSeo } from "@/lib/seo";
import { fetchServices } from "@/lib/supabase/fetch-content";

export const metadata: Metadata = publicPageSeo.services;
export const revalidate = 60;

export default async function ServicesPage() {
  const services = await fetchServices();

  return (
    <>
      <PageTitle title="Services" />
      <ServicesBrowseSection services={services} />
    </>
  );
}
