import { isSocialLinkReady, socialLinks } from "@/lib/siteContact";

type SocialLinksProps = {
  className?: string;
};

export default function SocialLinks({ className = "" }: SocialLinksProps) {
  return (
    <div className={`social-links ${className}`.trim()}>
      {socialLinks.map((link) => {
        if (isSocialLinkReady(link.href)) {
          return (
            <a
              key={link.id}
              href={link.href}
              className={link.className}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              <i className={`bi ${link.icon}`} aria-hidden="true"></i>
            </a>
          );
        }

        return (
          <span
            key={link.id}
            className={`${link.className} social-link-pending`}
            aria-label={`${link.label} (link coming soon)`}
            title={`${link.label} — add link in siteContact.ts`}
          >
            <i className={`bi ${link.icon}`} aria-hidden="true"></i>
          </span>
        );
      })}
    </div>
  );
}
