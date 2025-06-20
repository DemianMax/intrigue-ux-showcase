import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type LanguageCode = "pt" | "en";

const languages: Record<LanguageCode, { label: string; flag: string }> = {
  pt: { label: "Português", flag: "🇧🇷" },
  en: { label: "English", flag: "🇺🇸" },
};

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2 items-center">
      {Object.entries(languages).map(([code, { label, flag }]) => (
        <button
          key={code}
          onClick={() => setLanguage(code as LanguageCode)}
          className={`flex items-center gap-1 px-3 py-1 rounded-full border transition
            ${
              language === code
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
            }`}
        >
          <span className="text-xl">{flag}</span>
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}
