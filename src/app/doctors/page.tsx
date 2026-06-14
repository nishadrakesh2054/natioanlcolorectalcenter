import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import DoctorsSection from "@/components/sections/DoctorsSection";

export const metadata: Metadata = {
  title: "Doctors",
  description: "Meet NCRC colorectal, pediatric, and gastroenterology specialists.",
};

export default function DoctorsPage() {
  return (
    <>
      <PageTitle title="Doctors" />
      <DoctorsSection />
    </>
  );
}
