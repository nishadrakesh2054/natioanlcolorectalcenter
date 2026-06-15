"use client";

import {
  SOCIAL_LINK_LABELS,
  SOCIAL_LINK_TYPES,
  socialLinksToFormValue,
  type SocialLinksForm,
} from "@/lib/admin/field-formatters";

type SocialLinksFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
};

function parseValue(value: string): SocialLinksForm {
  try {
    const parsed = JSON.parse(value || "{}") as Partial<SocialLinksForm>;
    return {
      facebook: parsed.facebook ?? "",
      instagram: parsed.instagram ?? "",
      whatsapp: parsed.whatsapp ?? "",
      twitter: parsed.twitter ?? "",
    };
  } catch {
    return { facebook: "", instagram: "", whatsapp: "", twitter: "" };
  }
}

export default function SocialLinksField({
  label,
  value,
  onChange,
  hint,
}: SocialLinksFieldProps) {
  const links = parseValue(value);

  function updateLink(type: keyof SocialLinksForm, url: string) {
    const next = { ...links, [type]: url };
    onChange(socialLinksToFormValue(
      SOCIAL_LINK_TYPES.map((linkType) => ({ type: linkType, url: next[linkType] }))
    ));
  }

  return (
    <fieldset className="admin-social-links">
      <legend className="form-label mb-2">{label}</legend>
      <div className="admin-form-grid">
        {SOCIAL_LINK_TYPES.map((type) => (
          <div key={type}>
            <label className="form-label small text-muted" htmlFor={`social-${type}`}>
              {SOCIAL_LINK_LABELS[type]}
            </label>
            <input
              id={`social-${type}`}
              type="url"
              className="form-control"
              value={links[type]}
              onChange={(event) => updateLink(type, event.target.value)}
              placeholder={`https://${type}.com/...`}
            />
          </div>
        ))}
      </div>
      {hint ? <div className="form-text">{hint}</div> : null}
    </fieldset>
  );
}
