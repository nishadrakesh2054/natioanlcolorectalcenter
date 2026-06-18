import type { Metadata } from "next";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { requireAdminUser } from "@/lib/admin/auth";
import { getGroupedAdminResources } from "@/lib/admin/nav-groups";
import { ADMIN_RESOURCE_ICONS } from "@/lib/admin/resource-icons";
import { adminResources } from "@/lib/admin/resources";
import { listRecords } from "@/lib/admin/queries";

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

  const countBySlug = new Map(counts.map((item) => [item.resource.slug, item.count]));
  const totalRecords = counts.reduce((sum, item) => sum + item.count, 0);
  const navGroups = getGroupedAdminResources();

  return (
    <AdminShell
      title="Dashboard overview"
      subtitle={`${totalRecords} total records across ${adminResources.length} sections`}
    >
      {navGroups.map((group) => (
        <section key={group.id} className="admin-dashboard-group">
          <h2 className="admin-dashboard-section-title">{group.label}</h2>
          <div className="admin-dashboard-grid">
            {group.resources.map((resource) => {
              const count = countBySlug.get(resource.slug) ?? 0;
              const icon = ADMIN_RESOURCE_ICONS[resource.slug] ?? "bi bi-folder2-open";

              return (
                <Link
                  key={resource.slug}
                  href={`/dashboard/${resource.slug}`}
                  className="admin-dashboard-tile"
                >
                  <span className="admin-dashboard-tile-icon">
                    <i className={icon} aria-hidden="true"></i>
                  </span>
                  <h3>{resource.labelPlural}</h3>
                  <p>
                    {count} {count === 1 ? "record" : "records"}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </AdminShell>
  );
}
