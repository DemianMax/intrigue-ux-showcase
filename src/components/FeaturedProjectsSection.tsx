
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
    <div className="w-full h-full bg-background flex flex-col items-center justify-center py-20 px-6">
      {/* Título da seção */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 max-w-4xl"
      >
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
          Projetos em Destaque
        </h2>
        <div className="w-24 h-1 bg-border mx-auto mb-6"></div>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Conheça alguns dos projetos que desenvolvi, desde a pesquisa até a implementação
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {projects.slice(0, 3).map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-transparent border-2 border-border rounded-none overflow-hidden hover:bg-border/5 transition-all duration-300 transform hover:-translate-y-2"
          >
            {/* Imagem wireframe style */}
            <div className="relative overflow-hidden border-b-2 border-border">
              <div className="w-full h-48 bg-transparent border-border relative">
                <img
                  src={project.image}
                  alt={`Projeto ${project.title}`}
                  className="w-full h-full object-cover opacity-20 transition-opacity duration-300 hover:opacity-40"
                />
                {/* Wireframe overlay */}
                <div className="absolute inset-0 border border-border">
                  <div className="absolute top-4 left-4 right-4">
                    <div className="h-2 bg-border/30 mb-2"></div>
                    <div className="h-2 bg-border/30 w-3/4"></div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="h-1 bg-border/30 mb-1"></div>
                    <div className="h-1 bg-border/30 w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h4 className="text-xl font-playfair font-bold text-foreground line-clamp-2">
                  {project.title}
                </h4>
                <div className="text-accent-foreground font-semibold text-sm uppercase tracking-wide">
                  {project.role}
                </div>
              </div>

              <div className="space-y-4 text-muted-foreground text-sm">
                <div>
                  <h5 className="font-semibold text-foreground mb-2 text-xs uppercase tracking-wide">
                    {t('projectProblem')}:
                  </h5>
                  <p className="leading-relaxed line-clamp-2">{project.problem}</p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-foreground mb-2 text-xs uppercase tracking-wide">
                    {t('projectSolution')}:
                  </h5>
                  <p className="leading-relaxed line-clamp-2">{project.solution}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {parseTextToArray(project.hashtags_text).slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium text-foreground bg-transparent rounded-none px-3 py-1 border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                className="w-full mt-6 px-4 py-3 rounded-none bg-transparent border-2 border-border text-foreground font-semibold hover:bg-border/10 transition-all duration-300 text-sm transform hover:scale-[1.02]"
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
