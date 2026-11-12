import { createFileRoute, Link } from "@tanstack/react-router";
import { PortfolioShell } from "../components/portfolio-shell";
import { imageBase, projects } from "../lib/portfolio";
import { useLanguage } from "../lib/i18n";

export const Route = createFileRoute("/projects/$slug")({
  head: () => ({
    meta: [
      { title: "Projet — Andy Degali" },
      {
        name: "description",
        content: "Une étude de cas d'exemple dans le portfolio inspiré de Menoa.",
      },
    ],
  }),
  component: ProjectPage,
});

function ProjectPage() {
  const { language } = useLanguage();
  const fr = language === "fr";
  const { slug } = Route.useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project)
    return (
      <PortfolioShell>
        <div className="mx-auto max-w-5xl px-5 py-32 text-center">
          <h1 className="text-5xl font-semibold">
            {fr ? "Projet introuvable" : "Project not found"}
          </h1>
          <Link to="/projects" className="mt-8 inline-block underline">
            {fr ? "Voir tous les projets" : "See all projects"}
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
            ← {fr ? "Tous les projets" : "All projects"}
          </Link>
          <p className="mt-16 text-sm font-medium text-muted-foreground">
            {fr ? "Étude de cas d'exemple" : "Sample case study"} ·{" "}
            {fr ? project.categoryFr : project.category}
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
            {project.name}
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
            {fr ? project.summaryFr : project.summary}
          </p>
        </div>
        <div className="mx-auto max-w-6xl px-5">
          <div className="overflow-hidden rounded-3xl bg-card">
            <img
              src={`${imageBase}${project.image}`}
              alt={
                fr ? `Design de référence pour ${project.name}` : `${project.name} reference design`
              }
              className="w-full object-cover"
            />
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-14 px-5 py-24 md:grid-cols-[250px_1fr] md:gap-24">
          <aside className="h-fit rounded-3xl bg-card p-7">
            <p className="text-sm text-muted-foreground">{fr ? "Projet" : "Project"}</p>
            <p className="mt-1 font-medium">{project.name}</p>
            <p className="mt-6 text-sm text-muted-foreground">Discipline</p>
            <p className="mt-1 font-medium">{fr ? project.categoryFr : project.category}</p>
            <p className="mt-6 text-sm text-muted-foreground">{fr ? "Statut" : "Status"}</p>
            <p className="mt-1 font-medium">{fr ? "Exemple du modèle" : "Template example"}</p>
          </aside>
          <div className="space-y-14">
            <section>
              <h2 className="text-3xl font-semibold tracking-tight">
                {fr ? "Présentation" : "Overview"}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {fr
                  ? "Cette étude visuelle provient du modèle Menoa. La mise en page et les images d'exemple présentent la structure du portfolio ; les projets, la démarche et les résultats réels seront ajoutés quand Andy fournira son travail."
                  : "This is a visual case study from the Menoa template. The layout and sample imagery are here to preview the portfolio structure; project ownership, process and outcomes will be added when Andy provides his work."}
              </p>
            </section>
            <section>
              <h2 className="text-3xl font-semibold tracking-tight">
                {fr ? "Axes de conception" : "Design focus"}
              </h2>
              <div className="mt-6 space-y-3">
                {(fr ? project.focusFr : project.focus).map((item, index) => (
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
                alt={fr ? `Détail du design de ${project.name}` : `${project.name} design detail`}
                className="w-full object-cover"
                loading="lazy"
              />
            </div>
            <section>
              <h2 className="text-3xl font-semibold tracking-tight">
                {fr ? "Le résultat" : "The result"}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {fr
                  ? "Cette section accueillera un résultat vérifié lorsque l'étude de cas sera personnalisée."
                  : "This section is reserved for a verified result once the case study is personalized."}
              </p>
            </section>
          </div>
        </div>
        <section className="mx-auto max-w-5xl px-5 pb-32">
          <h2 className="mb-8 text-3xl font-semibold tracking-tight">
            {fr ? "Autres projets" : "More projects"}
          </h2>
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
                    alt={fr ? `Visuel d'exemple pour ${item.name}` : `${item.name} sample visual`}
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
