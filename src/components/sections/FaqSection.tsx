import { siteContact } from "@/lib/siteContact";

const faqItems = [
  {
    question: "What is the National Colorectal Center (NCRC)?",
    answer:
      "NCRC is Nepal's first dedicated center for focused colorectal care. Led by experienced colorectal surgeons and associated specialists, we provide screenings, diagnostics, surgical treatment, and ongoing management for colorectal conditions—with an emphasis on awareness, prevention, and early detection.",
  },
  {
    question: "Which colorectal conditions do you treat?",
    answer:
      "We diagnose and manage a wide range of conditions including hemorrhoids (piles), anal fissures, fistulas, pilonidal sinus, constipation, rectal prolapse, polyps, inflammatory bowel disease (IBD), and colon and rectal cancer. Explore each condition under Colorectal Disease on our site or contact us if you are unsure where to start.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "Use the Make an Appointment form on our website with your name, contact details, preferred date, and a brief message about your concern. You can also call us at " +
      siteContact.phones.display +
      " or email " +
      siteContact.email +
      ". Our team will help schedule a consultation with the appropriate specialist.",
  },
  {
    question: "When should I consider colorectal cancer screening?",
    answer:
      "Screening helps detect colorectal cancer early, often before symptoms appear. You should discuss screening if you have blood in stool, persistent changes in bowel habits, unexplained weight loss, or a family history of colorectal cancer. At NCRC we offer colonoscopy, FIT stool tests, and related screening services—your doctor will recommend the right option for your age and risk profile.",
  },
  {
    question: "What should I expect during a colonoscopy?",
    answer:
      "A colonoscopy uses a flexible camera to examine the colon and rectum for polyps, cancer, and other abnormalities. The procedure is usually done with sedation for comfort. Biopsies may be taken if needed. Most patients rest for the remainder of the day after sedation and return to normal activities within one to two days.",
  },
  {
    question: "Where is NCRC located and how can I reach you?",
    answer:
      "We are located at " +
      siteContact.address.full +
      ". For appointments or questions, call " +
      siteContact.phones.display +
      ", email " +
      siteContact.email +
      ", or message us on WhatsApp. In an emergency, contact us immediately—our team is ready to provide prompt care and support.",
  },
];

export default function FaqSection() {
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
              {faqItems.map((item, index) => (
                <div
                  key={item.question}
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
