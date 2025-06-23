"use client";
import React from "react";
import { motion } from "framer-motion";
import { useWindowSize } from "@/hooks/useWindowSize";

export const BackgroundRain: React.FC = () => {
  const { width, height } = useWindowSize();

  const lines = Array.from({ length: 50 }).map((_, i) => ({
    x: Math.random() * width,
    delay: Math.random() * 2,
  }));

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
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
      >
        {lines.map((line, i) => (
          <motion.line
            key={i}
            x1={line.x}
            y1={height + 100}
            x2={line.x}
            y2={height + 50}
            stroke="#999999"
            strokeWidth={2}
            strokeLinecap="round"
            initial={{ y: 0 }}
            animate={{ y: -height - 100 }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              duration: 4,
              delay: line.delay,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

BackgroundRain.displayName = "BackgroundRain";
