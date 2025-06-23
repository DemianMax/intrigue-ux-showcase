import React from "react";
import { motion, useAnimationFrame } from "framer-motion";

const BackgroundBeams: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const baseRotation = React.useRef(0);

  useAnimationFrame((t) => {
    if (ref.current) {
      baseRotation.current = (t / 5000) % 360; // roda bem devagar
      ref.current.style.transform = `rotate(${baseRotation.current}deg)`;
    }
  });

  return (
    <div className="absolute inset-0 overflow-hidden bg-white z-0">
      <div ref={ref} className="relative w-full h-full transition-transform duration-300 ease-linear">
        <div className="absolute inset-[-30%] bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 opacity-15 blur-3xl rotate-45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-white to-white opacity-40" />
      </div>
    </div>
  );
};

export default BackgroundBeams;
