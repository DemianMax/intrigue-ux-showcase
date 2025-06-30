
import { useState } from "react";
import DepthHeroSection from "@/components/DepthHeroSection";
import DepthAboutSection from "@/components/DepthAboutSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import FooterSection from "@/components/FooterSection";
import PortfolioSection from "@/components/PortfolioSection";
import TechnicalSkillsSection from "@/components/TechnicalSkillsSection";
import LanguageSelector from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProjectsIndividual } from "@/hooks/useProjectsIndividual";
import { Separator } from "@/components/ui/separator";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
  { labelKey: "navHome", fallback: "Home", href: null },
  { labelKey: "navAbout", fallback: "Sobre", href: null },
  { labelKey: "navProjects", fallback: "Projetos", href: null },
  { labelKey: null, fallback: "Portfólio", href: null },
  { labelKey: null, fallback: "Skills", href: null },
  { labelKey: null, fallback: "Currículo", href: "/curriculo" },
  { labelKey: "navContact", fallback: "Contato", href: null }
];

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { data: projects, isLoading, error } = useProjectsIndividual();

  const scrollToSection = (sectionIndex: number) => {
    const element = document.getElementById(`section-${sectionIndex}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const handleNavClick = (item: typeof NAV_ITEMS[0], index: number) => {
    if (item.href) {
      // External link, don't scroll
      return;
    } else {
      scrollToSection(index);
    }
  };

  // Construção das seções
  const sections = [
    <DepthHeroSection key="hero" onScrollNext={() => scrollToSection(1)} />,
    <DepthAboutSection key="about" />,
    projects && projects.length > 0 ? (
      <div key="featured-projects" className="w-full h-full">
        <FeaturedProjectsSection projects={projects} />
      </div>
    ) : (
      <div key="no-projects" className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
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
      <nav 
        className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm"
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div
              className="font-playfair font-bold text-xl text-brand-dark dark:text-white cursor-pointer hover:text-brand-accent transition"
              onClick={() => scrollToSection(0)}
            >
              Max Demian
            </div>

            <div className="flex items-center gap-4">
              {/* Menu Desktop */}
              <ul className="hidden md:flex items-center gap-6 text-brand-dark dark:text-white font-medium text-sm">
                {NAV_ITEMS.map((item, idx) => (
                  <li key={idx}>
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="cursor-pointer hover:text-brand-accent transition"
                      >
                        {item.labelKey ? (t ? t(item.labelKey) : item.fallback) : item.fallback}
                      </Link>
                    ) : (
                      <div
                        className="cursor-pointer hover:text-brand-accent transition"
                        onClick={() => handleNavClick(item, idx)}
                      >
                        {item.labelKey ? (t ? t(item.labelKey) : item.fallback) : item.fallback}
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              {/* Hamburger - mobile */}
              <button
                className="block md:hidden p-2"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Abrir menu"
              >
                <Menu className="w-7 h-7 text-brand-dark dark:text-white" />
              </button>

              <ThemeToggle />
              <LanguageSelector />
            </div>
          </div>
        </div>

        {/* Menu lateral mobile */}
        {mobileMenuOpen && (
          <nav
            className="fixed inset-0 w-full h-full bg-background flex flex-col p-6 z-[9999]"
            style={{ height: "100vh", width: "100vw", left: 0, top: 0 }}
            aria-label="Menu Mobile"
          >
            <button
              className="self-end mb-6"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Fechar menu"
            >
              <X className="w-7 h-7 text-brand-dark dark:text-white" />
            </button>
            <ul className="flex flex-col gap-6 text-brand-dark dark:text-white font-medium text-lg mt-8">
              {NAV_ITEMS.map((item, idx) => (
                <li key={idx}>
                  {item.href ? (
                    <Link
                      to={item.href}
                      className="cursor-pointer hover:text-brand-accent transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.labelKey ? (t ? t(item.labelKey) : item.fallback) : item.fallback}
                    </Link>
                  ) : (
                    <div
                      className="cursor-pointer hover:text-brand-accent transition"
                      onClick={() => handleNavClick(item, idx)}
                    >
                      {item.labelKey ? (t ? t(item.labelKey) : item.fallback) : item.fallback}
                    </div>
                  )}
                </li>
              ))}
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
              <div className="w-full py-8 bg-gray-50/50 dark:bg-gray-900/50">
                <div className="max-w-6xl mx-auto px-6">
                  <Separator className="bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
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
