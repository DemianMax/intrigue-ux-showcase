
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface ScrollDepthLayoutProps {
  children: ReactNode[];
}

const ScrollDepthLayout: React.FC<ScrollDepthLayoutProps> = ({ children }) => {
  return (
    <div className="relative">
      {children.map((section, index) => (
        <motion.div
          key={index}
          className="w-full flex items-center justify-center relative overflow-hidden"
          style={{ 
            minHeight: "100vh",
            height: "100vh"
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: 0.6, 
            ease: "easeOut"
          }}
        >
          {section}
        </motion.div>
      ))}
    </div>
  );
};

export default ScrollDepthLayout;
