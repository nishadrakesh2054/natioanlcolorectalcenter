
import SiteImage from "@/components/ui/SiteImage";

export default function AboutSection() {
  return (
    <section id="about" className="about section about-section-enhanced">
      <div className="about-section-bg" aria-hidden="true">
        <span className="about-section-orb about-section-orb-one" />
        <span className="about-section-orb about-section-orb-two" />
      </div>

      <div className="container position-relative">
        <div className="row gy-4 gx-5 align-items-stretch">
          <div className="col-lg-6 d-flex" data-aos="fade-up" data-aos-delay="100">
            <div className="about-media-col">
              <div className="about-media-frame">
                <div className="about-media-wrap">
                  <SiteImage
                    src="/assets/img/about1.png"
                    className="about-media-img"
                    alt="National Colorectal Center team in Tinkune, Kathmandu"
                    width={640}
                    height={480}
                    fluid
                  />
                  <span className="about-media-badge">
                    <i className="bi bi-geo-alt-fill" aria-hidden="true" />
                    Kathmandu, Nepal
                  </span>
                  <a
                    href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                    className="glightbox pulsating-play-btn"
                    aria-label="Watch NCRC colorectal care video on YouTube"
                  ></a>
                </div>
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
              <h2 className="about-heading">Leading Colorectal Care in Nepal</h2>
              <p>
                The <strong className="text-danger">National Colorectal Center (NCRC)</strong> in
                Tinkune, Kathmandu, is Nepal&apos;s dedicated center for colon, rectum, and anorectal
                care. Our colorectal surgeons provide colonoscopy, cancer screening, piles and
                fistula treatment, and advanced surgery—with clear guidance from diagnosis through
                recovery, for patients across Kathmandu and Nepal.
              </p>
              <ul className="about-features">
                <li>
                  <i className="bi bi-search" aria-hidden="true"></i>
                  <div>
                    <h5>Colonoscopy &amp; Cancer Screening</h5>
                    <p>
                      Colonoscopy, polyp detection, and colorectal cancer screening in Kathmandu to
                      catch disease early, when treatment works best.
                    </p>
                  </div>
                </li>
                <li>
                  <i className="bi bi-scissors" aria-hidden="true"></i>
                  <div>
                    <h5>Colorectal Surgery &amp; Advanced Treatment</h5>
                    <p>
                      Specialist-led surgery and minimally invasive options for complex colorectal
                      conditions, tailored to each patient&apos;s needs.
                    </p>
                  </div>
                </li>
                <li>
                  <i className="bi bi-bandaid" aria-hidden="true"></i>
                  <div>
                    <h5>Piles, Fistula &amp; Anorectal Care</h5>
                    <p>
                      Focused treatment for hemorrhoids, anal fistula, fissures, and related
                      conditions—with clear advice and compassionate support.
                    </p>
                  </div>
                </li>
                <li>
                  <i className="bi bi-heart-pulse" aria-hidden="true"></i>
                  <div>
                    <h5>Prevention, Education &amp; Follow-Up</h5>
                    <p>
                      Guidance on symptoms, lifestyle, and long-term recovery so patients across Nepal
                      can prevent problems and stay healthy after care.
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
