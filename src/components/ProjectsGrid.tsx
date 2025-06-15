
import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";
import { useLanguage } from "@/contexts/LanguageContext";

const ProjectsGrid: React.FC = () => {
  const [openCase, setOpenCase] = useState<string | null>(null);
  const { t } = useLanguage();

  return (
    <section className="w-full max-w-6xl mx-auto px-2 py-12" id="projetos">
      <h3 className="text-3xl font-playfair font-bold text-brand-dark mb-10 text-center">{t('projectsTitle')}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} openCase={openCase} setOpenCase={setOpenCase} />
        ))}
      </div>
    </section>
  );
};
export default ProjectsGrid;
