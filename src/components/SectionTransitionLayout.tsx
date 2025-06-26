import React, { ReactNode, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface SectionTransitionLayoutProps {
  children: ReactNode[];
}

const SectionTransitionLayout: React.FC<SectionTransitionLayoutProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState(0);
  const { scrollYProgress } = useScroll();
  
  // Spring animation para suavizar o scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const totalSections = children.length;
      const sectionIndex = Math.min(
        Math.floor(latest * totalSections),
        totalSections - 1
      );
      
      if (sectionIndex !== activeSection) {
        setActiveSection(sectionIndex);
      }
    });

    return unsubscribe;
  }, [smoothProgress, activeSection, children.length]);

  const navigateToSection = (index: number) => {
    const targetScroll = (index / children.length) * document.body.scrollHeight;
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Navegação por pontos */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
        {children.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => navigateToSection(index)}
            className={`relative w-4 h-4 rounded-full transition-all duration-500 ${
              activeSection === index 
                ? 'bg-brand-accent shadow-lg' 
                : 'bg-white/50 hover:bg-white/70 border border-gray-300'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Navegar para seção ${index + 1}`}
          >
            {activeSection === index && (
              <motion.div
                className="absolute inset-0 rounded-full bg-brand-accent"
                layoutId="activeSection"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Barra de progresso no topo */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-accent z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Container das seções */}
      <div className="relative">
        {children.map((section, index) => {
          const isActive = activeSection === index;
          const isPrev = activeSection > index;
          const isNext = activeSection < index;

          return (
            <motion.section
              key={index}
              className="relative w-full flex items-center justify-center"
              style={{ 
                minHeight: "100vh",
                height: "100vh"
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: isActive ? 1 : 0.3,
                y: isActive ? 0 : isPrev ? -50 : 50,
                scale: isActive ? 1 : 0.95,
                filter: isActive ? "blur(0px)" : "blur(2px)"
              }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                opacity: { duration: 0.6 },
                y: { duration: 0.8 },
                scale: { duration: 0.8 },
                filter: { duration: 0.6 }
              }}
            >
              <motion.div
                className="w-full h-full"
                animate={{
                  scale: isActive ? 1 : 0.9,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut"
                }}
              >
                {section}
              </motion.div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
};

export default SectionTransitionLayout;