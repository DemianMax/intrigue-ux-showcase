import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import BackgroundBeams from "@/components/BackgroundBeams";

interface HeroSectionProps {
  onScrollToAbout: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToAbout }) => {
  const { t } = useLanguage();

  return (
    <section className="min-h-[100dvh] flex flex-col justify-center items-center relative pt-32 sm:pt-40 bg-white overflow-hidden">
      
      <BackgroundBeams />

      <div className="w-full max-w-5xl mx-auto px-6 flex flex-col items-start gap-12 z-10">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold text-brand-dark leading-tight"
        >
          <span className="text-brand-accent">UX</span>
          {t("heroTitlePart")}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
            style={{ transformOrigin: "left" }}
            className="block h-1 w-16 mt-6 rounded-full bg-brand-accent"
          />
        </motion.h1>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="flex flex-col items-start"
          >
            <p className="text-xl sm:text-2xl text-brand-dark/80 font-inter font-light leading-relaxed">
              {t("heroSubtitle")}
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.6, type: "spring" }}
              style={{ transformOrigin: "left" }}
              className="mt-6 h-1 w-32 bg-brand-accent/80 rounded-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.button
        onClick={onScrollToAbout}
        className="absolute left-1/2 -translate-x-1/2 bottom-10 animate-bounce bg-brand-accent/10 hover:bg-brand-accent/20 rounded-full p-3 transition outline-none z-10"
        aria-label={t("ariaScrollDown")}
      >
        <ChevronDown size={36} className="text-brand-accent" />
      </motion.button>
    </section>
  );
};

export default HeroSection;
