
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface ScrollDepthLayoutProps {
  children: ReactNode[];
}

const ScrollDepthLayout: React.FC<ScrollDepthLayoutProps> = ({ children }) => {
  return (
    <div className="relative">
      {children.map((section, index) => (
        <div
          key={index}
          className="w-full flex items-center justify-center relative overflow-hidden"
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
