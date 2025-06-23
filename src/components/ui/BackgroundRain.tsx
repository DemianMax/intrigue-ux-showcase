// src/components/ui/BackgroundRain.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";

const NUM_BEANS = 60;

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const BackgroundRain: React.FC<{ className?: string }> = ({ className }) => {
  const beans = Array.from({ length: NUM_BEANS }).map((_, i) => {
    const xStart = randomRange(0, 100);
    const delay = randomRange(0, 3);
    const duration = randomRange(1, 2);
    const length = randomRange(5, 10);
    const xOffset = randomRange(-10, 10);

    return (
      <motion.line
        key={i}
        x1={`${xStart}%`}
        y1={120 + length}
        x2={`${xStart}%`}
        y2={120}
        stroke="red"
        strokeWidth={1.2}
        strokeLinecap="round"
        initial={{ y: 120 + length, x: 0 }}
        animate={{ y: -length, x: xOffset }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration,
          delay,
        }}
      />
    );
  });

  return (
    <svg
      className={className}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundColor: "rgba(0,0,0,0.05)" }}
      viewBox="0 0 100 120"
      preserveAspectRatio="none"
    >
      {beans}
    </svg>
  );
};

BackgroundRain.displayName = "BackgroundRain";
