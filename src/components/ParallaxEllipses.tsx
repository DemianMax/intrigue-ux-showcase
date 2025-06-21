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
  // Multiplicador de velocidade para um movimento bem perceptível
  const y = useTransform(scrollYProgress, [0, 1], [0, -window.innerHeight * speed * 5]); // Aumentei para '5'

  return (
    <motion.div
      // >>> REMOVIDO TEMPORARIAMENTE: filter blur-3xl <<<
      // >>> AUMENTADO MUITO a opacidade para teste de visibilidade <<<
      className={`absolute rounded-full ${size} ${color}`} // Sem blur
      style={{ y }}
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 0.9, scale: 1 }} // Opacidade final: 90% (muito visível)
      transition={{ duration: 1, delay }} // Duração menor para aparecer mais rápido
    ></motion.div>
  );
};

const ParallaxEllipses: React.FC = () => {
  // Ajustando para cores PADRÃO do Tailwind e opacidades MUITO ALTAS para garantir visibilidade
  const ellipses = [
    { delay: 0.1, size: 'w-20 h-20', color: 'bg-blue-500', position: 'top-[85%] left-[5%]', speed: 0.1 },
    { delay: 0.3, size: 'w-24 h-24', color: 'bg-purple-500', position: 'top-[10%] right-[15%]', speed: 0.2 },
    { delay: 0.5, size: 'w-16 h-16', color: 'bg-pink-500', position: 'top-[60%] left-[25%]', speed: 0.15 },
    { delay: 0.7, size: 'w-28 h-28', color: 'bg-cyan-500', position: 'top-[30%] left-[70%]', speed: 0.25 },
    { delay: 0.9, size: 'w-22 h-22', color: 'bg-green-500', position: 'top-[75%] right-[20%]', speed: 0.1 },
    { delay: 1.1, size: 'w-18 h-18', color: 'bg-yellow-500', position: 'top-[5%] left-[40%]', speed: 0.3 },
    { delay: 1.3, size: 'w-26 h-26', color: 'bg-red-500', position: 'top-[45%] right-[5%]', speed: 0.18 },
    { delay: 1.5, size: 'w-14 h-14', color: 'bg-orange-500', position: 'top-[20%] left-[10%]', speed: 0.22 },
    { delay: 1.7, size: 'w-30 h-30', color: 'bg-teal-500', position: 'top-[90%] right-[40%]', speed: 0.13 },
    { delay: 1.9, size: 'w-12 h-12', color: 'bg-fuchsia-500', position: 'top-[50%] left-[80%]', speed: 0.28 },
  ];

  return (
    // Manter o z-0 e absolute inset-0
    <div className="absolute inset-0 z-0 pointer-events-none">
      {ellipses.map((ellipse, index) => (
        <Ellipse key={index} {...ellipse} />
      ))}
    </div>
  );
};

export default ParallaxEllipses;
