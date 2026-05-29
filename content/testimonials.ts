export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Naman has enthusiasm in abundance and a go-getter attitude. I am confident he will keep climbing steps of success—I am happy to offer suggestions anytime.",
    author: "Nitin Kukreja",
    role: "Mentor",
    company: "GLA University · TEDxGLAU",
  },
  {
    id: "t2",
    quote:
      "He was elected President of E-Cell GLAU two years after I prophesied it. Passion, diligence, and respect describe him—he will be an incredible asset for every organization he joins.",
    author: "Jitin Yadav",
    role: "Former team lead",
    company: "Entrepreneurship Cell, GLA University",
  },
];
