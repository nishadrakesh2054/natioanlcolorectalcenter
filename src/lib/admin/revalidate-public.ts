import { revalidatePath } from "next/cache";

const RESOURCE_PUBLIC_PATHS: Record<
  string,
  { paths: string[]; detailPath?: (id: string) => string }
> = {
  services: {
    paths: ["/services", "/appointment", "/about"],
    detailPath: (id) => `/services/${id}`,
  },
  doctors: {
    paths: ["/doctors", "/appointment", "/about"],
    detailPath: (id) => `/doctors/${id}`,
  },
  diseases: {
    paths: ["/colorectal-disease", "/about"],
    detailPath: (id) => `/colorectal-disease/${id}`,
  },
  faq: {
    paths: ["/faq", "/about"],
  },
  gallery: {
    paths: ["/gallery", "/about"],
  },
  testimonials: {
    paths: ["/testimonials", "/about"],
  },
  blogs: {
    paths: ["/blogs"],
    detailPath: (id) => `/blogs/${id}`,
  },
  "case-studies": {
    paths: ["/case-study"],
    detailPath: (id) => `/case-study/${id}`,
  },
};

export function revalidatePublicContent(resourceSlug: string, recordId?: string) {
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");

  const entry = RESOURCE_PUBLIC_PATHS[resourceSlug];
  if (!entry) {
    return;
  }

  for (const path of entry.paths) {
    revalidatePath(path, "layout");
  }

  if (recordId && entry.detailPath) {
    revalidatePath(entry.detailPath(recordId));
  }
}
