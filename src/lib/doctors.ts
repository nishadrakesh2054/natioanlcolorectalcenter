export type DoctorSocialType = "facebook" | "instagram" | "whatsapp" | "twitter";

export type DoctorSocialLink = {
  type: DoctorSocialType;
  url: string;
};

export type DoctorJournal = {
  title: string;
};

export type DoctorAward = {
  title: string;
};

export type Doctor = {
  id: number;
  name: string;
  phoneNo: string;
  email: string;
  role: string;
  designation: string;
  img: string;
  special: string;
  degrees: string[];
  skills?: string[];
  experience: string;
  workingHospitals: string[];
  journals?: DoctorJournal[];
  awards?: DoctorAward[];
  category: string;
  socialLinks: DoctorSocialLink[];
};

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

export const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Rakesh Shah",
    phoneNo: "+977-9817073670",
    email: "drakeshah@gmail.com",
    role: "Colorectal Surgeon",
    designation: "Consultant",
    img: "/assets/img/doctors/coloRakesh.png",
    special: "पेट,आन्द्रा,मलाशय तथा मलद्वार रोग विशेषज्ञ।",
    degrees: [
      "MBBS (SOMC), Sylhet, Bangladesh",
      "MS-Colorectal Surgery (BSMMU), Dhaka, Bangladesh",
    ],
    skills: ["Advance Training LASER Proctology (India)"],
    experience: "12 years",
    workingHospitals: [
      "NAMS, Bir Hospital, Kathmandu",
      "Everest Hospital, New Baneswor, Kathmandu",
      "Nepal National Hospital, Kalanki, Kathmandu",
      "FrontLine Hospital, Old Baneshwor, Kathmandu",
      "Kavya Hospital, Janakpur Dham",
    ],
    journals: [
      {
        title:
          "Outcome of Core out Fistulectomy with Anal Spincter Reconstruction and Primary Repair of Internal Opening in the Treatment of Complex Anal Fistula; A Experience of 30 Cases published in GAJMS as Co-author on 4th Aug, 2022",
      },
    ],
    awards: [
      {
        title:
          "South Asian Regional Countries Brilliance Award & Cultural Summit-2022: for being the first NMC registered Colorectal Surgeon of Nepal",
      },
    ],
    category: "Colorectal Surgeon",
    socialLinks: [
      { type: "facebook", url: "https://www.facebook.com/dr.johndoe" },
      { type: "instagram", url: "https://www.instagram.com/dr.johndoe" },
      { type: "whatsapp", url: "https://wa.me/123456789" },
      { type: "twitter", url: "https://twitter.com/dr.johndoe" },
    ],
  },
  {
    id: 2,
    name: "Dr. Binay Yadav",
    phoneNo: "+977-9861555976",
    email: "yadavbinay338@gmail.com",
    role: "Colorectal Surgeon",
    designation: "Consultant",
    img: "/assets/img/doctors/drBinay.png",
    special: "पेट,आन्द्रा,मलाशय तथा मलद्वार रोग विशेषज्ञ।",
    degrees: [
      "MBBS (SOMC), Sylhet, Bangladesh",
      "MS-Colorectal Surgery (BSMMU), Dhaka",
      "Advance Training LASER Proctology (India)",
    ],
    experience: "8 years",
    workingHospitals: [
      "Everest Hospital, New Baneswor, Kathmandu",
      "Nepal National Hospital, Kalanki, Kathmandu",
      "FrontLine Hospital, Old Baneshwor, Kathmandu",
    ],
    journals: [
      { title: "Current Advances in Colorectal Surgery" },
      { title: "Innovations in LASER Proctology" },
    ],
    awards: [
      { title: "Excellence in Colorectal Surgery" },
      { title: "Outstanding Contribution to Surgical Education" },
    ],
    category: "Colorectal Surgeon",
    socialLinks: [
      { type: "facebook", url: "https://www.facebook.com/dr.johndoe" },
      { type: "instagram", url: "https://www.instagram.com/dr.johndoe" },
      { type: "whatsapp", url: "https://wa.me/123456789" },
      { type: "twitter", url: "https://twitter.com/dr.johndoe" },
    ],
  },
  {
    id: 5,
    name: "Dr. Rameshor Bhandari",
    phoneNo: "+977-9851119467",
    email: "drrameshorbhandari@gmail.com",
    role: "Colorectal Surgeon",
    designation: "Consultant Colorectal Surgeon",
    img: DEFAULT_DOCTOR_IMAGE,
    special: "पेट,आन्द्रा,मलाशय तथा मलद्वार रोग विशेषज्ञ।",
    degrees: ["MS Colorectal Surgery from BSMMU"],
    experience: "1 year",
    workingHospitals: ["Grande International Hospital"],
    category: "Colorectal Surgeon",
    socialLinks: [
      { type: "facebook", url: "https://www.facebook.com/dr.johndoe" },
      { type: "instagram", url: "https://www.instagram.com/dr.johndoe" },
      { type: "whatsapp", url: "https://wa.me/123456789" },
      { type: "twitter", url: "https://twitter.com/dr.johndoe" },
    ],
  },
  {
    id: 3,
    name: "Dr. Roshan Shah",
    phoneNo: "+977-9844520008",
    email: "email",
    role: "Pediatric Surgeon",
    designation: "Consultant",
    img: "/assets/img/doctors/drRoshan.png",
    special: "बाल शल्य चिकित्सा विशेषज्ञ।",
    degrees: [
      "MBBS, JRRMC, Sylhet, Bangladesh",
      "MS-Pediatric Surgery, BSMMU, Dhaka",
    ],
    experience: "7 years",
    workingHospitals: [
      "Kirtipur Hospital, Kirtipur",
      "Nepal National Hospital, Kalanki",
      "Bluecross Hospital, Tripureshwor",
    ],
    category: "Pediatric Surgeon",
    socialLinks: [
      { type: "facebook", url: "https://www.facebook.com/dr.johndoe" },
      { type: "instagram", url: "https://www.instagram.com/dr.johndoe" },
      { type: "whatsapp", url: "https://wa.me/123456789" },
      { type: "twitter", url: "https://twitter.com/dr.johndoe" },
    ],
  },
  {
    id: 4,
    name: "Dr. Dinesh Prasad Koirala",
    phoneNo: "+977-9869188613",
    email: "drdineshprasadkoirala61@gmail.com",
    role: "Pediatric Surgeon",
    designation: "Consultant",
    img: "/assets/img/doctors/coloDinesh.png",
    special: "बाल शल्य चिकित्सा विशेषज्ञ।",
    degrees: ["MS Pediatric Surgery"],
    experience: "7 years",
    workingHospitals: ["Tribhuwan University Teaching Hospital (TUTH)"],
    awards: [
      { title: "International Young Surgeon Award, Australia" },
      { title: "Emerging Surgeon, USA" },
    ],
    category: "Pediatric Surgeon",
    socialLinks: [
      { type: "facebook", url: "https://www.facebook.com/dr.johndoe" },
      { type: "instagram", url: "https://www.instagram.com/dr.johndoe" },
      { type: "whatsapp", url: "https://wa.me/123456789" },
      { type: "twitter", url: "https://twitter.com/dr.johndoe" },
    ],
  },
  {
    id: 6,
    name: "Dr. Samundra Shrestha",
    phoneNo: "+977-9841987646",
    email: "drsearaj@gmail.com",
    role: "Gastroenterologist",
    designation: "Consultant Gastroenterologist",
    img: "/assets/img/doctors/samundrabg.jpeg",
    special: "पेट तथा आन्द्रा रोग विशेषज्ञ।",
    degrees: [
      "MBBS, Weifang Medical University, China",
      "MD - Gastroenterology, BSMMU, Dhaka, Bangladesh",
    ],
    experience: "15 years",
    workingHospitals: ["Suveksha International Hospital, Chhetrapati Free Clinic"],
    category: "Gastroenterologist",
    socialLinks: [
      { type: "facebook", url: "https://www.facebook.com/dr.johndoe" },
      { type: "instagram", url: "https://www.instagram.com/dr.johndoe" },
      { type: "whatsapp", url: "https://wa.me/123456789" },
      { type: "twitter", url: "https://twitter.com/dr.johndoe" },
    ],
  },
  {
    id: 7,
    name: "Dr. Jainendra Kumar Chaudhary",
    phoneNo: "+977-9841726795",
    email: "jkchy1974@gmail.com",
    role: "GI, HPB & Laparoscopic Colorectal Surgeon",
    designation: "Chief Consultant & Assoc. Professor of Surgical Gastroenterology",
    img: "/assets/img/doctors/jkbg.jpeg",
    special: "पेट,आन्द्रा,मलाशय तथा मलद्वार रोग विशेषज्ञ।",
    degrees: [
      "MBBS, MCOMS, Pokhara, KU",
      "MS General Surgery, NAMS, Bir Hospital",
      "MCh Surgical Gastroenterology, NAMS, Bir Hospital",
    ],
    skills: [
      "Advance Laparoscopic Colorectal Surgery, University of Washington Medical Center",
      "GI, HPB & Liver Transplant Surgery, AIIMS, New Delhi, India",
    ],
    experience: "15 years",
    workingHospitals: [
      "NAMS, Bir Hospital, Kathmandu, Nepal",
      "Grande International Hospital",
    ],
    category: "Gastro Surgeon",
    socialLinks: [
      { type: "facebook", url: "https://www.facebook.com/dr.johndoe" },
      { type: "instagram", url: "https://www.instagram.com/dr.johndoe" },
      { type: "whatsapp", url: "https://wa.me/123456789" },
      { type: "twitter", url: "https://twitter.com/dr.johndoe" },
    ],
  },
];

export function getDoctorById(id: number) {
  return doctors.find((doctor) => doctor.id === id);
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
