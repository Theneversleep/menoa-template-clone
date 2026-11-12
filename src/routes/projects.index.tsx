import { createFileRoute, Link } from "@tanstack/react-router";
import { PortfolioShell } from "../components/portfolio-shell";
import { imageBase, projects } from "../lib/portfolio";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Andy Degali" },
      {
        name: "description",
        content: "A visual preview of four sample projects in the Menoa portfolio layout.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <PortfolioShell>
      <section className="mx-auto max-w-5xl px-5 pb-24 pt-24 md:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Selected projects · Template samples
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
            Work that speaks for itself.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            A selection of sample projects from the Menoa reference. This gallery is ready for
            Andy&apos;s own work.
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
                  alt={`${project.name} sample visual`}
                  className="aspect-[1016/938] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-medium">{project.name}</h2>
                <span className="text-muted-foreground">{project.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PortfolioShell>
  );
}
