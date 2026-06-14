export type CaseService = {
  id: number;
  title: string;
  description: string;
  icon: string;
  symptoms?: string[];
  procedures?: string[];
  risks?: string[];
  recoveryTime?: string;
};

export const caseServices: CaseService[] = [
  {
    id: 1,
    title: "Colonoscopy / Sigmoidoscopy",
    description:
      "A colonoscopy is a diagnostic procedure used to examine the large intestine (colon) and rectum. It helps detect polyps, cancers, and other abnormalities.",
    symptoms: [
      "Abdominal pain",
      "Chronic diarrhea or constipation",
      "Unexplained weight loss",
      "Blood in stool",
    ],
    procedures: [
      "Use of a flexible tube with a camera to view the colon",
      "Biopsies may be taken during the procedure",
      "Requires sedation",
    ],
    risks: [
      "Minor bleeding from biopsies",
      "Perforation of the colon (rare)",
      "Reaction to sedation",
    ],
    recoveryTime: "1-2 days for full recovery from sedation.",
    icon: "/assets/img/service-icons/colonoscopy.png",
  },
  {
    id: 2,
    title: "Endoscopy / Procedure",
    description:
      "Endoscopy examines the inner lining of the esophagus (gullet), stomach, and upper small bowel. It helps identify ulcers, tumors, and infections.",
    symptoms: [
      "Heartburn",
      "Chronic nausea or vomiting",
      "Difficulty swallowing",
      "Unexplained abdominal pain",
    ],
    procedures: [
      "Inserting a thin, flexible tube with a camera through the mouth",
      "Sometimes biopsies are performed during the procedure",
      "Mild sedation is usually administered",
    ],
    risks: ["Sore throat post-procedure", "Perforation (rare)", "Reaction to anesthesia"],
    recoveryTime: "A few hours for recovery from sedation.",
    icon: "/assets/img/service-icons/endoscopy.png",
  },
  {
    id: 3,
    title: "Anal Manometry",
    description:
      "Anorectal Manometry is a procedure that measures the function of anal and rectal muscles, commonly used to diagnose fecal incontinence or constipation.",
    symptoms: [
      "Difficulty with bowel movements",
      "Inability to control bowel movements (fecal incontinence)",
      "Rectal pain",
    ],
    procedures: [
      "Inserting a small, flexible tube into the rectum",
      "Measuring the pressure of the anal sphincter muscles",
      "Non-invasive, takes about 30 minutes",
    ],
    risks: ["Minimal risk, mild discomfort"],
    recoveryTime: "No recovery time required.",
    icon: "/assets/img/service-icons/manometry.png",
  },
  {
    id: 4,
    title: "Screening of CRC (Colorectal Cancer)",
    description:
      "Screening tests, including colonoscopy and stool tests, are used to detect colorectal cancer early before symptoms appear. Early detection greatly improves treatment success.",
    symptoms: [
      "Often asymptomatic in early stages",
      "Blood in stool",
      "Changes in bowel habits",
      "Unexplained weight loss",
    ],
    procedures: ["Colonoscopy", "Fecal immunochemical test (FIT)", "CT colonography"],
    risks: [
      "Minimal risks for non-invasive tests",
      "Colonoscopy may cause bleeding or perforation (rare)",
    ],
    recoveryTime: "Depends on the screening method. Colonoscopy requires 1-2 days.",
    icon: "/assets/img/service-icons/screen.png",
  },
  {
    id: 5,
    title: "Biofeedback",
    description:
      "Biofeedback is a therapy that helps patients gain control over involuntary physiological functions, such as bowel movements. It's often used to treat chronic constipation or fecal incontinence.",
    symptoms: [
      "Chronic constipation",
      "Fecal incontinence",
      "Bowel movement irregularities",
    ],
    procedures: [
      "Attaching electrodes or sensors to the body",
      "Monitoring muscle activity and providing feedback",
      "Training to strengthen rectal muscles",
    ],
    risks: ["Safe and non-invasive", "No known risks"],
    recoveryTime: "No recovery time required.",
    icon: "/assets/img/service-icons/biofeedback.png",
  },
  {
    id: 6,
    title: "Laser Surgery",
    description:
      "Laser surgery uses focused beams of light to remove or treat abnormal tissue in various colorectal surgeries, including hemorrhoidectomy and treatment of anal fistulas.",
    symptoms: ["Hemorrhoids", "Anal fistula", "Abnormal tissue growth in the colon"],
    procedures: [
      "Application of laser to target tissue",
      "Minimally invasive, short recovery time",
      "Used to treat conditions like hemorrhoids or fistulas",
    ],
    risks: ["Minor bleeding", "Infection (rare)", "Tissue damage from improper use of laser"],
    recoveryTime: "1-2 weeks depending on the procedure.",
    icon: "/assets/img/service-icons/laser.png",
  },
  {
    id: 7,
    title: "Office-based Procedure",
    description:
      "Office-based procedures include minor medical interventions done in a healthcare provider's office, such as hemorrhoid banding or minor polyp removal.",
    symptoms: ["Hemorrhoids", "Small polyps", "Minor skin tags or lesions"],
    procedures: [
      "No general anesthesia required",
      "Quick recovery, minimal discomfort",
      "Procedures like banding or excision",
    ],
    risks: ["Mild pain or bleeding", "Infection (rare)"],
    recoveryTime: "Typically same day or 1-2 days depending on the procedure.",
    icon: "/assets/img/service-icons/officebased.png",
  },
  {
    id: 8,
    title: "Academic Training",
    description:
      "Programs for training healthcare professionals in the field of colorectal surgery, diagnostic procedures, and post-operative care.",
    procedures: [
      "Hands-on training with real cases",
      "Lectures, simulations, and workshops",
      "Training on the latest techniques in colorectal surgery",
    ],
    icon: "/assets/img/service-icons/graduation.png",
  },
  {
    id: 9,
    title: "Colostomy / Ileostomy Care",
    description:
      "Colostomy and ileostomy care involve managing a stoma (an opening in the abdomen) to divert waste after bowel surgery. This is often necessary for patients with colorectal cancer or IBD.",
    symptoms: [
      "Post-operative care after colostomy/ileostomy surgery",
      "Difficulty managing bowel movements",
      "Skin irritation around the stoma",
    ],
    procedures: [
      "Cleaning and maintaining the stoma site",
      "Using colostomy bags for waste collection",
      "Proper fitting of stoma appliances",
    ],
    risks: ["Infection at the stoma site", "Irritation or leakage from the colostomy bag"],
    recoveryTime: "Ongoing management, with periodic check-ups.",
    icon: "/assets/img/service-icons/ilestomy.png",
  },
];

export function getCaseServiceById(id: number) {
  return caseServices.find((service) => service.id === id);
}
