import React, { ReactNode, useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface SmoothScrollLayoutProps {
  children: ReactNode[];
}

const SmoothScrollLayout: React.FC<SmoothScrollLayoutProps> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Spring para suavizar as transições
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const sectionIndex = Math.min(
        Math.floor(latest * children.length),
        children.length - 1
      );
      
      if (sectionIndex !== currentSection) {
        setCurrentSection(sectionIndex);
      }
    });

    return unsubscribe;
  }, [smoothProgress, currentSection, children.length]);

  const scrollToSection = (index: number) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Indicadores de navegação */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:block">
        <div className="flex flex-col gap-3">
          {children.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => scrollToSection(index)}
              className={`w-3 h-8 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-brand-accent' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Ir para seção ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Seções com scroll suave */}
      {children.map((section, index) => {
        // Cálculo mais preciso para visibilidade
        const sectionStart = index / children.length;
        const sectionEnd = (index + 1) / children.length;
        
        // Área de visibilidade expandida
        const fadeInStart = Math.max(0, sectionStart - 0.15);
        const fadeInEnd = sectionStart + 0.1;
        const fadeOutStart = sectionEnd - 0.1;
        const fadeOutEnd = Math.min(1, sectionEnd + 0.15);

        const opacity = useTransform(smoothProgress, [
          fadeInStart,
          fadeInEnd,
          fadeOutStart,
          fadeOutEnd
        ], [0, 1, 1, 0]);

        const scale = useTransform(smoothProgress, [
          sectionStart - 0.1,
          (sectionStart + sectionEnd) / 2,
          sectionEnd + 0.1
        ], [0.9, 1, 0.9]);

        // Parallax muito sutil
        const y = useTransform(smoothProgress, [
          sectionStart - 0.05,
          (sectionStart + sectionEnd) / 2,
          sectionEnd + 0.05
        ], [20, 0, -20]);

        return (
          <motion.div
            key={index}
            id={`section-${index}`}
            className="w-full flex items-center justify-center relative"
            style={{ 
              minHeight: "100vh",
              height: "100vh",
              opacity,
              scale,
              y
            }}
          >
            <motion.div
              className="w-full h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ 
                once: false, 
                amount: 0.3,
                margin: "-10%"
              }}
              transition={{ 
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1]
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

export default SmoothScrollLayout;