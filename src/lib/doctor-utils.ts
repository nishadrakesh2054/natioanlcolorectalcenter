import type { Doctor, DoctorSocialLink, DoctorSocialType } from "@/lib/types/doctor";

const PLACEHOLDER_SOCIAL = "dr.johndoe";
const SOCIAL_TYPES: DoctorSocialType[] = ["facebook", "instagram", "whatsapp", "twitter"];

export const DEFAULT_DOCTOR_IMAGE = "/assets/img/doctors/doctors-1.jpg";

function isPlaceholderSocialUrl(url: string) {
  const trimmed = url.trim();
  return (
    !trimmed ||
    trimmed === "#" ||
    trimmed.includes(PLACEHOLDER_SOCIAL) ||
    trimmed === "https://wa.me/123456789"
  );
}

function resolveSocialUrl(
  url: string | undefined,
  type: DoctorSocialType,
  phoneNo: string
): string {
  if (url && !isPlaceholderSocialUrl(url)) {
    return url.trim();
  }

  if (type === "whatsapp") {
    const phoneDigits = phoneNo.replace(/[^\d]/g, "");
    if (phoneDigits) {
      return `https://wa.me/${phoneDigits}`;
    }
  }

  return "#";
}

export function getDoctorImage(doctor: Doctor) {
  return doctor.img || DEFAULT_DOCTOR_IMAGE;
}

export function isValidEmail(email: string) {
  return email.includes("@") && email !== "email";
}

export function getDoctorSocialLinks(doctor: Doctor): DoctorSocialLink[] {
  const byType = Object.fromEntries(
    doctor.socialLinks.map((link) => [link.type, link.url])
  ) as Partial<Record<DoctorSocialType, string>>;

  return SOCIAL_TYPES.map((type) => ({
    type,
    url: resolveSocialUrl(byType[type], type, doctor.phoneNo),
  }));
}
