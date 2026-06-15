"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import SiteImage from "@/components/ui/SiteImage";
import type { ColorectalDisease } from "@/lib/types/colorectal-disease";

function getPreviewImages(image: string) {
  return Array.from({ length: 4 }, () => image);
}

type DepartmentsSectionProps = {
  diseases: ColorectalDisease[];
};

export default function DepartmentsSection({ diseases }: DepartmentsSectionProps) {
  const [activeId, setActiveId] = useState(diseases[0]?.id ?? 1);
  const [isTruncated, setIsTruncated] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const summaryWrapRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const activeDisease =
    diseases.find((disease) => disease.id === activeId) ?? diseases[0];
  const previewImages = activeDisease ? getPreviewImages(activeDisease.image) : [];

  useLayoutEffect(() => {
    const updateLayout = () => {
      const nav = navRef.current;
      const panel = panelRef.current;
      const summaryWrap = summaryWrapRef.current;
      const summary = summaryRef.current;
      const title = titleRef.current;
      const gallery = galleryRef.current;
      const actions = actionsRef.current;

      if (!nav || !panel || !summaryWrap || !summary) {
        return;
      }

      const isMobile = window.matchMedia("(max-width: 991px)").matches;
      const navHeight = nav.offsetHeight;

      summaryWrap.style.maxHeight = "";

      if (isMobile) {
        panel.style.minHeight = "";
        panel.style.height = "";
      } else {
        panel.style.minHeight = `${navHeight}px`;
        panel.style.height = `${navHeight}px`;

        if (title && gallery && actions) {
          const panelStyles = window.getComputedStyle(panel);
          const paddingY =
            parseFloat(panelStyles.paddingTop) + parseFloat(panelStyles.paddingBottom);
          const contentStyles = window.getComputedStyle(panel.firstElementChild!);
          const rowGap = parseFloat(contentStyles.rowGap || contentStyles.gap || "10");
          const reservedHeight =
            title.offsetHeight +
            actions.offsetHeight +
            rowGap * 3 +
            paddingY +
            80;

          const summaryMaxHeight = Math.max(56, navHeight - reservedHeight);
          summaryWrap.style.maxHeight = `${summaryMaxHeight}px`;
        }
      }

      requestAnimationFrame(() => {
        setIsTruncated(summary.scrollHeight > summary.clientHeight + 2);
      });
    };

    updateLayout();

    const nav = navRef.current;
    const observer = nav ? new ResizeObserver(updateLayout) : null;
    if (nav && observer) {
      observer.observe(nav);
    }

    window.addEventListener("resize", updateLayout);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateLayout);
    };
  }, [activeId]);

  return (
    <section id="departments" className="departments section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Colorectal Disease</h2>
        <p>Explore colorectal conditions we diagnose and treat at NCRC.</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="colorectal-disease-layout">
          <nav
            ref={navRef}
            className="colorectal-disease-nav"
            aria-label="Colorectal conditions"
          >
            {diseases.map((disease, index) => (
              <button
                key={disease.id}
                type="button"
                className={`colorectal-disease-nav-item${
                  activeId === disease.id ? " active" : ""
                }`}
                aria-current={activeId === disease.id ? "true" : undefined}
                onClick={() => setActiveId(disease.id)}
              >
                <span className="colorectal-disease-nav-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="colorectal-disease-nav-label">{disease.title.trim()}</span>
                <i
                  className="bi bi-chevron-right colorectal-disease-nav-arrow"
                  aria-hidden="true"
                ></i>
              </button>
            ))}
          </nav>

          <div ref={panelRef} className="colorectal-disease-panel">
            {activeDisease && (
            <div className="colorectal-disease-panel-content details">
              <h3 ref={titleRef}>{activeDisease.title.trim()}</h3>

              <div
                ref={summaryWrapRef}
                className={`colorectal-disease-summary-wrap${
                  isTruncated ? " is-truncated" : ""
                }`}
              >
                <p ref={summaryRef} className="fst-italic colorectal-disease-summary">
                  {activeDisease.description}
                </p>
              </div>

              <div ref={galleryRef} className="colorectal-disease-gallery">
                {previewImages.map((src, index) => (
                  <div
                    className="colorectal-disease-gallery-item"
                    key={`${activeDisease.id}-${index}`}
                  >
                    <SiteImage
                      src={src}
                      alt={`${activeDisease.title.trim()} preview ${index + 1}`}
                      width={240}
                      height={180}
                      fluid
                    />
                  </div>
                ))}
              </div>

              <div ref={actionsRef} className="colorectal-disease-panel-actions">
                {isTruncated ? (
                  <Link href={`/departments/${activeDisease.id}`} className="cta-btn">
                    Read More
                  </Link>
                ) : (
                  <Link
                    href={`/departments/${activeDisease.id}`}
                    className="cta-btn cta-btn-outline"
                  >
                    Read Details
                  </Link>
                )}
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
