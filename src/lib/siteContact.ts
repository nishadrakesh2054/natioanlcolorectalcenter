export const siteContact = {
  name: "National Colorectal Center",
  shortName: "NCRC",
  headerBrand: {
    line1: "NationalColorectal",
    line2: "Center",
  },
  logo: "/assets/img/logo.png",
  brand: {
    primary: "#20458F",
    secondary: "#EF2937",
  },
  email: "nationalcolorectalcenter@gmail.com",
  phones: {
    display: "9817073670 / 9861555976",
    header: "9861555976",
    rakesh: "+977-9817073670",
    binay: "+977-9861555976",
    telRakesh: "+9779817073670",
    telBinay: "+9779861555976",
  },
  address: {
    line1: "Everest Hospital",
    line2: "New Baneshwor",
    full: "Everest Hospital, New Baneshwor",
  },
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Everest+Hospital,+New+Baneshwor,+Kathmandu,+Nepal&output=embed",
  social: {
    facebook: "https://www.facebook.com/ncrcnep",
    instagram: "",
    whatsapp: "https://wa.me/9817073670",
    tiktok: "",
  },
} as const;

export type SocialLinkItem = {
  id: keyof typeof siteContact.social;
  href: string;
  label: string;
  icon: string;
  className: string;
};

export const socialLinks: SocialLinkItem[] = [
  {
    id: "facebook",
    href: siteContact.social.facebook,
    label: "Facebook",
    icon: "bi-facebook",
    className: "facebook",
  },
  {
    id: "instagram",
    href: siteContact.social.instagram,
    label: "Instagram",
    icon: "bi-instagram",
    className: "instagram",
  },
  {
    id: "whatsapp",
    href: siteContact.social.whatsapp,
    label: "WhatsApp",
    icon: "bi-whatsapp",
    className: "whatsapp",
  },
  {
    id: "tiktok",
    href: siteContact.social.tiktok,
    label: "TikTok",
    icon: "bi-tiktok",
    className: "tiktok",
  },
];

export function isSocialLinkReady(href: string) {
  return href.trim().length > 0;
}
