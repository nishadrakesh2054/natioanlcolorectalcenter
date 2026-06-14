import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTitle from "@/components/layout/PageTitle";
import ArticleDetailSection from "@/components/sections/ArticleDetailSection";
import { blogPosts, formatBlogDate, getBlogById } from "@/lib/blogs";

type BlogDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ id: String(post.id) }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getBlogById(Number(id));

  if (!post) {
    return { title: "Blog Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const post = getBlogById(Number(id));

  if (!post) {
    notFound();
  }

  return (
    <>
      <PageTitle
        title={post.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
        ]}
      />
      <ArticleDetailSection
        label="NCRC Blog"
        title={post.title}
        image={post.image}
        imageAlt={post.title}
        summary={post.excerpt}
        meta={[
          { icon: "bi bi-person", label: "Author", value: post.author },
          { icon: "bi bi-calendar", label: "Published", value: formatBlogDate(post.publishedAt) },
          { icon: "bi bi-clock", label: "Read Time", value: post.readTime },
          { icon: "bi bi-tag", label: "Category", value: post.category },
        ]}
        content={post.content}
        tags={post.tags}
        backHref="/blogs"
        backLabel="All Blogs"
      />
    </>
  );
}
