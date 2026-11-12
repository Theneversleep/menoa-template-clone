import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";
import { PortfolioShell } from "../components/portfolio-shell";
import { HeroAtmosphere } from "../components/hero-atmosphere";
import { SocialSection } from "../components/social-section";
import { projects as portfolioProjects } from "../lib/portfolio";
import { useLanguage, type Language } from "../lib/i18n";

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
      { title: "Andy Degali — Aperçu du portfolio" },
      {
        name: "description",
        content: "Un aperçu visuel du portfolio d'Andy Degali, inspiré de Menoa.",
      },
      { property: "og:title", content: "Andy Degali — Aperçu du portfolio" },
      {
        property: "og:description",
        content: "Une étude visuelle prête à accueillir des projets et contenus réels.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type BrandLogo = {
  name: string;
  href: string;
  image?: string;
  wordmark?: string;
  className?: string;
};

const logos: BrandLogo[] = [
  {
    name: "Le Roi du Smartphone",
    href: "https://leroidusmartphone.com/",
    image: "/brands/le-roi-du-smartphone-light.png",
  },
  {
    name: "Le Roi des Affaires",
    href: "https://leroidesaffaires.com/",
    wordmark: "LE ROI DES AFFAIRES",
    className: "text-xl font-extrabold tracking-tight",
  },
  {
    name: "EdenGlowy",
    href: "https://edenglowy.com/",
    image: "/brands/edenglowy.png",
  },
  {
    name: "clicandlive",
    href: "https://clicandlive.com/",
    wordmark: "clicandlive",
    className: "text-2xl font-extrabold tracking-[-0.065em]",
  },
];
const gallery = [
  "z6nacw1Lth7eA4zP6w6yUH7JgKs.jpg",
  "EE5G4vMR32xKcyESnMpywzlU8k.jpg",
  "nNqKRJIOJnl5wNqsU49ETg7kA.jpg",
  "TYjgz4BtTj5PLJq6po3O10JfK9M.png",
  "SEnIgMp5yFfjGRUFF0cecNGIac4.jpg",
  "mdM59UhlLhFwUS7Bje43Zj8Plg.png",
];
const servicesEn = [
  "Web design",
  "Product design",
  "UI/UX design",
  "Brand identity",
  "Animation",
  "Web apps",
  "Mobile apps",
  "Framer development",
];
const stepsEn = [
  ["Start a conversation", "A place to understand the project, the audience and the goal."],
  ["Find the direction", "A clear plan can connect the brief to visual decisions."],
  ["Build the experience", "Concepts, feedback and refinement lead to the final work."],
];
const testimonialsEn = [
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
const faqsEn = [
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

const servicesFr = [
  "Design web",
  "Design produit",
  "Design UI/UX",
  "Identité de marque",
  "Animation",
  "Applications web",
  "Applications mobiles",
  "Développement Framer",
];
const stepsFr = [
  ["Faire connaissance", "Un échange pour comprendre le projet, son public et son objectif."],
  ["Définir la direction", "Une ligne claire relie le brief aux choix visuels."],
  ["Construire l'expérience", "Concepts, retours et ajustements donnent forme au résultat final."],
];
const testimonialsFr = [
  [
    "Un véritable témoignage client pourra décrire le défi, le travail réalisé et son impact.",
    "Témoignage 01",
    "Contenu d'exemple",
    "dpW4xdKpiRSE9C0EmH2QYexAww.jpg",
  ],
  [
    "Cette carte conserve le rythme de lecture du modèle en attendant un témoignage approuvé.",
    "Témoignage 02",
    "Contenu d'exemple",
    "I86MHKGPaFDTIrHaPKmykuvSMV8.jpg",
  ],
  [
    "Un avis court et précis trouvera sa place ici une fois le portfolio personnalisé.",
    "Témoignage 03",
    "Contenu d'exemple",
    "FE0q0PK12lWa8evg3XMr8bDkc.jpg",
  ],
  [
    "Cet espace est réservé à un avis vérifié d'une personne ayant travaillé avec Andy.",
    "Témoignage 04",
    "Contenu d'exemple",
    "iDmd2L3Z98P1qTmr0Grfms40c.jpg",
  ],
  [
    "Le futur témoignage pourra parler du processus et de la qualité de la collaboration.",
    "Témoignage 05",
    "Contenu d'exemple",
    "LgRpToSROKNhVrGJalRX62CT0o.jpg",
  ],
  [
    "Ajoutez un vrai témoignage avec l'accord de son auteur avant publication.",
    "Témoignage 06",
    "Contenu d'exemple",
    "uWH0Dto9sxWjmDTJXU4fRUeTp18.jpg",
  ],
];
const faqsFr = [
  [
    "Comment se déroule votre processus de design ?",
    "Ce texte est un exemple. La méthode réelle d'Andy pourra être ajoutée quand ses détails seront connus.",
  ],
  [
    "Combien de temps dure généralement un projet ?",
    "Le calendrier dépend du périmètre. Des durées vérifiées seront ajoutées lorsque l'offre sera définie.",
  ],
  ["Quels sont vos tarifs ?", "Les tarifs seront ajoutés après confirmation de l'offre d'Andy."],
  [
    "Travaillez-vous avec des startups ?",
    "La réponse finale décrira les clients avec lesquels Andy travaille réellement.",
  ],
  [
    "Pouvez-vous collaborer avec mon équipe ?",
    "Cet espace accueillera le fonctionnement réel des collaborations d'Andy.",
  ],
  [
    "Que faut-il préparer avant de commencer ?",
    "Une liste pratique pourra accompagner le futur processus de contact.",
  ],
];

const copy = {
  fr: {
    badge: "Design visuel et produit · Aperçu du portfolio",
    hero: "Un design qui inspire confiance et donne envie d'acheter",
    heroBody:
      "Une étude visuelle du portfolio Menoa, prête à être adaptée au travail réel d'Andy Degali.",
    explore: "Voir les projets",
    aboutLink: "À propos de moi",
    visit: "Visiter",
    sampleVisual: "Visuel d'exemple pour",
    samplePortrait: "Portrait d'exemple du modèle de référence",
    projectsLabel: "Projets sélectionnés",
    projectsTitle: "Des projets pensés avec stratégie, réalisés avec soin.",
    aboutLabel: "À propos",
    aboutTitle: "Bonjour, je suis Andy Degali",
    aboutBody:
      "Cet espace accueillera l'histoire d'Andy. La mise en page est en place ; sa biographie et son parcours seront ajoutés ensuite.",
    moreAbout: "En savoir plus sur moi",
    servicesLabel: "Services d'exemple",
    servicesTitle: "Tout pour donner à votre marque la présence qu'elle mérite",
    processLabel: "Comment ça marche",
    processTitle: "Trois étapes pour votre prochain projet.",
    testimonialsLabel: "Témoignages · Mise en page d'exemple",
    testimonialsTitle: "Un espace pour vos témoignages.",
    samplePortraitAlt: "Portrait d'exemple",
    contactTitle: "Un projet en tête ? Donnons-lui vie.",
    contactBody:
      "Les coordonnées seront ajoutées quand Andy sera prêt. En attendant, découvrez cet aperçu et ses projets d'exemple.",
  },
  en: {
    badge: "Visual & Product Design · Portfolio preview",
    hero: "Design that makes people trust and buy",
    heroBody:
      "A visual study of the Menoa portfolio, ready to be shaped around Andy Degali's real work.",
    explore: "Explore projects",
    aboutLink: "About me",
    visit: "Visit",
    sampleVisual: "Sample visual for",
    samplePortrait: "Sample portrait from the reference template",
    projectsLabel: "Selected projects",
    projectsTitle: "Projects built on strategy, finished with craft.",
    aboutLabel: "About",
    aboutTitle: "Hi, I am Andy Degali",
    aboutBody:
      "This is the introduction area for Andy's story. The design is in place; the biography and experience details will follow.",
    moreAbout: "More about me",
    servicesLabel: "Example services",
    servicesTitle: "Everything your brand needs to show up right",
    processLabel: "How it works",
    processTitle: "Three steps to your next big project.",
    testimonialsLabel: "Kind words · Sample layout",
    testimonialsTitle: "A place for kind words.",
    samplePortraitAlt: "Sample portrait",
    contactTitle: "Have a project in mind? Let's make it real.",
    contactBody:
      "Contact details will be added when Andy is ready. For now, explore the portfolio preview and the sample projects.",
  },
} satisfies Record<Language, Record<string, string>>;

function Badge() {
  const { language } = useLanguage();
  return (
    <span className="hero-badge inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium">
      <span className="pulse-dot size-2 rounded-full bg-success" /> {copy[language].badge}
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
  const { language } = useLanguage();
  const t = copy[language];
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Magnetic>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-85"
        >
          {t.explore} ↗
        </Link>
      </Magnetic>
      <Magnetic>
        <Link
          to="/about-me"
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 font-medium transition hover:bg-accent"
        >
          {t.aboutLink} ↗
        </Link>
      </Magnetic>
    </div>
  );
}

function Index() {
  useMotion();
  const { language } = useLanguage();
  const t = copy[language];
  const services = language === "fr" ? servicesFr : servicesEn;
  const steps = language === "fr" ? stepsFr : stepsEn;
  const testimonials = language === "fr" ? testimonialsFr : testimonialsEn;
  const faqs = language === "fr" ? faqsFr : faqsEn;
  return (
    <PortfolioShell>
      <div
        id="progress"
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left scale-x-0 bg-primary"
      />

      <section className="hero-stage px-5 pt-40 text-center">
        <HeroAtmosphere />
        <div className="intro">
          <Badge />
        </div>
        <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-semibold leading-[1] tracking-[-0.05em] md:text-[5.5rem]">
          <Words text={t.hero} />
        </h1>
        <p
          style={{ ["--d" as string]: "600ms" }}
          className="intro mx-auto mt-6 max-w-md text-lg text-muted-foreground"
        >
          {t.heroBody}
        </p>
        <div className="intro mt-8" style={{ ["--d" as string]: "750ms" }}>
          <Ctas />
        </div>
        <div
          style={{ ["--d" as string]: "900ms" }}
          className="intro mx-auto mt-12 max-w-md overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_20%,black_80%,transparent)]"
        >
          <div className="flex w-max animate-marquee [animation-duration:28s]">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 items-center gap-10 pr-10"
              >
                {logos.map((logo) => (
                  <a
                    key={logo.href}
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={copy === 1 ? -1 : 0}
                    aria-label={`${t.visit} ${logo.name}`}
                    className="flex h-10 shrink-0 items-center opacity-65 transition-opacity hover:opacity-100 focus-visible:opacity-100"
                  >
                    {logo.image ? (
                      <img src={logo.image} alt="" className="h-10 w-auto object-contain" />
                    ) : (
                      <span className={logo.className}>{logo.wordmark}</span>
                    )}
                  </a>
                ))}
              </div>
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
          <Eyebrow>{t.projectsLabel}</Eyebrow>
          <H2>{t.projectsTitle}</H2>
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
                  alt={`${t.sampleVisual} ${project.name}`}
                  className="aspect-[1016/938] w-full object-cover transition-[scale] duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <p className="font-medium">{project.name}</p>
                <p className="text-muted-foreground">
                  {language === "fr" ? project.categoryFr : project.category}
                </p>
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
          <Eyebrow>{t.aboutLabel}</Eyebrow>
          <H2>{t.aboutTitle}</H2>
          <p data-reveal className="mt-6 text-lg text-muted-foreground">
            {t.aboutBody}
          </p>
          <Link
            to="/about-me"
            data-reveal
            className="mt-8 inline-flex rounded-full bg-secondary px-5 py-3 font-medium hover:bg-accent"
          >
            {t.moreAbout} ↗
          </Link>
        </div>
        <div data-clip className="overflow-hidden rounded-3xl bg-card">
          <img
            data-parallax="0.05"
            src={F + "wOXGNwristHrL3O30j9xrcyy5g.png"}
            alt={t.samplePortrait}
            className="w-full object-cover"
          />
        </div>
      </section>

      <SocialSection />

      <section className="mx-auto max-w-5xl px-5 py-32 text-center">
        <Eyebrow>{t.servicesLabel}</Eyebrow>
        <H2>{t.servicesTitle}</H2>
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
          <Eyebrow>{t.processLabel}</Eyebrow>
          <H2>{t.processTitle}</H2>
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
          <Eyebrow>{t.testimonialsLabel}</Eyebrow>
          <H2>{t.testimonialsTitle}</H2>
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
                  alt={t.samplePortraitAlt}
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
            {t.contactTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-muted-foreground">{t.contactBody}</p>
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
