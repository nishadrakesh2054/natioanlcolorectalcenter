"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

type ImageUploadFieldProps = {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};

export default function ImageUploadField({
  name,
  label,
  value,
  onChange,
  required,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("site-media")
        .upload(path, file, { upsert: false, contentType: file.type });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from("site-media").getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="admin-image-upload">
      <label className="form-label" htmlFor={name}>
        {label}
        {required ? " *" : ""}
      </label>

      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="Preview" className="admin-image-preview" />
      ) : null}

      <input type="hidden" name={name} value={value} />

      <div className="d-flex flex-wrap gap-2 align-items-center">
        <label className="admin-btn-secondary mb-0">
          <i className="bi bi-upload"></i>
          {uploading ? "Uploading..." : "Upload image"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="d-none"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
        {value ? (
          <button type="button" className="admin-btn-secondary" onClick={() => onChange("")}>
            Remove
          </button>
        ) : null}
      </div>

      <input
        type="text"
        className="form-control"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Or paste image URL"
      />

      {error ? <div className="text-danger small">{error}</div> : null}
    </div>
  );
}
