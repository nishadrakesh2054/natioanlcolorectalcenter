
import SiteImage from "@/components/ui/SiteImage";

export default function AboutSection() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="row gy-4 gx-5 align-items-stretch">
          <div className="col-lg-6 d-flex" data-aos="fade-up" data-aos-delay="100">
            <div className="about-media-col">
              <div className="about-media-wrap">
                <SiteImage
                  src="/assets/img/about.jpg"
                  className="about-media-img"
                  alt="National Colorectal Center"
                  width={640}
                  height={480}
                  fluid
                />
                <a
                  href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                  className="glightbox pulsating-play-btn"
                  aria-label="Play video"
                ></a>
              </div>
              <blockquote className="about-quote">
                <i className="bi bi-quote about-quote-icon" aria-hidden="true"></i>
                <p>
                  &ldquo;A good set of bowels is worth more to a man than any quality of brains&rdquo;
                </p>
                <footer>
                  ~ <span className="text-danger">Josh Billings</span>
                </footer>
              </blockquote>
            </div>
          </div>

          <div className="col-lg-6 d-flex" data-aos="fade-up" data-aos-delay="200">
            <div className="about-content-col content">
              <span className="about-label">Who We Are</span>
              <h3>About Us</h3>
              <p>
                <strong className="text-danger">NCRC</strong> is the first dedicated center to providing
                state-of-the-art focused Colorectal care to patients across Nepal, combining advanced
                medical and surgical expertise with a commitment to compassion and patient&apos;s satisfaction
                which is Led by a team of highly skilled Colorectal Surgeons and other associated
                specialists. We offer a comprehensive range of services including screenings,
                diagnostics, surgical interventions, and latest ongoing management of colorectal
                diseases. With a focus on promoting awareness, prevention, and early detection, we
                strive to empower our patients with the knowledge and support they need to achieve
                optimal colorectal health care.
              </p>
              <ul className="about-features">
                <li>
                  <i className="bi bi-droplet"></i>
                  <div>
                    <h5>Screenings &amp; Diagnostics</h5>
                    <p>
                      Comprehensive colorectal screenings and accurate diagnostics for early detection
                      and timely care.
                    </p>
                  </div>
                </li>
                <li>
                  <i className="bi bi-capsule"></i>
                  <div>
                    <h5>Surgical Interventions</h5>
                    <p>
                      Advanced medical and surgical expertise for colorectal conditions, led by skilled
                      specialists.
                    </p>
                  </div>
                </li>
                <li>
                  <i className="bi bi-heart-pulse"></i>
                  <div>
                    <h5>Prevention &amp; Patient Support</h5>
                    <p>
                      Promoting awareness, prevention, and ongoing management to help patients achieve
                      optimal colorectal health.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
