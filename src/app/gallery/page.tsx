import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import GallerySection from "@/components/sections/GallerySection";
import { publicPageSeo } from "@/lib/seo";
import { fetchGalleryItems } from "@/lib/supabase/fetch-content";

export const metadata: Metadata = publicPageSeo.gallery;
export const revalidate = 60;

export default async function GalleryPage() {
  const items = await fetchGalleryItems();

  return (
    <>
      <PageTitle title="Gallery" />
      <GallerySection items={items} />
    </>
  );
}
