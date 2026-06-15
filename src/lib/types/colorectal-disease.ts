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
  image: string;
  title: string;
  category: string;
  description: string;
  content: DiseaseContentSection[];
};
