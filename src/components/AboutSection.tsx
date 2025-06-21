import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = React.forwardRef<HTMLDivElement>((props, ref) => {
  const { t } = useLanguage();

  return (
    <section
      ref={ref}
      id="sobre"
      className="w-full max-w-6xl mx-auto px-5 py-20 md:py-32 bg-white"
    >
      <div className="flex flex-col md:flex-row items-center gap-16">
        {/* Foto à esquerda com animação */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex-shrink-0"
        >
          <motion.img
            alt="Foto de perfil profissional"
            src="/lovable-uploads/b5362a7a-ef6f-46c7-ac27-99fa2fcde1f1.jpg"
            className="w-40 h-80 rounded-full border-4 border-brand-accent shadow-lg object-cover"
          />
        </motion.div>

        {/* Texto à direita com animação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex-1 text-center md:text-left"
        >
          <h2 className="font-playfair text-4xl md:text-5xl text-brand-dark font-bold mb-10">
            {t("aboutGreeting")}
          </h2>

          {/* Intro com duas linhas e linha decorativa */}
          <div className="mb-12">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl md:text-2xl text-brand-dark font-inter font-light leading-relaxed mb-4"
            >
              {t("aboutIntro")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-xl md:text-2xl text-brand-dark font-inter font-light leading-relaxed"
            >
              {t("aboutIntroLine2")}
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              style={{ transformOrigin: "left" }}
              className="mt-6 h-1 w-32 bg-brand-accent/80 rounded-full mx-auto md:mx-0"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-lg text-brand-dark leading-relaxed mb-12"
          >
            {t("aboutParagraph1")}
            <span className="font-bold text-brand-accent">
              {t("aboutParagraph1Highlight")}
            </span>
            {t("aboutParagraph1Cont")}
            <br />
            <br />
            {t("aboutParagraph2")}
            <span className="text-brand-accent font-medium">
              {t("aboutParagraph2Highlight")}
            </span>
            {t("aboutParagraph2Cont")}
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            href="https://maxdemian.vercel.app/curriculo"
            target="_self"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 py-3 bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold rounded-md transition-all duration-300 ease-in-out"
          >
            {t("aboutButton")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
});

export default AboutSection;
