import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";

function useMotion() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal],[data-clip]");
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
    const par = document.querySelectorAll<HTMLElement>("[data-parallax]");
    let raf = 0;
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => {
      const vh = window.innerHeight;
      par.forEach((el) => { const r = el.getBoundingClientRect(); const k = Number(el.dataset["parallax"]);
        el.style.transform = `translate3d(0, ${((r.top + r.height / 2 - vh / 2) * -k).toFixed(1)}px, 0) scale(1.12)`; });
      const bar = document.getElementById("progress");
      if (bar) bar.style.transform = `scaleX(${window.scrollY / (document.body.scrollHeight - vh)})`;
    }); };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);
}

function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const move = (e: MouseEvent) => { const el = ref.current!; const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px, ${(e.clientY - r.top - r.height / 2) * 0.4}px)`; };
  return <span ref={ref} onMouseMove={move} onMouseLeave={() => (ref.current!.style.transform = "")} className="inline-block transition-transform duration-300 ease-out">{children}</span>;
}

function Words({ text }: { text: string }) {
  return <>{text.split(" ").map((w, i) => <span key={i} className="word" style={{ ["--i" as string]: i }}><span>{w}&nbsp;</span></span>)}</>;
}

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [n, setN] = useState(0); const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => { const io = new IntersectionObserver(([e]) => { if (!e?.isIntersecting) return; io.disconnect();
    const t0 = performance.now(); const tick = (t: number) => { const p = Math.min(1, (t - t0) / 1600); setN(Math.round(to * (1 - Math.pow(1 - p, 4)))); if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
    io.observe(ref.current!); return () => io.disconnect(); }, [to]);
  return <p ref={ref} className="text-4xl font-semibold tracking-tight tabular-nums">{n}{suffix}</p>;
}

const F = "https://framerusercontent.com/images/";
const AVATAR = F + "wOXGNwristHrL3O30j9xrcyy5g.png";
const GCAL = F + "crFI6QWSAh3udwJztJVauKe2o.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Andy Degali — Visual & Product Designer" },
      { name: "description", content: "Helping companies stand out in crowded markets through thoughtful brand and product design." },
      { property: "og:title", content: "Andy Degali — Design that makes people trust and buy" },
      { property: "og:description", content: "Brand identity, web and product design by Andy Degali, based in Paris." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const logos = ["3GFa9kAEOvT9yjqUydfHB7Y7U4.svg", "OQKjLsG01J0m96Kc3jxDrQ3S90.svg", "fuDF94TQejUHYbWI3aHgnSSCs.svg", "ZGBMuDdG55ET3AjXGqOtYSfRNGg.svg"];
const gallery = ["z6nacw1Lth7eA4zP6w6yUH7JgKs.jpg", "EE5G4vMR32xKcyESnMpywzlU8k.jpg", "nNqKRJIOJnl5wNqsU49ETg7kA.jpg", "TYjgz4BtTj5PLJq6po3O10JfK9M.png", "SEnIgMp5yFfjGRUFF0cecNGIac4.jpg", "mdM59UhlLhFwUS7Bje43Zj8Plg.png"];
const projects = [
  ["Auten - AI Agency", "Web design", "Sguuf5oH1GkCwjRLUTFhb0EyDQ.jpg"],
  ["Renance - Dashboard", "Product design", "0oS2bSg3piTgoG5fgAU8qk9UTo.jpg"],
  ["Sona - Automation platform", "Product design", "7dXjYpmSu0uw6mxHj7QHxzj3W58.jpg"],
  ["Kael - Operations workflow", "Product design", "e7zhD278S41ZcqdwY6XYsLHio.jpg"],
];
const services = ["Web design", "Product design", "UI/UX design", "Brand identity", "Animation", "Web apps", "Mobile apps", "Framer development"];
const steps = [
  ["Book a free discovery call", "A casual 30-minute conversation about your project, goals, and where you need help. No commitments, no pressure."],
  ["Receive your action plan", "Within 48 hours you'll receive a detailed scope, timeline, and pricing. No guesswork, no hidden costs."],
  ["Let's start designing", "Once we're aligned, I get to work immediately. You'll see first concepts within the first week."],
];
const testimonials = [
  ["Andy completely transformed how our brand shows up. Within a month of the rebrand, our inbound leads doubled and every client meeting starts with 'I love your website.'", "Sarah Chen", "Founder at Oliva", "dpW4xdKpiRSE9C0EmH2QYexAww.jpg"],
  ["Our dashboard was a mess — users were churning because they couldn't find basic features. Andy redesigned the entire experience and task completion jumped 34% in the first sprint.", "Marcus Webb", "Head of Product at Kael", "I86MHKGPaFDTIrHaPKmykuvSMV8.jpg"],
  ["We needed a brand and a website in 5 weeks before our funding round. Andy delivered both — on time, on brief, and better than what we imagined. Investors noticed immediately.", "Lina Torres", "CEO at Sona", "FE0q0PK12lWa8evg3XMr8bDkc.jpg"],
  ["I've worked with dozens of designers. Andy is the rare one who thinks like a strategist and executes like an artist. I keep sending clients his way because he makes me look good.", "David Park", "Creative Director at Haus Studio", "iDmd2L3Z98P1qTmr0Grfms40c.jpg"],
  ["First project was a logo. Then a website. Then a full product redesign. Three years later, Andy is still my first call for anything design. That says everything.", "Nina Alvarez", "Founder at Flux", "LgRpToSROKNhVrGJalRX62CT0o.jpg"],
  ["Andy didn't just make it look better — he challenged our assumptions, simplified the user flow, and shipped a design system our dev team actually enjoys using. That never happens.", "James Okafor", "Product Lead at Prism", "uWH0Dto9sxWjmDTJXU4fRUeTp18.jpg"],
];
const faqs = [
  ["What's your design process like?", "Every project starts with strategy. I spend time understanding your business, audience, and goals before opening any design tool. From there it's a focused cycle of concepts, feedback, and refinement until we land on something that works — not just looks good."],
  ["How long does a typical project take?", "It depends on scope. A brand identity usually takes 4-6 weeks. A product design project runs 6-10 weeks. A landing page can be done in 1-2 weeks. I'll give you a clear timeline before we start so there are no surprises."],
  ["How much do you charge?", "I price by project, not by hour. A brand identity starts at $5,000, product design at $8,000, and web design at $3,000. Every project is scoped individually — I'll send a detailed proposal after our first call."],
  ["Do you work with startups?", "Both. I've worked with pre-seed startups building their first brand and Series B companies redesigning their core product. What matters isn't size — it's whether you care about doing design right."],
  ["Can you work with my existing team?", "Absolutely. I regularly collaborate with in-house developers, product managers, and marketing teams. I adapt to your tools and workflows — Slack, Notion, Linear, whatever you already use."],
  ["What do I need to have ready before we start?", "A clear idea of what you need and why. You don't need a brief, mood board, or wireframes — that's my job. A 30-minute call is usually enough to figure out if we're a good fit."],
];

function Badge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium">
      <span className="pulse-dot size-2 rounded-full bg-success" /> Visual & Product Designer · Available for projects
    </span>
  );
}
function Eyebrow({ children }: { children: string }) {
  return <p data-reveal className="text-sm font-medium text-muted-foreground">{children}</p>;
}
function H2({ children }: { children: string }) {
  return <h2 data-reveal style={{ ["--d" as string]: "100ms" }} className="mt-3 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">{children}</h2>;
}
function Ctas() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Magnetic><a href="https://cal.com/" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-85">
        <img src={GCAL} alt="" className="size-4" /> Book a free call
      </a></Magnetic>
      <Magnetic><a href="https://telegram.org/" className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 font-medium transition hover:bg-accent">
        <TgIcon /> Let's chat
      </a></Magnetic>
    </div>
  );
}
function TgIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5"><circle cx="12" cy="12" r="12" fill="#2AABEE" /><path d="M5.5 11.8l11-4.3c.5-.2 1 .1.8.9l-1.9 8.9c-.1.6-.5.8-1 .5l-2.9-2.1-1.4 1.3c-.2.2-.3.3-.6.3l.2-2.9 5.4-4.9c.2-.2-.1-.3-.4-.1l-6.6 4.2-2.8-.9c-.6-.2-.6-.6.2-.9z" fill="#fff" /></svg>
  );
}

function Index() {
  useMotion();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div id="progress" className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left scale-x-0 bg-primary" />
      <header className="intro sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <a href="#" className="flex items-center gap-3">
            <img src={AVATAR} alt="Andy Degali" className="size-11 rounded-full bg-card object-cover object-top" />
            <div className="leading-tight">
              <p className="font-medium">Andy Degali</p>
              <p className="text-sm text-muted-foreground">Based in Paris · CET</p>
            </div>
          </a>
          <nav className="flex items-center gap-8">
            <div className="hidden gap-8 md:flex">
              <a href="#projects" className="hover:text-muted-foreground">Projects</a>
              <a href="#about" className="hover:text-muted-foreground">About me</a>
              <a href="#testimonials" className="hover:text-muted-foreground">Testimonials</a>
            </div>
            <a href="https://telegram.org/" className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2.5 font-medium hover:bg-accent"><TgIcon /> Let's chat</a>
          </nav>
        </div>
      </header>

      <section className="px-5 pt-28 text-center">
        <div className="intro"><Badge /></div>
        <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-semibold leading-[1] tracking-[-0.05em] md:text-[5.5rem]"><Words text="Design that makes people trust and buy" /></h1>
        <p style={{ ["--d" as string]: "600ms" }} className="intro mx-auto mt-6 max-w-md text-lg text-muted-foreground">Helping companies stand out in crowded markets through thoughtful brand and product design</p>
        <div className="intro mt-8" style={{ ["--d" as string]: "750ms" }}><Ctas /></div>
        <div style={{ ["--d" as string]: "900ms" }} className="intro mx-auto mt-12 max-w-md overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_20%,black_80%,transparent)]">
          <div className="flex w-max animate-marquee gap-10">
            {[...logos, ...logos, ...logos, ...logos].map((l, i) => <img key={i} src={F + l} alt="" className="h-6 opacity-60" />)}
          </div>
        </div>
      </section>

      <section className="intro marquee-pause mt-24 overflow-hidden" style={{ ["--d" as string]: "1000ms" }}>
        <div className="flex w-max animate-marquee gap-6 [animation-duration:60s]">
          {[...gallery, ...gallery].map((g, i) => (
            <img key={i} src={F + g + "?width=1000"} alt="" className="h-[420px] w-auto rounded-3xl object-cover transition duration-700 hover:scale-[1.03]" />
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-32">
        <div className="text-center"><Eyebrow>Selected projects</Eyebrow><H2>Projects built on strategy, finished with craft.</H2></div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map(([t, c, img], i) => (
            <a key={t} href="#" data-reveal style={{ ["--d" as string]: `${(i % 2) * 150}ms` }} className="group">
              <div data-clip className="overflow-hidden rounded-3xl bg-card">
                <img data-parallax="0.06" src={F + img} alt={t} className="aspect-[1016/938] w-full object-cover transition-[scale] duration-700 group-hover:scale-105" />
              </div>
              <div className="mt-4 flex justify-between"><p className="font-medium">{t}</p><p className="text-muted-foreground">{c}</p></div>
            </a>
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-5xl scroll-mt-24 items-center gap-12 px-5 py-16 md:grid-cols-2">
        <div>
          <Eyebrow>About</Eyebrow><H2>Hi, I am Andy Degali</H2>
          <p data-reveal className="mt-6 text-lg text-muted-foreground">A multidisciplinary designer with 6+ years of experience crafting brand identities and digital products for startups and established companies across Europe and the US</p>
          <div className="mt-10 grid grid-cols-2 gap-6">
            {([[6, "+ years", "Design experience"], [40, "+", "Project delivered"]] as const).map(([a, sfx, b], i) => (
              <div key={b} data-reveal style={{ ["--d" as string]: `${i * 120}ms` }} className="lift rounded-2xl bg-card p-6"><Counter to={a} suffix={sfx} /><p className="mt-1 text-muted-foreground">{b}</p></div>
            ))}
          </div>
        </div>
        <div data-clip className="overflow-hidden rounded-3xl bg-card"><img data-parallax="0.05" src={F + "wOXGNwristHrL3O30j9xrcyy5g.png"} alt="Andy Degali" className="w-full object-cover" /></div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-32 text-center">
        <Eyebrow>What I do</Eyebrow><H2>Everything your brand needs to show up right</H2>
        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-3">
          {services.map((s, i) => <span key={s} data-reveal style={{ ["--d" as string]: `${i * 60}ms` }} className="cursor-default rounded-full bg-secondary px-6 py-3 text-lg font-medium transition-colors duration-300 hover:bg-primary hover:text-primary-foreground">{s}</span>)}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <div className="text-center"><Eyebrow>How it works</Eyebrow><H2>Three steps to your next big project.</H2></div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map(([t, d], i) => (
            <div key={t} data-reveal style={{ ["--d" as string]: `${i * 140}ms` }} className="lift rounded-3xl bg-card p-8">
              <p className="text-sm font-medium text-muted-foreground">0{i + 1}</p>
              <h3 className="mt-16 text-xl font-semibold tracking-tight">{t}</h3>
              <p className="mt-3 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="testimonials" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-32">
        <div className="text-center"><Eyebrow>Kind words</Eyebrow><H2>Words from people I've worked with.</H2></div>
        <div className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-3">
          {testimonials.map(([q, n, r, img], i) => (
            <figure key={n} data-reveal style={{ ["--d" as string]: `${(i % 3) * 120}ms` }} className="lift mb-6 break-inside-avoid rounded-3xl bg-card p-7">
              <blockquote className="leading-relaxed">"{q}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img src={F + img} alt={n} className="size-11 rounded-full object-cover" />
                <div><p className="font-medium">{n}</p><p className="text-sm text-muted-foreground">{r}</p></div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <div data-clip className="rounded-[2rem] bg-card px-6 py-20 text-center">
          <Badge />
          <h2 className="mx-auto mt-6 max-w-2xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Have a project in mind? Let's make it real.</h2>
          <p className="mx-auto mt-6 max-w-lg text-muted-foreground">I'm currently available for new projects starting March 2025. Whether you need a full brand identity, a product redesign, or a strategic creative partner</p>
          <div className="mt-8"><Ctas /></div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-24">
        {faqs.map(([q, a]) => (
          <details key={q} data-reveal className="group border-b border-border py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-medium">
              {q}<span className="text-2xl text-muted-foreground transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 text-muted-foreground">{a}</p>
          </details>
        ))}
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl justify-between px-5 py-8 text-sm text-muted-foreground">
          <p>© 2026 Andy Degali</p><p>Based in Paris · CET</p>
        </div>
      </footer>
    </div>
  );
}
