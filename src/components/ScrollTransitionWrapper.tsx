import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ScrollTransitionWrapperProps {
  onScrollNext: () => void;
}

const ScrollTransitionWrapper: React.FC<ScrollTransitionWrapperProps> = ({
  onScrollNext
}) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  if (!t) return null;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Altura padrão alinhada com a foto (centro vertical)
  const standardHeight = 0; // Altura padrão para ambos os textos se alinharem com a foto

  // Hero text animations - alinhado com a foto
  const heroY = useTransform(scrollYProgress, [0, 0.4], [standardHeight, -300]);

  // About text animations - alinhado na mesma altura da foto
  const aboutY = useTransform(scrollYProgress, [0.3, 0.5, 0.8, 1], [400, standardHeight, standardHeight, -300]);
  const aboutOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.8, 0.9], [0, 1, 1, 0]);

  // Scroll button animation
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-[250vh]">
      {/* Main Container */}
      <div className="sticky top-0 w-full h-screen flex items-center overflow-hidden px-6 md:px-12 lg:px-16 bg-[hsl(var(--hero-bg))]">

        {/* Left Side - Text Content */}
        {/* Mantido h-full e flex-col justify-center para alinhamento vertical */}
        <div className="flex-1 pr-8 md:pr-16 flex flex-col justify-center h-full"> 
          {/* Hero Content */}
          <motion.div className="relative z-10" style={{
            y: heroY,
            // REMOVIDA A PROPRIEDADE 'scale' AQUI
          }}>
            <motion.h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-brand-dark dark:text-white leading-tight mb-8" initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.8,
                delay: 0.2
              }}>
              <span className="text-brand-accent block mb-4 text-5xl md:text-6xl lg:text-7xl xl:text-8xl">UX</span>
              <span className="block text-right text-3xl">{t("heroTitlePart")}</span>
            </motion.h1>

            <motion.p className="text-lg md:text-xl text-brand-dark/80 dark:text-gray-300 font-inter font-light leading-relaxed max-w-2xl" initial={{
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

          {/* About Content - moves up during scroll */}
          <motion.div className="relative z-20" style={{
            y: aboutY,
            opacity: aboutOpacity
          }}>
            <motion.h3 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-8 text-right">
              {t("aboutGreeting")}
            </motion.h3>

            <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
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

            <motion.a href="https://maxdemian.vercel.app/curriculo" target="_self" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-accent to-orange-400 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 mt-8" whileHover={{
                y: -2
              }}>
              {t("aboutButton")}
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>

        {/* Right Side - User Image (Fixed Position) */}
        <div className="flex-1 flex justify-center items-center">
          <motion.div className="relative w-64 sm:w-72 md:w-80 lg:w-[400px] xl:w-[450px]" initial={{
            opacity: 0,
            x: 50,
            scale: 0.9
          }} animate={{
            opacity: 1,
            x: 0,
            scale: 1
          }} transition={{
            duration: 0.8,
            delay: 0.6
          }}>
            <img alt="Max Demian - UX Designer" src="/lovable-uploads/b5362a7a-ef6f-46c7-ac27-99fa2fcde1f1.jpg" className="w-full h-80 sm:h-96 md:h-[400px] lg:h-[450px] xl:h-[500px] rounded-2xl shadow-2xl object-cover border-2 border-border" />
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-accent/20 to-orange-400/20 rounded-2xl blur-xl -z-10" />
          </motion.div>
        </div>

        {/* Scroll Button */}
        <motion.button onClick={onScrollNext} className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-brand-accent/20 hover:bg-brand-accent/40 rounded-full p-4 backdrop-blur-sm transition-all duration-300 shadow-lg z-30" style={{
          opacity: buttonOpacity
        }} initial={{
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
      </div>
    </div>
  );
};

export default ScrollTransitionWrapper;
