import SiteImage from "@/components/ui/SiteImage";
import type { GalleryItem } from "@/lib/types/gallery";

type GallerySectionProps = {
  items: GalleryItem[];
};

export default function GallerySection({ items }: GallerySectionProps) {
  return (
    <section id="gallery" className="gallery section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Gallery</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container-fluid" data-aos="fade-up" data-aos-delay="100">
        <div className="row g-0">
          {items.map((item) => (
            <div className="col-lg-3 col-md-4" key={item.id}>
              <div className="gallery-item">
                <a href={item.src} className="glightbox" data-gallery="images-gallery">
                  <SiteImage
                    src={item.src}
                    alt={item.alt}
                    width={480}
                    height={360}
                    className="img-fluid"
                    fluid
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
