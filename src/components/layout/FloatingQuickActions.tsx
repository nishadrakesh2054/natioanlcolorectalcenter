import Link from "next/link";
import { siteContact } from "@/lib/siteContact";

const quickActions = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: siteContact.social.whatsapp,
    icon: "bi-whatsapp",
    external: true,
  },
  {
    id: "call",
    label: "Call Us",
    href: `tel:${siteContact.phones.appointmentTel}`,
    icon: "bi-telephone-fill",
    external: false,
  },
  {
    id: "feedback",
    label: "Send Feedback",
    href: "/contact",
    icon: "bi-chat-left-text-fill",
    external: false,
  },
  {
    id: "appointment",
    label: "Appointment",
    href: "/appointment",
    icon: "bi-calendar-check-fill",
    external: false,
  },
] as const;

export default function FloatingQuickActions() {
  return (
    <aside className="floating-quick-actions" aria-label="Quick contact actions">
      <ul className="floating-quick-actions-list">
        {quickActions.map((action) => (
          <li key={action.id}>
            {action.external ? (
              <a
                href={action.href}
                className="floating-quick-action"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={action.label}
              >
                <span className="floating-quick-action-icon" aria-hidden="true">
                  <i className={`bi ${action.icon}`}></i>
                </span>
                <span className="floating-quick-action-label">{action.label}</span>
              </a>
            ) : (
              <Link href={action.href} className="floating-quick-action" aria-label={action.label}>
                <span className="floating-quick-action-icon" aria-hidden="true">
                  <i className={`bi ${action.icon}`}></i>
                </span>
                <span className="floating-quick-action-label">{action.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
