import TestimonialsCarousel from "@/components/sections/TestimonialsCarousel";
import type { Testimonial } from "@/lib/types/testimonial";

type TestimonialsSectionProps = {
  items: Testimonial[];
};

export default function TestimonialsSection({ items }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 info" data-aos="fade-up" data-aos-delay="100">
            <h3>Testimonials</h3>
            <p>
              Hear from patients who received colorectal care at NCRC. Their stories reflect the
              compassion, expertise, and support our team provides throughout diagnosis, treatment,
              and recovery.
            </p>
          </div>

          <div className="col-lg-7" data-aos="fade-up" data-aos-delay="200">
            <TestimonialsCarousel items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}
