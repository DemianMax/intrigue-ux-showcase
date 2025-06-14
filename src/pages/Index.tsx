import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, Linkedin, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
const projects = [{
  id: "fintech-simplifica",
  title: "Fintech Simplifica",
  role: "UX Lead & UI Designer",
  short: "Redesenhei o onboarding para triplicar a conversão de usuários em serviços financeiros.",
  hashtags: ["#onboarding", "#fintech", "#mobile"],
  image: "/placeholder.svg",
  caseStudy: {
    challenge: "Usuários enfrentavam frustração e abandono ao tentar abrir conta; processos longos e confusos bloqueavam conversão.",
    process: [{
      img: "/placeholder.svg",
      legend: "Mapeamento de fricções reais — ouvindo usuários."
    }, {
      img: "/placeholder.svg",
      legend: "Jornada redesenhada: simplificando os pontos de atrito."
    }, {
      img: "/placeholder.svg",
      legend: "Protótipo iterado e testado para onboarding eficiente."
    }],
    solutionImg: "/placeholder.svg",
    solutionLegend: "Novo onboarding: simples, informativo e inclusivo.",
    uiNote: "Essa arquitetura simplificou o fluxo de abertura de conta: menos etapas, copy clara e feedback visual imediato. A paleta evoca confiança e acessibilidade.",
    results: ["Abandono na abertura de conta caiu de 62% para 21%", "Usuários relataram 2x mais clareza no processo", "Aprendi que o simples pode ser marcante — pesquisa e iteração fazem toda a diferença."],
    next: "Hoje faria protótipos ainda mais ‘mágicos’, incluindo onboarding progressivo."
  }
}
// Adicione outros projetos aqui com o mesmo formato se desejar expandir
];
const Index = () => {
  // Para navegação âncora suave
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Modal de case study
  const [openCase, setOpenCase] = useState<string | null>(null);

  // Scroll suave para âncoras
  const handleScrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <div className="flex flex-col min-h-screen bg-background relative font-inter">
      {/* Barra de navegação fixa */}
      <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur z-30 border-b border-border shadow-sm">
        <ul className="flex items-center justify-center gap-7 py-3 text-brand-dark font-semibold text-base">
          <li className="cursor-pointer hover:text-brand-accent transition" onClick={() => window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })}>Início</li>
          <li className="cursor-pointer hover:text-brand-accent transition" onClick={() => handleScrollTo(aboutRef)}>Sobre</li>
          <li className="cursor-pointer hover:text-brand-accent transition" onClick={() => handleScrollTo(projectsRef)}>Projetos</li>
          <li className="cursor-pointer hover:text-brand-accent transition" onClick={() => handleScrollTo(contactRef)}>Contato</li>
        </ul>
      </nav>

      {/* Hero Section - Intriga e Gancho */}
      <section className="min-h-[100dvh] flex flex-col justify-center items-center gap-8 relative pt-24 sm:pt-28">
        <motion.h1 initial={{
        opacity: 0,
        y: 24
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="text-4xl sm:text-5xl font-playfair font-bold text-center text-brand-dark leading-tight my-0 md:text-6xl">
          {"UX: encontrar respostas ou fazer as perguntas certas?"}
          <motion.span initial={{
          scaleX: 0
        }} animate={{
          scaleX: 1
        }} transition={{
          delay: 0.6,
          duration: 0.6,
          type: "spring"
        }} style={{
          transformOrigin: "left"
        }} className="block h-1 w-16 mx-auto mt-2 rounded-full bg-brand-accent my-[30px]" />
        </motion.h1>
        <AnimatePresence>
          <motion.p initial={{
          opacity: 0,
          y: 14
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.7,
          duration: 0.7
        }} className="max-w-xl text-2xl text-brand-dark/80 text-center font-inter font-light">
            {"Eu projeto para provocar reflexão — experiências que conectam intenção, usabilidade e desejo."}
          </motion.p>
        </AnimatePresence>
        {/* Flecha para rolar */}
        <motion.button onClick={() => handleScrollTo(aboutRef)} className="absolute left-1/2 -translate-x-1/2 bottom-10 animate-bounce bg-brand-accent/10 hover:bg-brand-accent/20 rounded-full p-2 transition outline-none ring-0 ring-brand-accent/50" aria-label="Role para baixo">
          <ChevronDown size={36} className="text-brand-accent" />
        </motion.button>
      </section>

      {/* Sobre Mim */}
      <section ref={aboutRef} className="w-full max-w-4xl mx-auto px-5 py-20 flex flex-col items-center gap-5" id="sobre">
        <motion.img alt="Foto de perfil profissional" initial={{
        scale: 0.7,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} transition={{
        delay: 0.2,
        duration: 0.5
      }} className="w-28 h-28 rounded-full border-4 border-brand-accent shadow-lg mb-3 object-cover" src="/lovable-uploads/1f92fddb-352c-44f3-a639-ab30f54cd665.jpg" />
        <h2 className="font-playfair text-2xl text-brand-dark font-bold mb-2">Muito prazer, sou Max Demian</h2>
        <p className="text-lg text-brand-dark text-center">
          Designer apaixonado por criar experiências <span className="font-bold text-brand-accent">intuitivas e envolventes</span>.
          Entrego mais do que telas bonitas: pesquiso, facilito, crio soluções visuais e estratégias focadas nas pessoas.<br />
          Minhas habilidades em ilustração/infografia <span className="text-brand-accent font-medium">tornam complexo em simples visível</span>, potencializando meus projetos de UX.
        </p>
      </section>

      {/* Projetos */}
      <section ref={projectsRef} className="w-full max-w-6xl mx-auto px-4 py-12" id="projetos">
        <h3 className="text-3xl font-playfair font-bold text-brand-dark mb-10 text-center">Um pouco de UX e UI</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <motion.div key={project.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative bg-card rounded-2xl shadow-md flex flex-col items-center p-5 group">
              {/* Hashtags dos projetos */}
              <div className="flex flex-wrap gap-2 mb-2">
                {project.hashtags && project.hashtags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[0.85rem] font-semibold text-brand-accent bg-brand-accent/10 rounded-full px-2 py-0.5 tracking-tight"
                    style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.01em' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <img src={project.image} alt={`Thumbnail do projeto ${project.title}`} className="w-full h-40 object-cover rounded-xl border border-border mb-5 transition group-hover:scale-105" />
              <h4 className="font-playfair text-xl font-semibold text-brand-dark mb-1">{project.title}</h4>
              <div className="text-brand-accent font-semibold text-sm mb-1">{project.role}</div>
              <p className="text-base text-brand-dark/70 mb-4 text-center">{project.short}</p>
              <button className="mt-auto px-6 py-2 rounded-full bg-brand-accent text-white font-semibold shadow hover:bg-brand-dark/90 transition" onClick={() => setOpenCase(project.id)}>
                Ver Case Study
              </button>
              {/* Dialog para Case Study */}
              <Dialog open={openCase === project.id} onOpenChange={open => setOpenCase(open ? project.id : null)}>
                <DialogContent className="max-w-2xl rounded-2xl shadow-2xl p-0 overflow-hidden border-0">
                  <DialogHeader className="bg-brand-dark/95 py-6 px-6 text-white">
                    <DialogTitle className="font-playfair text-2xl">{project.title}</DialogTitle>
                    <DialogDescription className="font-semibold">{project.role}</DialogDescription>
                  </DialogHeader>
                  <div className="p-6">
                    <h5 className="text-lg font-bold text-brand-accent mb-2">O Desafio</h5>
                    <p className="mb-4">{project.caseStudy.challenge}</p>
                    <h5 className="text-lg font-bold text-brand-accent mb-2 mt-4">Processo UX</h5>
                    <div className="grid gap-5 md:grid-cols-3 mb-4">
                      {project.caseStudy.process.map((step, idx) => <div key={idx} className="flex flex-col items-center">
                          <img src={step.img} alt={step.legend} className="w-full h-32 object-cover rounded-md mb-2 border" />
                          <span className="text-xs text-brand-dark/80 text-center">{step.legend}</span>
                        </div>)}
                    </div>
                    <h5 className="text-lg font-bold text-brand-accent mb-2 mt-4">Solução Final</h5>
                    <img src={project.caseStudy.solutionImg} alt={project.caseStudy.solutionLegend} className="w-full max-w-lg mx-auto rounded-xl mb-2 border" />
                    <span className="block text-sm mb-5 text-center">{project.caseStudy.solutionLegend}</span>
                    <p className="mb-4">{project.caseStudy.uiNote}</p>
                    <h5 className="text-lg font-bold text-brand-accent mb-2 mt-4">Resultados & Aprendizados</h5>
                    <ul className="mb-3 ml-6 list-disc text-brand-dark/80">
                      {project.caseStudy.results.map((res, idx) => <li key={idx}>{res}</li>)}
                    </ul>
                    <div className="text-sm text-brand-dark/70">
                      <strong>Próximos passos:</strong> {project.caseStudy.next}
                    </div>
                    <DialogClose asChild>
                      <button className="mt-7 px-8 py-2 rounded-full bg-brand-accent text-white font-semibold shadow hover:bg-brand-dark/90 transition">
                        Fechar
                      </button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contato */}
      <footer ref={contactRef} className="w-full bg-brand-dark py-14 px-6 flex flex-col items-center mt-10" id="contato">
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
    </div>;
};
export default Index;
