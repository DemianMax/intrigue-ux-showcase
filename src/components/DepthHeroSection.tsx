import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
interface DepthHeroSectionProps {
  onScrollNext: () => void;
}
const DepthHeroSection: React.FC<DepthHeroSectionProps> = ({
  onScrollNext
}) => {
  const {
    t
  } = useLanguage();
  if (!t) return null;
  return <div className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden px-6">

      <div className="relative z-10 max-w-5xl mx-auto text-center py-20">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="space-y-8">
          <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-brand-dark dark:text-white leading-tight" initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }}>
            <span className="text-brand-accent block mb-4 text-5xl md:text-7xl lg:text-8xl">UX</span>
            <span className="block">{t("heroTitlePart")}</span>
          </motion.h1>

          <motion.p className="text-lg md:text-xl text-brand-dark/80 dark:text-gray-300 font-inter font-light max-w-3xl mx-auto leading-relaxed" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }}>
            {t("heroSubtitle")}
          </motion.p>

          
        </motion.div>
      </div>

      <motion.button onClick={onScrollNext} className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-brand-accent/20 hover:bg-brand-accent/40 rounded-full p-4 backdrop-blur-sm transition-all duration-300 shadow-lg" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6,
      delay: 0.8
    }} whileHover={{
      scale: 1.05,
      y: -2
    }} whileTap={{
      scale: 0.95
    }}>
        <ChevronDown size={24} className="text-brand-accent" />
      </motion.button>
    </div>;
};
export default DepthHeroSection;