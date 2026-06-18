import { createClient } from "@supabase/supabase-js";
import type { BlogPost, BlogSeo } from "@/lib/types/blog";
import type { CaseStudy, CaseStudyBlock, CaseStudySeo } from "@/lib/types/case-study";
import type { CaseService } from "@/lib/types/case-service";
import type { ColorectalDisease } from "@/lib/types/colorectal-disease";
import type { Doctor, DoctorAward, DoctorJournal, DoctorSocialLink } from "@/lib/types/doctor";
import type { FaqItem } from "@/lib/types/faq";
import type { GalleryItem } from "@/lib/types/gallery";
import type { Testimonial } from "@/lib/types/testimonial";

type ServiceRow = {
  id: number;
  title: string;
  description: string;
  icon: string;
  symptoms: string[] | null;
  procedures: string[] | null;
  risks: string[] | null;
  recovery_time: string | null;
  sort_order: number;
};

type DoctorRow = {
  id: number;
  name: string;
  phone_no: string;
  email: string;
  role: string;
  designation: string;
  img: string;
  special: string;
  degrees: string[] | null;
  skills: string[] | null;
  experience: string;
  working_hospitals: string[] | null;
  journals: DoctorJournal[] | null;
  awards: DoctorAward[] | null;
  category: string;
  social_links: DoctorSocialLink[] | null;
  sort_order: number;
};

type FaqRow = {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
};

type DiseaseRow = {
  id: number;
  title: string;
  category: string;
  image: string;
  images: string[] | null;
  description: string;
  content: ColorectalDisease["content"];
  sort_order: number;
};

type GalleryRow = {
  id: number;
  src: string;
  alt: string;
  caption: string | null;
  sort_order: number;
  is_active: boolean;
};

type TestimonialRow = {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  sort_order: number;
  is_active: boolean;
};

type BlogRow = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  author: string;
  published_at: string;
  category: string;
  read_time: string;
  content: string[] | null;
  tags: string[] | null;
  meta_title: string;
  meta_description: string;
  meta_keywords: string[] | null;
  og_image: string;
  canonical_path: string;
  sort_order: number;
  is_active: boolean;
};

type CaseStudyRow = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  patient_profile: string;
  condition: string;
  treatment: string;
  outcome: string;
  published_at: string;
  doctor: string;
  content: string[] | null;
  blocks: CaseStudyBlock[] | null;
  meta_title: string;
  meta_description: string;
  meta_keywords: string[] | null;
  og_image: string;
  canonical_path: string;
  sort_order: number;
  is_active: boolean;
};

function mapBlogSeo(row: BlogRow): BlogSeo {
  return {
    slug: row.slug,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    metaKeywords: row.meta_keywords ?? [],
    ogImage: row.og_image,
    canonicalPath: row.canonical_path,
  };
}

function mapCaseStudySeo(row: CaseStudyRow): CaseStudySeo {
  return {
    slug: row.slug,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    metaKeywords: row.meta_keywords ?? [],
    ogImage: row.og_image,
    canonicalPath: row.canonical_path,
  };
}

function mapGallery(row: GalleryRow): GalleryItem {
  return {
    id: row.id,
    src: row.src,
    alt: row.alt,
    caption: row.caption ?? undefined,
  };
}

function mapTestimonial(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    image: row.image,
    quote: row.quote,
  };
}

function mapBlog(row: BlogRow): BlogPost {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    image: row.image,
    author: row.author,
    publishedAt: row.published_at,
    category: row.category,
    readTime: row.read_time,
    content: row.content ?? [],
    tags: row.tags ?? [],
    seo: mapBlogSeo(row),
  };
}

function mapCaseStudy(row: CaseStudyRow): CaseStudy {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    image: row.image,
    patientProfile: row.patient_profile,
    condition: row.condition,
    treatment: row.treatment,
    outcome: row.outcome,
    publishedAt: row.published_at,
    doctor: row.doctor,
    content: row.content ?? [],
    blocks: row.blocks ?? [],
    seo: mapCaseStudySeo(row),
  };
}

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key);
}

function mapService(row: ServiceRow): CaseService {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    icon: row.icon,
    symptoms: row.symptoms?.length ? row.symptoms : undefined,
    procedures: row.procedures?.length ? row.procedures : undefined,
    risks: row.risks?.length ? row.risks : undefined,
    recoveryTime: row.recovery_time ?? undefined,
  };
}

function mapDoctor(row: DoctorRow): Doctor {
  return {
    id: row.id,
    name: row.name,
    phoneNo: row.phone_no,
    email: row.email,
    role: row.role,
    designation: row.designation,
    img: row.img,
    special: row.special,
    degrees: row.degrees ?? [],
    skills: row.skills?.length ? row.skills : undefined,
    experience: row.experience,
    workingHospitals: row.working_hospitals ?? [],
    journals: row.journals?.length ? row.journals : undefined,
    awards: row.awards?.length ? row.awards : undefined,
    category: row.category,
    socialLinks: row.social_links ?? [],
  };
}

function mapDisease(row: DiseaseRow): ColorectalDisease {
  const images = Array.isArray(row.images)
    ? row.images.map((src) => String(src).trim()).filter(Boolean)
    : [];
  const image = images[0] ?? row.image ?? "";

  return {
    id: row.id,
    title: row.title,
    category: row.category,
    image,
    images: images.length ? images : image ? [image] : [],
    description: row.description,
    content: row.content ?? [],
  };
}

export async function fetchServices(): Promise<CaseService[]> {
  const supabase = getClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    if (error) console.error("fetchServices:", error.message);
    return [];
  }

  return (data as ServiceRow[]).map(mapService);
}

export async function fetchServiceById(id: number): Promise<CaseService | undefined> {
  const services = await fetchServices();
  return services.find((service) => service.id === id);
}

export async function fetchDoctors(): Promise<Doctor[]> {
  const supabase = getClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    if (error) console.error("fetchDoctors:", error.message);
    return [];
  }

  return (data as DoctorRow[]).map(mapDoctor);
}

export async function fetchDoctorById(id: number): Promise<Doctor | undefined> {
  const doctors = await fetchDoctors();
  return doctors.find((doctor) => doctor.id === id);
}

export async function fetchColorectalDiseases(): Promise<ColorectalDisease[]> {
  const supabase = getClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("colorectal_diseases")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    if (error) console.error("fetchColorectalDiseases:", error.message);
    return [];
  }

  return (data as DiseaseRow[]).map(mapDisease);
}

export async function fetchColorectalDiseaseById(
  id: number
): Promise<ColorectalDisease | undefined> {
  const diseases = await fetchColorectalDiseases();
  return diseases.find((disease) => disease.id === id);
}

function mapFaq(row: FaqRow): FaqItem {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
  };
}

export async function fetchFaqs(): Promise<FaqItem[]> {
  const supabase = getClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("faq_items")
    .select("id, question, answer, sort_order, is_active")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    if (error) console.error("fetchFaqs:", error.message);
    return [];
  }

  return (data as FaqRow[]).map(mapFaq);
}

export async function fetchGalleryItems(): Promise<GalleryItem[]> {
  const supabase = getClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("gallery_items")
    .select("id, src, alt, caption, sort_order, is_active")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    if (error) console.error("fetchGalleryItems:", error.message);
    return [];
  }

  return (data as GalleryRow[]).map(mapGallery);
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const supabase = getClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("testimonials")
    .select("id, name, role, image, quote, sort_order, is_active")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    if (error) console.error("fetchTestimonials:", error.message);
    return [];
  }

  return (data as TestimonialRow[]).map(mapTestimonial);
}

export async function fetchBlogs(): Promise<BlogPost[]> {
  const supabase = getClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    if (error) console.error("fetchBlogs:", error.message);
    return [];
  }

  return (data as BlogRow[]).map(mapBlog);
}

export async function fetchBlogById(id: number): Promise<BlogPost | undefined> {
  const blogs = await fetchBlogs();
  return blogs.find((post) => post.id === id);
}

export async function fetchCaseStudies(): Promise<CaseStudy[]> {
  const supabase = getClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    if (error) console.error("fetchCaseStudies:", error.message);
    return [];
  }

  return (data as CaseStudyRow[]).map(mapCaseStudy);
}

export async function fetchCaseStudyById(id: number): Promise<CaseStudy | undefined> {
  const studies = await fetchCaseStudies();
  return studies.find((study) => study.id === id);
}
