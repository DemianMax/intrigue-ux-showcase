import React from "react";
import { motion } from "framer-motion";
const AboutSection = React.forwardRef<HTMLDivElement>((props, ref) => <section ref={ref} className="w-full max-w-6xl mx-auto px-5 py-20" id="sobre">
    <div className="flex flex-col lg:flex-row items-center gap-10">
      {/* Foto à esquerda */}
      <div className="flex-shrink-0">
        <motion.img alt="Foto de perfil profissional" initial={{
        scale: 0.7,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} transition={{
        delay: 0.2,
        duration: 0.5
      }} src="/lovable-uploads/b5362a7a-ef6f-46c7-ac27-99fa2fcde1f1.jpg" className="w-44 h-96 rounded-full border-2 border-brand-accent shadow-lg object-cover" />
      </div>
      
      {/* Texto à direita */}
      <div className="flex-1 text-left">
        <h2 className="font-playfair text-3xl text-brand-dark font-bold mb-6">Muito prazer, sou Max Demian</h2>
        <p className="text-lg text-brand-dark leading-relaxed">
          Designer apaixonado por criar experiências <span className="font-bold text-brand-accent">intuitivas e envolventes</span>.
          Entrego mais do que telas bonitas: pesquiso, facilito, crio soluções visuais e estratégias focadas nas pessoas.<br /><br />
          Minhas habilidades em ilustração/infografia <span className="text-brand-accent font-medium">tornam complexo em simples visível</span>, potencializando meus projetos de UX.
        </p>
      </div>
    </div>
  </section>);
export default AboutSection;