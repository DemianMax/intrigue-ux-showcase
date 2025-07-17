import React from "react";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const parseTextToArray = (text: string | null): string[] => {
    if (!text) return [];
    return text.split(',').map(item => item.trim()).filter(item => item.length > 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Conteúdo */}
        <div className="w-full lg:w-1/2 p-6 space-y-4">
          <div className="space-y-2">
            <h4 className="text-lg lg:text-xl font-playfair font-semibold text-brand-dark dark:text-white">
              {project.title}
            </h4>
            <div className="text-brand-accent font-semibold text-sm">
              {project.role}
            </div>
          </div>

          <div className="space-y-4 text-gray-700 dark:text-gray-300 text-sm">
            <div>
              <h5 className="font-semibold text-brand-dark dark:text-white mb-2 text-xs uppercase tracking-wide">
                {t('projectProblem')}:
              </h5>
              <p className="leading-relaxed">{project.problem}</p>
            </div>
            
            <div>
              <h5 className="font-semibold text-brand-dark dark:text-white mb-2 text-xs uppercase tracking-wide">
                {t('projectSolution')}:
              </h5>
              <p className="leading-relaxed">{project.solution}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {parseTextToArray(project.hashtags_text).slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-medium text-brand-accent bg-brand-accent/10 rounded-full px-3 py-1 border border-brand-accent/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            className="w-full mt-6 px-4 py-3 rounded-xl bg-brand-accent text-white font-semibold hover:bg-orange-600 transition-all duration-300 text-sm shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            onClick={() => navigate(`/projeto/${project.id}`)}
          >
            {t('projectCaseStudyButton')}
          </button>
        </div>

        {/* Imagem */}
        <div className="w-full lg:w-1/2 relative overflow-hidden">
          <img
            src={project.image}
            alt={`Projeto ${project.title}`}
            className="w-full h-48 lg:h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;