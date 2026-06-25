import type { Metadata } from "next";
import { siteContact } from "@/lib/siteContact";

const DEFAULT_DESCRIPTION =
  "Expert colorectal care at Nepal's National Colorectal Center (NCRC), Everest Hospital, New Baneshwor. Screenings, diagnostics, surgery, and follow-up.";

const DEFAULT_KEYWORDS = [
  "colorectal center Nepal",
  "NCRC",
  "colonoscopy Kathmandu",
  "colorectal surgery",
  "piles treatment Nepal",
  "colon cancer screening",
];

export function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (url) {
    return url.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export function absoluteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

export function resolveImageUrl(image?: string) {
  if (!image) {
    return absoluteUrl("/assets/img/logo.png");
  }
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  return absoluteUrl(image);
}

type PageSeoInput = {
  title: string;
  description?: string;
  path: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  openGraphType?: "website" | "article";
};

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  keywords = DEFAULT_KEYWORDS,
  image,
  noIndex = false,
  openGraphType = "website",
}: PageSeoInput): Metadata {
  const ogImage = resolveImageUrl(image);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: openGraphType,
      title,
      description,
      url: absoluteUrl(path),
      siteName: siteContact.name,
      locale: "en_US",
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export const siteMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "National Colorectal Center | NCRC Nepal",
    template: "%s | NCRC",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  applicationName: siteContact.shortName,
  authors: [{ name: siteContact.name }],
  creator: siteContact.name,
  publisher: siteContact.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/assets/img/logo.png",
    apple: "/assets/img/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteContact.name,
    title: "National Colorectal Center | NCRC Nepal",
    description: DEFAULT_DESCRIPTION,
    images: [{ url: "/assets/img/logo.png", alt: siteContact.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "National Colorectal Center | NCRC Nepal",
    description: DEFAULT_DESCRIPTION,
    images: ["/assets/img/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const publicPageSeo = {
  home: createPageMetadata({
    title: "National Colorectal Center | NCRC Nepal",
    description: DEFAULT_DESCRIPTION,
    path: "/",
    image: "/assets/img/hero-bg.jpg",
  }),
  about: createPageMetadata({
    title: "About Us",
    description:
      "NCRC is Nepal's first dedicated colorectal center offering screenings, diagnostics, surgical care, and ongoing management of colorectal diseases.",
    path: "/about",
    keywords: [
      "about NCRC",
      "colorectal care Nepal",
      "Everest Hospital Baneshwor",
      "colorectal specialists Nepal",
    ],
  }),
  services: createPageMetadata({
    title: "Medical Services",
    description:
      "NCRC services including colonoscopy, endoscopy, anal manometry, CRC screening, biofeedback, laser surgery, and more.",
    path: "/services",
    keywords: ["colonoscopy Nepal", "colorectal services", "CRC screening", "laser surgery"],
  }),
  doctors: createPageMetadata({
    title: "Our Doctors",
    description: "Meet NCRC colorectal, pediatric, and gastroenterology specialists.",
    path: "/doctors",
    keywords: ["colorectal surgeons Nepal", "NCRC doctors", "gastroenterology specialists"],
  }),
  colorectalDisease: createPageMetadata({
    title: "Colorectal Diseases",
    description:
      "Explore colorectal conditions treated at NCRC including piles, fissure, fistula, colon cancer, and more.",
    path: "/colorectal-disease",
    keywords: ["piles", "anal fissure", "fistula", "colon cancer", "colorectal conditions"],
  }),
  /** @deprecated Use colorectalDisease */
  departments: createPageMetadata({
    title: "Colorectal Diseases",
    description:
      "Explore colorectal conditions treated at NCRC including piles, fissure, fistula, colon cancer, and more.",
    path: "/colorectal-disease",
    keywords: ["piles", "anal fissure", "fistula", "colon cancer", "colorectal conditions"],
  }),
  faq: createPageMetadata({
    title: "FAQ",
    description:
      "Frequently asked questions about colorectal care, appointments, screening, and services at NCRC.",
    path: "/faq",
  }),
  gallery: createPageMetadata({
    title: "Gallery",
    description: "Photos from the National Colorectal Center (NCRC) at Everest Hospital, Baneshwor.",
    path: "/gallery",
  }),
  testimonials: createPageMetadata({
    title: "Patient Testimonials",
    description: "Stories from patients who received colorectal care at NCRC.",
    path: "/testimonials",
  }),
  blogs: createPageMetadata({
    title: "Blogs",
    description: "Colorectal health articles, prevention tips, and patient guidance from the NCRC team.",
    path: "/blogs",
  }),
  caseStudies: createPageMetadata({
    title: "Case Studies",
    description: "Clinical case studies and treatment outcomes from NCRC.",
    path: "/case-study",
  }),
  contact: createPageMetadata({
    title: "Contact Us",
    description: `Contact NCRC at ${siteContact.address.full}. Call ${siteContact.phones.display} or email ${siteContact.email}.`,
    path: "/contact",
  }),
  appointment: createPageMetadata({
    title: "Book an Appointment",
    description:
      "Schedule a colorectal consultation at NCRC. Choose your preferred date, department, and specialist.",
    path: "/appointment",
    keywords: ["book appointment NCRC", "colorectal consultation Nepal"],
  }),
} as const;
