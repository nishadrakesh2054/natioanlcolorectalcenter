import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/app/login/LoginForm";
import "../dashboard/admin.css";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="text-center mb-4">
          <h1 className="h4 mb-1">NCRC Dashboard</h1>
          <p className="text-muted mb-0">Sign in to manage site content</p>
        </div>
        <Suspense fallback={<div className="text-muted">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
