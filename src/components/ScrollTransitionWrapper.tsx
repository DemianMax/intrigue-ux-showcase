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
  
  // All hooks must be called before any conditional returns
  const {
    scrollYProgress
  } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Hero text animations - apenas sobe
  // Ajustado o ponto final para 0.4 para liberar a tela mais cedo para o About.
  const heroY = useTransform(scrollYProgress, [0, 0.4], [150, -500]); // 150 para começar mais baixo, -500 para subir.

  // About text animations - entra em cena, estabiliza e depois sai
  // AJUSTES AQUI para garantir que o texto do About apareça e se mantenha visível por mais tempo
  // Input Range: Começa a aparecer mais cedo (0.2), se estabiliza de 0.4 a 0.8, e sai de 0.8 a 1.
  const aboutY = useTransform(scrollYProgress, [0.2, 0.4, 0.8, 1], [600, 0, 0, -600]); 
  
  // Opacidade do About - AJUSTES AQUI para garantir visibilidade
  // Input Range: Começa o fade-in em 0.15, atinge opacidade total em 0.3, fica opaco até 0.75, fade-out em 0.9.
  const aboutOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.75, 0.9], [0, 1, 1, 0]);

  // Scroll button animation
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  if (!t || isLoading) return null;

  return (
    // Reduzido para 200vh para um scroll mais ágil. Ajuste entre 150vh e 250vh conforme a sua preferência.
    <div ref={containerRef} className="relative min-h-[200vh]"> 
      {/* Main Container with Background Image */}
      <div 
        className="sticky top-0 w-full h-screen flex items-center overflow-hidden px-6 md:px-12 lg:px-16 bg-[hsl(var(--hero-bg))]"
        style={{
          backgroundImage: sobreData?.imagem_perfil ? `url(${sobreData.imagem_perfil})` : undefined,
          backgroundSize: 'cover', // Garante que a imagem cubra toda a área
          backgroundPosition: 'center', // Centraliza a imagem
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        {/* Reduzida a opacidade para 30% em light mode e 50% em dark mode para a imagem de fundo ficar mais visível */}
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />

        {/* Text Content - Full Width */}
        {/* max-w-4xl mx-auto garante que o texto não fique gigante e esteja centralizado */}
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
          {/* Adicionado mt-16 para dar um espaçamento entre hero e about no inicio */}
          <motion.div className="relative z-20 mt-16" style={{ 
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
