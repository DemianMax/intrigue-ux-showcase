
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

  // Função para converter texto separado por vírgulas em array
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
      className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center group"
    >
      {/* Conteúdo do projeto */}
      <div className="w-full lg:w-1/2 space-y-4">
        <div className="space-y-2">
          <motion.h4 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg lg:text-xl font-playfair font-semibold text-brand-dark"
          >
            {project.title}
          </motion.h4>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-brand-accent font-semibold text-sm"
          >
            {project.role}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-3 text-gray-700 text-sm"
        >
          <div>
            <h5 className="font-semibold text-brand-dark mb-1 text-sm">{t('projectProblem')}:</h5>
            <p className="leading-relaxed line-clamp-2">{project.problem}</p>
          </div>
          
          <div>
            <h5 className="font-semibold text-brand-dark mb-1 text-sm">{t('projectSolution')}:</h5>
            <p className="leading-relaxed line-clamp-2">{project.solution}</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-1"
        >
          {parseTextToArray(project.hashtags_text).slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="text-xs font-medium text-brand-accent bg-brand-accent/10 rounded-full px-2 py-1 border border-brand-accent/20"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button
            className="px-6 py-2 rounded-full bg-brand-accent text-white font-semibold shadow-md hover:bg-brand-dark/90 hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm"
            onClick={() => navigate(`/projeto/${project.id}`)}
          >
            {t('projectCaseStudyButton')}
          </button>
        </motion.div>
      </div>

      {/* Imagem do projeto */}
      <motion.div className="w-full lg:w-1/2 relative">
        <div className="relative overflow-hidden rounded-xl shadow-lg">
          <img
            src={project.image}
            alt={`Projeto ${project.title}`}
            className="w-full h-48 lg:h-56 object-cover"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
