import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React from "react";
interface HeroSectionProps {
  onScrollToAbout: () => void;
}
const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToAbout
}) => <section className="min-h-[100dvh] flex flex-col justify-center items-center gap-8 relative pt-24 sm:pt-28 px-[20px]">
    <motion.h1 initial={{
    opacity: 0,
    y: 24
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.8
  }} className="text-4xl sm:text-5xl font-playfair font-bold text-brand-dark leading-tight my-0 text-left md:text-7xl px-0">
      {"UX: encontrar respostas ou fazer as perguntas certas?"}
      <motion.span initial={{
      scaleX: 0
    }} animate={{
      scaleX: 1
    }} transition={{
      delay: 0.6,
      duration: 0.6,
      type: "spring"
    }} style={{
      transformOrigin: "left"
    }} className="block h-1 w-16 mx-auto mt-2 rounded-full bg-brand-accent my-[26px]" />
    </motion.h1>
    <AnimatePresence>
      <motion.p initial={{
      opacity: 0,
      y: 14
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.7,
      duration: 0.7
    }} className="max-w-xl text-2xl text-brand-dark/80 font-inter font-light text-left">
        {"Eu projeto o invisível para experiências que conectam."}
      </motion.p>
    </AnimatePresence>
    <motion.button onClick={onScrollToAbout} className="absolute left-1/2 -translate-x-1/2 bottom-10 animate-bounce bg-brand-accent/10 hover:bg-brand-accent/20 rounded-full p-2 transition outline-none ring-0 ring-brand-accent/50" aria-label="Role para baixo">
      <ChevronDown size={36} className="text-brand-accent" />
    </motion.button>
  </section>;
export default HeroSection;