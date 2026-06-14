import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AppointmentSection from "@/components/sections/AppointmentSection";
import DepartmentsSection from "@/components/sections/DepartmentsSection";
import DoctorsSection from "@/components/sections/DoctorsSection";
import FaqSection from "@/components/sections/FaqSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import GallerySection from "@/components/sections/GallerySection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <DepartmentsSection />
      <AppointmentSection />
      <ServicesSection />
      <DoctorsSection />
      <FaqSection />
      <TestimonialsSection />
      <GallerySection />
      <ContactSection />
    </>
  );
}
