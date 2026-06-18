export type DiseaseNestedItem = {
  sub_title: string;
  sub_items: string[];
};

export type DiseaseContentItem = string | DiseaseNestedItem;

export type DiseaseContentSection = {
  title: string;
  items: DiseaseContentItem[];
};

export type ColorectalDisease = {
  id: number;
  /** Primary image (first of `images`) for SEO and legacy use */
  image: string;
  images: string[];
  title: string;
  category: string;
  description: string;
  content: DiseaseContentSection[];
};

const DISEASE_IMAGE_SLOT_COUNT = 4;

export function getDiseaseImages(disease: Pick<ColorectalDisease, "image" | "images">) {
  const fromList = (disease.images ?? []).map((src) => src.trim()).filter(Boolean);
  if (fromList.length > 0) {
    return fromList.slice(0, DISEASE_IMAGE_SLOT_COUNT);
  }
  if (disease.image?.trim()) {
    return [disease.image.trim()];
  }
  return [];
}

export function getDiseaseImageSlots(disease: Pick<ColorectalDisease, "image" | "images">) {
  const images = getDiseaseImages(disease);
  return Array.from({ length: DISEASE_IMAGE_SLOT_COUNT }, (_, index) => images[index] ?? "");
}
