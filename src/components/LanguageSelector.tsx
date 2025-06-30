
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type LanguageCode = "pt" | "en";

const languages: Record<LanguageCode, { label: string; flag: string }> = {
  pt: { label: "Pt", flag: "🇧🇷" },
  en: { label: "En", flag: "🇺🇸" },
};

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-1 items-center">
      {Object.entries(languages).map(([code, { label, flag }]) => (
        <button
          key={code}
          onClick={() => setLanguage(code as LanguageCode)}
          className={`flex items-center gap-1 px-2 py-1 rounded-md border transition text-xs
            ${
              language === code
                ? "bg-brand-accent text-white border-brand-accent"
                : "bg-background text-foreground border-border hover:bg-muted"
            }`}
        >
          <span className="text-sm">{flag}</span>
          <span className="font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}
