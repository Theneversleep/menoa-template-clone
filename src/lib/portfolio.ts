export const imageBase = "https://framerusercontent.com/images/";

export type PortfolioProject = {
  slug: "auten" | "renance" | "sona" | "kael";
  name: string;
  category: string;
  categoryFr: string;
  image: string;
  summary: string;
  summaryFr: string;
  focus: string[];
  focusFr: string[];
};

export const projects: PortfolioProject[] = [
  {
    slug: "auten",
    name: "Auten — AI Agency",
    category: "Web design",
    categoryFr: "Design web",
    image: "Sguuf5oH1GkCwjRLUTFhb0EyDQ.jpg",
    summary: "A website concept for an AI agency, presented as a visual case study.",
    summaryFr: "Un concept de site pour une agence IA, présenté sous forme d'étude visuelle.",
    focus: ["Clear positioning", "Editorial layout", "A direct path to contact"],
    focusFr: ["Positionnement clair", "Mise en page éditoriale", "Accès direct au contact"],
  },
  {
    slug: "renance",
    name: "Renance — Dashboard",
    category: "Product design",
    categoryFr: "Design produit",
    image: "0oS2bSg3piTgoG5fgAU8qk9UTo.jpg",
    summary: "A dashboard concept that brings structure to complex information.",
    summaryFr: "Un concept de tableau de bord qui donne une structure aux informations complexes.",
    focus: ["Information hierarchy", "Readable data", "Consistent components"],
    focusFr: ["Hiérarchie de l'information", "Données lisibles", "Composants cohérents"],
  },
  {
    slug: "sona",
    name: "Sona — Automation platform",
    category: "Product design",
    categoryFr: "Design produit",
    image: "7dXjYpmSu0uw6mxHj7QHxzj3W58.jpg",
    summary: "An automation interface concept built around approachable workflows.",
    summaryFr: "Un concept d'interface d'automatisation fondé sur des parcours accessibles.",
    focus: ["Visual workflows", "Simple onboarding", "Flexible interface"],
    focusFr: ["Parcours visuels", "Prise en main simple", "Interface flexible"],
  },
  {
    slug: "kael",
    name: "Kael — Operations workflow",
    category: "Product design",
    categoryFr: "Design produit",
    image: "e7zhD278S41ZcqdwY6XYsLHio.jpg",
    summary: "A product concept for coordinating day-to-day operations.",
    summaryFr: "Un concept de produit pour coordonner les opérations au quotidien.",
    focus: ["Task visibility", "Quick decisions", "Focused screens"],
    focusFr: ["Visibilité des tâches", "Décisions rapides", "Écrans ciblés"],
  },
];
