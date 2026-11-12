import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "fr" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const STORAGE_KEY = "andy-degali-portfolio-language";
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "en") setLanguage("en");
    } catch {
      // Browsers can disable local storage; the language switch still works for this visit.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Keep the current language in memory when storage is unavailable.
    }
  }, [language, ready]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
