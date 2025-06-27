
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const DepthAboutSection: React.FC = () => {
  const { t } = useLanguage();

  if (!t) return null;

  return (
    <div className="relative w-full bg-gradient-to-br from-brand-blue-50 via-white to-brand-purple-50 px-6 py-20">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Título da seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block relative">
            <h2 className="font-playfair text-4xl md:text-5xl text-brand-dark font-bold mb-4">
              Sobre Mim
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue-500 to-brand-purple-500 rounded-full"></div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative order-2 md:order-1"
          >
            <div className="relative max-w-md mx-auto">
              <img
                alt="Foto de perfil profissional"
                src="/lovable-uploads/b5362a7a-ef6f-46c7-ac27-99fa2fcde1f1.jpg"
                className="w-full h-96 rounded-2xl shadow-2xl object-cover border-4 border-white"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-blue-500/20 to-brand-purple-500/20 rounded-2xl blur-xl -z-10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-8 order-1 md:order-2"
          >
            <motion.h3
              className="font-playfair text-3xl md:text-4xl text-brand-dark font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {t("aboutGreeting")}
            </motion.h3>

            <motion.div
              className="space-y-6 text-lg text-brand-dark/80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p>
                {t("aboutParagraph1")}
                <span className="font-bold text-brand-purple-600">
                  {t("aboutParagraph1Highlight")}
                </span>
                {t("aboutParagraph1Cont")}
              </p>
              <p>
                {t("aboutParagraph2")}
                <span className="text-brand-blue-600 font-medium">
                  {t("aboutParagraph2Highlight")}
                </span>
                {t("aboutParagraph2Cont")}
              </p>
            </motion.div>

            <motion.a
              href="https://maxdemian.vercel.app/curriculo"
              target="_self"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-blue-500 to-brand-purple-500 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -2 }}
            >
              {t("aboutButton")}
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DepthAboutSection;
