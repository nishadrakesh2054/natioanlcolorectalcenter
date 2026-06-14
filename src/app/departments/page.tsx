import type { Metadata } from "next";
import PageTitle from "@/components/layout/PageTitle";
import DepartmentsSection from "@/components/sections/DepartmentsSection";

export const metadata: Metadata = {
  title: "Colorectal Disease",
  description:
    "Explore colorectal conditions treated at NCRC including piles, fissure, fistula, colon cancer, and more.",
};

export default function DepartmentsPage() {
  return (
    <>
      <PageTitle title="Colorectal Disease" />
      <DepartmentsSection />
    </>
  );
}
