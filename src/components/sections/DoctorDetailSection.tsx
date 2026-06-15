import Link from "next/link";
import DoctorSocialLinks from "@/components/doctors/DoctorSocialLinks";
import SiteImage from "@/components/ui/SiteImage";
import type { Doctor } from "@/lib/types/doctor";
import { getDoctorImage, getDoctorSocialLinks, isValidEmail } from "@/lib/doctor-utils";

type DetailBlock = {
  title: string;
  icon: string;
  items: string[];
};

type DoctorDetailSectionProps = {
  doctor: Doctor;
};

function buildDetailBlocks(doctor: Doctor): DetailBlock[] {
  const blocks: DetailBlock[] = [];

  if (doctor.degrees.length > 0) {
    blocks.push({
      title: "Qualifications",
      icon: "bi bi-mortarboard",
      items: doctor.degrees,
    });
  }

  if (doctor.skills?.length) {
    blocks.push({
      title: "Skills & Training",
      icon: "bi bi-patch-check",
      items: doctor.skills,
    });
  }

  if (doctor.workingHospitals.length > 0) {
    blocks.push({
      title: "Working Hospitals",
      icon: "bi bi-hospital",
      items: doctor.workingHospitals,
    });
  }

  if (doctor.journals?.length) {
    blocks.push({
      title: "Journals",
      icon: "bi bi-journal-medical",
      items: doctor.journals.map((journal) => journal.title),
    });
  }

  if (doctor.awards?.length) {
    blocks.push({
      title: "Awards",
      icon: "bi bi-award",
      items: doctor.awards.map((award) => award.title),
    });
  }

  return blocks;
}

export default function DoctorDetailSection({ doctor }: DoctorDetailSectionProps) {
  const blocks = buildDetailBlocks(doctor);

  return (
    <section className="doctor-detail section light-background">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4" data-aos="fade-up">
            <aside className="doctor-detail-sidebar">
              <div className="doctor-detail-hero">
                <div className="doctor-detail-photo">
                  <SiteImage src={getDoctorImage(doctor)} alt={doctor.name} width={320} height={320} fluid />
                </div>
                <span className="doctor-detail-label">{doctor.category}</span>
                <h3>{doctor.name}</h3>
                <p className="doctor-detail-role">{doctor.role}</p>
                <p className="doctor-detail-designation">{doctor.designation}</p>
                <p className="doctor-detail-special">{doctor.special}</p>

                <ul className="doctor-detail-contact">
                  <li>
                    <i className="bi bi-telephone" aria-hidden="true"></i>
                    <a href={`tel:${doctor.phoneNo.replace(/\s/g, "")}`}>{doctor.phoneNo}</a>
                  </li>
                  {isValidEmail(doctor.email) && (
                    <li>
                      <i className="bi bi-envelope" aria-hidden="true"></i>
                      <a href={`mailto:${doctor.email}`}>{doctor.email}</a>
                    </li>
                  )}
                  {doctor.experience && (
                    <li>
                      <i className="bi bi-briefcase" aria-hidden="true"></i>
                      <span>{doctor.experience} experience</span>
                    </li>
                  )}
                </ul>

                <DoctorSocialLinks links={getDoctorSocialLinks(doctor)} variant="detail" />

                <div className="doctor-detail-actions">
                  <Link href="/appointment" className="cta-btn">
                    Make an Appointment
                  </Link>
                  <Link href="/doctors" className="cta-btn cta-btn-outline">
                    All Doctors
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          <div className="col-lg-8" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              {blocks.map((block) => (
                <div
                  className={`col-md-${blocks.length === 1 ? "12" : "6"}`}
                  key={block.title}
                >
                  <article className="doctor-detail-block">
                    <div className="doctor-detail-block-head">
                      <i className={block.icon} aria-hidden="true"></i>
                      <h4>{block.title}</h4>
                    </div>
                    <ul>
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
