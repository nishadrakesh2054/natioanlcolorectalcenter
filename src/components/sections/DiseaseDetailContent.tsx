import type {
  ColorectalDisease,
  DiseaseContentItem,
  DiseaseContentSection,
} from "@/lib/types/colorectal-disease";

const CRC_SECTION_ICONS = [
  "bi bi-shield-check",
  "bi bi-heart-pulse",
  "bi bi-activity",
  "bi bi-bandaid",
  "bi bi-clipboard2-data",
  "bi bi-hospital",
];

function isNestedItem(item: DiseaseContentItem): item is Extract<DiseaseContentItem, { sub_title: string }> {
  return typeof item === "object" && item !== null && "sub_title" in item;
}

function hasSectionContent(section: DiseaseContentSection) {
  if (section.title.trim()) {
    return true;
  }

  return section.items.some((item) => {
    if (typeof item === "string") {
      return item.trim().length > 0;
    }

    return item.sub_title.trim() || item.sub_items.some((subItem) => subItem.trim().length > 0);
  });
}

function sectionHasNestedItems(section: DiseaseContentSection) {
  return section.items.some((item) => isNestedItem(item));
}

function ContentItem({ item, variant }: { item: DiseaseContentItem; variant?: "crc" | "default" }) {
  if (isNestedItem(item)) {
    return (
      <div className={`disease-detail-nested${variant === "crc" ? " crc-disease-nested" : ""}`}>
        {item.sub_title.trim() && <p className="disease-detail-subtitle">{item.sub_title}</p>}
        {item.sub_items.length > 0 && (
          <ul>
            {item.sub_items.map((subItem) => (
              <li key={subItem}>{subItem}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  if (!item.trim()) {
    return null;
  }

  return (
    <ul>
      <li>{item}</li>
    </ul>
  );
}

function ContentSection({
  section,
  variant,
  index,
}: {
  section: DiseaseContentSection;
  variant?: "crc" | "default";
  index: number;
}) {
  if (!hasSectionContent(section)) {
    return null;
  }

  const icon = CRC_SECTION_ICONS[index % CRC_SECTION_ICONS.length];

  if (variant === "crc") {
    return (
      <article className="crc-disease-content-card">
        {section.title.trim() && (
          <div className="crc-disease-content-card-head">
            <span className="crc-disease-content-card-icon" aria-hidden="true">
              <i className={icon}></i>
            </span>
            <h3>{section.title}</h3>
          </div>
        )}
        <div className="crc-disease-content-card-body disease-detail-section-body">
          {section.items.map((item, itemIndex) => (
            <ContentItem key={`${section.title}-${itemIndex}`} item={item} variant={variant} />
          ))}
        </div>
      </article>
    );
  }

  return (
    <article className="doctor-detail-block disease-detail-block">
      {section.title.trim() && (
        <div className="doctor-detail-block-head">
          <i className="bi bi-check-circle" aria-hidden="true"></i>
          <h4>{section.title}</h4>
        </div>
      )}
      <div className="disease-detail-section-body">
        {section.items.map((item, itemIndex) => (
          <ContentItem key={`${section.title}-${itemIndex}`} item={item} variant={variant} />
        ))}
      </div>
    </article>
  );
}

type DiseaseDetailContentProps = {
  disease: ColorectalDisease;
  variant?: "crc" | "default";
};

export default function DiseaseDetailContent({
  disease,
  variant = "default",
}: DiseaseDetailContentProps) {
  const sections = disease.content.filter(hasSectionContent);

  if (sections.length === 0) {
    if (variant === "crc") {
      return null;
    }

    return (
      <div className="service-detail-overview">
        <h4>Overview</h4>
        <p className="mb-0">{disease.description}</p>
      </div>
    );
  }

  if (variant === "crc") {
    return (
      <div className="crc-disease-content">
        <div className="crc-disease-content-heading">
          <span className="crc-disease-content-eyebrow">Clinical information</span>
          <h2>What you should know</h2>
        </div>
        <div className="row gy-4">
          {sections.map((section, index) => (
            <div
              className={`col-12${sectionHasNestedItems(section) || section.items.length > 4 ? "" : " col-lg-6"}`}
              key={section.title || `section-${index}`}
            >
              <ContentSection section={section} variant={variant} index={index} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="row gy-4">
      {sections.map((section, index) => (
        <div className="col-12" key={section.title || `section-${index}`}>
          <ContentSection section={section} variant={variant} index={index} />
        </div>
      ))}
    </div>
  );
}
