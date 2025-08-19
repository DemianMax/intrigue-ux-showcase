import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ScrollTransitionWrapper from "@/components/ScrollTransitionWrapper";
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
  const location = useLocation();
  // Função para rolar até uma seção específica
  const scrollToSection = (sectionIndex: number) => {
    // Aguarda renderização usando setTimeout para garantir o DOM das seções
    setTimeout(() => {
      const element = document.getElementById(`section-${sectionIndex}`);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth"
        });
      }
    }, 0);
  };
  // Detecta solicitação de scroll via state ao chegar pela navegação
  useEffect(() => {
    if (location.state && typeof location.state.sectionIndex === "number") {
      scrollToSection(location.state.sectionIndex);
      // Limpa o state da navegação para evitar repetição
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location.state]);
  // Mapeamento das seções principais do site, mantendo id único e ordem
  const sections = [
    {
      component: <ScrollTransitionWrapper key="hero-about" onScrollNext={() => scrollToSection(1)} />,
      bgClass: "bg-[hsl(var(--hero-bg))]"
    },
    {
      component: projects && projects.length > 0 ? (
        <div key="featured-projects" className="w-full h-full">
          <FeaturedProjectsSection projects={projects} />
        </div>
      ) : (
        <div key="no-projects" className="w-full h-full flex items-center justify-center bg-[hsl(var(--projects-bg))]">
          <div className="text-center py-20">
            <h3 className="text-2xl font-playfair text-foreground mb-4">Projetos em breve</h3>
            <p className="text-muted-foreground">Os projetos estão sendo carregados...</p>
          </div>
        </div>
      ),
      bgClass: "bg-[hsl(var(--projects-bg))]"
    },
    {
      component: (
        <div key="portfolio" className="w-full h-full">
          <PortfolioSection />
        </div>
      ),
      bgClass: "bg-[hsl(var(--portfolio-bg))]"
    },
    {
      component: (
        <div key="skills" className="w-full h-full">
          <TechnicalSkillsSection />
        </div>
      ),
      bgClass: "bg-[hsl(var(--skills-bg))]"
    },
    {
      component: (
        <div key="contact" className="w-full h-full">
          <FooterSection />
        </div>
      ),
      bgClass: "bg-[hsl(var(--contact-bg))]"
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
          <div
            key={index}
            id={`section-${index}`}
            className={`w-full flex items-center justify-center relative ${index === 0 ? "min-h-screen" : ""} ${section.bgClass}`}
          >
            {section.component}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Index;