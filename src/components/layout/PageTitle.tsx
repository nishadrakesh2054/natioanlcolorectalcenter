import Breadcrumbs, { buildBreadcrumbTrail, type BreadcrumbItem } from "@/components/layout/Breadcrumbs";

type PageTitleProps = {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
};

export default function PageTitle({ title, breadcrumbs }: PageTitleProps) {
  const trail = buildBreadcrumbTrail(title, breadcrumbs);

  return (
    <section className="page-hero section">
      <div className="container" data-aos="fade-up">
        <Breadcrumbs items={trail} />
        <h1 className="page-hero-title">{title}</h1>
      </div>
    </section>
  );
}
