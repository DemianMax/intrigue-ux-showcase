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
  // Ajustei a velocidade para um movimento perceptível mas suave
  const y = useTransform(scrollYProgress, [0, 1], [0, -window.innerHeight * speed * 1.5]); // Reduzido o multiplicador para mais suavidade

  return (
    <motion.div
      // Mantendo o blur, mas as cores e opacidades serão ajustadas
      className={`absolute rounded-full ${size} ${color} filter blur-3xl`} 
      style={{ y }}
      initial={{ opacity: 0, scale: 0.2 }} // Escala inicial menor para elipses menores
      animate={{ opacity: 0.15, scale: 0.8 }} // Opacidade final mais sutil para fundo branco
      transition={{ duration: 2, delay }} // Duração maior para suavidade
    ></motion.div>
  );
};

const ParallaxEllipses: React.FC = () => {
  // Ajustando para cores SUAVES e com MUITA POUCA OPACIDADE para o fundo branco
  // e tamanhos menores, mais espalhados.
  const ellipses = [
    // Elipses menores e mais sutis
    { delay: 0.1, size: 'w-20 h-20', color: 'bg-indigo-300 bg-opacity-15', position: 'top-[85%] left-[5%]', speed: 0.1 },
    { delay: 0.3, size: 'w-24 h-24', color: 'bg-purple-300 bg-opacity-10', position: 'top-[10%] right-[15%]', speed: 0.2 },
    { delay: 0.5, size: 'w-16 h-16', color: 'bg-pink-300 bg-opacity-20', position: 'top-[60%] left-[25%]', speed: 0.15 },
    { delay: 0.7, size: 'w-28 h-28', color: 'bg-cyan-300 bg-opacity-12', position: 'top-[30%] left-[70%]', speed: 0.25 },
    { delay: 0.9, size: 'w-22 h-22', color: 'bg-green-300 bg-opacity-18', position: 'top-[75%] right-[20%]', speed: 0.1 },
    { delay: 1.1, size: 'w-18 h-18', color: 'bg-yellow-300 bg-opacity-10', position: 'top-[5%] left-[40%]', speed: 0.3 },
    { delay: 1.3, size: 'w-26 h-26', color: 'bg-red-300 bg-opacity-15', position: 'top-[45%] right-[5%]', speed: 0.18 },
    { delay: 1.5, size: 'w-14 h-14', color: 'bg-orange-300 bg-opacity-10', position: 'top-[20%] left-[10%]', speed: 0.22 },
    { delay: 1.7, size: 'w-30 h-30', color: 'bg-teal-300 bg-opacity-12', position: 'top-[90%] right-[40%]', speed: 0.13 },
    { delay: 1.9, size: 'w-12 h-12', color: 'bg-fuchsia-300 bg-opacity-18', position: 'top-[50%] left-[80%]', speed: 0.28 },
  ];

  return (
    // z-0 é crucial para as elipses ficarem no fundo
    <div className="absolute inset-0 z-0 pointer-events-none">
      {ellipses.map((ellipse, index) => (
        <Ellipse key={index} {...ellipse} />
      ))}
    </div>
  );
};

export default ParallaxEllipses;
