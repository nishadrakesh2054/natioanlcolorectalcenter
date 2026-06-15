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
