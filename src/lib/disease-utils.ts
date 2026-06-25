const SLUG_PATTERN = /[^a-z0-9]+/g;

export const COLORECTAL_DISEASE_INDEX_PATH = "/colorectal-disease";

export function slugifyDiseaseTitle(title: string) {
  return title
    .trim()
    .toLowerCase()
    .replace(SLUG_PATTERN, "-")
    .replace(/^-+|-+$/g, "");
}

export function assignDiseaseSlugs<T extends { id: number; title: string; slug?: string }>(
  diseases: T[]
): Array<T & { slug: string }> {
  const slugCounts = new Map<string, number>();

  return diseases.map((disease) => {
    const baseSlug = slugifyDiseaseTitle(disease.title) || `disease-${disease.id}`;
    const seen = slugCounts.get(baseSlug) ?? 0;
    slugCounts.set(baseSlug, seen + 1);

    const slug = seen === 0 ? baseSlug : `${baseSlug}-${disease.id}`;

    return {
      ...disease,
      slug,
    };
  });
}

export function truncateText(text: string, maxLength = 120) {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  return `${trimmed.slice(0, maxLength).trimEnd()}…`;
}

export function getColorectalDiseasePath(slug: string) {
  return `${COLORECTAL_DISEASE_INDEX_PATH}/${slug}`;
}

/** @deprecated Use getColorectalDiseasePath */
export function getDiseaseBrowseUrl(id: number, slug?: string) {
  if (slug) {
    return getColorectalDiseasePath(slug);
  }

  return `${COLORECTAL_DISEASE_INDEX_PATH}?id=${id}`;
}
