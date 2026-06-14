import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import BlogsSection from "@/components/sections/BlogsSection";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Colorectal health articles and updates from NCRC.",
};

export default function BlogsPage() {
  return (
    <>
      <PageTitle title="Blogs" />
      <BlogsSection />
    </>
  );
}
