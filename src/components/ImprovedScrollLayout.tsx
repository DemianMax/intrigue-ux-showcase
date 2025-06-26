import React, { ReactNode, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ImprovedScrollLayoutProps {
  children: ReactNode[];
}

const ImprovedScrollLayout: React.FC<ImprovedScrollLayoutProps> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Aumenta a área de cada seção para dar mais tempo de visualização
      const sectionHeight = windowHeight * 1.2; // 20% mais altura por seção
      const sectionIndex = Math.floor(scrollY / sectionHeight);
      
      if (sectionIndex !== currentSection && sectionIndex < children.length) {
        setCurrentSection(sectionIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentSection, children.length]);

  const scrollToSection = (index: number) => {
    const windowHeight = window.innerHeight;
    const sectionHeight = windowHeight * 1.2;
    window.scrollTo({
      top: index * sectionHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Indicador de progresso lateral */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index 
                ? 'bg-brand-accent scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Ir para seção ${index + 1}`}
          />
        ))}
      </div>

      {children.map((section, index) => {
        // Transições mais suaves com maior área de visibilidade
        const sectionStart = index / children.length;
        const sectionEnd = (index + 1) / children.length;
        const sectionMid = (sectionStart + sectionEnd) / 2;
        
        // Área expandida para cada seção (mais tempo visível)
        const visibilityStart = Math.max(0, sectionStart - 0.1);
        const visibilityEnd = Math.min(1, sectionEnd + 0.1);
        
        const opacity = useTransform(scrollYProgress, [
          visibilityStart,
          sectionStart + 0.05,
          sectionEnd - 0.05,
          visibilityEnd
        ], [0, 1, 1, 0]);

        const scale = useTransform(scrollYProgress, [
          sectionStart - 0.05,
          sectionMid,
          sectionEnd + 0.05
        ], [0.95, 1, 0.95]);

        // Parallax mais sutil
        const y = useTransform(scrollYProgress, [
          sectionStart - 0.1,
          sectionMid,
          sectionEnd + 0.1
        ], [30, 0, -30]);

        return (
          <motion.div
            key={index}
            className="w-full flex items-center justify-center relative overflow-hidden"
            style={{ 
              minHeight: "120vh", // Aumenta a altura para dar mais espaço
              height: "120vh",
              opacity,
              scale,
              y
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ 
              once: false, 
              amount: 0.3, 
              margin: "-20%" // Margem maior para ativação mais cedo
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.25, 0.1, 0.25, 1] // Easing mais suave
            }}
          >
            <motion.div
              className="w-full h-full flex items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut",
                delay: 0.1
              }}
            >
              {section}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ImprovedScrollLayout;