
import React, { ReactNode, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollDepthLayoutProps {
  children: ReactNode[];
}

const ScrollDepthLayout: React.FC<ScrollDepthLayoutProps> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionIndex = Math.floor(scrollY / windowHeight);
      
      if (sectionIndex !== currentSection && sectionIndex < children.length) {
        setCurrentSection(sectionIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentSection, children.length]);

  const scrollToSection = (index: number) => {
    window.scrollTo({
      top: index * window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {children.map((section, index) => {
        // Criar transformações parallax para cada seção
        const yRange = [index * window.innerHeight, (index + 1) * window.innerHeight];
        const y = useTransform(scrollYProgress, 
          [index / children.length, (index + 1) / children.length], 
          [100, -100]
        );
        
        const opacity = useTransform(scrollYProgress,
          [(index - 0.2) / children.length, index / children.length, (index + 0.8) / children.length],
          [0, 1, 0.3]
        );

        const scale = useTransform(scrollYProgress,
          [(index - 0.1) / children.length, index / children.length, (index + 0.5) / children.length],
          [0.8, 1, 0.95]
        );

        return (
          <motion.div
            key={index}
            className="w-full flex items-center justify-center relative overflow-hidden"
            style={{ 
              minHeight: "100vh",
              height: "100vh",
              y: index === currentSection ? 0 : y,
              opacity,
              scale
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: index * 0.1 
            }}
          >
            <motion.div
              className="w-full h-full"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ 
                duration: 1,
                ease: "easeOut",
                delay: 0.2
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

export default ScrollDepthLayout;
