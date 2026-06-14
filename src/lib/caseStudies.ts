export type CaseStudyBlock = {
  title: string;
  icon: string;
  items: string[];
};

export type CaseStudy = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  patientProfile: string;
  condition: string;
  treatment: string;
  outcome: string;
  publishedAt: string;
  doctor: string;
  content: string[];
  blocks: CaseStudyBlock[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Complex Anal Fistula Treated with Core Out Fistulectomy",
    excerpt:
      "A patient with a recurrent complex anal fistula underwent specialized surgery with sphincter-preserving technique and achieved full healing at follow-up.",
    image: "/assets/img/diseases/fistula.png",
    patientProfile: "Male, 38 years",
    condition: "Complex anal fistula with recurrent infection",
    treatment: "Core out fistulectomy with anal sphincter reconstruction",
    outcome: "Complete wound healing with preserved continence at 3-month follow-up",
    publishedAt: "2025-08-14",
    doctor: "Dr. Rakesh Shah",
    content: [
      "The patient presented with a long-standing anal fistula associated with recurrent pain, discharge, and episodes of perianal infection. Previous conservative treatment provided only temporary relief.",
      "After detailed clinical evaluation and imaging, the case was classified as a complex fistula requiring sphincter-preserving surgical management. The surgical team at NCRC performed core out fistulectomy with reconstruction of the internal opening.",
      "Post-operative care included wound monitoring, dietary guidance, and regular follow-up to detect recurrence early. The patient reported significant improvement in comfort and quality of life within the first month.",
      "At three-month follow-up, the tract had healed completely and continence was preserved. This case highlights the importance of specialist assessment for fistulas that fail standard care.",
    ],
    blocks: [
      {
        title: "Presenting Symptoms",
        icon: "bi bi-heart-pulse",
        items: [
          "Recurrent perianal discharge",
          "Pain during sitting and defecation",
          "History of perianal abscess drainage",
        ],
      },
      {
        title: "Treatment Highlights",
        icon: "bi bi-person-badge",
        items: [
          "Pre-operative mapping of fistula tract",
          "Sphincter-preserving surgical approach",
          "Structured post-operative wound care plan",
        ],
      },
      {
        title: "Follow-up Results",
        icon: "bi bi-check-circle",
        items: [
          "Wound healed without recurrence at 3 months",
          "Normal continence maintained",
          "Returned to daily activities within 6 weeks",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Early Colorectal Cancer Detected Through Screening Colonoscopy",
    excerpt:
      "Routine screening colonoscopy identified an early colonic lesion that was removed before symptoms developed, allowing timely specialist management.",
    image: "/assets/img/diseases/colCan.png",
    patientProfile: "Female, 54 years",
    condition: "Early colorectal neoplasia detected on screening",
    treatment: "Colonoscopy with polypectomy and multidisciplinary planning",
    outcome: "Lesion removed completely; patient enrolled in surveillance program",
    publishedAt: "2025-07-02",
    doctor: "Dr. Binay Yadav",
    content: [
      "The patient attended NCRC for routine colorectal cancer screening despite having no obvious symptoms. Risk assessment and shared decision-making supported proceeding with colonoscopy.",
      "During colonoscopy, a suspicious lesion was identified and removed endoscopically. Histopathology confirmed early-stage disease requiring further specialist planning rather than emergency intervention.",
      "The colorectal team coordinated additional staging, discussed treatment options with the patient and family, and created a clear follow-up schedule. Early detection allowed a more controlled, less aggressive care pathway.",
      "The patient completed initial treatment successfully and remains under regular surveillance. This case demonstrates why screening matters even when you feel well.",
    ],
    blocks: [
      {
        title: "Why Screening Helped",
        icon: "bi bi-droplet",
        items: [
          "No symptoms at the time of evaluation",
          "Lesion detected during routine colonoscopy",
          "Early intervention before disease progression",
        ],
      },
      {
        title: "Care Pathway",
        icon: "bi bi-hospital",
        items: [
          "Endoscopic removal during colonoscopy",
          "Histopathology review and staging",
          "Multidisciplinary treatment planning at NCRC",
        ],
      },
      {
        title: "Long-term Plan",
        icon: "bi bi-calendar-check",
        items: [
          "Scheduled surveillance colonoscopy",
          "Lifestyle and dietary counseling",
          "Family screening advice provided",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Chronic Constipation Improved with Biofeedback Therapy",
    excerpt:
      "A young adult with long-standing constipation and incomplete evacuation improved significantly after anorectal evaluation and biofeedback training.",
    image: "/assets/img/diseases/constipation.png",
    patientProfile: "Female, 29 years",
    condition: "Chronic constipation with pelvic floor dyssynergia",
    treatment: "Anorectal manometry and biofeedback therapy",
    outcome: "Marked improvement in bowel frequency and evacuation after 8 sessions",
    publishedAt: "2025-06-10",
    doctor: "Dr. Roshan Shah",
    content: [
      "The patient had experienced chronic constipation for several years, with bloating, straining, and a sensation of incomplete emptying despite dietary changes and laxatives.",
      "Anorectal manometry at NCRC demonstrated pelvic floor dyssynergia — a coordination problem between abdominal and pelvic floor muscles during defecation. This explained why standard remedies alone were insufficient.",
      "A personalized biofeedback program was started to retrain muscle coordination. Sessions included visual feedback, breathing techniques, and home exercises reinforced at each visit.",
      "After eight sessions, the patient reported more regular bowel movements, less straining, and improved confidence in daily life. Non-surgical therapy offered meaningful relief without invasive intervention.",
    ],
    blocks: [
      {
        title: "Initial Assessment",
        icon: "bi bi-search",
        items: [
          "Persistent constipation despite lifestyle changes",
          "Anorectal manometry confirmed dyssynergia",
          "No structural obstruction identified",
        ],
      },
      {
        title: "Therapy Plan",
        icon: "bi bi-heart-pulse",
        items: [
          "Weekly biofeedback sessions at NCRC",
          "Pelvic floor retraining with visual feedback",
          "Home exercise and toilet habit counseling",
        ],
      },
      {
        title: "Patient Outcome",
        icon: "bi bi-emoji-smile",
        items: [
          "Reduced straining and abdominal discomfort",
          "More predictable bowel routine",
          "Avoided unnecessary surgical intervention",
        ],
      },
    ],
  },
];

export function getCaseStudyById(id: number) {
  return caseStudies.find((study) => study.id === id);
}

export function formatCaseStudyDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
