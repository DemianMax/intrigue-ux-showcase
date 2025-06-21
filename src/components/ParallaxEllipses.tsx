// src/components/ParallaxEllipses.tsx

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface EllipseProps {
  delay: number;
  minSize: number; // Tamanho mínimo em pixels (ex: 40)
  maxSize: number; // Tamanho máximo em pixels (ex: 120)
  color: string; // Tailwind class like 'bg-blue-300'
  initialX: number; // Posição X inicial (em porcentagem: 0-100)
  initialY: number; // Posição Y inicial (em porcentagem: 0-100)
  speed: number; // Multiplier for parallax effect (e.g., 0.1, 0.4)
  opacity: number; // Opacidade final (0.0 a 1.0)
}

const Ellipse: React.FC<EllipseProps> = ({ delay, minSize, maxSize, color, initialX, initialY, speed, opacity }) => {
  const { scrollYProgress } = useScroll();
  // Movimento vertical (y) ao rolar para baixo, elipse sobe (chuva invertida)
  const y = useTransform(scrollYProgress, [0, 1], [0, -window.innerHeight * speed * 2]); // Multiplicador de 2 para suavidade

  // Randomiza um pouco o tamanho dentro do range
  const size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;

  return (
    <motion.div
      // Usando style={{ width: size, height: size }} para tamanhos dinâmicos
      // Aplicando `blur-3xl` novamente para o efeito suave
      className={`absolute rounded-full ${color} filter blur-3xl pointer-events-none`}
      style={{
        width: size,
        height: size,
        top: `${initialY}%`,
        left: `${initialX}%`,
        y: y, // Aplica a transformação de parallax
      }}
      initial={{ opacity: 0, scale: 0.2 }} // Começa menor e invisível
      animate={{ opacity: opacity, scale: 1 }} // Vai para a opacidade desejada e tamanho original
      transition={{ duration: 1.5, delay: delay }} // Animação de aparecimento
    ></motion.div>
  );
};

const ParallaxEllipses: React.FC = () => {
  // Ajuste o número de elipses e suas propriedades
  const numEllipses = 20; // Aumentei o número de elipses para preencher mais
  const ellipsesData: EllipseProps[] = [];

  for (let i = 0; i < numEllipses; i++) {
    ellipsesData.push({
      delay: Math.random() * 2, // Atraso aleatório para aparecerem em momentos diferentes
      minSize: 30, // Tamanho mínimo (px)
      maxSize: 100, // Tamanho máximo (px)
      // Cores suaves para fundo branco, sem opacidade na classe para controlar no JS
      color: `bg-${['blue', 'purple', 'pink', 'cyan', 'green', 'yellow', 'red', 'orange', 'teal', 'fuchsia'][Math.floor(Math.random() * 10)]}-300`,
      initialX: Math.random() * 100, // Posição horizontal aleatória (0-100%)
      initialY: Math.random() * 200 - 50, // Posição vertical aleatória (pode começar acima ou abaixo da tela para mais dispersão)
      speed: 0.05 + Math.random() * 0.15, // Velocidade de parallax aleatória (entre 0.05 e 0.2)
      opacity: 0.08 + Math.random() * 0.1, // Opacidade aleatória para sutileza (entre 0.08 e 0.18)
    });
  }

  return (
    // O container deve cobrir toda a área e ter z-index baixo
    <div className="absolute inset-0 z-0 pointer-events-none">
      {ellipsesData.map((ellipse, index) => (
        <Ellipse key={index} {...ellipse} />
      ))}
    </div>
  );
};

export default ParallaxEllipses;
