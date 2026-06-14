export type Testimonial = {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ugeswori Bhattarai",
    role: "Patient",
    image: "/assets/img/testimonials/testimonials-1.jpg",
    quote:
      "After years of discomfort, I finally sought help for my colorectal issues. The team at National Colorectal Center provided exceptional care, guiding me through the entire process with compassion and expertise. Thanks to their skilled surgeons and attentive staff, I feel like a new person!",
  },
  {
    id: "2",
    name: "Nima Lama",
    role: "Patient",
    image: "/assets/img/testimonials/testimonials-2.jpg",
    quote:
      "I can't thank the doctors at National Colorectal Center enough for their life-changing treatment. From my initial consultation to post-surgery care, they were with me every step of the way. Their dedication to improving the quality of life for their patients is truly commendable.",
  },
  {
    id: "3",
    name: "Ranzeth Sahani",
    role: "Patient",
    image: "/assets/img/testimonials/testimonials-3.jpg",
    quote:
      "I was hesitant to undergo surgery. However, the team at National Colorectal Center made me feel comfortable and confident in my decision. Their professionalism and expertise exceeded my expectations, and I'm grateful for the positive outcome.",
  },
  {
    id: "4",
    name: "Sikshya Ray",
    role: "Patient",
    image: "/assets/img/testimonials/testimonials-4.jpg",
    quote:
      "I was hesitant to undergo surgery. However, the team at National Colorectal Center made me feel comfortable and confident in my decision. Their professionalism and expertise exceeded my expectations, and I'm grateful for the positive outcome.",
  },
];
