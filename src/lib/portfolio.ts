export const imageBase = "https://framerusercontent.com/images/";

export type PortfolioProject = {
  slug: "auten" | "renance" | "sona" | "kael";
  name: string;
  category: string;
  image: string;
  summary: string;
  focus: string[];
};

export const projects: PortfolioProject[] = [
  {
    slug: "auten",
    name: "Auten — AI Agency",
    category: "Web design",
    image: "Sguuf5oH1GkCwjRLUTFhb0EyDQ.jpg",
    summary: "A website concept for an AI agency, presented as a visual case study.",
    focus: ["Clear positioning", "Editorial layout", "A direct path to contact"],
  },
  {
    slug: "renance",
    name: "Renance — Dashboard",
    category: "Product design",
    image: "0oS2bSg3piTgoG5fgAU8qk9UTo.jpg",
    summary: "A dashboard concept that brings structure to complex information.",
    focus: ["Information hierarchy", "Readable data", "Consistent components"],
  },
  {
    slug: "sona",
    name: "Sona — Automation platform",
    category: "Product design",
    image: "7dXjYpmSu0uw6mxHj7QHxzj3W58.jpg",
    summary: "An automation interface concept built around approachable workflows.",
    focus: ["Visual workflows", "Simple onboarding", "Flexible interface"],
  },
  {
    slug: "kael",
    name: "Kael — Operations workflow",
    category: "Product design",
    image: "e7zhD278S41ZcqdwY6XYsLHio.jpg",
    summary: "A product concept for coordinating day-to-day operations.",
    focus: ["Task visibility", "Quick decisions", "Focused screens"],
  },
];
