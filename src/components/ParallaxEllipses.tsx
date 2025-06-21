// src/components/ParallaxEllipses.tsx

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface EllipseProps {
  delay: number;
  minSize: number; // Tamanho mínimo em pixels (ex: 40)
  maxSize: number; // Tamanho máximo em pixels (ex: 120)
  colorClass: string; // Tailwind class de cor base (ex: 'bg-blue-300')
  initialX: number; // Posição X inicial (em porcentagem: 0-100)
  initialY: number; // Posição Y inicial (em porcentagem: 0-100)
  speed: number; // Multiplier for parallax effect (e.g., 0.1, 0.4)
  opacityValue: number; // Opacidade final (0.0 a 1.0)
}

const Ellipse: React.FC<EllipseProps> = ({ delay, minSize, maxSize, colorClass, initialX, initialY, speed, opacityValue }) => {
  const { scrollYProgress } = useScroll();
  // Movimento vertical (y) ao rolar para baixo, elipse sobe (chuva invertida)
  // Multiplicador de velocidade para um movimento perceptível mas suave.
  // Ajustei o range para que as elipses não se movam excessivamente para fora da tela.
  const y = useTransform(scrollYProgress, [0, 1], [0, -window.innerHeight * speed * 0.8]); 

  // Randomiza um pouco o tamanho dentro do range
  const size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;

  return (
    <motion.div
      // Combinando as classes de tamanho dinamicamente
      className={`absolute rounded-full ${colorClass} filter blur-3xl pointer-events-none`}
      style={{
        width: size,
        height: size,
        top: `${initialY}vh`, // Usando vh para posicionamento relativo à viewport
        left: `${initialX}vw`, // Usando vw para posicionamento relativo à viewport
        y: y, // Aplica a transformação de parallax
        opacity: opacityValue, // Aplica a opacidade final aqui para mais controle
      }}
      initial={{ scale: 0.2 }} // Começa menor
      animate={{ scale: 1 }} // Vai para o tamanho original
      transition={{ duration: 1.5, delay: delay }} // Animação de aparecimento
    ></motion.div>
  );
};

const ParallaxEllipses: React.FC = () => {
  const numEllipses = 15; // Reduzi ligeiramente o número para otimização
  const ellipsesData: EllipseProps[] = [];

  const colors = ['blue', 'purple', 'pink', 'cyan', 'green', 'yellow', 'red', 'orange', 'teal', 'fuchsia'];

  for (let i = 0; i < numEllipses; i++) {
    ellipsesData.push({
      delay: Math.random() * 2, // Atraso aleatório para aparecerem em momentos diferentes
      minSize: 30, // Tamanho mínimo (px)
      maxSize: 80, // Tamanho máximo (px)
      colorClass: `bg-${colors[Math.floor(Math.random() * colors.length)]}-300`, // Cores suaves
      initialX: Math.random() * 100, // Posição horizontal aleatória (0-100vw)
      initialY: Math.random() * 100, // Posição vertical aleatória (0-100vh), sempre visível inicialmente
      speed: 0.1 + Math.random() * 0.2, // Velocidade de parallax aleatória (entre 0.1 e 0.3)
      opacityValue: 0.05 + Math.random() * 0.07, // Opacidade aleatória para sutileza (entre 0.05 e 0.12)
    });
  }

  return (
    // O container deve cobrir toda a área e ter z-index baixo
    // Adicionei overflow-hidden aqui para garantir que as elipses não causem scroll indesejado.
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {ellipsesData.map((ellipse, index) => (
        <Ellipse key={index} {...ellipse} />
      ))}
    </div>
  );
};

export default ParallaxEllipses;
