"use client";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundRain: React.FC = () => {
  return (
    <div style={{ 
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100vw", 
      height: "100vh", 
      zIndex: -1, 
      backgroundColor: "white",
      pointerEvents: "none",
    }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {[10, 30, 50, 70, 90].map((x, i) => (
          <motion.line
            key={i}
            x1={x}
            y1={110}
            x2={x}
            y2={90}
            stroke="#333333"
            strokeWidth={4}
            strokeLinecap="round"
            initial={{ y: 110 }}
            animate={{ y: -10 }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              duration: 2,
              delay: i * 0.5,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

BackgroundRain.displayName = "BackgroundRain";
