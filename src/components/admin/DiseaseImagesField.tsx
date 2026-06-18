"use client";

import { useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import ImageUploadField from "@/components/admin/ImageUploadField";
import {
  DISEASE_IMAGE_SLOT_COUNT,
  parseDiseaseImagesForm,
  type DiseaseImagesForm,
} from "@/lib/admin/field-formatters";

type DiseaseImagesFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
};

function serializeSlots(slots: DiseaseImagesForm["slots"]) {
  return JSON.stringify({ slots } satisfies DiseaseImagesForm);
}

export default function DiseaseImagesField({
  label,
  value,
  onChange,
  hint,
}: DiseaseImagesFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = parseDiseaseImagesForm(value);

  function setSlots(next: DiseaseImagesForm["slots"]) {
    onChange(serializeSlots(next));
  }

  function setSlot(index: number, slotValue: string) {
    const next = [...form.slots] as DiseaseImagesForm["slots"];
    next[index] = slotValue;
    setSlots(next);
  }

  async function uploadFile(file: File) {
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
    return data.publicUrl;
  }

  async function handleMultiUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) {
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const next = [...form.slots] as DiseaseImagesForm["slots"];
      let fileIndex = 0;

      for (let slotIndex = 0; slotIndex < DISEASE_IMAGE_SLOT_COUNT && fileIndex < files.length; slotIndex += 1) {
        if (next[slotIndex]?.trim()) {
          continue;
        }

        next[slotIndex] = await uploadFile(files[fileIndex]);
        fileIndex += 1;
      }

      while (fileIndex < files.length) {
        const openSlot = next.findIndex((slot) => !slot.trim());
        if (openSlot === -1) {
          break;
        }
        next[openSlot] = await uploadFile(files[fileIndex]);
        fileIndex += 1;
      }

      setSlots(next);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="admin-disease-images">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
        <label className="form-label mb-0">{label} *</label>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            className="d-none"
            onChange={handleMultiUpload}
          />
          <button
            type="button"
            className="admin-btn-secondary"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            <i className="bi bi-images" aria-hidden="true"></i>
            {uploading ? "Uploading..." : "Upload multiple"}
          </button>
        </div>
      </div>

      {hint ? <div className="form-text mb-3">{hint}</div> : null}

      <div className="admin-disease-images-grid">
        {form.slots.map((slot, index) => (
          <div key={index} className="admin-disease-images-slot">
            <span className="admin-disease-images-slot-label">Image {index + 1}</span>
            <ImageUploadField
              name={`disease-image-${index + 1}`}
              label=""
              value={slot}
              onChange={(slotValue) => setSlot(index, slotValue)}
              required={index === 0}
            />
          </div>
        ))}
      </div>

      {error ? <div className="text-danger small mt-2">{error}</div> : null}
    </div>
  );
}
