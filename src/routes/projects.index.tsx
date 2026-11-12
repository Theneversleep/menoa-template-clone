import { createFileRoute, Link } from "@tanstack/react-router";
import { PortfolioShell } from "../components/portfolio-shell";
import { imageBase, projects } from "../lib/portfolio";
import { useLanguage } from "../lib/i18n";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projets — Andy Degali" },
      {
        name: "description",
        content: "Un aperçu visuel de quatre projets d'exemple dans le portfolio Menoa.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { language } = useLanguage();
  const fr = language === "fr";
  return (
    <PortfolioShell>
      <section className="mx-auto max-w-5xl px-5 pb-24 pt-24 md:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-muted-foreground">
            {fr
              ? "Projets sélectionnés · Exemples du modèle"
              : "Selected projects · Template samples"}
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
            {fr ? "Des projets qui parlent d'eux-mêmes." : "Work that speaks for itself."}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            {fr
              ? "Une sélection de projets d'exemple du modèle Menoa. Cette galerie est prête à accueillir les projets d'Andy."
              : "A selection of sample projects from the Menoa reference. This gallery is ready for Andy's own work."}
          </p>
        </div>
        <div className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="group"
            >
              <div className="overflow-hidden rounded-3xl bg-card">
                <img
                  src={`${imageBase}${project.image}`}
                  alt={
                    fr ? `Visuel d'exemple pour ${project.name}` : `${project.name} sample visual`
                  }
                  className="aspect-[1016/938] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-medium">{project.name}</h2>
                <span className="text-muted-foreground">
                  {fr ? project.categoryFr : project.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PortfolioShell>
  );
}
