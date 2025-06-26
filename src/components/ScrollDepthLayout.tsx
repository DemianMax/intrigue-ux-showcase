
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
        // Transformações parallax mais suaves e controladas
        const sectionProgress = [
          (index - 0.5) / children.length,
          index / children.length,
          (index + 0.5) / children.length
        ];
        
        const y = useTransform(scrollYProgress, sectionProgress, [50, 0, -50]);
        
        const opacity = useTransform(scrollYProgress, [
          (index - 0.3) / children.length,
          (index - 0.1) / children.length,
          (index + 0.1) / children.length,
          (index + 0.3) / children.length
        ], [0, 1, 1, 0]);

        const scale = useTransform(scrollYProgress, [
          (index - 0.2) / children.length,
          index / children.length,
          (index + 0.2) / children.length
        ], [0.95, 1, 0.95]);

        return (
          <motion.div
            key={index}
            className="w-full flex items-center justify-center relative overflow-hidden"
            style={{ 
              minHeight: "100vh",
              height: "100vh",
              y,
              opacity,
              scale
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4, margin: "-10%" }}
            transition={{ 
              duration: 0.4, 
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            <motion.div
              className="w-full h-full"
              initial={{ scale: 0.98, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut"
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
