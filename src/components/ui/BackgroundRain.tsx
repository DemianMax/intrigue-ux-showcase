"use client";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundRain: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundColor: "white" }}
      viewBox="0 0 100 120"
      preserveAspectRatio="none"
    >
      {[10, 30, 50, 70, 90].map((x, i) => (
        <motion.line
          key={i}
          x1={x}
          y1={130}
          x2={x}
          y2={110}
          stroke="#555555"
          strokeWidth={2}
          strokeLinecap="round"
          initial={{ y: 130 }}
          animate={{ y: -10 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: 1 + i * 0.2,
            delay: i * 0.3,
          }}
        />
      ))}
    </svg>
  );
};

BackgroundRain.displayName = "BackgroundRain";
