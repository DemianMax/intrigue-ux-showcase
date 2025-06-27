import { useState } from "react";
import SectionTransitionLayout from "@/components/SectionTransitionLayout";
import DepthHeroSection from "@/components/DepthHeroSection";
import DepthAboutSection from "@/components/DepthAboutSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import FooterSection from "@/components/FooterSection";
import PortfolioSection from "@/components/PortfolioSection";
import TechnicalSkillsSection from "@/components/TechnicalSkillsSection";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProjectsIndividual } from "@/hooks/useProjectsIndividual";
import { Separator } from "@/components/ui/separator";
import { Menu, X } from "lucide-react";

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const scrollToSection = (sectionIndex: number) => {
    const element = document.getElementById(`section-${sectionIndex}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false); // fecha menu mobile ao navegar
    }
  };

  const createSections = () => {
    const sections = [
      <DepthHeroSection key="hero" onScrollNext={() => scrollToSection(1)} />,
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
        <div key="no-projects" className="w-full h-full flex items-center justify-center bg-gray-50">
          <div className="text-center py-20">
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
            <div
              className="font-playfair font-bold text-xl text-brand-dark cursor-pointer hover:text-brand-accent transition"
              onClick={() => scrollToSection(0)}
            >
              Max Demian
            </div>

            <div className="flex items-center gap-8">
              {/* Menu Desktop */}
              <ul className="hidden md:flex items-center gap-6 text-brand-dark font-medium text-sm">
                <li
                  className="cursor-pointer hover:text-brand-accent transition"
                  onClick={() => scrollToSection(0)}
                >
                  {t ? t('navHome') : 'Home'}
                </li>
                <li
                  className="cursor-pointer hover:text-brand-accent transition"
                  onClick={() => scrollToSection(1)}
                >
                  {t ? t('navAbout') : 'Sobre'}
                </li>
                <li
                  className="cursor-pointer hover:text-brand-accent transition"
                  onClick={() => scrollToSection(2)}
                >
                  {t ? t('navProjects') : 'Projetos'}
                </li>
                <li
                  className="cursor-pointer hover:text-brand-accent transition"
                  onClick={() => scrollToSection(3)}
                >
                  Portfólio
                </li>
                <li
                  className="cursor-pointer hover:text-brand-accent transition"
                  onClick={() => scrollToSection(4)}
                >
                  Skills
                </li>
                <li
                  className="cursor-pointer hover:text-brand-accent transition"
                  onClick={() => scrollToSection(5)}
                >
                  {t ? t('navContact') : 'Contato'}
                </li>
              </ul>

              {/* Hamburger - mobile */}
              <button
                className="block md:hidden p-2"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Abrir menu"
              >
                <Menu className="w-7 h-7 text-brand-dark" />
              </button>

              <LanguageSelector />
            </div>
          </div>
        </div>

        {/* Menu lateral mobile */}
      {mobileMenuOpen && (
  <nav
    className="fixed inset-0 w-full h-full bg-white flex flex-col p-6 z-[9999]"
    style={{ height: "100vh", width: "100vw", left: 0, top: 0 }}
  >
    <button
      className="self-end mb-6"
      onClick={() => setMobileMenuOpen(false)}
      aria-label="Fechar menu"
    >
      <X className="w-7 h-7 text-brand-dark" />
    </button>
    <ul className="flex flex-col gap-6 text-brand-dark font-medium text-lg mt-8">
      <li onClick={() => scrollToSection(0)} className="cursor-pointer hover:text-brand-accent transition">
        {t ? t('navHome') : 'Home'}
      </li>
      <li onClick={() => scrollToSection(1)} className="cursor-pointer hover:text-brand-accent transition">
        {t ? t('navAbout') : 'Sobre'}
      </li>
      <li onClick={() => scrollToSection(2)} className="cursor-pointer hover:text-brand-accent transition">
        {t ? t('navProjects') : 'Projetos'}
      </li>
      <li onClick={() => scrollToSection(3)} className="cursor-pointer hover:text-brand-accent transition">
        Portfólio
      </li>
      <li onClick={() => scrollToSection(4)} className="cursor-pointer hover:text-brand-accent transition">
        Skills
      </li>
      <li onClick={() => scrollToSection(5)} className="cursor-pointer hover:text-brand-accent transition">
        {t ? t('navContact') : 'Contato'}
      </li>
    </ul>
  </nav>
)}
      </nav>

      <div className="relative">
        {sections.map((section, index) => (
          <div key={index}>
            <div
              id={`section-${index}`}
              className="w-full flex items-center justify-center relative"
              style={{
                minHeight: index === sections.length - 1 ? undefined : "100vh",
                paddingTop: index === 0 ? "0" : "4rem",
                paddingBottom: index === sections.length - 1 ? undefined : "4rem"
              }}
            >
              {section}
            </div>

            {/* Separador entre seções, exceto na última */}
            {index < sections.length - 1 && (
              <div className="w-full py-8 bg-gray-50/50">
                <div className="max-w-6xl mx-auto px-6">
                  <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
