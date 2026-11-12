import { createFileRoute, Link } from "@tanstack/react-router";
import { PortfolioShell } from "../components/portfolio-shell";
import { imageBase } from "../lib/portfolio";

export const Route = createFileRoute("/about-me")({
  head: () => ({
    meta: [
      { title: "About — Andy Degali" },
      { name: "description", content: "About page preview for Andy Degali's portfolio." },
    ],
  }),
  component: AboutPage,
});

const values = ["Clarity before decoration", "Useful details", "Careful execution"];
const tools = ["Strategy", "Design systems", "Interaction", "Prototyping"];

function AboutPage() {
  return (
    <PortfolioShell>
      <section className="mx-auto max-w-5xl px-5 pb-24 pt-24 md:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-muted-foreground">About me · Portfolio preview</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
            A little more about the person behind the work.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            This page previews the Menoa layout. Andy&apos;s biography, portrait and practice
            details can be added during the next iteration.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl bg-card md:row-span-2">
            <img
              src={`${imageBase}wOXGNwristHrL3O30j9xrcyy5g.png`}
              alt="Sample portrait from the reference template"
              className="h-full min-h-[380px] w-full object-cover"
            />
          </div>
          <div className="rounded-3xl bg-card p-8 md:p-10">
            <p className="text-sm text-muted-foreground">The approach · Example structure</p>
            <h2 className="mt-8 text-3xl font-semibold tracking-tight">Start with what matters.</h2>
            <p className="mt-4 text-muted-foreground">
              A place for Andy&apos;s real approach to understanding a brief, shaping a direction,
              and building a useful visual experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {values.map((value) => (
                <span key={value} className="rounded-full bg-background px-4 py-2 text-sm">
                  {value}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-card p-8 md:p-10">
            <p className="text-sm text-muted-foreground">What goes into the work · Example areas</p>
            <h2 className="mt-8 text-3xl font-semibold tracking-tight">From idea to detail.</h2>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {tools.map((tool) => (
                <span key={tool} className="rounded-2xl bg-background p-4 font-medium">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-20 rounded-3xl bg-card px-6 py-16 text-center">
          <p className="text-sm text-muted-foreground">Next up</p>
          <h2 className="mx-auto mt-3 max-w-xl text-4xl font-semibold tracking-tight">
            Take a closer look at the work.
          </h2>
          <Link
            to="/projects"
            className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground"
          >
            Explore projects ↗
          </Link>
        </div>
      </section>
    </PortfolioShell>
  );
}
