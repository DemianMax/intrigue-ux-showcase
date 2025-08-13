import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
// Remover esse import se LanguageSelector não for mais usado
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

type NavItem = {
  labelKey: string | null;
  fallback: string;
  sectionIndex?: number;
  hash?: string;
  href?: string;
};

const NAV_ITEMS: NavItem[] = [
  { labelKey: "navHome",    fallback: "Home",      sectionIndex: 0, hash: "#hero" },     // Hero/About
  { labelKey: "navProjects",fallback: "Projetos",  sectionIndex: 1, hash: "#projects" }, // FeaturedProjects
  { labelKey: "navPortifolio",fallback: "Portfólio", sectionIndex: 2, hash: "#portfolio" },// PortfolioSection
  { labelKey: "navSkills",         fallback: "Skills",    sectionIndex: 3, hash: "#skills" },   // TechnicalSkills
  { labelKey: "navPlayground",         fallback: "Playground", href: "/playground" },               // Página Playground
  { labelKey: "navCurriculum",         fallback: "Currículo", href: "/curriculo" },                  // Página separada
   { labelKey: "navContact", fallback: "Contato",   sectionIndex: 4, hash: "#contact" }  // Footer/Contato
];

interface NavigationProps {
  onSectionScroll?: (sectionIndex: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onSectionScroll }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (item: NavItem) => {
    const isHome = location.pathname === "/";
    if (typeof item.sectionIndex === "number") {
      if (isHome && onSectionScroll) {
        onSectionScroll(item.sectionIndex);
      } else {
        navigate("/", { state: { sectionIndex: item.sectionIndex } });
      }
      setMobileMenuOpen(false);
    } else if (item.href) {
      navigate(item.href);
      setMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    if (onSectionScroll) {
      onSectionScroll(0);
    } else {
      navigate("/");
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm  shadow-sm"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            className="font-playfair font-bold text-xl text-brand-dark dark:text-white cursor-pointer hover:text-brand-accent transition"
            onClick={scrollToTop}
          >
            Max Demian
          </div>

          <div className="flex items-center gap-4">
            {/* Menu Desktop */}
            <ul className="hidden lg:flex items-center gap-6 text-brand-dark dark:text-white font-medium text-sm">
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
                      onClick={() => handleNavClick(item)}
                    >
                      {item.labelKey ? (t ? t(item.labelKey) : item.fallback) : item.fallback}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Botão hamburguer mobile */}
            <button
              className="block lg:hidden p-2"
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

      {/* Menu Lateral Mobile */}
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

          {/* Nome/Logo no topo do menu mobile */}
          <div
            className="mb-10 font-playfair font-bold text-2xl text-brand-dark dark:text-white cursor-pointer hover:text-brand-accent transition"
            onClick={scrollToTop}
          >
            Max Demian
          </div>

          <ul className="flex flex-col gap-6 text-brand-dark dark:text-white font-medium text-lg mt-8">
            {NAV_ITEMS.map((item, idx) => (
              <li key={idx}>
                {item.href ? (
                  <Link to={item.href} className="cursor-pointer hover:text-brand-accent transition">
                    {item.labelKey ? (t ? t(item.labelKey) : item.fallback) : item.fallback}
                  </Link>
                ) : (
                  <div
                    className="cursor-pointer hover:text-brand-accent transition"
                    onClick={() => handleNavClick(item)}
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
  );
};

export default Navigation;
