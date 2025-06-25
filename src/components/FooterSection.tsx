
import { Mail, Linkedin, ExternalLink } from "lucide-react";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const FooterSection = React.forwardRef<HTMLDivElement>((props, ref) => {
  const { t } = useLanguage();

  // Safety check to ensure t function is available
  if (!t) {
    return null;
  }

  return (
    <motion.footer
      ref={ref}
      className="w-full bg-brand-dark border-t border-white/10 py-20 px-6 flex flex-col items-center mt-20"
      id="contato"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h4 className="text-3xl font-playfair text-white font-bold mb-8">
        {t('footerTitle')}
      </h4>

      <div className="flex flex-col md:flex-row md:justify-center md:gap-14 gap-6 text-lg text-white">
        <div className="flex items-center gap-3">
          <Mail className="size-5 opacity-80" />
          <a href="mailto:max3demian@gmail.com" className="hover:underline text-brand-accent">
            max3demian@gmail.com
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Linkedin className="size-5 opacity-80" />
          <a
            href="https://www.linkedin.com/in/maxdemian/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
        </div>

        <div className="flex items-center gap-3 opacity-80">
          <ExternalLink className="size-5" />
          <a
            href="https://www.behance.net/maxdemian/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Behance
          </a>
        </div>
      </div>

      <p className="mt-14 text-xs text-white/40 text-center">
        &copy; {new Date().getFullYear()} Max Demian. {t('footerRights')}
      </p>
    </motion.footer>
  );
});
export default FooterSection;
