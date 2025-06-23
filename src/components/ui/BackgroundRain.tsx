"use client";
import React from "react";
import { motion } from "framer-motion";

const NUM_BEANS = 30;

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const BackgroundRain: React.FC<{ className?: string }> = ({ className }) => {
  const beans = Array.from({ length: NUM_BEANS }).map((_, i) => {
    const x = randomRange(0, 100); // % horizontal position
    const delay = randomRange(0, 5); // animation delay in seconds
    const duration = randomRange(1.5, 3); // animation duration in seconds
    const length = randomRange(8, 15); // length of each bean

    return (
      <motion.line
        key={i}
        x1={`${x}%`}
        y1={-length}
        x2={`${x}%`}
        y2={0}
        stroke="#888888"
        strokeWidth={1}
        strokeLinecap="round"
        initial={{ y: -length }}
        animate={{ y: 120 }} // anima do topo até abaixo do container (em px)
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
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      viewBox="0 0 100 120"
      preserveAspectRatio="none"
    >
      {beans}
    </svg>
  );
};

BackgroundRain.displayName = "BackgroundRain";
