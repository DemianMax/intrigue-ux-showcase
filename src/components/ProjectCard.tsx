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
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Função para converter texto separado por vírgulas em array
  const parseTextToArray = (text: string | null): string[] => {
    if (!text) return [];
    return text.split(',').map(item => item.trim()).filter(item => item.length > 0);
  };

  // Alternar layout: par = imagem à esquerda, ímpar = imagem à direita
  const isImageLeft = index % 2 === 0;

  // Escolhe os campos conforme o idioma
  const title = language === 'en' && project.title_en ? project.title_en : project.title;
  const role = language === 'en' && project.role_en ? project.role_en : project.role;
  const problem = language === 'en' && project.problem_en ? project.problem_en : project.problem;
  const solution = language === 'en' && project.solution_en ? project.solution_en : project.solution;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`flex flex-col ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center group`}
    >
      {/* Imagem do projeto */}
      <motion.div className="w-full lg:w-1/2 relative">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <img
            src={project.image}
            alt={`Projeto ${title}`}
            className="w-full h-64 lg:h-80 object-cover"
          />
        </div>
      </motion.div>

      {/* Conteúdo do projeto */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div className="space-y-3">
          <motion.h4 
            initial={{ opacity: 0, x: isImageLeft ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl lg:text-2xl font-playfair font-semibold text-brand-dark"
          >
            {title}
          </motion.h4>
          
          <motion.div 
            initial={{ opacity: 0, x: isImageLeft ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-brand-accent font-semibold text-base"
          >
            {role}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: isImageLeft ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-4 text-gray-700"
        >
          <div>
            <h5 className="font-semibold text-brand-dark mb-2">{t('projectProblem')}:</h5>
            <p className="leading-relaxed">{problem}</p>
          </div>
          
          <div>
            <h5 className="font-semibold text-brand-dark mb-2">{t('projectSolution')}:</h5>
            <p className="leading-relaxed">{solution}</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: isImageLeft ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-2"
        >
          {parseTextToArray(project.hashtags_text).map((tag, idx) => (
            <span
              key={idx}
              className="text-sm font-medium text-brand-accent bg-brand-accent/10 rounded-full px-3 py-1 border border-brand-accent/20"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: isImageLeft ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <button
            className="px-8 py-3 rounded-full bg-brand-accent text-white font-semibold shadow-lg hover:bg-brand-dark/90 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate(`/projeto/${project.id}`)}
          >
            {t('projectCaseStudyButton')}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
