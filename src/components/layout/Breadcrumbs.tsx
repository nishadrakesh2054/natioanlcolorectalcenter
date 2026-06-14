import Link from "next/link";
import { Fragment } from "react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

const MAX_BREADCRUMB_LABEL = 32;

export function buildBreadcrumbTrail(
  title: string,
  breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }]
): BreadcrumbItem[] {
  const last = breadcrumbs[breadcrumbs.length - 1];

  if (!last.href && last.label === title) {
    return breadcrumbs;
  }

  if (last.href) {
    if (last.label === title) {
      return [...breadcrumbs.slice(0, -1), { label: title }];
    }

    return [...breadcrumbs, { label: title }];
  }

  return breadcrumbs;
}

function formatBreadcrumbLabel(label: string) {
  if (label.length <= MAX_BREADCRUMB_LABEL) {
    return label;
  }

  return `${label.slice(0, MAX_BREADCRUMB_LABEL - 1)}…`;
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const compact = items.length > 3;

  return (
    <nav className="page-hero-breadcrumb" aria-label="Breadcrumb">
      <ol className={compact ? "page-hero-breadcrumb--compact" : undefined}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isMiddle = index > 0 && !isLast;
          const label = formatBreadcrumbLabel(item.label);

          return (
            <Fragment key={`${item.label}-${index}`}>
              <li
                className={isMiddle && compact ? "page-hero-breadcrumb-middle" : undefined}
                aria-current={isLast ? "page" : undefined}
              >
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className={index === 0 && item.href === "/" ? "page-hero-breadcrumb-home" : undefined}
                  >
                    {index === 0 && item.href === "/" && (
                      <i className="bi bi-house-door-fill" aria-hidden="true"></i>
                    )}
                    <span>{label}</span>
                  </Link>
                ) : (
                  <span title={item.label}>{label}</span>
                )}
              </li>

              {compact && index === 0 && (
                <li className="page-hero-breadcrumb-ellipsis" aria-hidden="true">
                  <span>…</span>
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
