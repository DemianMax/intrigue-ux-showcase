
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      
      {/* Animated gradient orbs - maiores e mais rápidos */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,0,0.4) 0%, transparent 70%)',
          top: '5%',
          left: '5%',
        }}
        animate={{
          x: [0, 200, -100, 0],
          y: [0, 100, -50, 0],
          scale: [1, 1.4, 0.8, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.5) 0%, transparent 70%)',
          top: '50%',
          right: '5%',
        }}
        animate={{
          x: [0, -150, 80, 0],
          y: [0, -120, 60, 0],
          scale: [1, 0.6, 1.3, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,0,0.6) 0%, transparent 70%)',
          top: '30%',
          left: '60%',
        }}
        animate={{
          x: [0, -200, 150, 0],
          y: [0, 150, -80, 0],
          scale: [1, 1.6, 0.7, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
      
      {/* Mais orbs menores */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)',
          top: '70%',
          left: '20%',
        }}
        animate={{
          x: [0, 120, -80, 0],
          y: [0, -100, 60, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* Geometric shapes - maiores e mais rápidos */}
      <motion.div
        className="absolute w-4 h-48 bg-gradient-to-b from-brand-accent/30 to-transparent"
        style={{ top: '15%', left: '15%' }}
        animate={{
          rotate: [0, 360],
          opacity: [0.3, 0.7, 0.3],
          scaleY: [1, 1.5, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute w-48 h-4 bg-gradient-to-r from-blue-500/30 to-transparent"
        style={{ top: '60%', right: '20%' }}
        animate={{
          scaleX: [1, 3, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 15, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Mais linhas geométricas */}
      <motion.div
        className="absolute w-2 h-32 bg-gradient-to-b from-purple-500/25 to-transparent"
        style={{ top: '40%', left: '80%' }}
        animate={{
          rotate: [0, -180, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5
        }}
      />
      
      {/* Floating dots - mais e maiores */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/40 rounded-full"
          style={{
            top: `${10 + i * 8}%`,
            left: `${10 + i * 7}%`,
          }}
          animate={{
            y: [0, -40, 20, 0],
            x: [0, 20, -15, 0],
            opacity: [0.4, 0.8, 0.2, 0.4],
            scale: [1, 1.5, 0.8, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3
          }}
        />
      ))}
      
      {/* Moving gradient overlay - mais rápido */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background: 'linear-gradient(45deg, transparent 0%, rgba(255,107,0,0.15) 30%, rgba(37,99,235,0.1) 70%, transparent 100%)',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Círculos pulsantes adicionais */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${60 + i * 20}px`,
            height: `${60 + i * 20}px`,
            background: `radial-gradient(circle, rgba(${i % 2 === 0 ? '255,107,0' : '37,99,235'},0.1) 0%, transparent 70%)`,
            top: `${20 + i * 15}%`,
            right: `${10 + i * 10}%`,
          }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
