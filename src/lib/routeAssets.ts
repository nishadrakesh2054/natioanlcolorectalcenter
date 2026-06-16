export function isAdminRoute(pathname: string) {
  return pathname === "/login" || pathname.startsWith("/dashboard");
}

export function pageNeedsGlightbox(pathname: string) {
  return pathname === "/" || pathname === "/about" || pathname === "/gallery";
}

export function pageNeedsPureCounter(pathname: string) {
  return pathname === "/about";
}

export function pageNeedsAos(pathname: string) {
  return !isAdminRoute(pathname);
}
