import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResourceForm from "@/components/admin/ResourceForm";
import AdminShell from "@/components/admin/AdminShell";
import { getRecord } from "@/lib/admin/actions";
import { requireAdminUser } from "@/lib/admin/auth";
import { getAdminResource, recordToFormValues } from "@/lib/admin/resources";

type EditResourcePageProps = {
  params: Promise<{ resource: string; id: string }>;
};

export async function generateMetadata({ params }: EditResourcePageProps): Promise<Metadata> {
  const { resource: slug } = await params;
  const resource = getAdminResource(slug);
  return {
    title: resource ? `Edit ${resource.label} | Dashboard` : "Dashboard",
    robots: { index: false, follow: false },
  };
}

export default async function EditResourcePage({ params }: EditResourcePageProps) {
  await requireAdminUser();
  const { resource: slug, id } = await params;
  const resource = getAdminResource(slug);

  if (!resource) {
    notFound();
  }

  const record = await getRecord(slug, Number(id));

  if (!record) {
    notFound();
  }

  return (
    <AdminShell title={`Edit ${resource.label}`}>
      <ResourceForm
        resource={resource}
        mode="edit"
        recordId={Number(id)}
        initialValues={recordToFormValues(resource, record)}
      />
    </AdminShell>
  );
}
