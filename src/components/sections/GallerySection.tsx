import SiteImage from "@/components/ui/SiteImage";

const galleryImages = Array.from({ length: 8 }, (_, index) => {
  const imageNumber = index + 1;
  return `/assets/img/gallery/gallery-${imageNumber}.jpg`;
});

export default function GallerySection() {
  return (
    <section id="gallery" className="gallery section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Gallery</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container-fluid" data-aos="fade-up" data-aos-delay="100">
        <div className="row g-0">
          {galleryImages.map((src) => (
            <div className="col-lg-3 col-md-4" key={src}>
              <div className="gallery-item">
                <a href={src} className="glightbox" data-gallery="images-gallery">
                  <SiteImage src={src} alt="" width={480} height={360} className="img-fluid" fluid />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
