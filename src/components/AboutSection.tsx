import React from "react";
import { motion } from "framer-motion";

const AboutSection = React.forwardRef<HTMLDivElement>((props, ref) => (
  <section ref={ref} className="w-full max-w-4xl mx-auto px-5 py-20 flex flex-col items-center gap-5" id="sobre">
    <motion.img
      alt="Foto de perfil profissional"
      initial={{
        scale: 0.7,
        opacity: 0
      }}
      animate={{
        scale: 1,
        opacity: 1
      }}
      transition={{
        delay: 0.2,
        duration: 0.5
      }}
      className="w-40 h-40 rounded-full border-2 border-brand-accent shadow-lg mb-3 object-cover"
      src="/lovable-uploads/00b6d85a-1c9d-4ff3-9e87-35129b65ec78.png"
    />
    <h2 className="font-playfair text-2xl text-brand-dark font-bold mb-2">Muito prazer, sou Max Demian</h2>
    <p className="text-lg text-brand-dark text-center">
      Designer apaixonado por criar experiências <span className="font-bold text-brand-accent">intuitivas e envolventes</span>.
      Entrego mais do que telas bonitas: pesquiso, facilito, crio soluções visuais e estratégias focadas nas pessoas.<br />
      Minhas habilidades em ilustração/infografia <span className="text-brand-accent font-medium">tornam complexo em simples visível</span>, potencializando meus projetos de UX.
    </p>
  </section>
));

export default AboutSection;
