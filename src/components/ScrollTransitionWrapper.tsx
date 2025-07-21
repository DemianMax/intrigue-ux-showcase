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
  const { data: sobre, isLoading } = useSobre();
  const containerRef = useRef<HTMLDivElement>(null);
  
  if (!t || isLoading) return null;
  const {
    scrollYProgress
  } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Altura padrão alinhada com o centro da foto (mantido como referência)
  const centerHeight = 0;

  // Hero text animations - centralizado verticalmente com a imagem
  // AJUSTE AQUI: Aumentamos o valor inicial (primeiro 0) para descer o texto do Hero.
  // Exemplo: se 50 for pouco, tente 100, 150, etc.
  const heroY = useTransform(scrollYProgress, [0, 1], [150, -500]); // Deixei 50 como exemplo, teste o melhor valor.

  // About text animations - alinhado no centro e sobe mais no final
  // AJUSTE AQUI: Aumentamos o valor negativo para o texto subir MAIS e atingir o topo da foto.
  const aboutY = useTransform(scrollYProgress, [0.3, 0.5, 0.8, 1], [600, -50, -50, -600]); // Ajustei de 0 para -50 no meio, você pode refinar com -60, -70, etc.
  const aboutOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.8, 0.9], [0, 1, 1, 0]);

  // Scroll button animation
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  return <div ref={containerRef} className="relative min-h-[250vh]">
       {/* Main Container with Background Image */}
       <div 
         className="sticky top-0 w-full h-screen flex items-center overflow-hidden px-6 md:px-12 lg:px-16 bg-cover bg-center bg-no-repeat relative"
         style={{
           backgroundImage: sobre?.imagem_perfil ? `url(${sobre.imagem_perfil})` : undefined
         }}
       >
         {/* Background overlay */}
         <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
         
         {/* Text Content */}
         <div className="relative z-10 flex flex-col justify-center h-full max-w-4xl">
           {/* Hero Content */}
           <motion.div className="relative z-10" style={{
            y: heroY
             // REMOVIDA A PROPRIEDADE 'scale' AQUI
           }}>
             <motion.h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white leading-tight mb-8" initial={{
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

             <motion.p className="text-lg md:text-xl text-white/90 font-inter font-light leading-relaxed max-w-2xl" initial={{
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
              <motion.h3 className="font-playfair text-3xl lg:text-5xl text-white font-bold mb-8 md:text-3xl text-right">
                {t("aboutGreeting")}
              </motion.h3>

              <div className="space-y-6 text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
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
     </div>;
};
export default ScrollTransitionWrapper;
