"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import SiteImage from "@/components/ui/SiteImage";
import type { Testimonial } from "@/lib/testimonials";

type TestimonialsCarouselProps = {
  items: Testimonial[];
};

export default function TestimonialsCarousel({ items }: TestimonialsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="testimonials-carousel">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {items.map((item) => (
            <div className="embla__slide" key={item.id}>
              <div className="testimonial-item">
                <div className="d-flex">
                  <SiteImage
                    src={item.image}
                    className="testimonial-img flex-shrink-0"
                    alt={item.name}
                    width={90}
                    height={90}
                  />
                  <div>
                    <h3>{item.name}</h3>
                    <h4>{item.role}</h4>
                    <div className="stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                  </div>
                </div>
                <p>
                  <i className="bi bi-quote quote-icon-left"></i>
                  <span>{item.quote}</span>
                  <i className="bi bi-quote quote-icon-right"></i>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="swiper-pagination">
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to testimonial ${index + 1}`}
            className={`swiper-pagination-bullet${
              index === selectedIndex ? " swiper-pagination-bullet-active" : ""
            }`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
