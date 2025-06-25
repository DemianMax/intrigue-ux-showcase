
import { useRef, useState } from "react";
import ScrollDepthLayout from "@/components/ScrollDepthLayout";
import DepthHeroSection from "@/components/DepthHeroSection";
import DepthAboutSection from "@/components/DepthAboutSection";
import ProjectsGrid from "@/components/ProjectsGrid";
import SingleProjectSection from "@/components/SingleProjectSection";
import FooterSection from "@/components/FooterSection";
import PortfolioSection from "@/components/PortfolioSection";
import TechnicalSkillsSection from "@/components/TechnicalSkillsSection";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProjectsIndividual } from "@/hooks/useProjectsIndividual";
import { Link } from "react-router-dom";

const Index = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const { t, language, setLanguage } = useLanguage();
  const { data: projects, isLoading } = useProjectsIndividual();

  const scrollToSection = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
    
    /* window.scrollTo({
      top: window.innerHeight * sectionIndex,
      behavior: "smooth",
    });
    /*
    
    setIsSheetOpen(false);
  };

  const scrollToNextSection = () => {
    const totalSections = 7 + (projects?.length || 0); // hero + about + 3 projects + portfolio + skills + contact
    const nextSection = Math.min(currentSection + 1, totalSections - 1);
    scrollToSection(nextSection);
  };

  // Criar seções dinamicamente baseadas nos projetos
  const createSections = () => {
    const sections = [
      <DepthHeroSection key="hero" onScrollNext={scrollToNextSection} />,
      <DepthAboutSection key="about" />,
    ];

    // Adicionar seções de projetos individuais
    if (projects && projects.length > 0) {
      projects.forEach((project, index) => {
        sections.push(
          <div key={`project-${project.id}`} className="w-full h-full">
            <SingleProjectSection project={project} index={index} />
          </div>
        );
      });
    }

    // Adicionar outras seções
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
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div
              className="font-playfair font-bold text-xl text-brand-dark cursor-pointer"
              onClick={() => scrollToSection(0)}
            >
              Max Demian
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <ul className="flex items-center gap-6 text-brand-dark font-medium text-sm">
                <li className="cursor-pointer hover:text-brand-accent transition" onClick={() => scrollToSection(0)}>
                  {t("navHome")}
                </li>
                <li className="cursor-pointer hover:text-brand-accent transition" onClick={() => scrollToSection(1)}>
                  {t("navAbout")}
                </li>
                <li className="cursor-pointer hover:text-brand-accent transition" onClick={() => scrollToSection(2)}>
                  {t("navProjects")}
                </li>
                <li className="cursor-pointer hover:text-brand-accent transition" onClick={() => scrollToSection(sections.length - 1)}>
                  {t("navContact")}
                </li>
                <li>
                  <Link to="/curriculo" className="cursor-pointer hover:text-brand-accent transition font-medium text-sm">
                    Currículo
                  </Link>
                </li>
              </ul>

              {/* Language selector */}
              <div className="flex items-center gap-2">
                {["pt", "en"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang as "pt" | "en")}
                    className={`
                      flex items-center gap-1 rounded-full font-medium transition-colors border px-3 py-1 text-xs
                      ${
                        language === lang
                          ? "border-brand-accent text-brand-accent bg-brand-accent/10"
                          : "border-transparent text-brand-dark hover:border-brand-accent hover:text-brand-accent"
                      }
                    `}
                    type="button"
                  >
                    <span className="text-sm">{lang === "pt" ? "🇧🇷" : "🇺🇸"}</span>
                    <span>{lang.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <button className="p-2 -mr-2">
                    <Menu className="h-6 w-6 text-brand-dark" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right">
                  <ul className="flex flex-col items-start gap-7 pt-10 text-brand-dark font-semibold text-lg">
                    <li
                      className="cursor-pointer hover:text-brand-accent transition"
                      onClick={() => scrollToSection(0)}
                    >
                      {t("navHome")}
                    </li>
                    <li
                      className="cursor-pointer hover:text-brand-accent transition"
                      onClick={() => scrollToSection(1)}
                    >
                      {t("navAbout")}
                    </li>
                    <li
                      className="cursor-pointer hover:text-brand-accent transition"
                      onClick={() => scrollToSection(2)}
                    >
                      {t("navProjects")}
                    </li>
                    <li
                      className="cursor-pointer hover:text-brand-accent transition"
                      onClick={() => scrollToSection(sections.length - 1)}
                    >
                      {t("navContact")}
                    </li>
                    <li>
                      <Link
                        to="/curriculo"
                        className="cursor-pointer hover:text-brand-accent transition font-semibold text-lg"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        Currículo
                      </Link>
                    </li>
                  </ul>

                  <div className="border-t border-border mt-8 pt-6">
                    <h3 className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                      {t("selectLanguage")}
                    </h3>
                    <div className="flex flex-col gap-2 mt-2 px-2">
                      {["pt", "en"].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setLanguage(lang as "pt" | "en");
                            setIsSheetOpen(false);
                          }}
                          className={`justify-start w-full rounded-md font-semibold px-4 py-2 transition-colors border text-left
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent
                            ${
                              language === lang
                                ? "border-brand-accent text-brand-accent"
                                : "border-transparent text-brand-dark hover:border-brand-accent hover:text-brand-accent"
                            }`}
                          type="button"
                          aria-pressed={language === lang}
                          aria-label={lang === "pt" ? t("portuguese") : t("english")}
                        >
                          <span className="mr-2 text-2xl">
                            {lang === "pt" ? "🇧🇷" : "🇺🇸"}
                          </span>
                          <span>{lang.toUpperCase()}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Add top padding to account for fixed navigation */}
      <div className="pt-20">
        <ScrollDepthLayout>{sections}</ScrollDepthLayout>
      </div>
    </div>
  );
};

export default Index;
