
import { Mail, Linkedin, ExternalLink } from "lucide-react";
import React from "react";

const FooterSection = React.forwardRef<HTMLDivElement>((props, ref) => (
  <footer ref={ref} className="w-full bg-brand-dark py-14 px-6 flex flex-col items-center mt-10" id="contato">
    <h4 className="text-2xl font-playfair text-white font-bold mb-2">Vamos conversar!</h4>
    <div className="flex flex-col md:flex-row md:items-center gap-3 text-lg">
      <div className="flex items-center gap-2 text-white/90">
        <Mail className="size-5" />
        <a href="mailto:seu@email.com" className="hover:underline">seu@email.com</a>
      </div>
      <div className="flex items-center gap-2 text-white/90">
        <Linkedin className="size-5" />
        <a href="https://linkedin.com/in/suaperfil" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
      </div>
      <div className="flex items-center gap-2 text-white/70">
        <ExternalLink className="size-5" />
        <a href="https://behance.net/suaperfil" target="_blank" rel="noopener noreferrer" className="hover:underline">Behance</a>
      </div>
    </div>
    <p className="mt-8 text-xs text-white/50">&copy; {new Date().getFullYear()} [Seu Nome]. Todos os direitos reservados.</p>
  </footer>
));
export default FooterSection;
