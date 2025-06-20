import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

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
      <Button
        variant="ghost"
        onClick={toggleOpen}
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
      >
        <span className="mr-2 text-lg">{languages[language].flag}</span>
        {languages[language].label}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-40 rounded-md border bg-popover p-1 shadow-lg z-50"
          >
            {Object.entries(languages).map(([key, { label, flag }]) => (
              <button
                key={key}
                className={`flex items-center w-full px-3 py-2 text-sm rounded hover:bg-accent ${
                  language === key ? "bg-accent text-accent-foreground font-semibold" : "text-popover-foreground"
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
