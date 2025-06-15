
import { useRef, useState } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsGrid from "@/components/ProjectsGrid";
import FooterSection from "@/components/FooterSection";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Index = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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
          <ul className="hidden md:flex items-center gap-7 text-brand-dark font-semibold text-base">
            <li className="cursor-pointer hover:text-brand-accent transition" onClick={handleScrollToTop}>Início</li>
            <li className="cursor-pointer hover:text-brand-accent transition" onClick={() => handleScrollTo(aboutRef)}>Sobre</li>
            <li className="cursor-pointer hover:text-brand-accent transition" onClick={() => handleScrollTo(projectsRef)}>Projetos</li>
            <li className="cursor-pointer hover:text-brand-accent transition" onClick={() => handleScrollTo(contactRef)}>Contato</li>
          </ul>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button className="p-2 -mr-2">
                  <Menu className="h-6 w-6 text-brand-dark" />
                  <span className="sr-only">Abrir menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="right">
                <ul className="flex flex-col items-start gap-7 pt-10 text-brand-dark font-semibold text-lg">
                  <li className="cursor-pointer hover:text-brand-accent transition" onClick={handleScrollToTop}>Início</li>
                  <li className="cursor-pointer hover:text-brand-accent transition" onClick={() => handleScrollTo(aboutRef)}>Sobre</li>
                  <li className="cursor-pointer hover:text-brand-accent transition" onClick={() => handleScrollTo(projectsRef)}>Projetos</li>
                  <li className="cursor-pointer hover:text-brand-accent transition" onClick={() => handleScrollTo(contactRef)}>Contato</li>
                </ul>
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
