import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ScrollTransitionWrapperProps {
  onScrollNext: () => void;
}

const ScrollTransitionWrapper: React.FC<ScrollTransitionWrapperProps> = ({ onScrollNext }) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  if (!t) return null;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Hero text animations
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);

  // User image animations
  const imageOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const imageX = useTransform(scrollYProgress, [0.2, 0.6], [100, 0]);
  const imageScale = useTransform(scrollYProgress, [0.2, 0.6], [0.8, 1]);

  // About text animations
  const aboutY = useTransform(scrollYProgress, [0.3, 0.8], [200, 0]);
  const aboutOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);

  // Scroll button animation
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      {/* Hero Section */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden px-6 bg-[hsl(var(--hero-bg))]">
        
        {/* Hero Content */}
        <motion.div 
          className="relative z-10 max-w-5xl mx-auto text-center"
          style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}
        >
          <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-brand-dark dark:text-white leading-tight">
            <span className="text-brand-accent block mb-4 text-5xl md:text-7xl lg:text-8xl">UX</span>
            <span className="block">{t("heroTitlePart")}</span>
          </motion.h1>

          <motion.p className="text-lg md:text-xl text-brand-dark/80 dark:text-gray-300 font-inter font-light max-w-3xl mx-auto leading-relaxed mt-8">
            {t("heroSubtitle")}
          </motion.p>
        </motion.div>

        {/* User Image - appears during scroll */}
        <motion.div 
          className="absolute right-8 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 z-20"
          style={{ 
            opacity: imageOpacity, 
            x: imageX, 
            scale: imageScale 
          }}
        >
          <div className="relative w-64 md:w-80 lg:w-96">
            <img
              alt="Max Demian - UX Designer"
              src="/lovable-uploads/b5362a7a-ef6f-46c7-ac27-99fa2fcde1f1.jpg"
              className="w-full h-80 md:h-96 lg:h-[400px] rounded-2xl shadow-2xl object-cover border-2 border-border"
            />
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-accent/20 to-orange-400/20 rounded-2xl blur-xl -z-10" />
          </div>
        </motion.div>

        {/* About Content - appears during scroll */}
        <motion.div 
          className="absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 max-w-lg z-20"
          style={{ 
            y: aboutY, 
            opacity: aboutOpacity 
          }}
        >
          <motion.h3 className="font-playfair text-2xl md:text-3xl lg:text-4xl text-foreground font-bold mb-6">
            {t("aboutGreeting")}
          </motion.h3>

          <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              {t("aboutParagraph1")}
              <span className="font-bold text-brand-accent">
                {t("aboutParagraph1Highlight")}
              </span>
              {t("aboutParagraph1Cont")}
            </p>
            <p>
              {t("aboutParagraph2")}
              <span className="text-brand-accent font-medium">
                {t("aboutParagraph2Highlight")}
              </span>
              {t("aboutParagraph2Cont")}
            </p>
          </div>
        </motion.div>

        {/* Scroll Button */}
        <motion.button 
          onClick={onScrollNext}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-brand-accent/20 hover:bg-brand-accent/40 rounded-full p-4 backdrop-blur-sm transition-all duration-300 shadow-lg z-30"
          style={{ opacity: buttonOpacity }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronDown size={24} className="text-brand-accent" />
        </motion.button>
      </div>
    </div>
  );
};

export default ScrollTransitionWrapper;