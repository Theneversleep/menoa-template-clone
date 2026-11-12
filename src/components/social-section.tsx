import { Instagram } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../lib/i18n";

type Platform = "instagram" | "tiktok";
type EmbedStatus = "loading" | "ready" | "unavailable";

const accounts = {
  instagram: {
    handle: "@degalineversleep",
    href: "https://www.instagram.com/degalineversleep/",
    script: "https://www.instagram.com/embed.js",
  },
  tiktok: {
    handle: "@theneversleep",
    href: "https://www.tiktok.com/@theneversleep",
    script: "https://www.tiktok.com/embed.js",
  },
} as const;

declare global {
  interface Window {
    instgrm?: { Embeds?: { process: () => void } };
  }
}

function ProfileEmbed({ platform }: { platform: Platform }) {
  const { language } = useLanguage();
  const container = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<EmbedStatus>("loading");
  const account = accounts[platform];

  useEffect(() => {
    const host = container.current;
    if (!host) return;

    let active = true;
    const observer = new MutationObserver(() => {
      if (host.querySelector("iframe")) setStatus("ready");
    });
    observer.observe(host, { childList: true, subtree: true });

    const script = document.createElement("script");
    script.async = true;
    script.src = account.script;
    script.onload = () => {
      if (platform === "instagram") window.instgrm?.Embeds?.process();
    };
    script.onerror = () => {
      if (active) setStatus("unavailable");
    };
    document.body.appendChild(script);

    const timeout = window.setTimeout(() => {
      if (active && !host.querySelector("iframe")) setStatus("unavailable");
    }, 9000);

    return () => {
      active = false;
      observer.disconnect();
      window.clearTimeout(timeout);
      script.remove();
    };
  }, [account.script, platform]);

  return (
    <div ref={container} className="social-embed relative mx-auto w-full max-w-[720px]">
      {platform === "instagram" ? (
        <blockquote
          className="instagram-media !mx-auto !w-full !min-w-0 !max-w-[540px]"
          data-instgrm-permalink={account.href}
          data-instgrm-version="14"
          style={{ background: "#fff", border: 0, borderRadius: 12, margin: "0 auto", padding: 0 }}
        >
          <a href={account.href} target="_blank" rel="noopener noreferrer">
            {language === "fr" ? "Voir le profil sur Instagram" : "View profile on Instagram"}
          </a>
        </blockquote>
      ) : (
        <blockquote
          className="tiktok-embed !mx-auto !w-full !min-w-0"
          cite={account.href}
          data-unique-id="theneversleep"
          data-embed-type="creator"
          style={{ maxWidth: 720, minWidth: 288, margin: "0 auto" }}
        >
          <section>
            <a href={account.href} target="_blank" rel="noopener noreferrer">
              {account.handle}
            </a>
          </section>
        </blockquote>
      )}
      {status === "loading" && (
        <p className="mt-5 text-center text-xs text-muted-foreground" role="status">
          {language === "fr" ? "Chargement du profil…" : "Loading profile…"}
        </p>
      )}
      {status === "unavailable" && (
        <p className="mt-5 text-center text-sm text-muted-foreground" role="status">
          {language === "fr"
            ? "L'aperçu n'est pas disponible ici. Le profil reste accessible directement."
            : "The preview is unavailable here. You can still open the profile directly."}
        </p>
      )}
    </div>
  );
}

function SocialCard({ platform }: { platform: Platform }) {
  const { language } = useLanguage();
  const [tiktokVisible, setTiktokVisible] = useState(false);
  const account = accounts[platform];
  const isInstagram = platform === "instagram";
  const fr = language === "fr";

  return (
    <article
      data-reveal
      className={`social-card overflow-hidden rounded-[2rem] border border-border ${isInstagram ? "bg-[#f6f4f2]" : "bg-[#f4f4f4]"}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 pb-5 pt-7 sm:px-8">
        <div className="flex items-center gap-3">
          <span
            className={`flex size-11 items-center justify-center rounded-2xl ${isInstagram ? "bg-white text-foreground" : "bg-foreground text-background"}`}
          >
            {isInstagram ? (
              <Instagram size={22} strokeWidth={1.8} aria-hidden="true" />
            ) : (
              <span className="text-xl font-black tracking-[-0.12em]" aria-hidden="true">
                ♪
              </span>
            )}
          </span>
          <span>
            <span className="block text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {isInstagram ? "Instagram" : "TikTok"}
            </span>
            <strong className="block text-lg font-semibold tracking-tight">{account.handle}</strong>
          </span>
        </div>
        <a
          href={account.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${fr ? "Ouvrir" : "Open"} ${account.handle} ${fr ? "sur" : "on"} ${isInstagram ? "Instagram" : "TikTok"}`}
          className="social-card-link inline-flex items-center justify-center rounded-full border border-foreground/15 bg-white px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          {fr ? "Profil" : "Profile"}
        </a>
      </div>
      <div className="border-t border-foreground/10 px-3 pb-7 pt-6 sm:px-6">
        {isInstagram || tiktokVisible ? (
          <ProfileEmbed platform={platform} />
        ) : (
          <div className="relative flex min-h-[390px] flex-col justify-between overflow-hidden rounded-3xl bg-[#111] p-7 text-white sm:p-9">
            <div aria-hidden="true" className="social-bars flex h-20 items-end gap-2 opacity-80">
              {[0, 1, 2, 3, 4, 5, 6].map((bar) => (
                <span
                  key={bar}
                  style={{ animationDelay: `${bar * 95}ms` }}
                  className="w-2 rounded-full bg-white/80"
                />
              ))}
            </div>
            <div className="relative z-10">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/55">
                TikTok / {account.handle}
              </p>
              <h3 className="mt-3 max-w-sm text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
                {fr
                  ? "Le profil, les chiffres et les vidéos en direct."
                  : "The profile, the numbers and the videos live."}
              </h3>
              <button
                type="button"
                onClick={() => setTiktokVisible(true)}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#111] transition-colors hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {fr ? "Afficher le profil" : "Show the profile"}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-foreground/10 px-6 py-4 text-xs text-muted-foreground sm:px-8">
        {isInstagram
          ? fr
            ? "Publications récentes sur Instagram"
            : "Recent posts on Instagram"
          : fr
            ? "Abonnés, mentions J'aime et vidéos sur TikTok"
            : "Followers, likes and videos on TikTok"}
      </div>
    </article>
  );
}

export function SocialSection() {
  const { language } = useLanguage();
  const fr = language === "fr";

  return (
    <section id="social" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-24 md:py-32">
      <div className="mb-12 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
        <div>
          <p data-reveal className="text-sm font-medium text-muted-foreground">
            {fr ? "Réseaux sociaux" : "Social channels"}
          </p>
          <h2
            data-reveal
            className="mt-3 max-w-xl text-4xl font-semibold tracking-[-0.04em] md:text-5xl"
          >
            {fr ? "La suite se passe aussi là." : "The story continues here."}
          </h2>
        </div>
        <p data-reveal className="max-w-xs text-base leading-relaxed text-muted-foreground">
          {fr
            ? "Retrouvez les profils et leurs publications directement depuis Instagram et TikTok."
            : "Explore the profiles and their posts directly from Instagram and TikTok."}
        </p>
      </div>
      <div className="grid items-start gap-5 lg:grid-cols-2">
        <SocialCard platform="instagram" />
        <SocialCard platform="tiktok" />
      </div>
    </section>
  );
}
