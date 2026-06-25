import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import DepartmentsSection from "@/components/sections/DepartmentsSection";
import DoctorsSection from "@/components/sections/DoctorsSection";
import FaqSection from "@/components/sections/FaqSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import GallerySection from "@/components/sections/GallerySection";
import ContactSection from "@/components/sections/ContactSection";
import HomeParallaxBand from "@/components/sections/HomeParallaxBand";
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
      <div className="home-sections-flow">
        <DepartmentsSection diseases={diseases} />
        <ServicesSection services={services} />
        <DoctorsSection doctors={doctors} />
        <HomeParallaxBand />
        <FaqSection items={faqs} />
        <TestimonialsSection items={testimonials} />
        <GallerySection items={gallery} />
        <ContactSection departments={contactDepartments} />
      </div>
    </>
  );
}
