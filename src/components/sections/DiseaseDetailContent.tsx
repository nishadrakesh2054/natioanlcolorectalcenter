import type {
  ColorectalDisease,
  DiseaseContentItem,
  DiseaseContentSection,
} from "@/lib/colorectalDiseases";

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

function ContentItem({ item }: { item: DiseaseContentItem }) {
  if (isNestedItem(item)) {
    return (
      <div className="disease-detail-nested">
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

function ContentSection({ section }: { section: DiseaseContentSection }) {
  if (!hasSectionContent(section)) {
    return null;
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
        {section.items.map((item, index) => (
          <ContentItem key={`${section.title}-${index}`} item={item} />
        ))}
      </div>
    </article>
  );
}

type DiseaseDetailContentProps = {
  disease: ColorectalDisease;
};

export default function DiseaseDetailContent({ disease }: DiseaseDetailContentProps) {
  const sections = disease.content.filter(hasSectionContent);

  if (sections.length === 0) {
    return (
      <div className="service-detail-overview">
        <h4>Overview</h4>
        <p className="mb-0">{disease.description}</p>
      </div>
    );
  }

  return (
    <div className="row gy-4">
      {sections.map((section) => (
        <div className="col-12" key={section.title || section.items[0]?.toString()}>
          <ContentSection section={section} />
        </div>
      ))}
    </div>
  );
}
