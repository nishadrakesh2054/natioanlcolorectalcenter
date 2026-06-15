"use client";

import {
  parseDiseaseContentForm,
  serializeDiseaseContentForm,
  type DiseaseContentForm,
  type DiseaseFormItem,
  type DiseaseFormSection,
} from "@/lib/admin/field-formatters";

type DiseaseContentFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
};

function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function DiseaseContentField({
  label,
  value,
  onChange,
  hint,
}: DiseaseContentFieldProps) {
  const form = parseDiseaseContentForm(value);

  function setForm(next: DiseaseContentForm) {
    onChange(serializeDiseaseContentForm(next));
  }

  function addSection() {
    setForm({
      sections: [
        ...form.sections,
        { id: makeId("section"), title: "", items: [] },
      ],
    });
  }

  function updateSection(sectionId: string, patch: Partial<DiseaseFormSection>) {
    setForm({
      sections: form.sections.map((section) =>
        section.id === sectionId ? { ...section, ...patch } : section
      ),
    });
  }

  function removeSection(sectionId: string) {
    setForm({
      sections: form.sections.filter((section) => section.id !== sectionId),
    });
  }

  function addItem(sectionId: string, kind: DiseaseFormItem["kind"]) {
    setForm({
      sections: form.sections.map((section) => {
        if (section.id !== sectionId) return section;

        const item: DiseaseFormItem =
          kind === "bullet"
            ? { id: makeId("bullet"), kind: "bullet", text: "" }
            : { id: makeId("group"), kind: "group", subtitle: "", lines: "" };

        return { ...section, items: [...section.items, item] };
      }),
    });
  }

  function updateItem(sectionId: string, itemId: string, patch: Partial<DiseaseFormItem>) {
    setForm({
      sections: form.sections.map((section) => {
        if (section.id !== sectionId) return section;

        return {
          ...section,
          items: section.items.map((item) =>
            item.id === itemId ? ({ ...item, ...patch } as DiseaseFormItem) : item
          ),
        };
      }),
    });
  }

  function removeItem(sectionId: string, itemId: string) {
    setForm({
      sections: form.sections.map((section) => {
        if (section.id !== sectionId) return section;
        return {
          ...section,
          items: section.items.filter((item) => item.id !== itemId),
        };
      }),
    });
  }

  return (
    <div className="admin-disease-content">
      <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
        <label className="form-label mb-0">{label}</label>
        <button type="button" className="admin-btn-secondary" onClick={addSection}>
          <i className="bi bi-plus-lg"></i>
          Add section
        </button>
      </div>

      {hint ? <div className="form-text mb-3">{hint}</div> : null}

      {form.sections.length === 0 ? (
        <div className="admin-disease-empty text-muted">
          No sections yet. Click &quot;Add section&quot; to build the disease page content.
        </div>
      ) : null}

      {form.sections.map((section, sectionIndex) => (
        <div key={section.id} className="admin-disease-section">
          <div className="admin-disease-section-head">
            <span className="admin-disease-section-index">Section {sectionIndex + 1}</span>
            <button
              type="button"
              className="admin-icon-btn danger"
              title="Remove section"
              onClick={() => removeSection(section.id)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>

          <label className="form-label" htmlFor={`${section.id}-title`}>
            Section title
          </label>
          <input
            id={`${section.id}-title`}
            type="text"
            className="form-control mb-3"
            value={section.title}
            onChange={(event) => updateSection(section.id, { title: event.target.value })}
            placeholder="e.g. Treatment, Symptoms, Causes"
          />

          <div className="admin-disease-items">
            {section.items.map((item, itemIndex) => (
              <div key={item.id} className="admin-disease-item">
                <div className="admin-disease-item-head">
                  <span className="small text-muted">
                    {item.kind === "bullet" ? `Bullet ${itemIndex + 1}` : `Sub-group ${itemIndex + 1}`}
                  </span>
                  <button
                    type="button"
                    className="admin-icon-btn danger"
                    title="Remove item"
                    onClick={() => removeItem(section.id, item.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>

                {item.kind === "bullet" ? (
                  <input
                    type="text"
                    className="form-control"
                    value={item.text}
                    onChange={(event) =>
                      updateItem(section.id, item.id, { text: event.target.value })
                    }
                    placeholder="Single bullet point"
                  />
                ) : (
                  <>
                    <label className="form-label small">Sub-heading</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={item.subtitle}
                      onChange={(event) =>
                        updateItem(section.id, item.id, { subtitle: event.target.value })
                      }
                      placeholder="e.g. Medical Management"
                    />
                    <label className="form-label small">Points (one per line)</label>
                    <textarea
                      className="form-control"
                      rows={4}
                      value={item.lines}
                      onChange={(event) =>
                        updateItem(section.id, item.id, { lines: event.target.value })
                      }
                      placeholder={"Point one\nPoint two"}
                    />
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="d-flex flex-wrap gap-2 mt-3">
            <button
              type="button"
              className="admin-btn-secondary"
              onClick={() => addItem(section.id, "bullet")}
            >
              <i className="bi bi-plus-lg"></i>
              Add bullet
            </button>
            <button
              type="button"
              className="admin-btn-secondary"
              onClick={() => addItem(section.id, "group")}
            >
              <i className="bi bi-plus-lg"></i>
              Add sub-group
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
