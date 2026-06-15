export type BlogSeo = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogImage: string;
  canonicalPath: string;
};

export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  publishedAt: string;
  category: string;
  readTime: string;
  content: string[];
  tags: string[];
  seo: BlogSeo;
};

export function formatBlogDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
