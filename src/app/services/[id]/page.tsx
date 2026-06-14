import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTitle from "@/components/layout/PageTitle";
import ServiceDetailSection from "@/components/sections/ServiceDetailSection";
import { caseServices, getCaseServiceById } from "@/lib/caseServices";

type ServiceDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return caseServices.map((service) => ({ id: String(service.id) }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const service = getCaseServiceById(Number(id));

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { id } = await params;
  const service = getCaseServiceById(Number(id));

  if (!service) {
    notFound();
  }

  return (
    <>
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
