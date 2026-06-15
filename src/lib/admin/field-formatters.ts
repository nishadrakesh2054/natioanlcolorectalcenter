export const SOCIAL_LINK_TYPES = ["facebook", "instagram", "whatsapp", "twitter"] as const;

export type SocialLinkType = (typeof SOCIAL_LINK_TYPES)[number];

export type SocialLinksForm = Record<SocialLinkType, string>;

const EMPTY_SOCIAL_LINKS: SocialLinksForm = {
  facebook: "",
  instagram: "",
  whatsapp: "",
  twitter: "",
};

export function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function arrayToLines(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return value.map(String).join("\n");
}

export function titledListToLines(items: unknown): string {
  if (!Array.isArray(items)) return "";

  return items
    .map((item) => {
      if (item && typeof item === "object" && "title" in item) {
        return String((item as { title: string }).title).trim();
      }
      return String(item).trim();
    })
    .filter(Boolean)
    .join("\n");
}

export function linesToTitledList(value: string): { title: string }[] {
  return linesToArray(value).map((title) => ({ title }));
}

export function socialLinksToFormValue(links: unknown): string {
  const result = { ...EMPTY_SOCIAL_LINKS };

  if (Array.isArray(links)) {
    for (const link of links) {
      if (!link || typeof link !== "object") continue;
      const type = String((link as { type?: string }).type ?? "").toLowerCase();
      const url = String((link as { url?: string }).url ?? "").trim();
      if (SOCIAL_LINK_TYPES.includes(type as SocialLinkType)) {
        result[type as SocialLinkType] = url;
      }
    }
  }

  return JSON.stringify(result);
}

export function formValueToSocialLinks(value: string): { type: SocialLinkType; url: string }[] {
  try {
    const parsed = JSON.parse(value || "{}") as Partial<SocialLinksForm>;
    return SOCIAL_LINK_TYPES.map((type) => ({
      type,
      url: (parsed[type] ?? "").trim(),
    })).filter((link) => link.url);
  } catch {
    return [];
  }
}

export function emptySocialLinksFormValue() {
  return JSON.stringify(EMPTY_SOCIAL_LINKS);
}

export const SOCIAL_LINK_LABELS: Record<SocialLinkType, string> = {
  facebook: "Facebook URL",
  instagram: "Instagram URL",
  whatsapp: "WhatsApp URL",
  twitter: "Twitter / X URL",
};

export type DiseaseFormBullet = {
  id: string;
  kind: "bullet";
  text: string;
};

export type DiseaseFormGroup = {
  id: string;
  kind: "group";
  subtitle: string;
  lines: string;
};

export type DiseaseFormItem = DiseaseFormBullet | DiseaseFormGroup;

export type DiseaseFormSection = {
  id: string;
  title: string;
  items: DiseaseFormItem[];
};

export type DiseaseContentForm = {
  sections: DiseaseFormSection[];
};

function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function emptyDiseaseContentFormValue() {
  return JSON.stringify({ sections: [] } satisfies DiseaseContentForm);
}

export function diseaseContentToFormValue(content: unknown): string {
  if (!Array.isArray(content)) {
    return emptyDiseaseContentFormValue();
  }

  const sections: DiseaseFormSection[] = content.map((section, sectionIndex) => {
    const title = String((section as { title?: string }).title ?? "");
    const rawItems = (section as { items?: unknown[] }).items ?? [];
    const items: DiseaseFormItem[] = [];

    rawItems.forEach((item, itemIndex) => {
      const id = makeId(`s${sectionIndex}-i${itemIndex}`);

      if (typeof item === "string") {
        items.push({ id, kind: "bullet", text: item });
        return;
      }

      if (item && typeof item === "object" && "sub_title" in item) {
        items.push({
          id,
          kind: "group",
          subtitle: String((item as { sub_title?: string }).sub_title ?? ""),
          lines: arrayToLines((item as { sub_items?: string[] }).sub_items),
        });
      }
    });

    return {
      id: makeId(`section-${sectionIndex}`),
      title,
      items,
    };
  });

  return JSON.stringify({ sections } satisfies DiseaseContentForm);
}

export function formValueToDiseaseContent(value: string) {
  try {
    const parsed = JSON.parse(value || "{}") as DiseaseContentForm;
    const sections = parsed.sections ?? [];

    return sections
      .map((section) => {
        const items: Array<string | { sub_title: string; sub_items: string[] }> = [];

        for (const item of section.items) {
          if (item.kind === "bullet") {
            const text = item.text.trim();
            if (text) items.push(text);
            continue;
          }

          const sub_title = item.subtitle.trim();
          const sub_items = linesToArray(item.lines);
          if (sub_title || sub_items.length > 0) {
            items.push({ sub_title, sub_items });
          }
        }

        return {
          title: section.title.trim(),
          items,
        };
      })
      .filter((section) => section.title || section.items.length > 0);
  } catch {
    return [];
  }
}

export function parseDiseaseContentForm(value: string): DiseaseContentForm {
  try {
    const parsed = JSON.parse(value || "{}") as DiseaseContentForm;
    if (!Array.isArray(parsed.sections)) {
      return { sections: [] };
    }
    return parsed;
  } catch {
    return { sections: [] };
  }
}

export function serializeDiseaseContentForm(form: DiseaseContentForm) {
  return JSON.stringify(form);
}
