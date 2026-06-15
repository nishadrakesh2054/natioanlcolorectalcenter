import type { MetadataRoute } from "next";
import {
  fetchBlogs,
  fetchCaseStudies,
  fetchColorectalDiseases,
  fetchDoctors,
  fetchServices,
} from "@/lib/supabase/fetch-content";
import { getSiteUrl } from "@/lib/seo";

export const revalidate = 300;

const staticPaths = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/doctors", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/departments", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/faq", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/gallery", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/testimonials", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/blogs", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/case-study", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
  { path: "/appointment", priority: 0.9, changeFrequency: "yearly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const [services, doctors, diseases, blogs, caseStudies] = await Promise.all([
    fetchServices(),
    fetchDoctors(),
    fetchColorectalDiseases(),
    fetchBlogs(),
    fetchCaseStudies(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((entry) => ({
    url: `${base}${entry.path}`,
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));

  const dynamicEntries: MetadataRoute.Sitemap = [
    ...services.map((item) => ({
      url: `${base}/services/${item.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...doctors.map((item) => ({
      url: `${base}/doctors/${item.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...diseases.map((item) => ({
      url: `${base}/departments/${item.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...blogs.map((item) => ({
      url: `${base}/blogs/${item.id}`,
      lastModified: new Date(item.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...caseStudies.map((item) => ({
      url: `${base}/case-study/${item.id}`,
      lastModified: new Date(item.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [...staticEntries, ...dynamicEntries];
}
