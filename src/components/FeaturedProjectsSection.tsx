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

  // Breakpoints
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

  // --- Custom hook para controlar o mouse sobre todos os cards ---
  const [hover, setHover] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  // Para perfomance não criar N listeners, mova o mouse handler para cá
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    if (hover) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      setCursorPos({ x: 0, y: 0 });
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hover]);

  return (
    <div ref={containerRef} className="relative w-full min-h-[300vh] bg-white dark:bg-gray-800">

      {/* Linha divisoria */}
      <div className="w-full max-w-7xl border-b border-black dark:border-gray-700 mx-auto" />

      {/* Cabeçalho */}
      <div className="sticky top-3 z-3 bg-white dark:bg-gray-800 py-12 px-6 pt-24">
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
        </motion.div>
      </div>

      {/* btVejamais Tooltip texto no cursor (desktop apenas) */}
      {hover && isDesktop && (
        <div
          style={{
            position: "fixed",
            left: cursorPos.x + 16,
            top: cursorPos.y + 16,
            pointerEvents: "none",
            zIndex: 9999,
            transition: "left 0.02s, top 0.02s",
          }}
          className="px-4 py-2 rounded-xl bg-black-300 text-white font-semibold shadow-lg select-none text-base"
        >
          {t("btVejaMais")}
        </div>
      )}

      {/* Container dos cards com efeito parallax */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {projects.slice(0, 3).map((project, index) => {
          // Parallax etc.
          const start = index / 3;
          const total = 4;
          const end = (index + 1) / total;

          const yInitial = isMobile ? "120vh" : isTablet ? "100vh" : "100vh";
          const yFinal = isMobile ? "10vh" : isTablet ? "7vh" : "7vh";

          const y = useTransform(scrollYProgress, [start, end], [yInitial, yFinal]);
          const scale = useTransform(scrollYProgress, [start, end], [1, 1]);
          const opacity = useTransform(scrollYProgress, [start, end], [1, 1]);

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
                {/* REMOVIDO O CIRCULO COM O + */}

                <div className="flex flex-col xl:flex-row h-full max-w-7xl mx-auto">
                  {/* Conteúdo texto */}
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
                    <div className="relative w-full rounded-lg overflow-hidden ">
                      <img
                        src={project.image}
                        alt={`Projeto ${project.title}`}
                        className="w-full h-full object-contain rounded-lg"
                        style={{ maxHeight: "100%" }}
                      />
                      <div className="absolute inset-0 rounded-lg"></div>

                      {/* Botão visível só em mobile e tablet */}
                      {(isMobile || isTablet) && (
                        <button
                          type="button"
                          className="absolute top-4 right-4 bg-orange-900 text-white px-3 py-1 rounded-3xl font-semibold shadow-md hover:bg-orange-700 transition duration-300 md:block lg:hidden xl:hidden "
                          onClick={() => navigate(`/projeto/${project.id}`)}
                        >
                          {t("btVejaMais")}
                        </button>
                      )}
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
