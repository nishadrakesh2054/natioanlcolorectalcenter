"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminResources } from "@/lib/admin/resources";
import { signOut } from "@/lib/admin/actions";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <Link href="/dashboard">NCRC Dashboard</Link>
        <span>Content management</span>
      </div>

      <nav className="admin-nav">
        <Link href="/dashboard" className={pathname === "/dashboard" ? "active" : ""}>
          <i className="bi bi-grid-1x2-fill"></i>
          Overview
        </Link>
        {adminResources.map((resource) => {
          const href = `/dashboard/${resource.slug}`;
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link key={resource.slug} href={href} className={active ? "active" : ""}>
              <i className="bi bi-folder2-open"></i>
              {resource.labelPlural}
            </Link>
          );
        })}
      </nav>

      <div className="admin-sidebar-footer">
        <Link href="/" className="admin-btn-secondary w-100 justify-content-center mb-2">
          <i className="bi bi-box-arrow-up-right"></i>
          View site
        </Link>
        <form action={signOut}>
          <button type="submit" className="admin-btn-secondary w-100 justify-content-center">
            <i className="bi bi-box-arrow-right"></i>
            Log out
          </button>
        </form>
      </div>
    </aside>
  );
}
