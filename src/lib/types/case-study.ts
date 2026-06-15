export type CaseStudySeo = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogImage: string;
  canonicalPath: string;
};

export type CaseStudyBlock = {
  title: string;
  icon: string;
  items: string[];
};

export type CaseStudy = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  patientProfile: string;
  condition: string;
  treatment: string;
  outcome: string;
  publishedAt: string;
  doctor: string;
  content: string[];
  blocks: CaseStudyBlock[];
  seo: CaseStudySeo;
};

export function formatCaseStudyDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
