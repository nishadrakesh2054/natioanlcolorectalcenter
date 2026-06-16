"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { pageNeedsGlightbox, pageNeedsPureCounter } from "@/lib/routeAssets";

declare global {
  interface Window {
    AOS?: {
      init: (options: Record<string, unknown>) => void;
      refresh?: () => void;
      refreshHard?: () => void;
    };
    GLightbox?: new (options: Record<string, unknown>) => unknown;
    PureCounter?: new () => unknown;
  }
}

function initFaqAccordion() {
  if (document.body.dataset.faqAccordionBound === "true") {
    return;
  }

  document.body.dataset.faqAccordionBound = "true";

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const trigger = target.closest(".faq-item h3, .faq-item .faq-toggle");
    if (!trigger) {
      return;
    }

    trigger.closest(".faq-item")?.classList.toggle("faq-active");
  });
}

function initCoreUi() {
  const selectBody = document.querySelector("body");
  const selectHeader = document.querySelector("#header");
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");
  const scrollTop = document.querySelector(".scroll-top");

  const toggleScrolled = () => {
    if (
      !selectHeader ||
      !selectBody ||
      (!selectHeader.classList.contains("scroll-up-sticky") &&
        !selectHeader.classList.contains("sticky-top") &&
        !selectHeader.classList.contains("fixed-top"))
    ) {
      return;
    }
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  };

  const syncMobileNavState = () => {
    const isOpen = document.body.classList.contains("mobile-nav-active");
    mobileNavToggleBtn?.setAttribute("aria-expanded", isOpen ? "true" : "false");
    mobileNavToggleBtn?.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  };

  const mobileNavToogle = () => {
    document.querySelector("body")?.classList.toggle("mobile-nav-active");
    mobileNavToggleBtn?.classList.toggle("bi-list");
    mobileNavToggleBtn?.classList.toggle("bi-x");
    syncMobileNavState();
  };

  const toggleScrollTop = () => {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  };

  const onScrollTopClick = (e: Event) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  toggleScrolled();
  document.addEventListener("scroll", toggleScrolled, { passive: true });

  mobileNavToggleBtn?.addEventListener("click", mobileNavToogle);
  syncMobileNavState();

  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLElement;
      const parent = target.parentNode as HTMLElement | null;
      parent?.classList.toggle("active");
      (parent?.nextElementSibling as HTMLElement | null)?.classList.toggle(
        "dropdown-active"
      );
      e.stopImmediatePropagation();
    });
  });

  scrollTop?.addEventListener("click", onScrollTopClick);
  document.addEventListener("scroll", toggleScrollTop, { passive: true });
  toggleScrollTop();

  initFaqAccordion();
}

function initAos() {
  if (!window.AOS || !document.querySelector("[data-aos]")) {
    return;
  }

  if (!document.body.classList.contains("aos-init")) {
    window.AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
    return;
  }

  window.AOS.refreshHard?.();
  window.AOS.refresh?.();
}

function initGlightbox() {
  if (window.GLightbox && document.querySelector(".glightbox")) {
    new window.GLightbox({ selector: ".glightbox" });
  }
}

function initPureCounter() {
  if (window.PureCounter && document.querySelector(".purecounter")) {
    new window.PureCounter();
  }
}

export default function MedilabScripts() {
  const pathname = usePathname();
  const coreInitializedRef = useRef(false);
  const aosReadyRef = useRef(false);
  const pureCounterReadyRef = useRef(false);
  const glightboxReadyRef = useRef(false);
  const needsPureCounter = pageNeedsPureCounter(pathname);
  const needsGlightbox = pageNeedsGlightbox(pathname);

  const initCoreOnce = () => {
    if (coreInitializedRef.current) {
      return;
    }
    coreInitializedRef.current = true;
    initCoreUi();
  };

  useLayoutEffect(() => {
    initCoreOnce();
    initFaqAccordion();

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    document.body.classList.remove("scrolled");

    if (aosReadyRef.current) {
      initAos();
    }

    if (needsPureCounter && pureCounterReadyRef.current) {
      initPureCounter();
    }

    if (needsGlightbox && glightboxReadyRef.current) {
      initGlightbox();
    }
  }, [needsGlightbox, needsPureCounter, pathname]);

  return (
    <>
      <Script
        src="/assets/vendor/aos/aos.js"
        strategy="lazyOnload"
        onLoad={() => {
          aosReadyRef.current = true;
          initAos();
        }}
      />
      {needsPureCounter && (
        <Script
          src="/assets/vendor/purecounter/purecounter_vanilla.js"
          strategy="lazyOnload"
          onLoad={() => {
            pureCounterReadyRef.current = true;
            initPureCounter();
          }}
        />
      )}
      {needsGlightbox && (
        <Script
          src="/assets/vendor/glightbox/js/glightbox.min.js"
          strategy="lazyOnload"
          onLoad={() => {
            glightboxReadyRef.current = true;
            initGlightbox();
          }}
        />
      )}
    </>
  );
}
