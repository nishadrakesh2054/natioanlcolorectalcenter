import AdminProviders from "@/components/admin/AdminProviders";
import AdminSidebar from "@/components/admin/AdminSidebar";
import "@/app/dashboard/admin.css";

export default function AdminShell({
  children,
  title,
  subtitle,
  actions,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <AdminProviders>
      <div className="admin-root">
        <div className="admin-shell">
          <AdminSidebar />
          <div className="admin-main">
            <header className="admin-topbar">
              <div>
                <h1 className="admin-topbar-title">{title}</h1>
                {subtitle ? <p className="admin-topbar-subtitle">{subtitle}</p> : null}
              </div>
              {actions}
            </header>
            <div className="admin-content">{children}</div>
          </div>
        </div>
      </div>
    </AdminProviders>
  );
}
