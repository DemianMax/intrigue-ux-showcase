import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const BackgroundBeams: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  };

  const rotateX = useTransform(mouseY, [-200, 200], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-white"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative w-full h-full"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 opacity-30 blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-white to-white opacity-50" />
      </motion.div>
    </div>
  );
};

export default BackgroundBeams;
