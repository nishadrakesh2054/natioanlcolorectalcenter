"use client";

import { Suspense } from "react";
import { AdminToastFromUrl, AdminToastProvider } from "@/components/admin/AdminToast";

export default function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <AdminToastProvider>
      <Suspense fallback={null}>
        <AdminToastFromUrl />
      </Suspense>
      {children}
    </AdminToastProvider>
  );
}
