import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { imageBase } from "../lib/portfolio";

const nav = [
  { label: "Projects", to: "/projects" as const },
  { label: "About me", to: "/about-me" as const },
  { label: "Testimonials", to: "/" as const, hash: "testimonials" },
];

export function PortfolioShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);
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
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <img
              src={`${imageBase}wOXGNwristHrL3O30j9xrcyy5g.png`}
              alt="Portrait de démonstration"
              className="size-11 rounded-full bg-card object-cover object-top"
            />
            <span className="leading-tight">
              <strong className="block font-medium">Andy Degali</strong>
              <small className="block text-sm text-muted-foreground">Portfolio preview</small>
            </span>
          </Link>
          <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex">
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
              Let&apos;s chat ↗
            </Link>
          </nav>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex size-11 items-center justify-center rounded-full bg-secondary text-2xl md:hidden"
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            className="border-t border-border bg-background px-5 py-8 md:hidden"
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
                Let&apos;s chat ↗
              </Link>
            </div>
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-3 px-5 py-8 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Andy Degali</p>
          <p>Portfolio preview · Content in progress</p>
        </div>
      </footer>
    </div>
  );
}
