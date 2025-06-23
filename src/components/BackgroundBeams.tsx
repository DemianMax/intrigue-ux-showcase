import React from "react";
import { motion, useAnimationFrame } from "framer-motion";

const BackgroundBeams: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const baseRotation = React.useRef(0);

  useAnimationFrame((t) => {
    if (ref.current) {
      baseRotation.current = (t / 7000) % 360; // rotação lenta (7s por volta)
      ref.current.style.transform = `rotate(${baseRotation.current}deg)`;
    }
  });

  return (
    <div className="absolute inset-0 overflow-hidden bg-white z-0">
      <div
        ref={ref}
        className="relative w-full h-full transition-transform duration-300 ease-linear"
      >
        {/* Cores mais escuras e cinzas */}
        <div className="absolute inset-[-30%] bg-gradient-to-tr from-gray-700 via-gray-900 to-black opacity-40 blur-3xl rotate-45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-gray-800 to-gray-900 opacity-30" />
      </div>
    </div>
  );
};

export default BackgroundBeams;
