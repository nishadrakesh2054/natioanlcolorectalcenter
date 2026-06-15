import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import { requireAdminUser } from "@/lib/admin/auth";
import { adminResources } from "@/lib/admin/resources";
import { listRecords } from "@/lib/admin/actions";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  await requireAdminUser();

  const counts = await Promise.all(
    adminResources.map(async (resource) => ({
      resource,
      count: (await listRecords(resource.slug)).length,
    }))
  );

  return (
    <AdminShell title="Dashboard overview">
      <div className="admin-dashboard-grid">
        {counts.map(({ resource, count }) => (
          <Link key={resource.slug} href={`/dashboard/${resource.slug}`} className="admin-dashboard-tile">
            <h3>{resource.labelPlural}</h3>
            <p>{count} records</p>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
