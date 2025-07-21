import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSobre } from "@/hooks/useSobre";

interface ScrollTransitionWrapperProps {
  onScrollNext: () => void;
}

const ScrollTransitionWrapper: React.FC<ScrollTransitionWrapperProps> = ({
  onScrollNext
}) => {
  const { t } = useLanguage();
  const { data: sobreData, isLoading } = useSobre();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const {
    scrollYProgress
  } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Hero text animations - apenas sobe
  const heroY = useTransform(scrollYProgress, [0, 0.6], [150, -500]); 

  // About text animations - ENTRA MAIS ALTO E SE ESTABILIZA MAIS CIMA
  // aboutY: Começa a subir de uma posição bem mais alta (0) e atinge o centro (-50) mais cedo (0.3).
  // Isso fará com que ele apareça mais no topo da viewport.
  // [0.1, 0.3, 0.8, 1] -> Começa em 10%, chega em 30% (posição central), estabiliza até 80%, sai depois.
  const aboutY = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 1], [0, -50, -50, -600]); 
  
  // Opacidade do About - ajustada para garantir visibilidade e sincronia
  // [0.05, 0.25, 0.75, 0.9] -> Mantive estes, pois a opacidade parece estar funcionando bem.
  const aboutOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 0.9], [0, 1, 1, 0]);

  // Scroll button animation
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  if (!t || isLoading) return null;

  return (
    // Mantive min-h-[250vh]. Ajuste entre 150vh e 250vh conforme sua preferência de "velocidade de scroll".
    <div ref={containerRef} className="relative min-h-[250vh]"> 
      {/* Main Container with Background Image */}
      <div 
        className="sticky top-0 w-full h-screen flex items-center overflow-hidden px-6 md:px-12 lg:px-16 bg-[hsl(var(--hero-bg))]"
        style={{
          backgroundImage: sobreData?.imagem_perfil ? `url(${sobreData.imagem_perfil})` : undefined,
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />

        {/* Text Content - Full Width */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col justify-center h-full text-center"> 
          {/* Hero Content */}
          <motion.div className="relative z-10" style={{
            y: heroY
          }}>
            <motion.h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-brand-dark dark:text-white leading-tight mb-8">
              <span className="text-brand-accent block mb-4 text-5xl md:text-6xl lg:text-7xl xl:text-8xl">UX</span>
              <span className="block text-right text-3xl">{t("heroTitlePart")}</span>
            </motion.h1>

            <motion.p className="text-lg md:text-xl text-brand-dark/80 dark:text-gray-300 font-inter font-light leading-relaxed max-w-2xl mx-auto"> 
              {t("heroSubtitle")}
            </motion.p>
          </motion.div>

          {/* About Content - moves up during scroll */}
          {/* Removido o mt-16 para que a animação de 'y' seja a única responsável pelo posicionamento. */}
          <motion.div className="relative z-20" style={{ 
            y: aboutY,
            opacity: aboutOpacity
          }}>
            <motion.h3 className="font-playfair text-3xl lg:text-5xl text-foreground font-bold mb-8 md:text-3xl text-right">
              {sobreData?.titulo || t("aboutGreeting")}
            </motion.h3>

            <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"> 
              <p className="font-bold text-brand-accent">
                {sobreData?.destaque || t("aboutParagraph1")}
              </p>
              <p>
                {sobreData?.resumo || t("aboutParagraph2")}
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
