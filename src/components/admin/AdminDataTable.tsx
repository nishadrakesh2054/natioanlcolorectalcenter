import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";
import type { AdminResource } from "@/lib/admin/resources";

type ListColumn = AdminResource["listColumns"][number];

function formatCell(value: unknown, column: ListColumn): React.ReactNode {
  if (column.type === "image") {
    const src = typeof value === "string" ? value.trim() : "";
    if (!src) {
      return <span className="text-muted">—</span>;
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt="" className="admin-table-thumb" />
    );
  }

  if (value === null || value === undefined) {
    return <span className="text-muted">—</span>;
  }

  if (typeof value === "boolean") {
    return (
      <span className={`admin-badge ${value ? "success" : "muted"}`}>
        {value ? "Yes" : "No"}
      </span>
    );
  }

  const text = String(value);
  if (text.length > 80) {
    return `${text.slice(0, 80)}…`;
  }

  return text;
}

export default function AdminDataTable({
  resource,
  rows,
}: {
  resource: AdminResource;
  rows: Record<string, unknown>[];
}) {
  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <div>
          <h2 className="h6 mb-0">{resource.labelPlural}</h2>
          <p className="small text-muted mb-0">{rows.length} records</p>
        </div>
        <Link href={`/dashboard/${resource.slug}/new`} className="admin-btn-primary">
          <i className="bi bi-plus-lg"></i>
          Add {resource.label}
        </Link>
      </div>

      <div className="admin-card-body table-responsive">
        <table className="table admin-table mb-0">
          <thead>
            <tr>
              {resource.listColumns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={resource.listColumns.length + 1} className="text-center text-muted py-4">
                  No records yet. Click the + button to add one.
                </td>
              </tr>
            ) : (
              rows.map((row) => {
                const recordId = String(row.id);
                const title =
                  String(row.title ?? row.name ?? row.question ?? row.alt ?? recordId);

                return (
                  <tr key={recordId}>
                    {resource.listColumns.map((column) => (
                      <td key={column.key}>{formatCell(row[column.key], column)}</td>
                    ))}
                    <td>
                      <div className="admin-table-actions">
                        <Link
                          href={`/dashboard/${resource.slug}/edit/${recordId}`}
                          className="admin-icon-btn"
                          title={`Edit ${title}`}
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <DeleteButton
                          resourceSlug={resource.slug}
                          id={recordId}
                          label={title}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
