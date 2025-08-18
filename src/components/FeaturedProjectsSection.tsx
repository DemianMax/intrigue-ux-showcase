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

  // Define os três principais breakpoints
  const isMobile = breakpoint === "xs" || breakpoint === "sm";
  const isTablet = breakpoint === "md";
  const isDesktop = breakpoint === "lg" || breakpoint === "xl" || breakpoint === "2xl";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

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
    return text
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-[300vh] bg-custom-featured">
      {/* Cabeçalho com título, subtítulo e bolinhas */}
      <div className="sticky top-3 z-3 bg-custom-featured py-12 px-6 pt-24">
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
            max-w-7xl
            mx-auto
            text-center
            px-6
            
            md:items-center
            md:justify-center
            md:gap-8
            
            xl:flex-row
            xl:items-center
            xl:justify-start
            xl:gap-8
          "
        >
          <h2 className="text-3xl whitespace-nowrap font-playfair font-bold text-brand-dark dark:text-white mb-1 md:text-5xl lg:text-5xl lg:mb-3">
            {t("projectsTitle")}
          </h2>
          <p className="text-md md:text-lg text-brand-dark/70 dark:text-gray-300 leading-relaxed text-center lg:text-left">
            {t("projectsSubTitle")}
          </p>
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
                  idx === activeProject ? "bg-brand-accent" : "bg-gray-100 dark:bg-gray-600"
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
          const [hover, setHover] = useState(false);

          const start = index / 3;
          const total = 4;
          const end = (index + 1) / total;

          // Ajustes de altura para parallax por breakpoint
          const yInitial = isMobile ? "120vh" : isTablet ? "100vh" : "100vh";
          const yFinal = isMobile ? "15vh" : isTablet ? "12vh" : "9vh";

          const y = useTransform(scrollYProgress, [start, end], [yInitial, yFinal]);
          const scale = useTransform(scrollYProgress, [start, end], [1, 1]);
          const opacity = useTransform(scrollYProgress, [start, end], [1, 1]);

          // Cores de fundo alternadas para cada projeto
          const getBackgroundColor = (projectIndex: number) => {
            const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
            return project.background_color || colors[projectIndex % colors.length];
          };

          return (
            <motion.div
              key={project.id}
              style={{ y, scale, opacity }}
              className="absolute inset-0 w-full h-full"
            >
              <div
                className="w-full h-full cursor-pointer relative overflow-hidden"
                style={{ backgroundColor: getBackgroundColor(index) }}
                onClick={() => navigate(`/projeto/${project.id}`)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    navigate(`/projeto/${project.id}`);
                  }
                }}
              >
                {hover && (
                  <div
                    className="absolute top-10 right-10 z-20 bg-white/20 backdrop-blur-sm
                      text-white text-3xl font-semibold rounded-full w-12 h-12 flex items-center justify-center 
                      select-none pointer-events-none user-select-none"
                  >
                    +
                  </div>
                )}

                <div className="flex flex-col xl:flex-row h-full">
                  {/* Conteúdo esquerda com box para o texto */}
                  <div className="w-full xl:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center space-y-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-10 space-y-6">
                      <div className="space-y-3">
                        <h4 className="text-2xl md:text-3xl lg:text-4xl xl:text-3xl font-playfair font-bold text-white">
                          {project.title}
                        </h4>
                        <div className="text-white/90 text-base md:text-lg lg:text-xl xl:text-lg font-medium tracking-wide">
                          {project.role}
                        </div>
                      </div>

                      <div className="space-y-4 text-white/80 text-sm md:text-base lg:text-lg">
                        <div>
                          <h5 className="font-semibold text-white mb-2 text-xs md:text-sm uppercase tracking-wide">
                            {t("projectSolution")}:
                          </h5>
                          <p className="leading-relaxed">{project.solution}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {parseTextToArray(project.hashtags_text).slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-medium text-white bg-white/20 rounded-full px-3 py-1 border border-white/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Imagem direita */}
                  <div className="w-full xl:w-1/2 relative overflow-hidden flex items-center justify-center p-6 md:p-8 lg:p-12">
                    <div className="relative w-full h-full max-h-[400px] xl:max-h-none">
                      <img
                        src={project.image}
                        alt={`Projeto ${project.title}`}
                        className="w-full h-full object-contain rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/10 rounded-lg"></div>
                    </div>
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
