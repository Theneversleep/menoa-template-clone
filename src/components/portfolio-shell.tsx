import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { imageBase } from "../lib/portfolio";
import { useLanguage } from "../lib/i18n";

function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  return (
    <div
      role="group"
      aria-label={language === "fr" ? "Langue" : "Language"}
      className="flex rounded-full bg-secondary p-1 text-xs font-semibold"
    >
      {(["fr", "en"] as const).map((option) => (
        <button
          key={option}
          type="button"
          lang={option}
          aria-pressed={language === option}
          onClick={() => setLanguage(option)}
          className={`rounded-full px-2.5 py-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${language === option ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function PortfolioShell({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const fr = language === "fr";
  const nav = [
    { label: fr ? "Projets" : "Projects", to: "/projects" as const },
    { label: fr ? "À propos" : "About me", to: "/about-me" as const },
    { label: fr ? "Réseaux" : "Social", to: "/" as const, hash: "social" },
    { label: fr ? "Témoignages" : "Testimonials", to: "/" as const, hash: "testimonials" },
  ];
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const home = pathname === "/";

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!home) return;
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [home]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header
        className={
          home
            ? `site-header site-header--home ${scrolled ? "site-header--scrolled" : "site-header--top"}`
            : "site-header sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur"
        }
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <img
              src={`${imageBase}wOXGNwristHrL3O30j9xrcyy5g.png`}
              alt="Portrait de démonstration"
              className="size-11 rounded-full bg-card object-cover object-top"
            />
            <span className="leading-tight">
              <strong className="block font-medium">Andy Degali</strong>
              <small className="block text-sm text-muted-foreground">
                {fr ? "Aperçu du portfolio" : "Portfolio preview"}
              </small>
            </span>
          </Link>
          <nav
            aria-label={fr ? "Navigation principale" : "Primary navigation"}
            className="hidden items-center gap-4 lg:flex"
          >
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                {...(item.hash ? { hash: item.hash } : {})}
                className="hover:text-muted-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/"
              hash="contact"
              className="rounded-full bg-secondary px-4 py-2.5 font-medium hover:bg-accent"
            >
              {fr ? "Parlons-en" : "Let's chat"}
            </Link>
            <LanguageSwitch />
          </nav>
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitch />
            <button
              type="button"
              aria-label={
                menuOpen
                  ? fr
                    ? "Fermer le menu"
                    : "Close menu"
                  : fr
                    ? "Ouvrir le menu"
                    : "Open menu"
              }
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex size-11 items-center justify-center rounded-full bg-secondary text-2xl lg:hidden"
            >
              {menuOpen ? "×" : "☰"}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mobile-menu"
            aria-label={fr ? "Navigation mobile" : "Mobile navigation"}
            className="site-mobile-menu border-t border-border bg-background px-5 py-8 lg:hidden"
          >
            <div className="mx-auto flex max-w-5xl flex-col gap-5 text-3xl font-medium tracking-tight">
              {nav.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  {...(item.hash ? { hash: item.hash } : {})}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/" hash="contact" onClick={() => setMenuOpen(false)}>
                {fr ? "Parlons-en" : "Let's chat"}
              </Link>
            </div>
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-3 px-5 py-8 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Andy Degali</p>
          <p>
            {fr
              ? "Aperçu du portfolio · Contenu en préparation"
              : "Portfolio preview · Content in progress"}
          </p>
        </div>
      </footer>
    </div>
  );
}
