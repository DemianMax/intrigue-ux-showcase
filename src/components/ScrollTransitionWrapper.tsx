import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBreakpoint } from "@/hooks/useBreakpoint";

interface ScrollTransitionWrapperProps {
  onScrollNext: () => void;
}

const ScrollTransitionWrapper: React.FC<ScrollTransitionWrapperProps> = ({ onScrollNext }) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoint = useBreakpoint();

  if (!t) return null;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const alignProgress =
    breakpoint === "xs" ? 0.34 :
    breakpoint === "md" ? 0.34 :
    breakpoint === "lg" || breakpoint === "xl" || breakpoint === "2xl" ? 0.6 :
    0.6;

  const aboutYValues =
    breakpoint === "xs"
      ? [90, -390, -700]
      : breakpoint === "md"
      ? [600, -50, -100]
      : breakpoint === "lg" || breakpoint === "xl" || breakpoint === "2xl"
      ? [500, -140, -200]
      : [500, -160, -200];

  const aboutY = useTransform(
    scrollYProgress,
    [0, alignProgress, 1],
    [aboutYValues[0], aboutYValues[1], aboutYValues[2]]
  );

  const aboutImageY = useTransform(
    scrollYProgress,
    [0, alignProgress, 1],
    [0, 0, aboutYValues[2]]
  );

  const heroYValues =
    breakpoint === "xs"
      ? [-10, -700]
      : breakpoint === "md"
      ? [280, -1100]
      : breakpoint === "lg" || breakpoint === "xl" || breakpoint === "2xl"
      ? [200, -500]
      : [100, -500];

  const heroY = useTransform(scrollYProgress, [0, 0.2], heroYValues);
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-[300vh]">
      <div className="sticky top-0 w-full h-screen flex justify-center items-center bg-[hsl(var(--hero-bg))] pt-64 md:pt-0">
        <div className="w-full max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-center justify-center overflow-hidden">

          {/* Left Side - Text Content */}
          <div className="flex-1 w-full md:pr-16 order-2 md:order-1 flex flex-col items-center md:items-end text-center md:text-right pt-12 md:pt-0">
            
      {/* Hero Content */}
      <motion.div className="relative z-10 w-full" style={{ y: heroY }}>
      <motion.h1 className=" font-playfair font-bold text-brand-dark dark:text-white leading-tight text-3xl xs:text-4xl lg:text-5xl xl:text-6xl w-full max-w-lg md:max-w-xl lg:max-w-2xl mx-auto md:mx-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="text-brand-accent text-5xl xs:text-5xl lg:text-6xl xl:text-7xl mb-2 max-w-xs xs:max-w-sm lg:max-w-md mx-auto">
          {t("heroAccentTextLine1")}
          <br />
          {t("heroAccentTextLine2")}
        </span>
        <span className="block mt-4 mb-4 w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto md:mx-0 text-center md:text-right text-2xl xs:text-3xl lg:text-3xl">
          {t("heroTitlePartLine1")}
          <br />
          {t("heroTitlePartLine2")}
        </span>
      </motion.h1>
      <motion.p
        className="text-base xs:text-lg md:text-xl text-brand-dark/80 dark:text-gray-300 font-inter font-light leading-relaxed max-w-full xs:max-w-xl mx-auto md:mx-0 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {t("heroSubtitleLine1")}
        <br />
        {t("heroSubtitleLine2")}
      </motion.p>
    </motion.div>

            
            {/* About Content */}
            <motion.div className="relative z-20 mt-16 md:mt-0" style={{ y: aboutY }}>
              <motion.h3
                className="font-playfair text-2xl xs:text-3xl lg:text-4xl text-foreground font-bold mb-6 xs:mb-8 text-center md:text-right"
              >
                {t("aboutGreeting")}
              </motion.h3>
              <div className="space-y-4 text-base xs:text-lg text-muted-foreground leading-relaxed max-w-full xs:max-w-xl mx-auto md:mx-0">
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

              {/* Botão para seção Sobre */}
             <div className="flex flex-col gap-4 lg:flex-row md:gap-4 mt-8  md:justify-end">
                <motion.a
                  href="https://maxdemian.vercel.app/curriculo"
                  target="_self"
                  rel="noopener noreferrer"
             className="flex-2 inline-flex items-center justify-end gap-3 px-6 py-3 bg-gradient-to-r from-brand-accent to-orange-400 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  whileHover={{ y: -2 }}
                >
                  {t("aboutButton")}
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="/playground"
                  target="_self"
                  rel="noopener noreferrer"
                className="flex-2 inline-flex items-center justify-end gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-400 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  whileHover={{ y: -2 }}
                >
                  {t("aboutBtnPlayground")}
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </div>



            </motion.div>
          </div>

          {/* Right Side - User Image (responsiva, 3 formatos) */}
          <div className="order-1 md:order-2 flex justify-center items-center w-full md:w-auto mt-52 md:mt-0">
            <motion.div
              className="
                relative
                w-60 h-78
                xs:w-72 xs:h-120
                md:w-80 md:h-240
                lg:w-80 lg:h-200
                xl:w-96 xl:h-120
                mt-40 md:mt-0   /* margem maior no topo só no mobile */
              "
              style={{ y: aboutImageY }}
              initial={{ opacity: 0, x: 0, scale: 1.1 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <img
                alt="Max Demian - UX Designer"
                src="https://ybggbbekoxgkeyvkiech.supabase.co/storage/v1/object/public/imgproj//IMG_20250720_171646-EDIT.jpg"
                className="w-full h-full rounded-2xl shadow-1xl object-cover border-1 border-border"
              />
              <div className="absolute -inset-4  from-brand-accent/20 to-orange-400/20 rounded-2xl blur-xl -z-10" />
            </motion.div>
          </div>

          {/* Scroll Button */}
          <motion.button
            onClick={onScrollNext}
            className="absolute bottom-6 xs:bottom-12 left-1/2 -translate-x-1/2 bg-brand-accent/20 hover:bg-brand-accent/40 rounded-full p-3 xs:p-4 backdrop-blur-xs transition-all duration-300 shadow-lg z-30"
            style={{ opacity: buttonOpacity }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label={t("ariaScrollDown")}
          >
            <ChevronDown size={24} className="text-brand-accent" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ScrollTransitionWrapper;
