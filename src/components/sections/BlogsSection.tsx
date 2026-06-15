import Link from "next/link";
import SiteImage from "@/components/ui/SiteImage";
import type { BlogPost } from "@/lib/types/blog";
import { formatBlogDate } from "@/lib/types/blog";

type BlogsSectionProps = {
  posts: BlogPost[];
};

export default function BlogsSection({ posts }: BlogsSectionProps) {
  return (
    <section id="blogs" className="article-listing section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Blogs</h2>
        <p>
          Colorectal health articles, prevention tips, and patient guidance from the NCRC team.
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {posts.map((post, index) => (
            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay={(index % 3) * 100 + 100}
              key={post.id}
            >
              <article className="article-listing-card h-100">
                <Link href={`/blogs/${post.id}`} className="article-listing-image">
                  <SiteImage src={post.image} alt={post.title} width={640} height={360} fluid />
                </Link>
                <div className="article-listing-body">
                  <div className="article-listing-meta">
                    <span>{formatBlogDate(post.publishedAt)}</span>
                    <span>{post.category}</span>
                  </div>
                  <h3>
                    <Link href={`/blogs/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt}</p>
                  <div className="article-listing-footer">
                    <span>{post.readTime}</span>
                    <Link href={`/blogs/${post.id}`} className="article-listing-link">
                      Read Article
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
