
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const DepthAboutSection: React.FC = () => {
  const { t } = useLanguage();

  if (!t) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Background depth effect */}
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-brand-accent/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className="relative"
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              alt="Foto de perfil profissional"
              src="/lovable-uploads/b5362a7a-ef6f-46c7-ac27-99fa2fcde1f1.jpg"
              className="w-80 h-96 rounded-3xl border-4 border-brand-accent shadow-2xl object-cover mx-auto"
            />
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-accent/20 to-blue-400/20 rounded-3xl blur-xl -z-10" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.4 }}
          className="space-y-8"
        >
          <motion.h2
            className="font-playfair text-5xl text-brand-dark font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            {t("aboutGreeting")}
          </motion.h2>

          <motion.div
            className="space-y-6 text-lg text-brand-dark/80 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <p>
              {t("aboutParagraph1")}
              <span className="font-bold text-brand-accent">
                {t("aboutParagraph1Highlight")}
              </span>
              {t("aboutParagraph1Cont")}
            </p>
            <p>
              {t("aboutParagraph2")}
              <span className="text-brand-accent font-medium">
                {t("aboutParagraph2Highlight")}
              </span>
              {t("aboutParagraph2Cont")}
            </p>
          </motion.div>

          <motion.a
            href="https://maxdemian.vercel.app/curriculo"
            target="_self"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-accent to-orange-400 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, amount: 0.4 }}
            whileHover={{ y: -2 }}
          >
            {t("aboutButton")}
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default DepthAboutSection;
