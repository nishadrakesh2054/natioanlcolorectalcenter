"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pageNeedsAos, pageNeedsGlightbox } from "@/lib/routeAssets";

const ROUTE_STYLES = [
  { id: "ncrc-aos-css", href: "/assets/vendor/aos/aos.css" },
  { id: "ncrc-glightbox-css", href: "/assets/vendor/glightbox/css/glightbox.min.css" },
  { id: "ncrc-gallery-css", href: "/assets/css/gallery.css" },
] as const;

function ensureStylesheet(id: string, href: string) {
  if (document.getElementById(id)) {
    return;
  }

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function removeStylesheet(id: string) {
  document.getElementById(id)?.remove();
}

export default function RouteAssets() {
  const pathname = usePathname();
  const needsAos = pageNeedsAos(pathname);
  const needsGlightbox = pageNeedsGlightbox(pathname);

  useEffect(() => {
    if (needsAos) {
      ensureStylesheet("ncrc-aos-css", ROUTE_STYLES[0].href);
    } else {
      removeStylesheet("ncrc-aos-css");
    }

    if (needsGlightbox) {
      ensureStylesheet("ncrc-glightbox-css", ROUTE_STYLES[1].href);
      ensureStylesheet("ncrc-gallery-css", ROUTE_STYLES[2].href);
      return;
    }

    removeStylesheet("ncrc-glightbox-css");
    removeStylesheet("ncrc-gallery-css");
  }, [needsAos, needsGlightbox]);

  return null;
}
