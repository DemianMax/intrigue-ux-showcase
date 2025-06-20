import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type LanguageCode = "pt" | "en";

const languages: Record<LanguageCode, { label: string; flag: string }> = {
  pt: { label: "Português", flag: "🇧🇷" },
  en: { label: "English", flag: "🇺🇸" },
};

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    buttonRef.current?.focus();
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") closeMenu();
  };

  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeMenu]);

  const handleLanguageChange = (lang: LanguageCode) => {
    if (lang !== language) setLanguage(lang);
    closeMenu();
  };

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        <span className="text-xl">{languages[language].flag}</span>
        <span className="hidden sm:inline">{languages[language].label}</span>
        <ChevronDown className={`h-4 w-4 text-neutral-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="absolute right-0 mt-2 w-48 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xl backdrop-blur-md z-50 overflow-hidden"
            role="menu"
            aria-label="Select Language"
          >
            {Object.entries(languages).map(([key, { label, flag }]) => (
              <button
                key={key}
                className={`flex items-center w-full px-4 py-3 text-sm transition-all text-left ${
                  language === key
                    ? "bg-neutral-100 dark:bg-neutral-800 font-semibold"
                    : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
                onClick={() => handleLanguageChange(key as LanguageCode)}
                type="button"
                role="menuitem"
              >
                <span className="mr-3 text-xl">{flag}</span>
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
