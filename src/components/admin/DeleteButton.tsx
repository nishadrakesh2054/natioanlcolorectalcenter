"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteRecord } from "@/lib/admin/actions";

export default function DeleteButton({
  resourceSlug,
  id,
  label,
}: {
  resourceSlug: string;
  id: number;
  label: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className="admin-icon-btn danger"
      title={`Delete ${label}`}
      disabled={pending}
      onClick={() => {
        if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) {
          return;
        }

        startTransition(async () => {
          const result = await deleteRecord(resourceSlug, id);
          if (result?.error) {
            window.alert(result.error);
            return;
          }
          router.refresh();
        });
      }}
    >
      <i className="bi bi-trash"></i>
    </button>
  );
}
