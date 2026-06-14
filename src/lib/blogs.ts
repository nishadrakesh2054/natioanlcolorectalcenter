export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  publishedAt: string;
  category: string;
  readTime: string;
  content: string[];
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Why Colorectal Cancer Screening Matters in Nepal",
    excerpt:
      "Early screening can detect colorectal cancer before symptoms appear. Learn when to get checked and what options are available at NCRC.",
    image: "/assets/img/diseases/colCan.png",
    author: "NCRC Medical Team",
    publishedAt: "2025-11-18",
    category: "Prevention",
    readTime: "5 min read",
    tags: ["Screening", "Colorectal Cancer", "Prevention"],
    content: [
      "Colorectal cancer is one of the most treatable cancers when found early, yet many people delay screening until symptoms become severe. At the National Colorectal Center, we encourage regular screening for adults with risk factors or family history.",
      "Common screening options include colonoscopy, FIT stool testing, and clinical evaluation based on symptoms. Colonoscopy remains the gold standard because it allows direct visualization of the colon and removal of polyps during the same procedure.",
      "Warning signs such as blood in stool, persistent changes in bowel habits, unexplained weight loss, or abdominal pain should never be ignored. Even without symptoms, discussing screening with a specialist helps you understand the right timeline for your age and health profile.",
      "NCRC offers dedicated screening services with experienced colorectal surgeons and modern diagnostic facilities at Everest Hospital, New Baneshwor. Early detection saves lives — book a consultation if you are due for screening or have concerns.",
    ],
  },
  {
    id: 2,
    title: "Managing Hemorrhoids: When to Seek Specialist Care",
    excerpt:
      "Mild hemorrhoids can often be managed at home, but persistent bleeding or pain may need office-based or surgical treatment.",
    image: "/assets/img/diseases/piles.png",
    author: "NCRC Medical Team",
    publishedAt: "2025-10-06",
    category: "Patient Guide",
    readTime: "4 min read",
    tags: ["Hemorrhoids", "Piles", "Treatment"],
    content: [
      "Hemorrhoids are swollen vascular cushions in the anal canal. They are very common and may cause itching, discomfort, swelling, or bleeding during bowel movements. Many cases improve with dietary changes, adequate hydration, and avoiding straining.",
      "You should consult a colorectal specialist if bleeding continues, pain worsens, a lump does not reduce, or symptoms interfere with daily life. Self-treatment can delay proper diagnosis of other conditions that mimic hemorrhoids.",
      "At NCRC, treatment is tailored to the type and grade of hemorrhoids. Options include conservative care, office-based procedures such as rubber band ligation, and advanced surgical approaches when needed.",
      "Do not feel embarrassed to seek help — colorectal conditions are our daily focus. Early specialist review often leads to simpler treatment and faster recovery.",
    ],
  },
  {
    id: 3,
    title: "Understanding Anal Fissures and Recovery After Treatment",
    excerpt:
      "An anal fissure is a small tear that can cause sharp pain and bleeding. Most heal with care, but chronic fissures may need specialist intervention.",
    image: "/assets/img/diseases/fissure.png",
    author: "NCRC Medical Team",
    publishedAt: "2025-09-22",
    category: "Conditions",
    readTime: "4 min read",
    tags: ["Anal Fissure", "Recovery", "Pain Management"],
    content: [
      "An anal fissure is a linear tear in the lining of the anal canal, often caused by passing hard stools, diarrhea, or trauma. Typical symptoms include sharp pain during and after bowel movements, bleeding, and spasm of the anal sphincter.",
      "Acute fissures usually heal within weeks with stool softeners, high-fiber diet, sitz baths, and topical medications prescribed by your doctor. Chronic fissures lasting more than six to eight weeks may require further evaluation.",
      "When conservative treatment fails, NCRC offers specialist options including medical therapy and surgical procedures such as lateral internal sphincterotomy in selected cases. The goal is pain relief, healing, and prevention of recurrence.",
      "If you experience ongoing anal pain or bleeding, specialist assessment helps confirm the diagnosis and rule out other conditions such as fistula or inflammatory bowel disease.",
    ],
  },
];

export function getBlogById(id: number) {
  return blogPosts.find((post) => post.id === id);
}

export function formatBlogDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
