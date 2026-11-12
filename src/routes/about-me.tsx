import { createFileRoute, Link } from "@tanstack/react-router";
import { PortfolioShell } from "../components/portfolio-shell";
import { imageBase } from "../lib/portfolio";
import { useLanguage } from "../lib/i18n";

export const Route = createFileRoute("/about-me")({
  head: () => ({
    meta: [
      { title: "À propos — Andy Degali" },
      { name: "description", content: "Aperçu de la page À propos du portfolio d'Andy Degali." },
    ],
  }),
  component: AboutPage,
});

const copy = {
  fr: {
    eyebrow: "À propos · Aperçu du portfolio",
    title: "Faisons connaissance avec la personne derrière les projets.",
    intro:
      "Cette page présente la mise en page de Menoa. La biographie, le portrait et la démarche d'Andy pourront être ajoutés lors d'une prochaine itération.",
    portrait: "Portrait d'exemple du modèle de référence",
    approachLabel: "La démarche · Structure d'exemple",
    approachTitle: "Partir de l'essentiel.",
    approachBody:
      "Un espace pour présenter la vraie démarche d'Andy : comprendre un brief, définir une direction et créer une expérience visuelle utile.",
    workLabel: "Ce qui compose le travail · Domaines d'exemple",
    workTitle: "De l'idée au détail.",
    next: "La suite",
    nextTitle: "Découvrez les projets de plus près.",
    explore: "Voir les projets",
    values: ["La clarté avant la décoration", "Des détails utiles", "Une réalisation soignée"],
    tools: ["Stratégie", "Systèmes de design", "Interaction", "Prototypage"],
  },
  en: {
    eyebrow: "About me · Portfolio preview",
    title: "A little more about the person behind the work.",
    intro:
      "This page previews the Menoa layout. Andy's biography, portrait and practice details can be added during the next iteration.",
    portrait: "Sample portrait from the reference template",
    approachLabel: "The approach · Example structure",
    approachTitle: "Start with what matters.",
    approachBody:
      "A place for Andy's real approach to understanding a brief, shaping a direction, and building a useful visual experience.",
    workLabel: "What goes into the work · Example areas",
    workTitle: "From idea to detail.",
    next: "Next up",
    nextTitle: "Take a closer look at the work.",
    explore: "Explore projects",
    values: ["Clarity before decoration", "Useful details", "Careful execution"],
    tools: ["Strategy", "Design systems", "Interaction", "Prototyping"],
  },
};

function AboutPage() {
  const { language } = useLanguage();
  const t = copy[language];
  return (
    <PortfolioShell>
      <section className="mx-auto max-w-5xl px-5 pb-24 pt-24 md:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-muted-foreground">{t.eyebrow}</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] md:text-7xl">{t.title}</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">{t.intro}</p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl bg-card md:row-span-2">
            <img
              src={`${imageBase}wOXGNwristHrL3O30j9xrcyy5g.png`}
              alt={t.portrait}
              className="h-full min-h-[380px] w-full object-cover"
            />
          </div>
          <div className="rounded-3xl bg-card p-8 md:p-10">
            <p className="text-sm text-muted-foreground">{t.approachLabel}</p>
            <h2 className="mt-8 text-3xl font-semibold tracking-tight">{t.approachTitle}</h2>
            <p className="mt-4 text-muted-foreground">{t.approachBody}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {t.values.map((value) => (
                <span key={value} className="rounded-full bg-background px-4 py-2 text-sm">
                  {value}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-card p-8 md:p-10">
            <p className="text-sm text-muted-foreground">{t.workLabel}</p>
            <h2 className="mt-8 text-3xl font-semibold tracking-tight">{t.workTitle}</h2>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {t.tools.map((tool) => (
                <span key={tool} className="rounded-2xl bg-background p-4 font-medium">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-20 rounded-3xl bg-card px-6 py-16 text-center">
          <p className="text-sm text-muted-foreground">{t.next}</p>
          <h2 className="mx-auto mt-3 max-w-xl text-4xl font-semibold tracking-tight">
            {t.nextTitle}
          </h2>
          <Link
            to="/projects"
            className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground"
          >
            {t.explore} ↗
          </Link>
        </div>
      </section>
    </PortfolioShell>
  );
}
