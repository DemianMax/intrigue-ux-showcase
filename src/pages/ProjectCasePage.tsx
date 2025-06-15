
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import NotFound from './NotFound';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types/project';
import { Skeleton } from '@/components/ui/skeleton';

const fetchProjectById = async (projectId: string): Promise<Project | null> => {
  if (!supabase) {
    return null;
  }
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

  return data;
};

const ProjectCasePage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const { data: project, isLoading, isError } = useQuery<Project | null>({
    queryKey: ['project', projectId],
    queryFn: () => fetchProjectById(projectId!),
    enabled: !!projectId && !!supabase,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!supabase) {
    return (
       <div className="bg-background min-h-screen py-10 px-5 lg:px-32 flex flex-col items-center justify-center">
         <div className="text-center p-6 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg max-w-md w-full">
           <h2 className="text-2xl font-playfair font-bold mb-2">Supabase não configurado</h2>
           <p className="mb-4">Por favor, configure a integração com o Supabase para carregar os detalhes do projeto.</p>
           <button
             className="flex items-center mx-auto px-5 py-2 rounded-full bg-brand-accent text-white font-semibold shadow hover:bg-brand-dark/90 transition"
             onClick={() => navigate("/")}
           >
             <ChevronRight size={18} className="rotate-180 mr-1" />
             Voltar
           </button>
         </div>
       </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen py-10 px-5 lg:px-32 flex flex-col items-start">
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
    );
  }

  if (isError || !project) {
    return <NotFound />;
  }

  return (
    <div className="bg-background min-h-screen py-10 px-5 lg:px-32 flex flex-col items-start">
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
        <section className="mb-12">
          <h3 className="text-2xl font-playfair text-brand-dark mb-2 text-left">{t('caseStudyChallenge')}</h3>
          <p className="text-lg text-brand-dark/70 font-inter mb-4 text-left">
            {project.caseStudy.challenge}
          </p>
        </section>
        <section className="mb-12">
          <h3 className="text-2xl font-playfair text-brand-dark mb-5 text-left">{t('caseStudyProcess')}</h3>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {project.caseStudy.process.map(step => (
              <div key={step.legend} className="bg-card rounded-xl shadow-md p-4 flex flex-col items-center">
                <img src={step.img} alt={step.legend} className="w-full h-40 object-cover rounded-md mb-3 border border-border" />
                <div className="text-sm text-brand-dark/80 font-inter text-center">
                  {step.legend}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-12">
          <h3 className="text-2xl font-playfair text-brand-dark mb-2 text-left">{t('caseStudySolution')}</h3>
          <div className="flex flex-col items-center">
            <img src={project.caseStudy.solutionImg} alt={project.caseStudy.solutionLegend} className="w-full max-w-2xl h-auto object-cover rounded-2xl mb-3 border border-border" />
            <div className="text-sm text-brand-dark/80 font-inter mb-2 text-center">{project.caseStudy.solutionLegend}</div>
            <div className="text-base text-brand-dark/70 font-inter text-center mt-4">
              {project.caseStudy.uiNote}
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-2xl font-playfair text-brand-dark mb-2 text-left">{t('caseStudyResults')}</h3>
          <ul className="mb-4 ml-6 list-disc text-brand-dark/80 font-inter text-left">
            {project.caseStudy.results.map((res, idx) => <li key={idx}>{res}</li>)}
          </ul>
          <div className="text-base text-brand-dark/70 font-inter mb-3 text-left">
            <strong>{t('caseStudyNextSteps')}</strong> {project.caseStudy.next}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectCasePage;
