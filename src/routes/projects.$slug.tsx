import { createFileRoute, Link } from "@tanstack/react-router";
import { PortfolioShell } from "../components/portfolio-shell";
import { imageBase, projects } from "../lib/portfolio";

export const Route = createFileRoute("/projects/$slug")({
  head: () => ({
    meta: [
      { title: "Project — Andy Degali" },
      {
        name: "description",
        content: "A sample case study in the Menoa-inspired portfolio preview.",
      },
    ],
  }),
  component: ProjectPage,
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project)
    return (
      <PortfolioShell>
        <div className="mx-auto max-w-5xl px-5 py-32 text-center">
          <h1 className="text-5xl font-semibold">Project not found</h1>
          <Link to="/projects" className="mt-8 inline-block underline">
            See all projects
          </Link>
        </div>
      </PortfolioShell>
    );
  const related = projects.filter((item) => item.slug !== slug).slice(0, 2);
  return (
    <PortfolioShell>
      <article>
        <div className="mx-auto max-w-5xl px-5 pb-16 pt-20 md:pt-28">
          <Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground">
            ← All projects
          </Link>
          <p className="mt-16 text-sm font-medium text-muted-foreground">
            Sample case study · {project.category}
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
            {project.name}
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-muted-foreground">{project.summary}</p>
        </div>
        <div className="mx-auto max-w-6xl px-5">
          <div className="overflow-hidden rounded-3xl bg-card">
            <img
              src={`${imageBase}${project.image}`}
              alt={`${project.name} reference design`}
              className="w-full object-cover"
            />
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-14 px-5 py-24 md:grid-cols-[250px_1fr] md:gap-24">
          <aside className="h-fit rounded-3xl bg-card p-7">
            <p className="text-sm text-muted-foreground">Project</p>
            <p className="mt-1 font-medium">{project.name}</p>
            <p className="mt-6 text-sm text-muted-foreground">Discipline</p>
            <p className="mt-1 font-medium">{project.category}</p>
            <p className="mt-6 text-sm text-muted-foreground">Status</p>
            <p className="mt-1 font-medium">Template example</p>
          </aside>
          <div className="space-y-14">
            <section>
              <h2 className="text-3xl font-semibold tracking-tight">Overview</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                This is a visual case study from the Menoa template. The layout and sample imagery
                are here to preview the portfolio structure; project ownership, process and outcomes
                will be added when Andy provides his work.
              </p>
            </section>
            <section>
              <h2 className="text-3xl font-semibold tracking-tight">Design focus</h2>
              <div className="mt-6 space-y-3">
                {project.focus.map((item, index) => (
                  <div key={item} className="flex gap-5 rounded-2xl bg-card p-5">
                    <span className="text-muted-foreground">0{index + 1}</span>
                    <p className="font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </section>
            <div className="overflow-hidden rounded-3xl bg-card">
              <img
                src={`${imageBase}${project.image}`}
                alt={`${project.name} design detail`}
                className="w-full object-cover"
                loading="lazy"
              />
            </div>
            <section>
              <h2 className="text-3xl font-semibold tracking-tight">The result</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                This section is reserved for a verified result once the case study is personalized.
              </p>
            </section>
          </div>
        </div>
        <section className="mx-auto max-w-5xl px-5 pb-32">
          <h2 className="mb-8 text-3xl font-semibold tracking-tight">More projects</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.slug}
                to="/projects/$slug"
                params={{ slug: item.slug }}
                className="group"
              >
                <div className="overflow-hidden rounded-3xl bg-card">
                  <img
                    src={`${imageBase}${item.image}`}
                    alt={`${item.name} sample visual`}
                    className="aspect-[1016/938] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 font-medium">{item.name} ↗</p>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </PortfolioShell>
  );
}
