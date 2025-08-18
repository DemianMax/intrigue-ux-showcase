
import React from "react";
import ProjectCard from "./ProjectCard";
import { useProjects } from "@/hooks/useProjects";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";

const ProjectsGrid: React.FC = () => {
  const { t } = useLanguage();
  const { data: projects, isLoading, isError } = useProjects();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-8" id="projetos">
      <h3 className="text-4xl font-playfair font-bold text-brand-dark mb-12 text-center">
        {t('projectsTitle')}
      </h3>
      
      {isLoading && (
        <div className="space-y-8 w-full max-w-4xl">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col lg:flex-row gap-6 items-center">
              <Skeleton className="w-full lg:w-1/2 h-48 rounded-2xl" />
              <div className="w-full lg:w-1/2 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-16 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-10" />
                </div>
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          ))}
        </div>
      )}
      
      {isError && <p className="text-center text-red-500">Falha ao carregar projetos.</p>}
      
      {!isLoading && !isError && (
        <>
          {projects && projects.length > 0 ? (
            <div className="space-y-12 w-full">
              {projects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                />
              ))}
            </div>

          ) : (
            <div className="text-center p-6 bg-sky-50 border border-sky-200 text-sky-700 rounded-2xl max-w-md">
              Nenhum projeto encontrado. Adicione projetos no seu painel Supabase.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectsGrid;
