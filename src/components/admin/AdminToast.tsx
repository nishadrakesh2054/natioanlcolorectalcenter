"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

export type AdminToastType = "success" | "error";

export type AdminToast = {
  id: string;
  type: AdminToastType;
  message: string;
};

type AdminToastContextValue = {
  showToast: (toast: Omit<AdminToast, "id">) => void;
};

const AdminToastContext = createContext<AdminToastContextValue | null>(null);

function makeToastId() {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function toastMessageFromQuery(toast: string, label: string | null) {
  const name = label?.trim() || "Record";

  switch (toast) {
    case "created":
      return `${name} created successfully.`;
    case "updated":
      return `${name} saved successfully.`;
    case "deleted":
      return `${name} deleted successfully.`;
    default:
      return null;
  }
}

function AdminToastHost({ toasts, onDismiss }: { toasts: AdminToast[]; onDismiss: (id: string) => void }) {
  return (
    <div className="admin-toast-stack" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`admin-toast admin-toast-${toast.type}`}
          role="status"
        >
          <i
            className={`bi ${toast.type === "success" ? "bi-check-circle-fill" : "bi-exclamation-circle-fill"}`}
            aria-hidden="true"
          />
          <span>{toast.message}</span>
          <button
            type="button"
            className="admin-toast-close"
            aria-label="Dismiss notification"
            onClick={() => onDismiss(toast.id)}
          >
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  );
}

export function AdminToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<AdminToast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((toast: Omit<AdminToast, "id">) => {
    const id = makeToastId();
    setToasts((current) => [...current, { ...toast, id }]);

    window.setTimeout(() => {
      dismissToast(id);
    }, 4500);
  }, [dismissToast]);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <AdminToastContext.Provider value={value}>
      {children}
      <AdminToastHost toasts={toasts} onDismiss={dismissToast} />
    </AdminToastContext.Provider>
  );
}

export function useAdminToast() {
  const context = useContext(AdminToastContext);
  if (!context) {
    throw new Error("useAdminToast must be used within AdminToastProvider");
  }
  return context;
}

export function AdminToastFromUrl() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showToast } = useAdminToast();

  useEffect(() => {
    const toast = searchParams.get("toast");
    if (!toast) {
      return;
    }

    const message = toastMessageFromQuery(toast, searchParams.get("label"));
    if (!message) {
      return;
    }

    showToast({ type: "success", message });

    const url = new URL(window.location.href);
    url.searchParams.delete("toast");
    url.searchParams.delete("label");
    router.replace(url.pathname + url.search, { scroll: false });
  }, [router, searchParams, showToast]);

  return null;
}
