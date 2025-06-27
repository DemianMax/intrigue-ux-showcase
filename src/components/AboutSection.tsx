
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutSection() {
  return (
    <section className="bg-neutral-900 text-neutral-200 py-16 px-4">
      {/* ...restante do conteúdo */}
    </section>
  );
}

const AboutSection = React.forwardRef<HTMLDivElement>((props, ref) => {
  const { t } = useLanguage();

  // Safety check to ensure t function is available
  if (!t) {
    return null;
  }

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
