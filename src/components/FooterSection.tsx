
import { Mail, Linkedin, ExternalLink } from "lucide-react";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const FooterSection = React.forwardRef<HTMLDivElement>((props, ref) => {
  const { t } = useLanguage();

  return (
    <footer ref={ref} className="w-full bg-brand-dark py-14 px-6 flex flex-col items-center mt-10" id="contato">
      <h4 className="text-2xl font-playfair text-white font-bold mb-2">{t('footerTitle')}</h4>
      <div className="flex flex-col md:flex-row md:items-center gap-3 text-lg">
        <div className="flex items-center gap-2 text-white/90">
          <Mail className="size-5" />
          <a href="mailto:max3demian@gmail.com" className="hover:underline">max3demian@gmail.com</a>
        </div>
        <div className="flex items-center gap-2 text-white/90">
          <Linkedin className="size-5" />
          <a href="https://www.linkedin.com/in/maxdemian/" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
        </div>
        <div className="flex items-center gap-2 text-white/70">
          <ExternalLink className="size-5" />
          <a href="https://www.behance.net/maxdemian/" target="_blank" rel="noopener noreferrer" className="hover:underline">Behance</a>
        </div>
      </div>
      <p className="mt-8 text-xs text-white/50">&copy; {new Date().getFullYear()} Max Demian. {t('footerRights')}</p>
    </footer>
  );
});
export default FooterSection;
