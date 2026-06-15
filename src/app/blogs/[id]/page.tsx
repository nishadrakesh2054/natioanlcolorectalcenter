import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTitle from "@/components/layout/PageTitle";
import ArticleDetailSection from "@/components/sections/ArticleDetailSection";
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata, resolveImageUrl } from "@/lib/seo";
import { formatBlogDate } from "@/lib/types/blog";
import { fetchBlogById, fetchBlogs } from "@/lib/supabase/fetch-content";

type BlogDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await fetchBlogs();
  return posts.map((post) => ({ id: String(post.id) }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchBlogById(Number(id));

  if (!post) {
    return { title: "Blog Not Found" };
  }

  return createPageMetadata({
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    path: post.seo.canonicalPath,
    keywords: post.seo.metaKeywords,
    image: post.seo.ogImage,
    openGraphType: "article",
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const post = await fetchBlogById(Number(id));

  if (!post) {
    notFound();
  }

  const path = `/blogs/${post.id}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blogs", path: "/blogs" },
            { name: post.title, path },
          ]),
          articleJsonLd({
            title: post.title,
            description: post.excerpt,
            path,
            image: resolveImageUrl(post.seo.ogImage),
            datePublished: post.publishedAt,
            author: post.author,
          }),
        ]}
      />
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
