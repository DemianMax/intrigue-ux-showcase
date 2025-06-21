// ... seu código Index.tsx ...

<main className="relative z-10 pt-[76px]">
  <HeroSection onScrollToAbout={() => handleScrollTo(aboutRef)} />
  <div ref={aboutRef}>
    <AboutSection />
  </div>
  {/* Conteúdo temporário para forçar o scroll */}
  <div className="h-[200vh] w-full bg-gray-100 flex items-center justify-center text-gray-500 text-3xl">
    ROLA PRA BAIXO PRA VER O PARALLAX! (temporário)
  </div>
  {/* Fim do conteúdo temporário */}
  <div ref={projectsRef}>
    <ProjectsGrid />
  </div>
  <PortfolioSection />
  <TechnicalSkillsSection />
  <div ref={contactRef}>
    <FooterSection />
  </div>
</main>

// ... restante do seu código ...

import { useRef, useState } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsGrid from "@/components/ProjectsGrid";
import FooterSection from "@/components/FooterSection";
import PortfolioSection from "@/components/PortfolioSection";
import TechnicalSkillsSection from "@/components/TechnicalSkillsSection";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

// Importe o componente ParallaxEllipses
import ParallaxEllipses from "@/components/ParallaxEllipses";

const Index = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const handleScrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
    });
    setIsSheetOpen(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsSheetOpen(false);
  };

  return (
    // Revertendo o background para `bg-background` (que deve ser branco pelo seu tailwind.config.js)
    // Mantendo `relative` e `overflow-x-hidden`
    <div className="relative flex flex-col min-h-screen bg-background text-foreground font-inter overflow-x-hidden">
      {/* Adicione o componente ParallaxEllipses aqui, com z-index baixo para o fundo */}
      <ParallaxEllipses />

      {/* Barra de navegação fixa */}
      <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur z-30 border-b border-border shadow-sm">
        <div className="flex items-center justify-between max-w-6xl mx-auto px-5 py-3">
          <div
            className="font-playfair font-bold text-xl text-brand-dark cursor-pointer"
            onClick={handleScrollToTop}
          >
            Max Demian
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-7 text-brand-dark font-semibold text-base">
              <li
                className="cursor-pointer hover:text-brand-accent transition"
                onClick={handleScrollToTop}
              >
                {t("navHome")}
              </li>
              <li
                className="cursor-pointer hover:text-brand-accent transition"
                onClick={() => handleScrollTo(aboutRef)}
              >
                {t("navAbout")}
              </li>
              <li
                className="cursor-pointer hover:text-brand-accent transition"
                onClick={() => handleScrollTo(projectsRef)}
              >
                {t("navProjects")}
              </li>
              <li
                className="cursor-pointer hover:text-brand-accent transition"
                onClick={() => handleScrollTo(contactRef)}
              >
                {t("navContact")}
              </li>
              <li>
                <Link
                  to="/curriculo"
                  className="cursor-pointer hover:text-brand-accent transition font-semibold text-base"
                >
                  Currículo
                </Link>
              </li>
            </ul>

            {/* Language selector desktop compacto */}
            <div className="flex items-center gap-3 justify-center sm:justify-start px-2">
              {["pt", "en"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang as "pt" | "en")}
                  className={`
                    flex items-center gap-2 rounded-md font-semibold
                    transition-colors border
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent
                    px-3 py-1 text-sm
                    ${
                      language === lang
                        ? "border-brand-accent text-brand-accent"
                        : "border-transparent text-brand-dark hover:border-brand-accent hover:text-brand-accent"
                    }
                  `}
                  aria-pressed={language === lang}
                  aria-label={lang === "pt" ? t("portuguese") : t("english")}
                  type="button"
                >
                  <span className="text-xl">{lang === "pt" ? "🇧🇷" : "🇺🇸"}</span>
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
                  <span className="sr-only">{t("openMenu")}</span>
                </button>
              </SheetTrigger>
              <SheetContent side="right">
                <ul className="flex flex-col items-start gap-7 pt-10 text-brand-dark font-semibold text-lg">
                  <li
                    className="cursor-pointer hover:text-brand-accent transition"
                    onClick={handleScrollToTop}
                  >
                    {t("navHome")}
                  </li>
                  <li
                    className="cursor-pointer hover:text-brand-accent transition"
                    onClick={() => handleScrollTo(aboutRef)}
                  >
                    {t("navAbout")}
                  </li>
                  <li
                    className="cursor-pointer hover:text-brand-accent transition"
                    onClick={() => handleScrollTo(projectsRef)}
                  >
                    {t("navProjects")}
                  </li>
                  <li
                    className="cursor-pointer hover:text-brand-accent transition"
                    onClick={() => handleScrollTo(contactRef)}
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
      </nav>

      {/* Certifique-se de que HeroSection não tem background próprio que a cubra */}
      <main className="relative z-10 pt-[76px]">
        <HeroSection onScrollToAbout={() => handleScrollTo(aboutRef)} />
        <div ref={aboutRef}>
          <AboutSection />
        </div>
        <div ref={projectsRef}>
          <ProjectsGrid />
        </div>
        <PortfolioSection />
        <TechnicalSkillsSection />
        <div ref={contactRef}>
          <FooterSection />
        </div>
      </main>
    </div>
  );
};

export default Index;
