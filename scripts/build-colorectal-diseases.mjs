import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const source = fs.readFileSync(
  path.join(root, "ncsn/src/Data/cardData.jsx"),
  "utf8"
);

const imageMap = {
  pilesImg: "/assets/img/diseases/piles.png",
  fissureImg: "/assets/img/diseases/fissure.png",
  fistulaImg: "/assets/img/diseases/fistula.png",
  prolapseImg: "/assets/img/diseases/prolapse.png",
  sinusImg: "/assets/img/diseases/pinodialSinus.png",
  constipationImg: "/assets/img/diseases/constipation.png",
  colonCancerImg: "/assets/img/diseases/colCan.png",
  rectalCancerImg: "/assets/img/diseases/rectalCancer.png",
  IbdImg: "/assets/img/diseases/IBD.png",
  polypImg: "/assets/img/diseases/polyp.png",
};

let body = source.replace(/^import[\s\S]*?\n\n/m, "");
body = body.replace("const cards = ", "export const colorectalDiseases = ");
body = body.replace("export default cards;\n", "");

for (const [key, value] of Object.entries(imageMap)) {
  body = body.replaceAll(key, `"${value}"`);
}

const header = `export type DiseaseNestedItem = {
  sub_title: string;
  sub_items: string[];
};

export type DiseaseContentItem = string | DiseaseNestedItem;

export type DiseaseContentSection = {
  title: string;
  items: DiseaseContentItem[];
};

export type ColorectalDisease = {
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
  content: DiseaseContentSection[];
};

export const colorectalDiseases = `;

const footer = `;

export function getColorectalDiseaseById(id: number) {
  return colorectalDiseases.find((disease) => disease.id === id);
}
`;

fs.writeFileSync(
  path.join(root, "src/lib/colorectalDiseases.ts"),
  header + body + footer
);

console.log("Generated src/lib/colorectalDiseases.ts");
