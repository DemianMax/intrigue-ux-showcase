
import React, { ReactNode, useEffect, useState } from "react";

interface ScrollDepthLayoutProps {
  children: ReactNode[];
}

const ScrollDepthLayout: React.FC<ScrollDepthLayoutProps> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState(0);

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
      {children.map((section, index) => (
        <div
          key={index}
          className="w-full flex items-center justify-center relative"
          style={{ 
            minHeight: "100vh",
            height: "100vh"
          }}
        >
          {section}
        </div>
      ))}
    </div>
  );
};

export default ScrollDepthLayout;
