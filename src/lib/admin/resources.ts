import {
  arrayToLines,
  caseStudyBlocksToFormValue,
  diseaseContentToFormValue,
  emptyCaseStudyBlocksFormValue,
  emptyDiseaseContentFormValue,
  emptySocialLinksFormValue,
  formValueToCaseStudyBlocks,
  formValueToDiseaseContent,
  formValueToSocialLinks,
  linesToArray,
  linesToTitledList,
  socialLinksToFormValue,
  titledListToLines,
} from "@/lib/admin/field-formatters";

export type AdminFieldType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "boolean"
  | "image"
  | "lines"
  | "title-lines"
  | "social-links"
  | "disease-content"
  | "case-study-blocks"
  | "json";

export type AdminField = {
  key: string;
  label: string;
  type: AdminFieldType;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  rows?: number;
};

export type AdminResource = {
  slug: string;
  table: string;
  label: string;
  labelPlural: string;
  listColumns: { key: string; label: string; type?: "text" | "image" }[];
  fields: AdminField[];
  orderBy?: { column: string; ascending?: boolean };
};

export const adminResources: AdminResource[] = [
  {
    slug: "services",
    table: "services",
    label: "Service",
    labelPlural: "Services",
    orderBy: { column: "sort_order", ascending: true },
    listColumns: [
      { key: "id", label: "ID" },
      { key: "title", label: "Title" },
      { key: "sort_order", label: "Order" },
    ],
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true, rows: 4 },
      { key: "icon", label: "Icon image", type: "image", required: true },
      { key: "symptoms", label: "Symptoms (one per line)", type: "lines" },
      { key: "procedures", label: "Procedures (one per line)", type: "lines" },
      { key: "risks", label: "Risks (one per line)", type: "lines" },
      { key: "recovery_time", label: "Recovery time", type: "text" },
      { key: "sort_order", label: "Sort order", type: "number", required: true },
    ],
  },
  {
    slug: "doctors",
    table: "doctors",
    label: "Doctor",
    labelPlural: "Doctors",
    orderBy: { column: "sort_order", ascending: true },
    listColumns: [
      { key: "id", label: "ID" },
      { key: "img", label: "Photo", type: "image" },
      { key: "name", label: "Name" },
      { key: "role", label: "Role" },
      { key: "sort_order", label: "Order" },
    ],
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "phone_no", label: "Phone", type: "text", required: true },
      { key: "email", label: "Email", type: "text", required: true },
      { key: "role", label: "Role", type: "text", required: true },
      { key: "designation", label: "Designation", type: "text", required: true },
      { key: "img", label: "Photo", type: "image", required: true },
      { key: "special", label: "Specialization", type: "textarea", required: true, rows: 2 },
      { key: "degrees", label: "Degrees (one per line)", type: "lines", required: true },
      { key: "skills", label: "Skills (one per line)", type: "lines" },
      { key: "experience", label: "Experience", type: "text", required: true },
      { key: "working_hospitals", label: "Working hospitals (one per line)", type: "lines", required: true },
      {
        key: "journals",
        label: "Journals",
        type: "title-lines",
        hint: "One journal or publication per line",
      },
      {
        key: "awards",
        label: "Awards",
        type: "title-lines",
        hint: "One award per line",
      },
      { key: "category", label: "Category", type: "text", required: true },
      {
        key: "social_links",
        label: "Social links",
        type: "social-links",
        hint: "Leave blank if not used",
      },
      { key: "sort_order", label: "Sort order", type: "number", required: true },
    ],
  },
  {
    slug: "diseases",
    table: "colorectal_diseases",
    label: "Disease",
    labelPlural: "Colorectal Diseases",
    orderBy: { column: "sort_order", ascending: true },
    listColumns: [
      { key: "id", label: "ID" },
      { key: "title", label: "Title" },
      { key: "category", label: "Category" },
      { key: "sort_order", label: "Order" },
    ],
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "category", label: "Category", type: "text", required: true },
      { key: "image", label: "Image", type: "image", required: true },
      { key: "description", label: "Description", type: "textarea", required: true, rows: 4 },
      {
        key: "content",
        label: "Page content",
        type: "disease-content",
        required: true,
        hint: "Add sections with bullets or sub-groups. No JSON needed.",
      },
      { key: "sort_order", label: "Sort order", type: "number", required: true },
    ],
  },
  {
    slug: "faq",
    table: "faq_items",
    label: "FAQ",
    labelPlural: "FAQ",
    orderBy: { column: "sort_order", ascending: true },
    listColumns: [
      { key: "id", label: "ID" },
      { key: "question", label: "Question" },
      { key: "is_active", label: "Active" },
      { key: "sort_order", label: "Order" },
    ],
    fields: [
      { key: "question", label: "Question", type: "text", required: true },
      { key: "answer", label: "Answer", type: "textarea", required: true, rows: 5 },
      { key: "sort_order", label: "Sort order", type: "number", required: true },
      { key: "is_active", label: "Active", type: "boolean" },
    ],
  },
  {
    slug: "gallery",
    table: "gallery_items",
    label: "Gallery image",
    labelPlural: "Gallery",
    orderBy: { column: "sort_order", ascending: true },
    listColumns: [
      { key: "id", label: "ID" },
      { key: "src", label: "Image", type: "image" },
      { key: "alt", label: "Alt text" },
      { key: "is_active", label: "Active" },
      { key: "sort_order", label: "Order" },
    ],
    fields: [
      { key: "src", label: "Image", type: "image", required: true },
      { key: "alt", label: "Alt text", type: "text", required: true },
      { key: "caption", label: "Caption", type: "text" },
      { key: "sort_order", label: "Sort order", type: "number", required: true },
      { key: "is_active", label: "Active", type: "boolean" },
    ],
  },
  {
    slug: "testimonials",
    table: "testimonials",
    label: "Testimonial",
    labelPlural: "Testimonials",
    orderBy: { column: "sort_order", ascending: true },
    listColumns: [
      { key: "id", label: "ID" },
      { key: "image", label: "Photo", type: "image" },
      { key: "name", label: "Name" },
      { key: "role", label: "Role" },
      { key: "sort_order", label: "Order" },
    ],
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "role", label: "Role", type: "text", required: true },
      { key: "image", label: "Photo", type: "image", required: true },
      { key: "quote", label: "Quote", type: "textarea", required: true, rows: 4 },
      { key: "sort_order", label: "Sort order", type: "number", required: true },
      { key: "is_active", label: "Active", type: "boolean" },
    ],
  },
  {
    slug: "blogs",
    table: "blogs",
    label: "Blog post",
    labelPlural: "Blogs",
    orderBy: { column: "published_at", ascending: false },
    listColumns: [
      { key: "id", label: "ID" },
      { key: "title", label: "Title" },
      { key: "category", label: "Category" },
      { key: "published_at", label: "Published" },
    ],
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "URL slug", type: "text", required: true },
      { key: "excerpt", label: "Excerpt", type: "textarea", required: true, rows: 3 },
      { key: "image", label: "Cover image", type: "image", required: true },
      { key: "author", label: "Author", type: "text", required: true },
      { key: "published_at", label: "Published date", type: "date", required: true },
      { key: "category", label: "Category", type: "text", required: true },
      { key: "read_time", label: "Read time", type: "text", required: true, placeholder: "5 min read" },
      { key: "content", label: "Content paragraphs (one per line)", type: "lines", required: true },
      { key: "tags", label: "Tags (one per line)", type: "lines" },
      { key: "meta_title", label: "SEO title", type: "text", required: true },
      { key: "meta_description", label: "SEO description", type: "textarea", required: true, rows: 2 },
      { key: "meta_keywords", label: "SEO keywords (one per line)", type: "lines" },
      { key: "og_image", label: "OG image", type: "image", required: true },
      { key: "canonical_path", label: "Canonical path", type: "text", required: true, placeholder: "/blogs/1" },
      { key: "sort_order", label: "Sort order", type: "number", required: true },
      { key: "is_active", label: "Active", type: "boolean" },
    ],
  },
  {
    slug: "case-studies",
    table: "case_studies",
    label: "Case study",
    labelPlural: "Case Studies",
    orderBy: { column: "published_at", ascending: false },
    listColumns: [
      { key: "id", label: "ID" },
      { key: "title", label: "Title" },
      { key: "doctor", label: "Doctor" },
      { key: "published_at", label: "Published" },
    ],
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "URL slug", type: "text", required: true },
      { key: "excerpt", label: "Excerpt", type: "textarea", required: true, rows: 3 },
      { key: "image", label: "Cover image", type: "image", required: true },
      { key: "patient_profile", label: "Patient profile", type: "text", required: true },
      { key: "condition", label: "Condition", type: "text", required: true },
      { key: "treatment", label: "Treatment", type: "text", required: true },
      { key: "outcome", label: "Outcome", type: "text", required: true },
      { key: "published_at", label: "Published date", type: "date", required: true },
      { key: "doctor", label: "Lead doctor", type: "text", required: true },
      { key: "content", label: "Content paragraphs (one per line)", type: "lines", required: true },
      {
        key: "blocks",
        label: "Content blocks",
        type: "case-study-blocks",
        required: true,
        hint: "Add highlight blocks shown below the main story. Paste bullet points — one per line.",
      },
      { key: "meta_title", label: "SEO title", type: "text", required: true },
      { key: "meta_description", label: "SEO description", type: "textarea", required: true, rows: 2 },
      { key: "meta_keywords", label: "SEO keywords (one per line)", type: "lines" },
      { key: "og_image", label: "OG image", type: "image", required: true },
      { key: "canonical_path", label: "Canonical path", type: "text", required: true },
      { key: "sort_order", label: "Sort order", type: "number", required: true },
      { key: "is_active", label: "Active", type: "boolean" },
    ],
  },
];

export function getAdminResource(slug: string): AdminResource | undefined {
  return adminResources.find((resource) => resource.slug === slug);
}

export {
  arrayToLines,
  diseaseContentToFormValue,
  emptyDiseaseContentFormValue,
  emptySocialLinksFormValue,
  formValueToDiseaseContent,
  formValueToSocialLinks,
  linesToArray,
  linesToTitledList,
  socialLinksToFormValue,
  titledListToLines,
} from "@/lib/admin/field-formatters";

export function recordToFormValues(
  resource: AdminResource,
  record: Record<string, unknown>
): Record<string, string> {
  const values: Record<string, string> = {};

  for (const field of resource.fields) {
    const raw = record[field.key];

    if (field.type === "lines") {
      values[field.key] = arrayToLines(raw);
    } else if (field.type === "title-lines") {
      values[field.key] = titledListToLines(raw);
    } else if (field.type === "social-links") {
      values[field.key] = socialLinksToFormValue(raw);
    } else if (field.type === "disease-content") {
      values[field.key] = diseaseContentToFormValue(raw);
    } else if (field.type === "case-study-blocks") {
      values[field.key] = caseStudyBlocksToFormValue(raw);
    } else if (field.type === "json") {
      values[field.key] = raw ? JSON.stringify(raw, null, 2) : "";
    } else if (field.type === "boolean") {
      values[field.key] = raw === false ? "false" : "true";
    } else if (raw === null || raw === undefined) {
      values[field.key] = "";
    } else {
      values[field.key] = String(raw);
    }
  }

  return values;
}

export function formValuesToRecord(
  resource: AdminResource,
  values: Record<string, string>
): Record<string, unknown> {
  const record: Record<string, unknown> = {};

  for (const field of resource.fields) {
    const raw = values[field.key] ?? "";

    if (field.type === "lines") {
      record[field.key] = linesToArray(raw);
    } else if (field.type === "title-lines") {
      record[field.key] = linesToTitledList(raw);
    } else if (field.type === "social-links") {
      record[field.key] = formValueToSocialLinks(raw);
    } else if (field.type === "disease-content") {
      record[field.key] = formValueToDiseaseContent(raw);
    } else if (field.type === "case-study-blocks") {
      record[field.key] = formValueToCaseStudyBlocks(raw);
    } else if (field.type === "json") {
      record[field.key] = raw.trim() ? JSON.parse(raw) : [];
    } else if (field.type === "number") {
      record[field.key] = raw === "" ? 0 : Number(raw);
    } else if (field.type === "boolean") {
      record[field.key] = raw === "true";
    } else if (
      field.type === "date" ||
      field.type === "text" ||
      field.type === "textarea" ||
      field.type === "image"
    ) {
      const trimmed = raw.trim();
      record[field.key] = trimmed === "" && !field.required ? null : trimmed;
    }
  }

  return record;
}

export function defaultFormValues(resource: AdminResource): Record<string, string> {
  const values: Record<string, string> = {};

  for (const field of resource.fields) {
    if (field.type === "boolean") {
      values[field.key] = "true";
    } else if (field.type === "number") {
      values[field.key] = "0";
    } else if (field.type === "json") {
      values[field.key] = "[]";
    } else if (field.type === "case-study-blocks") {
      values[field.key] = emptyCaseStudyBlocksFormValue();
    } else if (field.type === "social-links") {
      values[field.key] = emptySocialLinksFormValue();
    } else if (field.type === "disease-content") {
      values[field.key] = emptyDiseaseContentFormValue();
    } else if (field.key === "author") {
      values[field.key] = "NCRC Medical Team";
    } else if (field.key === "read_time") {
      values[field.key] = "5 min read";
    } else {
      values[field.key] = "";
    }
  }

  return values;
}
