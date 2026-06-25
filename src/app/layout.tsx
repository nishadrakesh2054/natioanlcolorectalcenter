import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Roboto, Poppins } from "next/font/google";
import SiteChrome from "@/components/layout/SiteChrome";
import { JsonLd, localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from "@/components/seo/JsonLd";
import RouteAssets from "@/components/RouteAssets";
import { getPublicNav } from "@/lib/public-nav";
import { isAdminRoute } from "@/lib/routeAssets";
import { siteMetadata } from "@/lib/seo";
import { getSupabaseHostname } from "@/lib/supabase-host";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#20458F",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const adminRoute = isAdminRoute(pathname);
  const nav = adminRoute ? { diseaseNav: [], specialtyNav: [] } : await getPublicNav();
  const supabaseHost = getSupabaseHostname();

  return (
    <html lang="en-NP" data-scroll-behavior="smooth">
      <head>
        {supabaseHost ? (
          <>
            <link rel="dns-prefetch" href={`https://${supabaseHost}`} />
            <link rel="preconnect" href={`https://${supabaseHost}`} crossOrigin="anonymous" />
          </>
        ) : null}
        {!adminRoute ? (
          <link rel="preload" href="/assets/img/banner.jpg" as="image" fetchPriority="high" />
        ) : null}
        <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
        <link href="/assets/css/main.css" rel="stylesheet" />
        <RouteAssets />
      </head>
      <body className={`${roboto.variable} ${poppins.variable}`}>
        {!adminRoute ? (
          <JsonLd data={[organizationJsonLd(), localBusinessJsonLd(), websiteJsonLd()]} />
        ) : null}
        <SiteChrome diseaseNav={nav.diseaseNav} specialtyNav={nav.specialtyNav}>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
