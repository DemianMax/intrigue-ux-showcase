import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NotFound from './NotFound';
import { ChevronRight, Menu, Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/types/project';
import { Skeleton } from '@/components/ui/skeleton';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const fetchProjectById = async (projectId: string): Promise<Project | null> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      console.warn(`Project with id ${projectId} not found.`);
      return null;
    }
    console.error('Error fetching project:', error);
    throw new Error('Could not fetch project');
  }

  return data as unknown as Project | null;
};

const ProjectCasePage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  const { data: project, isLoading, isError } = useQuery<Project | null>({
    queryKey: ['project', projectId],
    queryFn: () => fetchProjectById(projectId!),
    enabled: !!projectId,
  });

  // Função melhorada para converter texto separado por vírgulas ou quebras de linha em array
  const parseTextToArray = (text: string | null): string[] => {
    if (!text) return [];
    
    // Remove espaços extras e divide por vírgulas ou quebras de linha
    return text
      .split(/[,\n]/)
      .map(item => item.trim())
      .filter(item => item.length > 0)
      .filter(item => {
        // Verifica se é uma URL válida ou pelo menos contém um formato de arquivo de imagem
        try {
          new URL(item);
          return true;
        } catch {
          // Se não for URL válida, verifica se termina com extensão de imagem
          return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(item);
        }
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleScrollToTop = () => {
    navigate("/");
    setIsSheetOpen(false);
  };

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        {/* Navigation bar skeleton */}
        <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur z-30 border-b border-border shadow-sm">
          <div className="flex items-center justify-between max-w-6xl mx-auto px-5 py-3">
            <Skeleton className="h-6 w-24" />
            <div className="hidden md:flex items-center gap-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-8 w-8" />
            </div>
            <div className="md:hidden">
              <Skeleton className="h-6 w-6" />
            </div>
          </div>
        </nav>
        <div className="py-10 px-5 lg:px-32 flex flex-col items-start pt-24">
          <div className="self-start mb-8 w-full max-w-4xl mx-auto">
            <Skeleton className="h-8 w-24" />
          </div>
          <div className="max-w-4xl w-full mx-auto space-y-4">
            <Skeleton className="h-14 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-8 w-full mb-4" />
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !project) {
    return <NotFound />;
  }

  const processImages = parseTextToArray(project.process_images_text);
  const processLegends = parseTextToArray(project.process_legends_text);
  const results = parseTextToArray(project.results_text);

  console.log('Process images:', processImages);
  console.log('Process legends:', processLegends);

  return (
    <div className="bg-background min-h-screen relative font-inter">
      {/* Navigation bar */}
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
              <li className="cursor-pointer hover:text-brand-accent transition" onClick={handleScrollToTop}>{t('navAbout')}</li>
              <li className="cursor-pointer hover:text-brand-accent transition" onClick={handleScrollToTop}>{t('navProjects')}</li>
              <li className="cursor-pointer hover:text-brand-accent transition" onClick={handleScrollToTop}>{t('navContact')}</li>
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
                  <li className="cursor-pointer hover:text-brand-accent transition" onClick={handleScrollToTop}>{t('navAbout')}</li>
                  <li className="cursor-pointer hover:text-brand-accent transition" onClick={handleScrollToTop}>{t('navProjects')}</li>
                  <li className="cursor-pointer hover:text-brand-accent transition" onClick={handleScrollToTop}>{t('navContact')}</li>
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

      {/* Content with top padding to account for fixed nav */}
      <div className="py-10 px-5 lg:px-32 flex flex-col items-start pt-24">
        <div className="self-start mb-8 w-full max-w-4xl mx-auto">
          <button
            className="flex items-center text-brand-accent font-inter font-medium hover:underline hover:text-brand-dark transition"
            onClick={() => navigate("/")}
          >
            <ChevronRight size={18} className="rotate-180 mr-1" />
            Voltar
          </button>
        </div>
        <div className="max-w-4xl w-full mx-auto">
          <h2 className="text-4xl sm:text-5xl font-playfair text-brand-dark font-bold mb-3 text-left">
            {project.title}
          </h2>
          <div className="text-lg text-brand-accent font-inter font-semibold mb-1 text-left">
            {project.role}
          </div>
          <div className="text-xl text-brand-dark/70 font-inter mb-8 text-left">
            {project.solution}
          </div>
          {project.challenge && (
            <section className="mb-12">
              <h3 className="text-2xl font-playfair text-brand-dark mb-2 text-left">{t('caseStudyChallenge')}</h3>
              <p className="text-lg text-brand-dark/70 font-inter mb-4 text-left">
                {project.challenge}
              </p>
            </section>
          )}
          {processImages.length > 0 && (
            <section className="mb-12">
              <h3 className="text-2xl font-playfair text-brand-dark mb-5 text-left">{t('caseStudyProcess')}</h3>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {processImages.map((img, index) => (
                  <div key={`process-${index}`} className="bg-card rounded-xl shadow-md p-4 flex flex-col items-center">
                    <img 
                      src={img} 
                      alt={processLegends[index] ?? `Process image ${index + 1}`} 
                      className="w-full h-40 object-cover rounded-md mb-3 border border-border"
                      onError={(e) => {
                        console.error('Error loading image:', img);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="text-sm text-brand-dark/80 font-inter text-center">
                      {processLegends[index] ?? `Processo ${index + 1}`}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {project.solution_image && (
            <section className="mb-12">
              <h3 className="text-2xl font-playfair text-brand-dark mb-2 text-left">{t('caseStudySolution')}</h3>
              <div className="flex flex-col items-center">
                <img 
                  src={project.solution_image} 
                  alt={project.solution_legend ?? 'Solution image'} 
                  className="w-full max-w-2xl h-auto object-cover rounded-2xl mb-3 border border-border"
                  onError={(e) => {
                    console.error('Error loading solution image:', project.solution_image);
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {project.solution_legend && <div className="text-sm text-brand-dark/80 font-inter mb-2 text-center">{project.solution_legend}</div>}
                {project.ui_note && <div className="text-base text-brand-dark/70 font-inter text-center mt-4">{project.ui_note}</div>}
              </div>
            </section>
          )}
          {(results.length > 0 || project.next_steps) && (
            <section>
              {results.length > 0 && (
                <>
                  <h3 className="text-2xl font-playfair text-brand-dark mb-2 text-left">{t('caseStudyResults')}</h3>
                  <ul className="mb-4 ml-6 list-disc text-brand-dark/80 font-inter text-left">
                    {results.map((res, idx) => <li key={`result-${idx}`}>{res}</li>)}
                  </ul>
                </>
              )}
              {project.next_steps && (
                <div className="text-base text-brand-dark/70 font-inter mb-3 text-left">
                  <strong>{t('caseStudyNextSteps')}</strong> {project.next_steps}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCasePage;
