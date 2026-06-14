import TestimonialsCarousel from "@/components/sections/TestimonialsCarousel";
import { testimonials } from "@/lib/testimonials";

export default function TestimonialsSection() {
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
            <TestimonialsCarousel items={testimonials} />
          </div>
        </div>
      </div>
    </section>
  );
}
