"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import CaseStudyBlocksField from "@/components/admin/CaseStudyBlocksField";
import DiseaseImagesField from "@/components/admin/DiseaseImagesField";
import DiseaseContentField from "@/components/admin/DiseaseContentField";
import ImageUploadField from "@/components/admin/ImageUploadField";
import SocialLinksField from "@/components/admin/SocialLinksField";
import type { AdminField, AdminResource } from "@/lib/admin/resources";
import { isInboxResource } from "@/lib/admin/resources";
import { createRecord, updateRecord } from "@/lib/admin/actions";
import { useAdminToast } from "@/components/admin/AdminToast";

type ResourceFormProps = {
  resource: AdminResource;
  mode: "create" | "edit";
  recordId?: string;
  initialValues: Record<string, string>;
};

function FieldInput({
  field,
  value,
  onChange,
  readOnly = false,
}: {
  field: AdminField;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}) {
  const id = field.key;

  if (field.type === "datetime" || (readOnly && field.type !== "boolean")) {
    const isTextarea = field.type === "textarea" || field.type === "json" || field.type === "lines";

    return (
      <div>
        <label className="form-label" htmlFor={id}>
          {field.label}
        </label>
        {isTextarea ? (
          <textarea
            id={id}
            name={field.key}
            className="form-control"
            rows={field.rows ?? 6}
            value={value}
            readOnly
          />
        ) : (
          <input
            id={id}
            name={field.key}
            type="text"
            className="form-control"
            value={value}
            readOnly
          />
        )}
      </div>
    );
  }

  if (field.type === "image") {
    return (
      <ImageUploadField
        name={field.key}
        label={field.label}
        value={value}
        onChange={onChange}
        required={field.required}
      />
    );
  }

  if (field.type === "disease-content") {
    return (
      <DiseaseContentField
        label={field.label}
        value={value}
        onChange={onChange}
        hint={field.hint}
      />
    );
  }

  if (field.type === "disease-images") {
    return (
      <DiseaseImagesField
        label={field.label}
        value={value}
        onChange={onChange}
        hint={field.hint}
      />
    );
  }

  if (field.type === "case-study-blocks") {
    return (
      <CaseStudyBlocksField
        label={field.label}
        value={value}
        onChange={onChange}
        hint={field.hint}
      />
    );
  }

  if (field.type === "social-links") {
    return (
      <SocialLinksField
        label={field.label}
        value={value}
        onChange={onChange}
        hint={field.hint}
      />
    );
  }

  if (field.type === "textarea" || field.type === "json" || field.type === "lines" || field.type === "title-lines") {
    return (
      <div>
        <label className="form-label" htmlFor={id}>
          {field.label}
          {field.required ? " *" : ""}
        </label>
        <textarea
          id={id}
          name={field.key}
          className="form-control"
          rows={field.rows ?? (field.type === "lines" || field.type === "title-lines" ? 5 : 3)}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          required={field.required}
        />
        {field.hint ? <div className="form-text">{field.hint}</div> : null}
      </div>
    );
  }

  if (field.type === "boolean") {
    return (
      <div className="form-check">
        <input
          id={id}
          name={field.key}
          type="checkbox"
          className="form-check-input"
          checked={value === "true"}
          onChange={(event) => onChange(event.target.checked ? "true" : "false")}
        />
        <label className="form-check-label" htmlFor={id}>
          {field.label}
        </label>
      </div>
    );
  }

  return (
    <div>
      <label className="form-label" htmlFor={id}>
        {field.label}
        {field.required ? " *" : ""}
      </label>
      <input
        id={id}
        name={field.key}
        type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
        className="form-control"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholder}
        required={field.required}
      />
      {field.hint ? <div className="form-text">{field.hint}</div> : null}
    </div>
  );
}

export default function ResourceForm({
  resource,
  mode,
  recordId,
  initialValues,
}: ResourceFormProps) {
  const router = useRouter();
  const { showToast } = useAdminToast();
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const readOnly = isInboxResource(resource);

  function setField(key: string, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (readOnly) {
      return;
    }

    setError(null);

    startTransition(async () => {
      const result =
        mode === "create"
          ? await createRecord(resource.slug, values)
          : await updateRecord(resource.slug, recordId!, values);

      if (result?.error) {
        showToast({ type: "error", message: result.error });
        setError(result.error);
        return;
      }

      if (result?.success) {
        const toastType = mode === "create" ? "created" : "updated";
        router.push(
          `/dashboard/${resource.slug}?toast=${toastType}&label=${encodeURIComponent(resource.label)}`
        );
        router.refresh();
      }
    });
  }

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h2 className="h6 mb-0">
          {readOnly
            ? `View ${resource.label}`
            : mode === "create"
              ? `Add ${resource.label}`
              : `Edit ${resource.label}`}
        </h2>
      </div>

      <form className="admin-form admin-form-grid" onSubmit={handleSubmit}>
        {resource.fields.map((field) => (
          <FieldInput
            key={field.key}
            field={field}
            value={values[field.key] ?? ""}
            onChange={(value) => setField(field.key, value)}
            readOnly={readOnly}
          />
        ))}

        {error ? <div className="alert alert-danger mb-0">{error}</div> : null}

        <div className="d-flex gap-2">
          {readOnly ? (
            <a href={`/dashboard/${resource.slug}`} className="admin-btn-secondary">
              Back to list
            </a>
          ) : (
            <>
              <button type="submit" className="admin-btn-primary" disabled={pending}>
                {pending ? "Saving..." : mode === "create" ? "Create" : "Save changes"}
              </button>
              <a href={`/dashboard/${resource.slug}`} className="admin-btn-secondary">
                Cancel
              </a>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
