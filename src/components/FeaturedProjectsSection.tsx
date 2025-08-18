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

          return (
            <motion.div
              key={project.id}
              style={{ y, scale, opacity }}
              className="absolute inset-0 flex items-center justify-center px-6"
            >
              <div
                className="w-full max-w-7xl bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden shadow relative cursor-pointer"
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
                    className="absolute top-10 right-10 z-20 bg-brand-accent 
                      text-white text-3xl font-semibold rounded-full px-3 py-1 select-none pointer-events-none user-select-none"
                  >
                    +
                  </div>
                )}

                <div className="flex flex-col xs:min-h-[100px] xl:flex-row min-h-[200px] 2xl:min-h-[500px]">
                  {/* Conteúdo esquerda */}
                  <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-top space-y-6">
                    <div className="space-y-3">
                      <h4 className="text-2xl lg:text-2xl xl:text-2xl font-playfair font-bold text-brand-dark dark:text-white">
                        {project.title}
                      </h4>
                      <div className="text-brand-accent lg:text-2xl xl:text-2xl font-semibold text-sm tracking-wide">
                        {project.role}
                      </div>
                    </div>

                    <div className="space-y-6 text-gray-700 dark:text-gray-300 text-base lg:text-lg">
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
                  </div>

                  {/* Imagem direita, com seleção da imagem por breakpoint */}
                  <div className="w-full lg:w-1/2 relative overflow-hidden flex items-center justify-center">
                    <img
                      src={
                        isMobile
                          ? project.imageCardMobile || project.imageCardDesktop || project.image
                          : isTablet
                          ? project.imageCardTablet || project.imageCardDesktop || project.image
                          : project.imageCardDesktop || project.image
                      }
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
