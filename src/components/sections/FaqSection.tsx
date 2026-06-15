import type { FaqItem } from "@/lib/types/faq";
import { siteContact } from "@/lib/siteContact";

type FaqSectionProps = {
  items: FaqItem[];
};

export default function FaqSection({ items }: FaqSectionProps) {
  return (
    <section id="faq" className="faq section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Frequently Asked Questions</h2>
        <p>
          Common questions about colorectal care, appointments, and services at{" "}
          {siteContact.shortName}.
        </p>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10" data-aos="fade-up" data-aos-delay="100">
            <div className="faq-container">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`faq-item${index === 0 ? " faq-active" : ""}`}
                >
                  <h3>{item.question}</h3>
                  <div className="faq-content">
                    <p>{item.answer}</p>
                  </div>
                  <i className="faq-toggle bi bi-chevron-right"></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
