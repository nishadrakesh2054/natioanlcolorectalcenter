import AdminProviders from "@/components/admin/AdminProviders";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { signOut } from "@/lib/admin/actions";
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
              <div className="admin-topbar-actions">
                {actions}
                <form action={signOut}>
                  <button
                    type="submit"
                    className="admin-icon-btn danger"
                    title="Log out"
                    aria-label="Log out"
                  >
                    <i className="bi bi-box-arrow-right" aria-hidden="true"></i>
                  </button>
                </form>
              </div>
            </header>
            <div className="admin-content">{children}</div>
          </div>
        </div>
      </div>
    </AdminProviders>
  );
}
