import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import BlogsSection from "@/components/sections/BlogsSection";
import { publicPageSeo } from "@/lib/seo";
import { fetchBlogs } from "@/lib/supabase/fetch-content";

export const metadata: Metadata = publicPageSeo.blogs;
export const revalidate = 300;

export default async function BlogsPage() {
  const posts = await fetchBlogs();

  return (
    <>
      <PageTitle title="Blogs" />
      <BlogsSection posts={posts} />
    </>
  );
}
