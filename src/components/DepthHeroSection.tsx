
import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DepthHeroSectionProps {
  onScrollNext: () => void;
}

const DepthHeroSection: React.FC<DepthHeroSectionProps> = ({ onScrollNext }) => {
  const { t } = useLanguage();

  if (!t) return null;

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center bg-gradient-to-br from-white via-gray-50 to-orange-50 overflow-hidden">
      {/* Floating elements for depth */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-brand-accent/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 30 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-playfair font-bold text-brand-dark leading-tight mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <span className="text-brand-accent block mb-4">UX</span>
            <span className="block">{t("heroTitlePart")}</span>
          </motion.h1>

          <motion.p
            className="text-2xl text-brand-dark/80 font-inter font-light mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {t("heroSubtitle")}
          </motion.p>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-brand-accent to-orange-400 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          />
        </motion.div>
      </div>

      <motion.button
        onClick={onScrollNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-brand-accent/20 hover:bg-brand-accent/40 rounded-full p-4 backdrop-blur-sm transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronDown size={32} className="text-brand-accent" />
      </motion.button>
    </div>
  );
};

export default DepthHeroSection;
