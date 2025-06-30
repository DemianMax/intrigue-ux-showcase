import { useState } from "react";
import DepthHeroSection from "@/components/DepthHeroSection";
import DepthAboutSection from "@/components/DepthAboutSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import FooterSection from "@/components/FooterSection";
import PortfolioSection from "@/components/PortfolioSection";
import TechnicalSkillsSection from "@/components/TechnicalSkillsSection";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProjectsIndividual } from "@/hooks/useProjectsIndividual";

const Index = () => {
  const { t } = useLanguage();
  const { data: projects, isLoading, error } = useProjectsIndividual();

  const scrollToSection = (sectionIndex: number) => {
    const element = document.getElementById(`section-${sectionIndex}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sections = [
    <DepthHeroSection key="hero" onScrollNext={() => scrollToSection(1)} />,
    <DepthAboutSection key="about" />,
    projects && projects.length > 0 ? (
      <div key="featured-projects" className="w-full h-full">
        <FeaturedProjectsSection projects={projects} />
      </div>
    ) : (
      <div key="no-projects" className="w-full h-full flex items-center justify-center bg-background">
        <div className="text-center py-20">
          <h3 className="text-2xl font-playfair text-brand-dark dark:text-white mb-4">Projetos em breve</h3>
          <p className="text-gray-600 dark:text-gray-400">Os projetos estão sendo carregados...</p>
        </div>
      </div>
    ),
    <div key="portfolio" className="w-full h-full">
      <PortfolioSection />
    </div>,
    <div key="skills" className="w-full h-full">
      <TechnicalSkillsSection />
    </div>,
    <div key="contact" className="w-full h-full">
      <FooterSection />
    </div>
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-xl text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  if (error) {
    console.error("Erro ao carregar projetos:", error);
  }

  return (
    <div className="relative font-inter bg-background text-foreground">
      <Navigation onSectionScroll={scrollToSection} />

      <div className="relative">
        {sections.map((section, index) => (
          <div
            key={index}
            id={`section-${index}`}
            className="w-full flex items-center justify-center relative"
            style={{
              minHeight: index === sections.length - 1 ? undefined : "100vh"
            }}
          >
            {section}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
