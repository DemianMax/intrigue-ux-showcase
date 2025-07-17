
import React from "react";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

interface FeaturedProjectsSectionProps {
  projects: Project[];
}

const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({ projects }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const parseTextToArray = (text: string | null): string[] => {
    if (!text) return [];
    return text.split(',').map(item => item.trim()).filter(item => item.length > 0);
  };

  return (
    <div className="w-full h-full bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-center py-20 px-6">
      {/* Título da seção */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 max-w-4xl"
      >
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-brand-dark dark:text-white mb-4">
          Projetos em Destaque
        </h2>
        <div className="w-24 h-1 bg-brand-accent mx-auto rounded-full mb-6"></div>
        <p className="text-lg text-brand-dark/70 dark:text-gray-300 leading-relaxed">
          Conheça alguns dos projetos que desenvolvi, desde a pesquisa até a implementação
        </p>
      </motion.div>

      <div className="flex flex-col gap-8 max-w-7xl w-full">
        {projects.slice(0, 3).map((project, index) => (
          <motion.div
            key={project.id}
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
                  <h4 className="text-xl font-playfair font-bold text-brand-dark dark:text-white">
                    {project.title}
                  </h4>
                  <div className="text-brand-accent font-semibold text-sm uppercase tracking-wide">
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
        ))}
      </div>
    </div>
  );
};

export default FeaturedProjectsSection;
