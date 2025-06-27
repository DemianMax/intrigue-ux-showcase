import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Project {
  id: string;
  titulo: string;
  descricao_curta: string;
  imagem_capa: string | null;
  tags: string[];
  slug: string;
}

interface FeaturedProjectsSectionProps {
  projects: Project[];
}

const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({ projects }) => {
  const { t } = useLanguage();

  if (!t) return null;

  return (
    <section className="w-full bg-gradient-to-br from-brand-green-50 via-white to-brand-blue-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Título da seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block relative">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-brand-dark mb-4">
              {t("navProjects")}
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-brand-green-500 to-brand-blue-500 rounded-full"></div>
          </div>
          <p className="text-lg text-brand-dark/70 leading-relaxed max-w-2xl mx-auto mt-6">
            Projetos selecionados que demonstram minha experiência em UX/UI Design
          </p>
        </motion.div>

        {/* Grid de projetos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 6).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-brand-green-100"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.imagem_capa || "/placeholder.svg"}
                  alt={project.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <h3 className="font-playfair text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-green-600 transition-colors">
                  {project.titulo}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {project.descricao_curta}
                </p>
                
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gradient-to-r from-brand-green-100 to-brand-blue-100 text-brand-dark text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <Link
                  to={`/projeto/${project.slug}`}
                  className="inline-flex items-center gap-2 text-brand-green-600 hover:text-brand-blue-600 font-medium text-sm transition-colors"
                >
                  Ver projeto
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
