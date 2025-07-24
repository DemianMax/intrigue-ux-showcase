import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BackgroundRain } from "@/components/ui/BackgroundRain";

interface HeroSectionProps {
  onScrollToAbout: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToAbout }) => {
  const { t } = useLanguage();

  // Safety check to ensure t function is available
  if (!t) {
    return null;
  }

  return (
    <section className="min-h-[100dvh] flex flex-col justify-center items-center relative pt-32 sm:pt-40 bg-white dark:bg-[#1E2735] overflow-hidden">
      <BackgroundRain />

      <div className="w-full max-w-5xl mx-auto px-6 flex flex-col items-end gap-12 z-10 relative">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          // Ajustes: Reduzimos o tamanho base para 3xl, mantendo 4xl em sm e 7xl em md
          className="text-3xl sm:text-4xl md:text-7xl font-playfair font-bold text-brand-dark dark:text-white leading-tight text-right"
        >
          <span className="text-brand-accent">UX</span>
          {t("heroTitlePart")}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
            style={{ transformOrigin: "left" }}
            className="block h-1 w-16 mt-6 rounded-full bg-brand-accent ml-auto"
          />
        </motion.h1>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="flex flex-col items-end"
          >
            <p
              // Ajustes: Reduzimos o tamanho base para lg, mantendo xl em sm e 2xl em md
              className="text-lg sm:text-xl md:text-2xl text-brand-dark/80 dark:text-gray-300 font-inter font-light leading-relaxed text-right"
            >
              {t("heroSubtitle")}
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.6, type: "spring" }}
              style={{ transformOrigin: "left" }}
              className="mt-6 h-1 w-32 bg-brand-accent/80 rounded-full self-end"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.button
        onClick={onScrollToAbout}
        className="absolute left-1/2 -translate-x-1/2 bottom-10 animate-bounce bg-brand-accent/10 hover:bg-brand-accent/20 rounded-full p-3 transition outline-none"
        aria-label={t("ariaScrollDown")}
      >
        <ChevronDown size={36} className="text-brand-accent" />
      </motion.button>
    </section>
  );
};

export default HeroSection;