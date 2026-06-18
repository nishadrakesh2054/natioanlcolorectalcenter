"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/admin/actions";
import { getGroupedAdminResources } from "@/lib/admin/nav-groups";
import { ADMIN_RESOURCE_ICONS } from "@/lib/admin/resource-icons";
import type { AdminResource } from "@/lib/admin/resources";

export default function AdminSidebar() {
  const pathname = usePathname();
  const navGroups = getGroupedAdminResources();

  function renderNavLink(resource: AdminResource) {
    const href = `/dashboard/${resource.slug}`;
    const active = pathname === href || pathname.startsWith(`${href}/`);
    const icon = ADMIN_RESOURCE_ICONS[resource.slug] ?? "bi bi-folder2-open";

    return (
      <Link key={resource.slug} href={href} className={active ? "active" : ""}>
        <i className={icon} aria-hidden="true"></i>
        {resource.labelPlural}
      </Link>
    );
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <Link href="/dashboard" className="admin-sidebar-logo">
          <span className="admin-sidebar-logo-mark">N</span>
          <span>
            NCRC Dashboard
            <small>Content management</small>
          </span>
        </Link>
      </div>

      <nav className="admin-nav" aria-label="Dashboard navigation">
        <Link href="/dashboard" className={pathname === "/dashboard" ? "active" : ""}>
          <i className="bi bi-grid-1x2-fill" aria-hidden="true"></i>
          Overview
        </Link>
        {navGroups.map((group) => (
          <div key={group.id} className="admin-nav-group">
            <div className="admin-nav-section-label">{group.label}</div>
            {group.resources.map(renderNavLink)}
          </div>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <Link href="/" className="admin-btn-secondary w-100 justify-content-center mb-2" target="_blank">
          <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
          View site
        </Link>
        <form action={signOut}>
          <button type="submit" className="admin-btn-secondary w-100 justify-content-center">
            <i className="bi bi-box-arrow-right" aria-hidden="true"></i>
            Log out
          </button>
        </form>
      </div>
    </aside>
  );
}
