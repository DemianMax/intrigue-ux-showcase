
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const headline = "UX é sobre respostas? Ou sobre fazer as perguntas certas?";
const revealText = "Eu projeto para provocar reflexão — experiências que conectam intenção, usabilidade e desejo.";

const Index = () => {
  const [revealed, setRevealed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center">
      <div className="w-full max-w-3xl flex flex-col items-center gap-10 px-4 py-16">
        <div className="relative w-full flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-playfair text-brand-dark font-bold text-center leading-tight"
          >
            {headline}
            <motion.span
              className="block mt-2 h-1 w-2/3 mx-auto rounded-full bg-brand-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.7, type: "spring" }}
              style={{ transformOrigin: "left" }}
            />
          </motion.h1>

          <AnimatePresence>
            {!revealed && (
              <motion.button
                key="reveal"
                className="mt-8 px-8 py-3 rounded-full text-lg font-inter font-semibold text-white bg-brand-accent shadow-xl hover:bg-brand-dark/90 active:scale-95 transition duration-150"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 1.5, duration: 0.4 }}
                onClick={() => setRevealed(true)}
              >
                Ver Projetos
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {revealed && (
            <motion.div
              className="mt-10 text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75 }}
            >
              <div className="text-2xl max-w-2xl mx-auto font-inter text-brand-dark/70 mb-8">
                {revealText}
              </div>
              <motion.button
                whileHover={{ scale: 1.07, y: -4, backgroundColor: "#2563eb" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-3 rounded-full font-semibold text-lg font-inter bg-brand-accent text-white shadow-xl hover:bg-brand-dark/90 transition"
                onClick={() => navigate("/projects/fintech-simplifica")}
              >
                Acessar Case Study
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
