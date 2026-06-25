import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
// import AppointmentSection from "@/components/sections/AppointmentSection";
import DepartmentsSection from "@/components/sections/DepartmentsSection";
import DoctorsSection from "@/components/sections/DoctorsSection";
import FaqSection from "@/components/sections/FaqSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import GallerySection from "@/components/sections/GallerySection";
import ContactSection from "@/components/sections/ContactSection";
import { getContactDepartments } from "@/lib/appointmentOptions";
import { publicPageSeo } from "@/lib/seo";
import {
  fetchColorectalDiseases,
  fetchDoctors,
  fetchFaqs,
  fetchGalleryItems,
  fetchServices,
  fetchTestimonials,
} from "@/lib/supabase/fetch-content";

export const metadata = publicPageSeo.home;
export const revalidate = 60;

export default async function HomePage() {
  const [
    services,
    diseases,
    doctors,
    faqs,
    testimonials,
    gallery,
    // appointmentDepartments,
    // appointmentDoctors,
    contactDepartments,
  ] = await Promise.all([
    fetchServices(),
    fetchColorectalDiseases(),
    fetchDoctors(),
    fetchFaqs(),
    fetchTestimonials(),
    fetchGalleryItems(),
    getContactDepartments(),
  ]);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <DepartmentsSection diseases={diseases} />
      {/* <AppointmentSection
        departments={appointmentDepartments}
        doctors={appointmentDoctors}
      /> */}
      <ServicesSection services={services} />
      <DoctorsSection doctors={doctors} />
      <FaqSection items={faqs} />
      <TestimonialsSection items={testimonials} />
      <GallerySection items={gallery} />
      <ContactSection departments={contactDepartments} />
    </>
  );
}
