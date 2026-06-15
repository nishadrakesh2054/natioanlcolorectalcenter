"use client";

import { FormEvent, ReactNode, useState } from "react";

type MedilabFormProps = {
  successMessage: string;
  children: ReactNode;
  className?: string;
  onSubmit?: (formData: FormData) => Promise<{ error?: string }>;
};

export default function MedilabForm({
  successMessage,
  children,
  className = "php-email-form",
  onSubmit,
}: MedilabFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSent(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!form.checkValidity()) {
      form.reportValidity();
      setLoading(false);
      return;
    }

    if (onSubmit) {
      const result = await onSubmit(formData);

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }
    }

    setSent(true);
    form.reset();
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="form"
      className={className}
      noValidate
    >
      {children}
      <div className="mt-3">
        <div className={`loading ${loading ? "d-block" : ""}`}>Loading</div>
        <div className={`error-message ${error ? "d-block" : ""}`}>{error}</div>
        <div className={`sent-message ${sent ? "d-block" : ""}`}>{successMessage}</div>
      </div>
    </form>
  );
}
