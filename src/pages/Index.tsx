import { useRef, useState } from "react";
import ScrollDepthLayout from "@/components/ScrollDepthLayout";
import DepthHeroSection from "@/components/DepthHeroSection";
import DepthAboutSection from "@/components/DepthAboutSection";
import ProjectsGrid from "@/components/ProjectsGrid";
import FooterSection from "@/components/FooterSection";
import PortfolioSection from "@/components/PortfolioSection";
import TechnicalSkillsSection from "@/components/TechnicalSkillsSection";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const { t, language, setLanguage } = useLanguage();

  const scrollToNextSection = () => {
    setCurrentSection(prev => Math.min(prev + 1, 5));
    window.scrollTo({
      top: window.innerHeight * (currentSection + 1),
      behavior: "smooth",
    });
  };

  const handleScrollToTop = () => {
    setCurrentSection(0);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsSheetOpen(false);
  };

  const sections = [
    <DepthHeroSection key="hero" onScrollNext={scrollToNextSection} />,
    <DepthAboutSection key="about" />,
    <div key="projects" className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-purple-50">
      <div className="w-full max-w-6xl mx-auto">
        <ProjectsGrid />
      </div>
    </div>,
    <div key="portfolio" className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-green-50">
      <PortfolioSection />
    </div>,
    <div key="skills" className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-orange-50">
      <TechnicalSkillsSection />
    </div>,
    <div key="contact" className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 via-gray-50 to-brand-dark">
      <FooterSection />
    </div>
  ];

  return (
    <div className="relative font-inter">
      {/* Floating Navigation */}
      <motion.nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-lg rounded-full border border-white/20 shadow-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="flex items-center justify-between px-6 py-3">
          <div
            className="font-playfair font-bold text-xl text-brand-dark cursor-pointer"
            onClick={handleScrollToTop}
          >
            Max Demian
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 ml-8">
            <ul className="flex items-center gap-6 text-brand-dark font-medium text-sm">
              <li className="cursor-pointer hover:text-brand-accent transition" onClick={handleScrollToTop}>
                {t("navHome")}
              </li>
              <li className="cursor-pointer hover:text-brand-accent transition">
                {t("navAbout")}
              </li>
              <li className="cursor-pointer hover:text-brand-accent transition">
                {t("navProjects")}
              </li>
              <li className="cursor-pointer hover:text-brand-accent transition">
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
                    onClick={handleScrollToTop}
                  >
                    {t("navHome")}
                  </li>
                  <li
                    className="cursor-pointer hover:text-brand-accent transition"
                    onClick={() => handleScrollToTop()}
                  >
                    {t("navAbout")}
                  </li>
                  <li
                    className="cursor-pointer hover:text-brand-accent transition"
                    onClick={() => handleScrollToTop()}
                  >
                    {t("navProjects")}
                  </li>
                  <li
                    className="cursor-pointer hover:text-brand-accent transition"
                    onClick={() => handleScrollToTop()}
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
      </motion.nav>

      <ScrollDepthLayout>{sections}</ScrollDepthLayout>
    </div>
  );
};

export default Index;
