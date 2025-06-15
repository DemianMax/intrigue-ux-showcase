
import { useRef } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsGrid from "@/components/ProjectsGrid";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative font-inter">
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

      <HeroSection onScrollToAbout={() => handleScrollTo(aboutRef)} />
      <div ref={aboutRef}><AboutSection /></div>
      <div ref={projectsRef}><ProjectsGrid /></div>
      <div ref={contactRef}><FooterSection /></div>
    </div>
  );
};

export default Index;
