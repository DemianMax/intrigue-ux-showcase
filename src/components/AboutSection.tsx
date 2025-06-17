
import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSobre } from "@/hooks/useSobre";

const AboutSection = React.forwardRef<HTMLDivElement>((props, ref) => {
  const { t } = useLanguage();
  const { data: sobre, isLoading, error } = useSobre();

  return (
    <section ref={ref} className="w-full max-w-6xl mx-auto px-5 py-20" id="sobre">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Foto à esquerda */}
        <div className="flex-shrink-0">
          <motion.img
            alt="Foto de perfil profissional"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            src={sobre?.imagem_perfil || "/lovable-uploads/b5362a7a-ef6f-46c7-ac27-99fa2fcde1f1.jpg"}
            className="w-40 h-80 rounded-full border-4 border-brand-accent shadow-lg object-cover"
          />
        </div>

        {/* Texto à direita */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="font-playfair text-3xl text-brand-dark font-bold mb-6">
            {sobre?.titulo ?? t('aboutGreeting')}
          </h2>
          <p className="text-lg text-brand-dark leading-relaxed mb-8">
            {sobre?.destaque && (
              <span className="font-bold text-brand-accent block mb-2">{sobre.destaque}</span>
            )}
            {sobre?.resumo ?? (
              <>
                {t('aboutParagraph1')}
                <span className="font-bold text-brand-accent">
                  {t('aboutParagraph1Highlight')}
                </span>
                {t('aboutParagraph1Cont')}
                <br />
                <br />
                {t('aboutParagraph2')}
                <span className="text-brand-accent font-medium">
                  {t('aboutParagraph2Highlight')}
                </span>
                {t('aboutParagraph2Cont')}
              </>
            )}
          </p>
          <a
  href="/Curriculo-Max-Demian.pdf"
  download
  className="inline-flex items-center justify-center gap-2 h-10 px-4 py-2 bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold rounded-md"
>
  Baixar Currículo
  <ArrowRight className="ml-2 h-5 w-5" />
</a>

        </div>
      </div>
      {isLoading && <div className="text-muted-foreground text-center mt-4">Carregando informações...</div>}
      {error && <div className="text-destructive text-center mt-4">Falha ao carregar informações da sessão sobre.</div>}
    </section>
  )
});

export default AboutSection;
