import { useRef, useState } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsGrid from "@/components/ProjectsGrid";
import FooterSection from "@/components/FooterSection";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Index = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const handleScrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth'
    });
    setIsSheetOpen(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsSheetOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative font-inter">
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
          <div className="hidden md:flex items-center gap-4">
            <ul className="flex items-center gap-7 text-brand-dark font-semibold text-base">
              <li className="cursor-pointer hover:text-brand-accent transition" onClick={handleScrollToTop}>{t('navHome')}</li>
              <li className="cursor-pointer hover:text-brand-accent transition" onClick={() => handleScrollTo(aboutRef)}>{t('navAbout')}</li>
              <li className="cursor-pointer hover:text-brand-accent transition" onClick={() => handleScrollTo(projectsRef)}>{t('navProjects')}</li>
              <li className="cursor-pointer hover:text-brand-accent transition" onClick={() => handleScrollTo(contactRef)}>{t('navContact')}</li>
              <li>
                <a href="/curriculo" className="cursor-pointer hover:text-brand-accent transition font-semibold text-base">
                  Currículo
                </a>
              </li>
            </ul>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Languages className="h-5 w-5 text-brand-dark" />
                  <span className="sr-only">{t('selectLanguage')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('pt')}>
                  {t('portuguese')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  {t('english')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button className="p-2 -mr-2">
                  <Menu className="h-6 w-6 text-brand-dark" />
                  <span className="sr-only">{t('openMenu')}</span>
                </button>
              </SheetTrigger>
              <SheetContent side="right">
                <ul className="flex flex-col items-start gap-7 pt-10 text-brand-dark font-semibold text-lg">
                  <li className="cursor-pointer hover:text-brand-accent transition" onClick={handleScrollToTop}>{t('navHome')}</li>
                  <li className="cursor-pointer hover:text-brand-accent transition" onClick={() => handleScrollTo(aboutRef)}>{t('navAbout')}</li>
                  <li className="cursor-pointer hover:text-brand-accent transition" onClick={() => handleScrollTo(projectsRef)}>{t('navProjects')}</li>
                  <li className="cursor-pointer hover:text-brand-accent transition" onClick={() => handleScrollTo(contactRef)}>{t('navContact')}</li>
                  <li>
                    <a href="/curriculo" className="cursor-pointer hover:text-brand-accent transition font-semibold text-lg" onClick={() => setIsSheetOpen(false)}>
                      Currículo
                    </a>
                  </li>
                </ul>
                <div className="border-t border-border mt-8 pt-6">
                   <h3 className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">{t('selectLanguage')}</h3>
                   <div className="flex flex-col gap-2 mt-2">
                      <Button variant={language === 'pt' ? 'secondary' : 'ghost'} className="justify-start w-full" onClick={() => { setLanguage('pt'); setIsSheetOpen(false); }}>{t('portuguese')}</Button>
                      <Button variant={language === 'en' ? 'secondary' : 'ghost'} className="justify-start w-full" onClick={() => { setLanguage('en'); setIsSheetOpen(false); }}>{t('english')}</Button>
                   </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <HeroSection onScrollToAbout={() => handleScrollTo(aboutRef)} />
      <div ref={aboutRef}><AboutSection /></div>
      <div ref={projectsRef}><ProjectsGrid /></div>
      <div ref={contactRef}><FooterSection /></div>
    </div>
  );
};

export default Index;
