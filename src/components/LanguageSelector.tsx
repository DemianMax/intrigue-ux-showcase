import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown } from "lucide-react";

type LanguageCode = "pt" | "en";

const languages: Record<LanguageCode, { label: string; flag: string }> = {
  pt: { label: "Português", flag: "🇧🇷" },
  en: { label: "English", flag: "🇺🇸" },
};

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const changeLanguage = (lang: LanguageCode) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleOpen}
        className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium shadow-md transition hover:bg-gray-100 focus:outline-none"
      >
        <span className="text-xl">{languages[language].flag}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-40 rounded-xl border bg-white p-1 shadow-lg z-50"
          >
            {Object.entries(languages).map(([key, { label, flag }]) => (
              <button
                key={key}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                  language === key
                    ? "bg-gray-100 font-semibold"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => changeLanguage(key as LanguageCode)}
                type="button"
              >
                <span className="mr-2 text-lg">{flag}</span>
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
