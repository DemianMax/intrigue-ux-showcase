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
  const y = useTransform(scrollYProgress, [0, 1], [0, -window.innerHeight * speed]); // Inverted rain effect

  return (
    <motion.div
      className={`absolute rounded-full ${size} ${color} filter blur-3xl`} // Added blur for a softer, dreamy effect
      style={{ y }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 0.2, scale: 1 }}
      transition={{ duration: 1, delay }}
    ></motion.div>
  );
};

const ParallaxEllipses: React.FC = () => {
  // Define suas elipses aqui. Ajuste os valores para obter o efeito desejado.
  // Pense em tamanhos diferentes, opacidades variadas e posições para criar profundidade.
  const ellipses = [
    { delay: 0.1, size: 'w-40 h-40', color: 'bg-indigo-500 bg-opacity-30', position: 'top-[10%] left-[5%]', speed: 0.1 },
    { delay: 0.3, size: 'w-60 h-60', color: 'bg-purple-500 bg-opacity-20', position: 'top-[30%] right-[10%]', speed: 0.2 },
    { delay: 0.5, size: 'w-32 h-32', color: 'bg-pink-500 bg-opacity-40', position: 'top-[50%] left-[20%]', speed: 0.15 },
    { delay: 0.7, size: 'w-72 h-72', color: 'bg-blue-500 bg-opacity-25', position: 'top-[70%] left-[60%]', speed: 0.25 },
    { delay: 0.9, size: 'w-56 h-56', color: 'bg-green-500 bg-opacity-35', position: 'top-[20%] right-[40%]', speed: 0.1 },
    { delay: 1.1, size: 'w-48 h-48', color: 'bg-yellow-500 bg-opacity-20', position: 'top-[85%] left-[10%]', speed: 0.3 },
    { delay: 1.3, size: 'w-64 h-64', color: 'bg-red-500 bg-opacity-30', position: 'top-[40%] right-[20%]', speed: 0.18 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {ellipses.map((ellipse, index) => (
        <Ellipse key={index} {...ellipse} />
      ))}
    </div>
  );
};

export default ParallaxEllipses;
