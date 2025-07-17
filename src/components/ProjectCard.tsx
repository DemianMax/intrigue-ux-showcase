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
      {/* Conteúdo do projeto (mantém-se o mesmo) */}
      <div className="w-full lg:w-1/2 space-y-4">
        {/* ... (conteúdo da esquerda) ... */}
      </div>

      {/* Imagem do projeto - REVISÃO DA ESTRUTURA E CLASSES AQUI */}
      <motion.div className="w-full lg:w-1/2 relative **h-48 lg:h-56**"> {/* <--- ALTURA APLICADA AQUI, na motion.div */}
        <div className="relative overflow-hidden rounded-xl shadow-lg w-full h-full"> {/* <--- GARANTINDO W-FULL H-FULL */}
          <img
            src={project.image}
            alt={`Projeto ${project.title}`}
            className="w-full h-full object-cover" {/* <--- Imagem preenche 100% da largura e altura do pai */}
          />
          {/* O gradiente que você encontrou no inspect. Deve estar aqui ou ser adicionado. */}
          {/* Se a classe que você copiou era de uma div que já existia sobre a imagem, ela provavelmente ficaria aqui. */}
          {/* Por exemplo, se essa div gradiente estava *dentro* do `relative overflow-hidden...`: */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div> */}
          {/* Se você não a tem e ela apareceu no inspect, pode ser algo do seu navegador ou de outra lib. */}
          {/* Mas se você a quer, garanta que ela esteja aqui. */}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
