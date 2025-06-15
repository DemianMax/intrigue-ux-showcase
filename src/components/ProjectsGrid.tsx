
import React from "react";
import ProjectCard from "./ProjectCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/types/project";
import { Skeleton } from "@/components/ui/skeleton";

const fetchProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Could not fetch projects');
  }
  return data || [];
};

const ProjectsGrid: React.FC = () => {
  const { t } = useLanguage();
  const { data: projects, isLoading, isError } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  return (
    <section className="w-full max-w-6xl mx-auto px-2 py-12" id="projetos">
      <h3 className="text-3xl font-playfair font-bold text-brand-dark mb-10 text-left">{t('projectsTitle')}</h3>
      
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3 bg-card rounded-2xl shadow-md overflow-hidden p-4">
              <Skeleton className="h-40 w-full rounded-lg" />
              <div className="space-y-2 pt-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-5/6 mt-4" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </div>
          ))}
        </div>
      )}
      
      {isError && <p className="text-center text-red-500">Falha ao carregar projetos.</p>}
      
      {!isLoading && !isError && (
        <>
          {projects && projects.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center p-4 bg-sky-50 border border-sky-200 text-sky-700 rounded-lg">
                Nenhum projeto encontrado. Adicione projetos no seu painel Supabase.
            </div>
          )}
        </>
      )}
    </section>
  );
};
export default ProjectsGrid;
