export function pageNeedsGlightbox(pathname: string) {
  return pathname === "/" || pathname === "/about" || pathname === "/gallery";
}

export function pageNeedsPureCounter(pathname: string) {
  return pathname === "/about";
}
