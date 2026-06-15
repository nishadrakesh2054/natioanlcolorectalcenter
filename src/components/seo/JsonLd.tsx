import { absoluteUrl, getSiteUrl } from "@/lib/seo";
import { siteContact } from "@/lib/siteContact";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "@id": `${getSiteUrl()}/#organization`,
    name: siteContact.name,
    alternateName: siteContact.shortName,
    url: getSiteUrl(),
    logo: absoluteUrl(siteContact.logo),
    image: absoluteUrl("/assets/img/hero-bg.jpg"),
    email: siteContact.email,
    telephone: siteContact.phones.telRakesh,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteContact.address.line1,
      addressLocality: siteContact.address.line2,
      addressCountry: "NP",
    },
    sameAs: [siteContact.social.facebook, siteContact.social.whatsapp].filter(Boolean),
    medicalSpecialty: "Colorectal Surgery",
    description:
      "Nepal's dedicated National Colorectal Center for screening, diagnosis, treatment, and follow-up of colorectal conditions.",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl()}/#website`,
    url: getSiteUrl(),
    name: siteContact.name,
    publisher: { "@id": `${getSiteUrl()}/#organization` },
    inLanguage: "en-NP",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: [input.image.startsWith("http") ? input.image : absoluteUrl(input.image)],
    datePublished: input.datePublished,
    author: {
      "@type": "Organization",
      name: input.author ?? siteContact.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteContact.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteContact.logo),
      },
    },
    mainEntityOfPage: absoluteUrl(input.path),
  };
}

export function physicianJsonLd(input: {
  name: string;
  description: string;
  path: string;
  image: string;
  role: string;
  email?: string;
  phone?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: input.name,
    description: input.description,
    image: input.image.startsWith("http") ? input.image : absoluteUrl(input.image),
    url: absoluteUrl(input.path),
    medicalSpecialty: input.role,
    email: input.email,
    telephone: input.phone,
    worksFor: {
      "@type": "MedicalOrganization",
      name: siteContact.name,
      url: getSiteUrl(),
    },
  };
}

export function medicalWebPageJsonLd(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    image: input.image
      ? input.image.startsWith("http")
        ? input.image
        : absoluteUrl(input.image)
      : undefined,
    isPartOf: { "@id": `${getSiteUrl()}/#website` },
    about: {
      "@type": "MedicalOrganization",
      name: siteContact.name,
    },
  };
}

export function faqPageJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
