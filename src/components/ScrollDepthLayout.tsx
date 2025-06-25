
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollDepthLayoutProps {
  children: React.ReactNode[];
}

const ScrollDepthLayout: React.FC<ScrollDepthLayoutProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress to section transitions
  const sectionProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, children.length - 1]
  );

  useEffect(() => {
    const unsubscribe = sectionProgress.onChange((latest) => {
      setCurrentSection(Math.round(latest));
    });
    return unsubscribe;
  }, [sectionProgress]);

  return (
    <div ref={containerRef} className="relative" style={{ height: `${children.length * 100}vh` }}>
      {children.map((child, index) => {
        const sectionStart = index / children.length;
        const sectionEnd = (index + 1) / children.length;
        
        const opacity = useTransform(
          scrollYProgress,
          [sectionStart - 0.1, sectionStart, sectionEnd, sectionEnd + 0.1],
          [0, 1, 1, 0]
        );

        const scale = useTransform(
          scrollYProgress,
          [sectionStart - 0.1, sectionStart, sectionEnd, sectionEnd + 0.1],
          [0.8, 1, 1, 1.1]
        );

        const z = useTransform(
          scrollYProgress,
          [sectionStart - 0.1, sectionStart, sectionEnd, sectionEnd + 0.1],
          [-200, 0, 0, 200]
        );

        return (
          <motion.div
            key={index}
            style={{
              opacity,
              scale,
              z,
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            className="w-full bg-gradient-to-br from-white via-gray-50 to-gray-100"
          >
            <motion.div
              initial={{ rotateX: 15, rotateY: 5 }}
              animate={{ 
                rotateX: currentSection === index ? 0 : 15,
                rotateY: currentSection === index ? 0 : 5 
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ perspective: "1200px" }}
              className="w-full h-full flex items-center justify-center"
            >
              {child}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ScrollDepthLayout;
