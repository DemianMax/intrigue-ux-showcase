
import { Mail, Linkedin, ExternalLink } from "lucide-react";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const FooterSection = React.forwardRef<HTMLDivElement>((props, ref) => {
  const { t } = useLanguage();

  if (!t) {
    return null;
  }

  return (
    <motion.footer
      ref={ref}
      className="w-full h-full bg-background py-8 px-6 flex flex-col items-center justify-center"
      id="contato"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Título da seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-4xl md:text-5xl font-playfair text-foreground font-bold mb-4">
            {t('footerTitle')}
          </h4>
          <div className="w-24 h-1 bg-border mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Estou sempre aberto para novos projetos e oportunidades de colaboração
          </p>
        </motion.div>

        {/* Links de contato */}
        <motion.div
          className="flex flex-col md:flex-row justify-center gap-8 text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className="flex items-center justify-center gap-3 text-foreground hover:text-accent transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <Mail className="size-5" />
            <a href="mailto:max3demian@gmail.com" className="hover:underline">
              max3demian@gmail.com
            </a>
          </motion.div>

          <motion.div 
            className="flex items-center justify-center gap-3 text-foreground hover:text-accent transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <Linkedin className="size-5" />
            <a
              href="https://www.linkedin.com/in/maxdemian/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </motion.div>

          <motion.div 
            className="flex items-center justify-center gap-3 text-foreground hover:text-accent transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <ExternalLink className="size-5" />
            <a
              href="https://www.behance.net/maxdemian/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Behance
            </a>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-border/30"
        >
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Max Demian. {t('footerRights')}
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
});

export default FooterSection;
