"use client";
import React from "react";
import { motion } from "framer-motion";

const NUM_BEANS = 30;

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const BackgroundRain: React.FC<{ className?: string }> = ({ className }) => {
  const beans = Array.from({ length: NUM_BEANS }).map((_, i) => {
    const xStart = randomRange(0, 100); // posição horizontal inicial (%)
    const delay = randomRange(0, 5); // delay da animação
    const duration = randomRange(1.5, 3); // duração da animação
    const length = randomRange(4, 8); // comprimento da linha (px)
    const xOffset = randomRange(-5, 5); // deslocamento horizontal total na animação (%)

    return (
      <motion.line
        key={i}
        x1={`${xStart}%`}
        y1={120 + length}
        x2={`${xStart}%`}
        y2={120}
        stroke="#888888"
        strokeWidth={0.5}
        strokeLinecap="round"
        filter="url(#blur)"
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
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      viewBox="0 0 100 120"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>
      {beans}
    </svg>
  );
};

BackgroundRain.displayName = "BackgroundRain";
