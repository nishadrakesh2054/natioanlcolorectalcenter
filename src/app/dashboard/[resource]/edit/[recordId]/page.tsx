import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResourceForm from "@/components/admin/ResourceForm";
import AdminShell from "@/components/admin/AdminShell";
import { getRecord } from "@/lib/admin/queries";
import { requireAdminUser } from "@/lib/admin/auth";
import { getAdminResource, isInboxResource, recordToFormValues } from "@/lib/admin/resources";

type EditResourcePageProps = {
  params: Promise<{ resource: string; recordId: string }>;
};

export const dynamic = "force-dynamic";

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
  const { resource: slug, recordId } = await params;
  const resource = getAdminResource(slug);

  if (!resource || !recordId) {
    notFound();
  }

  const record = await getRecord(slug, recordId);

  if (!record) {
    notFound();
  }

  const inbox = isInboxResource(resource);

  return (
    <AdminShell
      title={inbox ? `View ${resource.label}` : `Edit ${resource.label}`}
      subtitle={
        inbox
          ? "Read-only submission from the website contact or appointment form"
          : "Update content and save to publish changes on the website"
      }
    >
      <ResourceForm
        resource={resource}
        mode="edit"
        recordId={recordId}
        initialValues={recordToFormValues(resource, record)}
      />
    </AdminShell>
  );
}
