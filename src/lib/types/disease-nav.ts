export type DiseaseNavItem = {
  id: number;
  title: string;
  slug: string;
};

export function toDiseaseNavItems(
  diseases: Array<{ id: number; title: string; slug: string }>
): DiseaseNavItem[] {
  return diseases.map((disease) => ({
    id: disease.id,
    title: disease.title.trim(),
    slug: disease.slug,
  }));
}
