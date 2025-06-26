
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
    <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center py-12 px-6">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-playfair font-bold text-brand-dark mb-12 text-center"
      >
        Projetos em destaque
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">
        {projects.slice(0, 3).map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Imagem menor */}
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={`Projeto ${project.title}`}
                className="w-full h-40 object-cover"
              />
            </div>

            {/* Conteúdo com mais destaque */}
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h4 className="text-lg font-playfair font-bold text-brand-dark line-clamp-2">
                  {project.title}
                </h4>
                <div className="text-brand-accent font-semibold text-sm">
                  {project.role}
                </div>
              </div>

              <div className="space-y-3 text-gray-700 text-sm">
                <div>
                  <h5 className="font-semibold text-brand-dark mb-1 text-xs">{t('projectProblem')}:</h5>
                  <p className="leading-relaxed line-clamp-2">{project.problem}</p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-brand-dark mb-1 text-xs">{t('projectSolution')}:</h5>
                  <p className="leading-relaxed line-clamp-2">{project.solution}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {parseTextToArray(project.hashtags_text).slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium text-brand-accent bg-brand-accent/10 rounded-full px-2 py-1 border border-brand-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                className="w-full px-4 py-2 rounded-lg bg-brand-accent text-white font-semibold hover:bg-brand-dark/90 transition-all duration-300 text-sm"
                onClick={() => navigate(`/projeto/${project.id}`)}
              >
                {t('projectCaseStudyButton')}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProjectsSection;
