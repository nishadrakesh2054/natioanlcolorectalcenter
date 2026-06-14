import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import GallerySection from "@/components/sections/GallerySection";

export const metadata: Metadata = {
  title: "Gallery",
};

export default function GalleryPage() {
  return (
    <>
      <PageTitle title="Gallery" />
      <GallerySection />
    </>
  );
}
