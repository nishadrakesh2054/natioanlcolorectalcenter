import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminShell from "@/components/admin/AdminShell";
import { listRecords } from "@/lib/admin/queries";
import { requireAdminUser } from "@/lib/admin/auth";
import { getAdminResource, isInboxResource } from "@/lib/admin/resources";

type ResourcePageProps = {
  params: Promise<{ resource: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { resource: slug } = await params;
  const resource = getAdminResource(slug);
  return {
    title: resource ? `${resource.labelPlural} | Dashboard` : "Dashboard",
    robots: { index: false, follow: false },
  };
}

export default async function ResourceListPage({ params }: ResourcePageProps) {
  await requireAdminUser();
  const { resource: slug } = await params;
  const resource = getAdminResource(slug);

  if (!resource) {
    notFound();
  }

  const rows = await listRecords(slug);
  const inbox = isInboxResource(resource);

  return (
    <AdminShell
      title={resource.labelPlural}
      subtitle={
        inbox
          ? "Form submissions from the public website"
          : `Manage ${resource.label.toLowerCase()} content`
      }
    >
      <AdminDataTable resource={resource} rows={rows} />
    </AdminShell>
  );
}
