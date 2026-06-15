import AdminSidebar from "@/components/admin/AdminSidebar";
import "@/app/dashboard/admin.css";

export default function AdminShell({
  children,
  title,
  actions,
}: {
  children: React.ReactNode;
  title: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="admin-root">
      <div className="admin-shell">
        <AdminSidebar />
        <div className="admin-main">
          <header className="admin-topbar">
            <h1 className="h5 mb-0">{title}</h1>
            {actions}
          </header>
          <div className="admin-content">{children}</div>
        </div>
      </div>
    </div>
  );
}
