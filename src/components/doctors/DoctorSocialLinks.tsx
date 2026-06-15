import type { DoctorSocialLink, DoctorSocialType } from "@/lib/types/doctor";

const SOCIAL_ICON: Record<DoctorSocialType, string> = {
  facebook: "bi bi-facebook",
  instagram: "bi bi-instagram",
  whatsapp: "bi bi-whatsapp",
  twitter: "bi bi-twitter-x",
};

const SOCIAL_LABEL: Record<DoctorSocialType, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  twitter: "Twitter",
};

type DoctorSocialLinksProps = {
  links: DoctorSocialLink[];
  className?: string;
  variant?: "card" | "detail";
};

export default function DoctorSocialLinks({
  links,
  className = "social",
  variant = "card",
}: DoctorSocialLinksProps) {
  const linkItems = links.map((link) => {
    const isPlaceholder = link.url === "#";

    return (
      <a
        key={link.type}
        href={link.url}
        className={isPlaceholder ? "social-link-pending" : undefined}
        aria-label={SOCIAL_LABEL[link.type]}
        title={SOCIAL_LABEL[link.type]}
        {...(isPlaceholder
          ? { "aria-disabled": true }
          : { target: "_blank", rel: "noopener noreferrer" })}
      >
        <i className={SOCIAL_ICON[link.type]}></i>
      </a>
    );
  });

  if (variant === "detail") {
    return (
      <div className="doctor-detail-social-links">
        <p className="doctor-detail-social-title">Connect on Social Media</p>
        <div className="social-links">{linkItems}</div>
      </div>
    );
  }

  return <div className={className}>{linkItems}</div>;
}
