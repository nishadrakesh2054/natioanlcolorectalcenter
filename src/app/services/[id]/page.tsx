import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTitle from "@/components/layout/PageTitle";
import ServiceDetailSection from "@/components/sections/ServiceDetailSection";
import { JsonLd, breadcrumbJsonLd, medicalWebPageJsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import { fetchServiceById, fetchServices } from "@/lib/supabase/fetch-content";

type ServiceDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const services = await fetchServices();
  return services.map((service) => ({ id: String(service.id) }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const service = await fetchServiceById(Number(id));

  if (!service) {
    return { title: "Service Not Found" };
  }

  return createPageMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.id}`,
    image: service.icon,
    keywords: [service.title, "NCRC service", "colorectal care Nepal"],
  });
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { id } = await params;
  const service = await fetchServiceById(Number(id));

  if (!service) {
    notFound();
  }

  const path = `/services/${service.id}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path },
          ]),
          medicalWebPageJsonLd({
            title: service.title,
            description: service.description,
            path,
            image: service.icon,
          }),
        ]}
      />
      <PageTitle
        title={service.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      />
      <ServiceDetailSection service={service} />
    </>
  );
}
