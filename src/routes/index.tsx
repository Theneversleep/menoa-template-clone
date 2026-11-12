import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";
import { PortfolioShell } from "../components/portfolio-shell";
import { projects as portfolioProjects } from "../lib/portfolio";

function useMotion() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal],[data-clip]");
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const par = document.querySelectorAll<HTMLElement>("[data-parallax]");
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        par.forEach((el) => {
          const r = el.getBoundingClientRect();
          const k = Number(el.dataset["parallax"]);
          el.style.transform = `translate3d(0, ${((r.top + r.height / 2 - vh / 2) * -k).toFixed(1)}px, 0) scale(1.12)`;
        });
        const bar = document.getElementById("progress");
        if (bar)
          bar.style.transform = `scaleX(${window.scrollY / (document.body.scrollHeight - vh)})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}

function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const move = (e: MouseEvent) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px, ${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
  };
  return (
    <span
      ref={ref}
      onMouseMove={move}
      onMouseLeave={() => (ref.current!.style.transform = "")}
      className="inline-block transition-transform duration-300 ease-out"
    >
      {children}
    </span>
  );
}

function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className="word" style={{ ["--i" as string]: i }}>
          <span>{w}&nbsp;</span>
        </span>
      ))}
    </>
  );
}

const F = "https://framerusercontent.com/images/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Andy Degali — Portfolio preview" },
      {
        name: "description",
        content: "A visual preview of Andy Degali's portfolio, inspired by Menoa.",
      },
      { property: "og:title", content: "Andy Degali — Portfolio preview" },
      {
        property: "og:description",
        content: "A visual portfolio study, ready for real projects and content.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const logos = [
  "3GFa9kAEOvT9yjqUydfHB7Y7U4.svg",
  "OQKjLsG01J0m96Kc3jxDrQ3S90.svg",
  "fuDF94TQejUHYbWI3aHgnSSCs.svg",
  "ZGBMuDdG55ET3AjXGqOtYSfRNGg.svg",
];
const gallery = [
  "z6nacw1Lth7eA4zP6w6yUH7JgKs.jpg",
  "EE5G4vMR32xKcyESnMpywzlU8k.jpg",
  "nNqKRJIOJnl5wNqsU49ETg7kA.jpg",
  "TYjgz4BtTj5PLJq6po3O10JfK9M.png",
  "SEnIgMp5yFfjGRUFF0cecNGIac4.jpg",
  "mdM59UhlLhFwUS7Bje43Zj8Plg.png",
];
const services = [
  "Web design",
  "Product design",
  "UI/UX design",
  "Brand identity",
  "Animation",
  "Web apps",
  "Mobile apps",
  "Framer development",
];
const steps = [
  ["Start a conversation", "A place to understand the project, the audience and the goal."],
  ["Find the direction", "A clear plan can connect the brief to visual decisions."],
  ["Build the experience", "Concepts, feedback and refinement lead to the final work."],
];
const testimonials = [
  [
    "A real client quote can describe the challenge, the work and the difference it made.",
    "Client quote 01",
    "Sample content",
    "dpW4xdKpiRSE9C0EmH2QYexAww.jpg",
  ],
  [
    "This card preserves the reading rhythm of the reference until an approved testimonial is available.",
    "Client quote 02",
    "Sample content",
    "I86MHKGPaFDTIrHaPKmykuvSMV8.jpg",
  ],
  [
    "A short, specific endorsement belongs here once the portfolio is personalized.",
    "Client quote 03",
    "Sample content",
    "FE0q0PK12lWa8evg3XMr8bDkc.jpg",
  ],
  [
    "This is a layout placeholder for a verified perspective from someone who worked with Andy.",
    "Client quote 04",
    "Sample content",
    "iDmd2L3Z98P1qTmr0Grfms40c.jpg",
  ],
  [
    "The final quote can speak to the process and the quality of the collaboration.",
    "Client quote 05",
    "Sample content",
    "LgRpToSROKNhVrGJalRX62CT0o.jpg",
  ],
  [
    "Add a real quote with the person's permission before publishing the personalized portfolio.",
    "Client quote 06",
    "Sample content",
    "uWH0Dto9sxWjmDTJXU4fRUeTp18.jpg",
  ],
];
const faqs = [
  [
    "What's your design process like?",
    "This is demonstration copy. Andy's actual process can be added once the details are provided.",
  ],
  [
    "How long does a typical project take?",
    "Timelines depend on the scope. Add verified ranges when the service offer is confirmed.",
  ],
  ["How much do you charge?", "Pricing information will be added after Andy confirms his offer."],
  [
    "Do you work with startups?",
    "The final answer will describe the clients Andy actually works with.",
  ],
  [
    "Can you work with my existing team?",
    "This space is ready for Andy's real collaboration model.",
  ],
  [
    "What do I need to have ready before we start?",
    "A practical list can be added with the final contact process.",
  ],
];

function Badge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium">
      <span className="pulse-dot size-2 rounded-full bg-success" /> Visual & Product Design ·
      Portfolio preview
    </span>
  );
}
function Eyebrow({ children }: { children: string }) {
  return (
    <p data-reveal className="text-sm font-medium text-muted-foreground">
      {children}
    </p>
  );
}
function H2({ children }: { children: string }) {
  return (
    <h2
      data-reveal
      style={{ ["--d" as string]: "100ms" }}
      className="mt-3 text-4xl font-semibold tracking-[-0.04em] md:text-5xl"
    >
      {children}
    </h2>
  );
}
function Ctas() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Magnetic>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-85"
        >
          Explore projects ↗
        </Link>
      </Magnetic>
      <Magnetic>
        <Link
          to="/about-me"
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 font-medium transition hover:bg-accent"
        >
          About me ↗
        </Link>
      </Magnetic>
    </div>
  );
}

function Index() {
  useMotion();
  return (
    <PortfolioShell>
      <div
        id="progress"
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left scale-x-0 bg-primary"
      />

      <section className="px-5 pt-28 text-center">
        <div className="intro">
          <Badge />
        </div>
        <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-semibold leading-[1] tracking-[-0.05em] md:text-[5.5rem]">
          <Words text="Design that makes people trust and buy" />
        </h1>
        <p
          style={{ ["--d" as string]: "600ms" }}
          className="intro mx-auto mt-6 max-w-md text-lg text-muted-foreground"
        >
          A visual study of the Menoa portfolio, ready to be shaped around Andy Degali&apos;s real
          work.
        </p>
        <div className="intro mt-8" style={{ ["--d" as string]: "750ms" }}>
          <Ctas />
        </div>
        <div
          style={{ ["--d" as string]: "900ms" }}
          className="intro mx-auto mt-12 max-w-md overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_20%,black_80%,transparent)]"
        >
          <div className="flex w-max animate-marquee gap-10">
            {[...logos, ...logos, ...logos, ...logos].map((l, i) => (
              <img key={i} src={F + l} alt="" className="h-6 opacity-60" />
            ))}
          </div>
        </div>
      </section>

      <section
        className="intro marquee-pause mt-24 overflow-hidden"
        style={{ ["--d" as string]: "1000ms" }}
      >
        <div className="flex w-max animate-marquee gap-6 [animation-duration:60s]">
          {[...gallery, ...gallery].map((g, i) => (
            <img
              key={i}
              src={F + g + "?width=1000"}
              alt=""
              className="h-[420px] w-auto rounded-3xl object-cover transition duration-700 hover:scale-[1.03]"
            />
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-32">
        <div className="text-center">
          <Eyebrow>Selected projects</Eyebrow>
          <H2>Projects built on strategy, finished with craft.</H2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {portfolioProjects.map((project, i) => (
            <Link
              key={project.slug}
              to="/projects/$slug"
              params={{ slug: project.slug }}
              data-reveal
              style={{ ["--d" as string]: `${(i % 2) * 150}ms` }}
              className="group"
            >
              <div data-clip className="overflow-hidden rounded-3xl bg-card">
                <img
                  data-parallax="0.06"
                  src={F + project.image}
                  alt={`${project.name} sample visual`}
                  className="aspect-[1016/938] w-full object-cover transition-[scale] duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <p className="font-medium">{project.name}</p>
                <p className="text-muted-foreground">{project.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        id="about"
        className="mx-auto grid max-w-5xl scroll-mt-24 items-center gap-12 px-5 py-16 md:grid-cols-2"
      >
        <div>
          <Eyebrow>About</Eyebrow>
          <H2>Hi, I am Andy Degali</H2>
          <p data-reveal className="mt-6 text-lg text-muted-foreground">
            This is the introduction area for Andy&apos;s story. The design is in place; the
            biography and experience details will follow.
          </p>
          <Link
            to="/about-me"
            data-reveal
            className="mt-8 inline-flex rounded-full bg-secondary px-5 py-3 font-medium hover:bg-accent"
          >
            More about me ↗
          </Link>
        </div>
        <div data-clip className="overflow-hidden rounded-3xl bg-card">
          <img
            data-parallax="0.05"
            src={F + "wOXGNwristHrL3O30j9xrcyy5g.png"}
            alt="Sample portrait from the reference template"
            className="w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-32 text-center">
        <Eyebrow>Example services</Eyebrow>
        <H2>Everything your brand needs to show up right</H2>
        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-3">
          {services.map((s, i) => (
            <span
              key={s}
              data-reveal
              style={{ ["--d" as string]: `${i * 60}ms` }}
              className="cursor-default rounded-full bg-secondary px-6 py-3 text-lg font-medium transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <div className="text-center">
          <Eyebrow>How it works</Eyebrow>
          <H2>Three steps to your next big project.</H2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map(([t, d], i) => (
            <div
              key={t}
              data-reveal
              style={{ ["--d" as string]: `${i * 140}ms` }}
              className="lift rounded-3xl bg-card p-8"
            >
              <p className="text-sm font-medium text-muted-foreground">0{i + 1}</p>
              <h3 className="mt-16 text-xl font-semibold tracking-tight">{t}</h3>
              <p className="mt-3 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="testimonials" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-32">
        <div className="text-center">
          <Eyebrow>Kind words · Sample layout</Eyebrow>
          <H2>A place for kind words.</H2>
        </div>
        <div className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-3">
          {testimonials.map(([q, n, r, img], i) => (
            <figure
              key={n}
              data-reveal
              style={{ ["--d" as string]: `${(i % 3) * 120}ms` }}
              className="lift mb-6 break-inside-avoid rounded-3xl bg-card p-7"
            >
              <blockquote className="leading-relaxed">"{q}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={F + img}
                  alt="Sample portrait"
                  className="size-11 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{n}</p>
                  <p className="text-sm text-muted-foreground">{r}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-16">
        <div data-clip className="rounded-[2rem] bg-card px-6 py-20 text-center">
          <Badge />
          <h2 className="mx-auto mt-6 max-w-2xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Have a project in mind? Let's make it real.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-muted-foreground">
            Contact details will be added when Andy is ready. For now, explore the portfolio preview
            and the sample projects.
          </p>
          <div className="mt-8">
            <Ctas />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-24">
        {faqs.map(([q, a]) => (
          <details key={q} data-reveal className="group border-b border-border py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-medium">
              {q}
              <span className="text-2xl text-muted-foreground transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 text-muted-foreground">{a}</p>
          </details>
        ))}
      </section>
    </PortfolioShell>
  );
}
