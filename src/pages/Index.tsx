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
    {
      component: <DepthHeroSection key="hero" onScrollNext={() => scrollToSection(1)} />,
      bgClass: "bg-gradient-to-br from-white via-gray-50 to-orange-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800"
    },
    {
      component: <DepthAboutSection key="about" />,
     // bgClass: "bg-gray-900"
    },
    {
      component: projects && projects.length > 0 ? (
        <div key="featured-projects" className="w-full h-full">
          <FeaturedProjectsSection projects={projects} />
        </div>
      ) : (
        <div key="no-projects" className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
          <div className="text-center py-20">
            <h3 className="text-2xl font-playfair text-brand-dark dark:text-white mb-4">Projetos em breve</h3>
            <p className="text-gray-600 dark:text-gray-400">Os projetos estão sendo carregados...</p>
          </div>
        </div>
      ),
      bgClass: "bg-gray-50 dark:bg-gray-800"
    },
    {
      component: (
        <div key="portfolio" className="w-full h-full">
          <PortfolioSection />
        </div>
      ),
      bgClass: "bg-white dark:bg-gray-900"
    },
    {
      component: (
        <div key="skills" className="w-full h-full">
          <TechnicalSkillsSection />
        </div>
      ),
      bgClass: "bg-gray-50 dark:bg-gray-800"
    },
    {
      component: (
        <div key="contact" className="w-full h-full">
          <FooterSection />
        </div>
      ),
      bgClass: "bg-brand-dark"
    }
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
          <div key={index}>
            <div
              id={`section-${index}`}
              className={`w-full flex items-center justify-center relative ${
                index === 0 ? "min-h-screen" : ""
              } ${section.bgClass}`}
              style={{
                paddingTop: index === 0 ? "0" : "4rem",
                paddingBottom: index === sections.length - 1 ? undefined : "4rem"
              }}
            >
              {section.component}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
