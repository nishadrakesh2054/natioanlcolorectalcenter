import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResourceForm from "@/components/admin/ResourceForm";
import AdminShell from "@/components/admin/AdminShell";
import { requireAdminUser } from "@/lib/admin/auth";
import { defaultFormValues, getAdminResource } from "@/lib/admin/resources";

type NewResourcePageProps = {
  params: Promise<{ resource: string }>;
};

export async function generateMetadata({ params }: NewResourcePageProps): Promise<Metadata> {
  const { resource: slug } = await params;
  const resource = getAdminResource(slug);
  return {
    title: resource ? `Add ${resource.label} | Dashboard` : "Dashboard",
    robots: { index: false, follow: false },
  };
}

export default async function NewResourcePage({ params }: NewResourcePageProps) {
  await requireAdminUser();
  const { resource: slug } = await params;
  const resource = getAdminResource(slug);

  if (!resource) {
    notFound();
  }

  return (
    <AdminShell title={`Add ${resource.label}`}>
      <ResourceForm
        resource={resource}
        mode="create"
        initialValues={defaultFormValues(resource)}
      />
    </AdminShell>
  );
}
