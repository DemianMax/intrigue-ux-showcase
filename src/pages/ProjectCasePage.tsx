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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const fetchProjectById = async (projectId: string, language: string): Promise<Project | null> => {
  const tableName = language === 'en' ? 'projects_en' : 'projects_pt';
  const { data, error } = await supabase
    .from(tableName)
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

import { useProjectById } from "@/hooks/useProjectById";

const { data: project, isLoading, isError } = useProjectById(projectId!);


  const parseTextToArray = (text: string | null): string[] => {
    if (!text) return [];
    return text.split(/[,\n]/).map(item => item.trim()).filter(item => item);
  };

  const parseLegendsToArray = (text: string | null): string[] => {
    if (!text) return [];
    return text.split(',').map(item => item.trim()).filter(item => item);
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
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (isError || !project) {
    return <NotFound />;
  }

  const processImages = parseTextToArray(project.process_images_text);
  const processLegends = parseLegendsToArray(project.process_legends_text);
  const solutionImages = parseTextToArray(project.solution_images_text);
  const solutionLegends = parseLegendsToArray(project.solution_images_legends_text);
  const results = parseLegendsToArray(project.results_text);

  return (
    <div className="bg-background min-h-screen relative font-inter">
      <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur z-30 border-b border-border shadow-sm">
        <div className="flex items-center justify-between max-w-6xl mx-auto px-5 py-3">
          <div className="font-playfair font-bold text-xl text-brand-dark cursor-pointer" onClick={handleScrollToTop}>
            Max Demian
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ul className="flex items-center gap-7 text-brand-dark font-semibold text-base">
              <li className="cursor-pointer hover:text-brand-accent transition" onClick={handleScrollToTop}>{t('navHome')}</li>
              <li className="cursor-pointer hover:text-brand-accent transition" onClick={handleScrollToTop}>{t('navAbout')}</li>
              <li className="cursor-pointer hover:text-brand-accent transition" onClick={handleScrollToTop}>{t('navProjects')}</li>
              <li className="cursor-pointer hover:text-brand-accent transition" onClick={handleScrollToTop}>{t('navContact')}</li>
              <li><a href="/curriculo" className="hover:text-brand-accent transition font-semibold">{t('resume') ?? 'Currículo'}</a></li>
            </ul>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Languages className="h-5 w-5 text-brand-dark" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('pt')}>{t('portuguese')}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')}>{t('english')}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button className="p-2 -mr-2"><Menu className="h-6 w-6 text-brand-dark" /></button>
              </SheetTrigger>
              <SheetContent side="right">
                <ul className="flex flex-col gap-7 pt-10 text-brand-dark font-semibold text-lg">
                  <li onClick={handleScrollToTop}>{t('navHome')}</li>
                  <li onClick={handleScrollToTop}>{t('navAbout')}</li>
                  <li onClick={handleScrollToTop}>{t('navProjects')}</li>
                  <li onClick={handleScrollToTop}>{t('navContact')}</li>
                  <li><a href="/curriculo">{t('resume') ?? 'Currículo'}</a></li>
                </ul>
                <div className="border-t mt-8 pt-6">
                  <h3 className="px-2 py-1.5 text-sm font-semibold">{t('selectLanguage')}</h3>
                  <div className="flex flex-col gap-2 mt-2">
                    <Button variant={language === 'pt' ? 'secondary' : 'ghost'} onClick={() => { setLanguage('pt'); setIsSheetOpen(false); }}>{t('portuguese')}</Button>
                    <Button variant={language === 'en' ? 'secondary' : 'ghost'} onClick={() => { setLanguage('en'); setIsSheetOpen(false); }}>{t('english')}</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <div className="py-10 px-5 lg:px-32 flex flex-col items-start pt-24">
        <div className="self-start mb-8 w-full max-w-4xl mx-auto">
          <button className="flex items-center text-brand-accent font-medium hover:underline" onClick={() => navigate("/")}>
            <ChevronRight size={18} className="rotate-180 mr-1" />
            {t('backButton') ?? 'Voltar'}
          </button>
        </div>

        <div className="max-w-4xl w-full mx-auto">
          <h2 className="text-4xl sm:text-5xl font-playfair text-brand-dark font-bold mb-3">{project.title}</h2>
          <div className="text-lg text-brand-accent font-semibold mb-1">{project.role}</div>
          <div className="text-xl text-brand-dark/70 mb-8">{project.solution}</div>

          {project.challenge && (
            <section className="mb-12">
              <h3 className="text-2xl font-playfair text-brand-dark mb-2">{t('caseStudyChallenge')}</h3>
              <p className="text-lg text-brand-dark/70 mb-4">{project.challenge}</p>
            </section>
          )}

          {processImages.length > 0 && (
            <section className="mb-12">
              <h3 className="text-2xl font-playfair text-brand-dark mb-5">{t('caseStudyProcess')}</h3>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {processImages.map((img, index) => (
                  <div key={`process-${index}`} className="bg-card rounded-xl shadow-md p-4 flex flex-col items-center">
                    <img src={img} alt={processLegends[index] ?? `Processo ${index + 1}`} className="w-full h-40 object-cover rounded-md mb-3 border" />
                    <div className="text-sm text-center">{processLegends[index]}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {solutionImages.length > 0 && (
            <section className="mb-12">
              <h3 className="text-2xl font-playfair text-brand-dark mb-5">{t('caseStudySolution')}</h3>
              <div className="space-y-8">
                {solutionImages.map((img, index) => (
                  <div key={`solution-${index}`} className="flex flex-col items-center">
                    <img src={img} alt={solutionLegends[index]} className="w-full max-w-2xl object-cover rounded-2xl mb-3 border" />
                    {solutionLegends[index] && <div className="text-sm text-center">{solutionLegends[index]}</div>}
                  </div>
                ))}
                {project.ui_note && <div className="text-base text-center mt-4">{project.ui_note}</div>}
              </div>
            </section>
          )}

          {(results.length > 0 || project.next_steps) && (
            <section>
              {results.length > 0 && (
                <>
                  <h3 className="text-2xl font-playfair text-brand-dark mb-2">{t('caseStudyResults')}</h3>
                  <ul className="mb-4 ml-6 list-disc">
                    {results.map((res, idx) => <li key={`result-${idx}`}>{res}</li>)}
                  </ul>
                </>
              )}
              {project.next_steps && (
                <div className="text-base mb-3">
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
