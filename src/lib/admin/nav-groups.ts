import {
  adminResources,
  type AdminResource,
  type AdminResourceGroup,
} from "@/lib/admin/resources";

export const ADMIN_NAV_GROUPS: { id: AdminResourceGroup; label: string }[] = [
  { id: "care", label: "Medical care" },
  { id: "articles", label: "Articles & stories" },
  { id: "media", label: "Media & testimonials" },
  { id: "site", label: "Website" },
  { id: "inbox", label: "Form submissions" },
];

const GROUP_RESOURCE_ORDER: Record<AdminResourceGroup, string[]> = {
  care: ["doctors", "diseases", "services"],
  articles: ["blogs", "case-studies"],
  media: ["gallery", "testimonials"],
  site: ["faq"],
  inbox: ["contact-messages", "appointment-requests"],
};

export type AdminNavGroup = {
  id: AdminResourceGroup;
  label: string;
  resources: AdminResource[];
};

function sortResourcesInGroup(groupId: AdminResourceGroup, resources: AdminResource[]) {
  const order = GROUP_RESOURCE_ORDER[groupId];
  return [...resources].sort((left, right) => {
    const leftIndex = order.indexOf(left.slug);
    const rightIndex = order.indexOf(right.slug);
    return (leftIndex === -1 ? 999 : leftIndex) - (rightIndex === -1 ? 999 : rightIndex);
  });
}

export function getGroupedAdminResources(): AdminNavGroup[] {
  return ADMIN_NAV_GROUPS.map((group) => ({
    id: group.id,
    label: group.label,
    resources: sortResourcesInGroup(
      group.id,
      adminResources.filter((resource) => resource.group === group.id)
    ),
  })).filter((group) => group.resources.length > 0);
}
