
import React from "react";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Função para converter texto separado por vírgulas em array
  const parseTextToArray = (text: string | null): string[] => {
    if (!text) return [];
    return text.split(',').map(item => item.trim()).filter(item => item.length > 0);
  };

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative bg-card rounded-2xl shadow-md flex flex-col group overflow-hidden"
    >
      <img
        src={project.image}
        alt={`Thumbnail do projeto ${project.title}`}
        className="w-full h-40 object-cover transition duration-300 group-hover:scale-105"
      />
      <div className="p-4 flex flex-col flex-grow text-left">
        <h4 className="font-playfair text-lg font-semibold text-brand-dark mb-1">{project.title}</h4>
        <div className="text-brand-accent font-semibold text-xs mb-3">{project.role}</div>

        <div className="text-sm text-brand-dark/70 mb-4 space-y-2">
          <p><strong className="font-semibold text-brand-dark">{t('projectProblem')}:</strong> {project.problem}</p>
          <p><strong className="font-semibold text-brand-dark">{t('projectSolution')}:</strong> {project.solution}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {parseTextToArray(project.hashtags_text).map((tag, idx) => (
            <span
              key={idx}
              className="text-xs font-semibold text-brand-accent bg-brand-accent/10 rounded-full px-2 py-0.5 tracking-tight"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.01em' }}
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          className="mt-auto px-5 py-2 rounded-full bg-brand-accent text-white font-semibold shadow hover:bg-brand-dark/90 transition"
          onClick={() => navigate(`/projeto/${project.id}`)}
        >
          {t('projectCaseStudyButton')}
        </button>
      </div>
    </motion.div>
  )
};

export default ProjectCard;
