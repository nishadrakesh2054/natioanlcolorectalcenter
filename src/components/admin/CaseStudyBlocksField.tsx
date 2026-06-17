"use client";

import {
  CASE_STUDY_BLOCK_ICONS,
  parseCaseStudyBlocksForm,
  serializeCaseStudyBlocksForm,
  type CaseStudyBlockForm,
  type CaseStudyBlocksForm,
} from "@/lib/admin/field-formatters";

type CaseStudyBlocksFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
};

function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function CaseStudyBlocksField({
  label,
  value,
  onChange,
  hint,
}: CaseStudyBlocksFieldProps) {
  const form = parseCaseStudyBlocksForm(value);

  function setForm(next: CaseStudyBlocksForm) {
    onChange(serializeCaseStudyBlocksForm(next));
  }

  function addBlock() {
    setForm({
      blocks: [
        ...form.blocks,
        {
          id: makeId("block"),
          title: "",
          icon: CASE_STUDY_BLOCK_ICONS[0].value,
          items: "",
        },
      ],
    });
  }

  function updateBlock(blockId: string, patch: Partial<CaseStudyBlockForm>) {
    setForm({
      blocks: form.blocks.map((block) =>
        block.id === blockId ? { ...block, ...patch } : block
      ),
    });
  }

  function removeBlock(blockId: string) {
    setForm({
      blocks: form.blocks.filter((block) => block.id !== blockId),
    });
  }

  return (
    <div className="admin-disease-content">
      <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
        <label className="form-label mb-0">{label}</label>
        <button type="button" className="admin-btn-secondary" onClick={addBlock}>
          <i className="bi bi-plus-lg"></i>
          Add block
        </button>
      </div>

      {hint ? <div className="form-text mb-3">{hint}</div> : null}

      {form.blocks.length === 0 ? (
        <div className="admin-disease-empty text-muted">
          No content blocks yet. Click &quot;Add block&quot; to add highlights like Treatment or
          Outcome.
        </div>
      ) : null}

      {form.blocks.map((block, blockIndex) => (
        <div key={block.id} className="admin-disease-section">
          <div className="admin-disease-section-head">
            <span className="admin-disease-section-index">Block {blockIndex + 1}</span>
            <button
              type="button"
              className="admin-icon-btn danger"
              title="Remove block"
              onClick={() => removeBlock(block.id)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>

          <label className="form-label" htmlFor={`${block.id}-title`}>
            Block title
          </label>
          <input
            id={`${block.id}-title`}
            type="text"
            className="form-control mb-3"
            value={block.title}
            onChange={(event) => updateBlock(block.id, { title: event.target.value })}
            placeholder="e.g. Treatment Plan, Key Findings, Outcome"
          />

          <label className="form-label" htmlFor={`${block.id}-icon`}>
            Icon
          </label>
          <div className="d-flex align-items-center gap-2 mb-3">
            <select
              id={`${block.id}-icon`}
              className="form-select"
              value={block.icon}
              onChange={(event) => updateBlock(block.id, { icon: event.target.value })}
            >
              {CASE_STUDY_BLOCK_ICONS.map((icon) => (
                <option key={icon.value} value={icon.value}>
                  {icon.label}
                </option>
              ))}
            </select>
            <i className={`${block.icon} fs-4 text-primary`} aria-hidden="true"></i>
          </div>

          <label className="form-label" htmlFor={`${block.id}-items`}>
            Points (one per line)
          </label>
          <textarea
            id={`${block.id}-items`}
            className="form-control"
            rows={5}
            value={block.items}
            onChange={(event) => updateBlock(block.id, { items: event.target.value })}
            placeholder={"Paste or type each point on a new line\nExample point one\nExample point two"}
          />
        </div>
      ))}
    </div>
  );
}
