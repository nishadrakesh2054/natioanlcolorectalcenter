import type { Metadata, Viewport } from "next";
import { Roboto, Poppins, Raleway } from "next/font/google";
import SiteChrome from "@/components/layout/SiteChrome";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/components/seo/JsonLd";
import RouteAssets from "@/components/RouteAssets";
import { siteMetadata } from "@/lib/seo";
import { getDoctorSpecialties } from "@/lib/doctor-specialty";
import { fetchColorectalDiseases, fetchDoctors } from "@/lib/supabase/fetch-content";
import { toDiseaseNavItems } from "@/lib/types/disease-nav";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
  preload: false,
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-raleway",
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
  const [diseases, doctors] = await Promise.all([fetchColorectalDiseases(), fetchDoctors()]);
  const diseaseNav = toDiseaseNavItems(diseases);
  const specialtyNav = getDoctorSpecialties(doctors);

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
        <link href="/assets/css/main.css" rel="stylesheet" />
        <RouteAssets />
      </head>
      <body className={`${roboto.variable} ${poppins.variable} ${raleway.variable}`}>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <SiteChrome diseaseNav={diseaseNav} specialtyNav={specialtyNav}>{children}</SiteChrome>
      </body>
    </html>
  );
}
