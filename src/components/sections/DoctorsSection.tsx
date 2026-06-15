import Link from "next/link";
import DoctorSocialLinks from "@/components/doctors/DoctorSocialLinks";
import SiteImage from "@/components/ui/SiteImage";
import type { Doctor } from "@/lib/types/doctor";
import { getDoctorImage, getDoctorSocialLinks } from "@/lib/doctor-utils";

type DoctorsSectionProps = {
  doctors: Doctor[];
};

export default function DoctorsSection({ doctors }: DoctorsSectionProps) {
  return (
    <section id="doctors" className="doctors section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Doctors</h2>
        <p>Meet our experienced colorectal, pediatric, and gastroenterology specialists at NCRC.</p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {doctors.map((doctor, index) => (
            <div
              className="col-lg-6"
              data-aos="fade-up"
              data-aos-delay={(index % 2) * 100 + 100}
              key={doctor.id}
            >
              <div className="team-member d-flex align-items-start">
                <div className="pic">
                  <SiteImage
                    src={getDoctorImage(doctor)}
                    className="img-fluid"
                    alt={doctor.name}
                    width={150}
                    height={150}
                    fluid
                  />
                </div>
                <div className="member-info">
                  <h4>{doctor.name}</h4>
                  <span>{doctor.role}</span>
                  <p>{doctor.special}</p>
                  <DoctorSocialLinks
                    links={getDoctorSocialLinks(doctor)}
                    className="social doctor-card-social"
                  />
                </div>
                <Link
                  href={`/doctors/${doctor.id}`}
                  className="doctor-card-link"
                  aria-label={`View profile of ${doctor.name}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
