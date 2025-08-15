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
      className="w-full h-full bg-brand-dark py-32 px-10 flex flex-col items-center justify-center"
      id="contato"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto text-center space-y-12">

        {/* Título da seção ajustado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8"
        >
          <h4 className=" whitespace-nowrap text-4xl md:text-5xl font-playfair text-white font-bold mb-0">
            {t('footerTitle')}
          </h4>
          <p className=" whitespace-nowrap text-lg text-white/70 leading-relaxed max-w-xl m-0">
            {t('footerSubTitle')}
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
            className="flex items-center justify-center gap-3 text-white hover:text-brand-accent transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <Mail className="size-5" />
            <a href="mailto:maxdemian.lab@gmail.com" className="hover:underline">
              maxdemian.lab@gmail.com
            </a>
          </motion.div>

          <motion.div 
            className="flex items-center justify-center gap-3 text-white hover:text-brand-accent transition-colors duration-300"
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
            className="flex items-center justify-center gap-3 text-white hover:text-brand-accent transition-colors duration-300"
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
          className="pt-9 border-t border-white/10"
        >
          <p className="text-sm text-white/50 text-center">
            &copy; {new Date().getFullYear()} Max Demian. {t('footerRights')}
          </p>
        </motion.div>
        
      </div>
    </motion.footer>
  );
});

export default FooterSection;
