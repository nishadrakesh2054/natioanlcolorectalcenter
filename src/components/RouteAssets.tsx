"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pageNeedsGlightbox } from "@/lib/routeAssets";

const ROUTE_STYLES = [
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
  const needsGlightbox = pageNeedsGlightbox(pathname);

  useEffect(() => {
    if (needsGlightbox) {
      for (const style of ROUTE_STYLES) {
        ensureStylesheet(style.id, style.href);
      }
      return;
    }

    for (const style of ROUTE_STYLES) {
      removeStylesheet(style.id);
    }
  }, [needsGlightbox]);

  return null;
}
