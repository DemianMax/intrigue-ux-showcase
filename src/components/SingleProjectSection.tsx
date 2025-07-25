import React from "react";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

interface SingleProjectSectionProps {
  project: Project;
  index: number;
}

const SingleProjectSection: React.FC<SingleProjectSectionProps> = ({ project, index }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Função para converter texto separado por vírgula em array
  const parseTextToArray = (text: string | null): string[] => {
    if (!text) return [];
    return text.split(',').map(item => item.trim()).filter(item => item.length > 0);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row-reverse gap-8 items-center max-w-5xl w-full"
      >
        {/* Imagem do projeto (sempre à direita no desktop) */}
        <motion.div className="w-full lg:w-1/2 relative">
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <img
              src={project.image}
              alt={`Projeto ${project.title}`}
              className="w-full h-64 lg:h-80 object-cover"
            />
          </div>
        </motion.div>

        {/* Conteúdo do projeto (sempre à esquerda no desktop) */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="space-y-3">
            <motion.h4 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl lg:text-3xl font-playfair font-bold text-brand-dark"
            >
              {project.title}
            </motion.h4>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-brand-accent font-semibold text-lg"
            >
              {project.role}
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4 text-gray-700"
          >
            <div>
              <h5 className="font-semibold text-brand-dark mb-2">{t('projectProblem')}:</h5>
              <p className="leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <h5 className="font-semibold text-brand-dark mb-2">{t('projectSolution')}:</h5>
              <p className="leading-relaxed">{project.solution}</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            {parseTextToArray(project.hashtags_text).slice(0, 5).map((tag, idx) => (
              <span
                key={idx}
                className="text-sm font-medium text-brand-accent bg-brand-accent/10 rounded-full px-3 py-1 border border-brand-accent/20"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
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
    </div>
  );
};

export default SingleProjectSection;
