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
    // <--- MUDANÇA PRINCIPAL AQUI: Adicionando altura fixa no card inteiro
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      // Definindo uma altura fixa para o card inteiro (ajuste os valores conforme sua preferência)
      // Sugestão: h-[400px] para mobile e lg:h-[300px] para desktop. Use px ou h-XX do tailwind.
      // O `flex-col lg:flex-row` com `items-center` e `gap` já está bom.
      className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center group
                 h-[500px] sm:h-[400px] lg:h-[320px] xl:h-[300px] 
                 overflow-hidden rounded-xl shadow-lg border border-brand-accent/20 
                 p-6 sm:p-8 bg-card dark:bg-card-dark" // Adicionei cores e padding de exemplo para o card
    >
      {/* Conteúdo do projeto */}
      {/* Adicione `h-full` para que a div de conteúdo ocupe toda a altura do pai */}
      <div className="w-full lg:w-1/2 space-y-4 h-full flex flex-col justify-between"> 
        <div> {/* Este div vai agrupar o título, role, problema e solução para que o botão fique no final */}
          <div className="space-y-2">
            <motion.h4
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl font-playfair font-semibold text-brand-dark dark:text-white"
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
            className="space-y-3 text-gray-700 text-sm dark:text-gray-300"
          >
            <div>
              <h5 className="font-semibold text-brand-dark dark:text-white mb-1 text-sm">{t('projectProblem')}:</h5>
              {/* Adicione `line-clamp-2` ou `line-clamp-3` para limitar o texto e evitar estouro */}
              <p className="leading-relaxed line-clamp-3">{project.problem}</p> 
            </div>

            <div>
              <h5 className="font-semibold text-brand-dark dark:text-white mb-1 text-sm">{t('projectSolution')}:</h5>
              <p className="leading-relaxed line-clamp-3">{project.solution}</p>
            </div>
          </motion.div>
        </div> {/* Fim do div de agrupamento de texto */}
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-1 mt-4" // Adicionei um mt-4 para separar das descrições
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
          className="mt-6" // Garante espaçamento com o botão
        >
          <button
            className="px-6 py-2 rounded-full bg-brand-accent text-white font-semibold shadow-md hover:bg-brand-dark/90 hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm"
            onClick={() => navigate(`/projeto/${project.id}`)}
          >
            {t('projectCaseStudyButton')}
          </button>
        </motion.div>
      </div>

      {/* Imagem do projeto - Ajuste para preencher a altura fixa do pai */}
      <motion.div className="w-full lg:w-1/2 relative h-full flex items-center justify-center"> {/* Adicionei flex e items-center para centralizar se a imagem for menor */}
        <div className="relative overflow-hidden rounded-xl shadow-lg w-full h-[90%]"> {/* Ajuste h-[90%] para deixar um pequeno respiro se quiser, ou h-full */}
          <img
            src={project.image}
            alt={`Projeto ${project.title}`}
            className="w-full h-full object-cover" // Imagem preenche 100% da largura e altura do seu contêiner
          />
          {/* O gradiente que você encontrou. Ele deve estar aqui se você o quer no seu design. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
