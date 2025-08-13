import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Project } from "@/types/project";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useBreakpoint } from "@/hooks/useBreakpoint";

interface FeaturedProjectsSectionProps {
  projects: Project[];
}

const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({ projects }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "xs" || breakpoint === "sm";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Estado para o projeto ativo (destaque das bolinhas)
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    const total = projects.length >= 3 ? 3 : projects.length;
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const progressPerProject = 1 / total;
      let index = Math.floor(latest / progressPerProject);
      if (index >= total) index = total - 1;
      setActiveProject(index);
    });
    return () => {
      unsubscribe();
    };
  }, [scrollYProgress, projects.length]);

  const parseTextToArray = (text: string | null): string[] => {
    if (!text) return [];
    return text.split(",").map((item) => item.trim()).filter((item) => item.length > 0);
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-[300vh] bg-slate-400 dark:bg-gray-800 ">

      {/* Bloco do título, subtítulo e bolinhas - responsivo conforme breakpoints */}
      
      <div className="sticky top-6 z-3 bg-slate-400 dark:bg-gray-800 py-12 px-6 pt-24">

        <motion.div 
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.1 }}
          className="
            flex flex-col
            items-center
            justify-center
            gap-3
            lg:flex-row
            lg:items-center
            lg:justify-center
            lg:gap-8
            max-w-5xl
            mx-auto
            text-center
          "
        >
          {/* Título */}
          <h2 className="text-3xl text-rigth font-playfair font-bold text-brand-dark dark:text-white mb-1 md:text-5xl lg:text-5xl lg:mb-3">
            {t("projectsTitle")}
          </h2>
          {/* Subtítulo */}
          <p className="text-md md:text-lg text-brand-dark/70 dark:text-gray-300 leading-relaxed text-center lg:text-left">
            {t("projectsSubTitle")}
          </p>
          {/* Bolinhas dos projetos */}
          <div
            className="
              flex flex-row
              gap-2
              mt-2
              lg:flex-col
              lg:space-x-0
              lg:space-y-0
              lg:mt-0
              lg:ml-6
            "
          >
            {projects.slice(0, 3).map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                  idx === activeProject ? "bg-brand-accent" : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Projeto ${idx + 1}`}
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (containerRef.current) {
                    containerRef.current.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Container dos cards com efeito parallax */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {projects.slice(0, 3).map((project, index) => {
          const start = index / 3;
          const total = 4;
          const end = (index + 1) / total;
          const yInitial = isMobile ? "120vh" : "90vh";
          const yFinal = isMobile ? "22vh" : "10vh";

          const y = useTransform(scrollYProgress, [start, end], [yInitial, yFinal]);
          const scale = useTransform(scrollYProgress, [start, end], [1, 1]);
          const opacity = useTransform(scrollYProgress, [start, end], [1, 1]);

          return (
            <motion.div
              key={project.id}
              style={{ y, scale, opacity }}
              className="absolute inset-0 flex items-center justify-center px-6"
            >
              <div className="w-full max-w-7xl bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
                <div className="flex flex-col xs:min-h-[100px] sm:flex-row min-h-[200px] 2xl:min-h-[500px]">
                  {/* Conteúdo - Esquerda */}
                  <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center space-y-6">
                    <div className="space-y-3">
                      <h4 className="text-3xl lg:text-3xl xl:text-4xl font-playfair font-bold text-brand-dark dark:text-white">
                        {project.title}
                      </h4>
                      <div className="text-brand-accent font-semibold text-sm uppercase tracking-wide">
                        {project.role}
                      </div>
                    </div>

                    <div className="space-y-6 text-gray-700 dark:text-gray-300 text-base lg:text-lg">
                      <div>
                        <h5 className="font-semibold text-brand-dark dark:text-white mb-3 text-sm uppercase tracking-wide">
                          {t("projectProblem")}:
                        </h5>
                        <p className="leading-relaxed">{project.problem}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-brand-dark dark:text-white mb-3 text-sm uppercase tracking-wide">
                          {t("projectSolution")}:
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

                    <div className="mt-6">
                      <button
                        className="px-8 py-3 rounded-xl bg-brand-accent text-white font-semibold hover:bg-orange-600 transition-all duration-300 text-sm shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                        onClick={() => navigate(`/projeto/${project.id}`)}
                      >
                        {t("projectCaseStudyButton")}
                      </button>
                    </div>
                  </div>

                  {/* Imagem - direita com tamanho responsivo */}
                  <div className="w-full lg:w-1/2 relative overflow-hidden flex items-center justify-center">
                    <img
                      src={project.image}
                      alt={`Projeto ${project.title}`}
                      className="w-full object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/10"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProjectsSection;
