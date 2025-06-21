// src/components/ParallaxEllipses.tsx

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface EllipseProps {
  delay: number;
  size: string; // Tailwind class like 'w-20 h-20'
  color: string; // Tailwind class like 'bg-blue-500' or 'bg-opacity-50'
  position: string; // Tailwind classes for absolute positioning: 'top-10 left-20'
  speed: number; // Multiplier for parallax effect (e.g., 0.2, 0.5)
}

const Ellipse: React.FC<EllipseProps> = ({ delay, size, color, position, speed }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -window.innerHeight * speed]);

  return (
    <motion.div
      className={`absolute rounded-full ${size} ${color} filter blur-3xl`}
      style={{ y }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 0.2, scale: 1 }}
      transition={{ duration: 1, delay }}
    ></motion.div>
  );
};

const ParallaxEllipses: React.FC = () => {
  const ellipses = [
    { delay: 0.1, size: 'w-40 h-40', color: 'bg-indigo-900 bg-opacity-20', position: 'top-10 left-20', speed: 0.1 },
    { delay: 0.3, size: 'w-60 h-60', color: 'bg-purple-900 bg-opacity-20', position: 'top-1/4 right-10', speed: 0.2 },
    { delay: 0.5, size: 'w-32 h-32', color: 'bg-pink-900 bg-opacity-20', position: 'bottom-20 left-1/3', speed: 0.15 },
    { delay: 0.7, size: 'w-72 h-72', color: 'bg-cyan-900 bg-opacity-20', position: 'top-1/2 left-10', speed: 0.25 },
    { delay: 0.9, size: 'w-56 h-56', color: 'bg-green-900 bg-opacity-20', position: 'bottom-10 right-1/4', speed: 0.1 },
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {ellipses.map((ellipse, index) => (
        <Ellipse key={index} {...ellipse} />
      ))}
    </div>
  );
};

export default ParallaxEllipses;
