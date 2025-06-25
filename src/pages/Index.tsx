import { useState } from "react";
import ScrollDepthLayout from "../components/ScrollDepthLayout";
import DepthHeroSection from "../components/DepthHeroSection";
import DepthAboutSection from "../components/DepthAboutSection";
import ProjectsGrid from "../components/ProjectsGrid";
import SingleProjectSection from "../components/SingleProjectSection";
import FooterSection from "../components/FooterSection";
import PortfolioSection from "../components/PortfolioSection";
import TechnicalSkillsSection from "../components/TechnicalSkillsSection";
// Ajuste os imports acima conforme a estrutura do seu projeto!
import { useLanguage } from "../contexts/LanguageContext";
import { useProjectsIndividual } from "../hooks/useProjectsIndividual";

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const { t } = useLanguage ? useLanguage() : { t: (s: string) => s };
  const { data: projects, isLoading, error } = useProjectsIndividual ? useProjectsIndividual() : { data: [], isLoading: false, error: null };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Carregando projetos...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">Erro ao carregar projetos.</div>;
  }

  const createSections = () => {
    const sections = [
      <DepthHeroSection key="hero" />,
      <DepthAboutSection key="about" />,
    ];

    if (projects && projects.length > 0) {
      projects.forEach((project, index) => {
        sections.push(
          <div key={`project-${project.id}`} className="w-full h-full">
            <SingleProjectSection project={project} index={index} />
          </div>
        );
      });
    }

    sections.push(
      <div key="portfolio" className="w-full h-full">
        <PortfolioSection />
      </div>,
      <div key="skills" className="w-full h-full">
        <TechnicalSkillsSection />
      </div>,
      <div key="contact" className="w-full h-full">
        <FooterSection />
      </div>
    );

    return sections;
  };

  const sections = createSections();

  return (
    <div className="relative font-inter">
      {/* Menu fixo FORA do ScrollDepthLayout */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-playfair font-bold text-xl text-brand-dark cursor-pointer">
              Max Demian
            </div>
            {/* Exemplo de menu. Personalize conforme seu projeto: */}
            <ul className="hidden md:flex items-center gap-6 text-brand-dark font-medium text-sm">
              <li className="cursor-pointer hover:text-brand-accent transition">Home</li>
              <li className="cursor-pointer hover:text-brand-accent transition">Sobre</li>
              <li className="cursor-pointer hover:text-brand-accent transition">Projetos</li>
              <li className="cursor-pointer hover:text-brand-accent transition">Portfólio</li>
              <li className="cursor-pointer hover:text-brand-accent transition">Skills</li>
              <li className="cursor-pointer hover:text-brand-accent transition">Contato</li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Layout de sessões */}
      <ScrollDepthLayout>{sections}</ScrollDepthLayout>
    </div>
  );
};

export default Index;
