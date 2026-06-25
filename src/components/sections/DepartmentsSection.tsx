import DiseaseCardGrid from "@/components/sections/DiseaseCardGrid";
import type { ColorectalDisease } from "@/lib/types/colorectal-disease";

type DepartmentsSectionProps = {
  diseases: ColorectalDisease[];
};

export default function DepartmentsSection({ diseases }: DepartmentsSectionProps) {
  return (
    <section id="colorectal-disease" className="departments section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Colorectal Disease</h2>
        <p>Explore colorectal conditions we diagnose and treat at NCRC.</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <DiseaseCardGrid diseases={diseases} showFooterLink />
      </div>
    </section>
  );
}
