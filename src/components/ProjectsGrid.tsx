
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
  return (data as unknown as Project[]) || [];
};

const ProjectsGrid: React.FC = () => {
  const { t } = useLanguage();
  const { data: projects, isLoading, isError } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16" id="projetos">
      <h3 className="text-3xl font-playfair font-bold text-brand-dark mb-16 text-center">{t('projectsTitle')}</h3>
      
      {isLoading && (
        <div className="space-y-16">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col lg:flex-row gap-8 items-center">
              <Skeleton className="w-full lg:w-1/2 h-64 rounded-2xl" />
              <div className="w-full lg:w-1/2 space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-14" />
                </div>
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          ))}
        </div>
      )}
      
      {isError && <p className="text-center text-red-500">Falha ao carregar projetos.</p>}
      
      {!isLoading && !isError && (
        <>
          {projects && projects.length > 0 ? (
            <div className="space-y-20">
              {projects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-sky-50 border border-sky-200 text-sky-700 rounded-2xl">
              Nenhum projeto encontrado. Adicione projetos no seu painel Supabase.
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ProjectsGrid;
