
import { useState } from "react";
import ScrollDepthLayout from "@/components/ScrollDepthLayout";
import DepthHeroSection from "@/components/DepthHeroSection";
import DepthAboutSection from "@/components/DepthAboutSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import FooterSection from "@/components/FooterSection";
import PortfolioSection from "@/components/PortfolioSection";
import TechnicalSkillsSection from "@/components/TechnicalSkillsSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProjectsIndividual } from "@/hooks/useProjectsIndividual";

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const { t } = useLanguage();
  const { data: projects, isLoading, error } = useProjectsIndividual();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  if (error) {
    console.error("Erro ao carregar projetos:", error);
  }

  const createSections = () => {
    const sections = [
      <DepthHeroSection key="hero" onScrollNext={() => {}} />,
      <DepthAboutSection key="about" />,
    ];

    // Seção de projetos condensada
    if (projects && projects.length > 0) {
      sections.push(
        <div key="featured-projects" className="w-full h-full">
          <FeaturedProjectsSection projects={projects} />
        </div>
      );
    } else {
      sections.push(
        <div key="no-projects" className="w-full h-full flex items-center justify-center bg-gray-200">
          <div className="text-center">
            <h3 className="text-2xl font-playfair text-brand-dark mb-4">Projetos em breve</h3>
            <p className="text-gray-600">Os projetos estão sendo carregados...</p>
          </div>
        </div>
      );
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-playfair font-bold text-xl text-brand-dark cursor-pointer">
              Max Demian
            </div>
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
      
      <ScrollDepthLayout>{sections}</ScrollDepthLayout>
    </div>
  );
};

export default Index;
