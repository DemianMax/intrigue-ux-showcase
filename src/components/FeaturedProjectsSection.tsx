import React, { useRef, useState, useEffect } from "react";
import { Project } from "@/types/project";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

interface FeaturedProjectsSectionProps {
  projects: Project[];
}

const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({ projects }) => {
  // Contextos e hooks principais
  const { t } = useLanguage(); // Contexto para textos multilíngues
  const navigate = useNavigate(); // Navegação nas rotas
  const containerRef = useRef<HTMLDivElement>(null); // Referência para área do componente
  const breakpoint = useBreakpoint(); // Detecta breakpoint para responsividade

  // Variáveis que facilitam a lógica por breakpoint
  const isMobile = breakpoint === "xs" || breakpoint === "sm";
  const isTablet = breakpoint === "md";
  const isDesktop = breakpoint === "lg" || breakpoint === "xl" || breakpoint === "2xl";

  // Uso do scroll para efeitos visuais (parallax)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Estado para definir qual projeto está ativo conforme scroll
  const [activeProject, setActiveProject] = useState(0);

  /*----------------------------
  ─── Atualiza índice ativo por scroll com efeito de parallax ───────────────
  ----------------------------*/
  useEffect(() => {
    // Quantidade máxima de projetos que queremos acompanhar
    const maxProjects = projects.length >= 3 ? 3 : projects.length;

    const unsubscribe = scrollYProgress.onChange((latest) => {
      const progressPerProject = 1 / maxProjects;
      let index = Math.floor(latest / progressPerProject);
      if (index >= maxProjects) index = maxProjects - 1;
      setActiveProject(index);
    });

    return () => {
      unsubscribe();
    };
  }, [scrollYProgress, projects.length]);

  /*----------------------------
  ─── Função para converter string de imagens separadas por vírgula ───────────────
  ----------------------------*/
  const parseImagesString = (imagesString: string | null): string[] => {
    if (!imagesString) return [];
    return imagesString
      .split(",")
      .map((img) => img.trim())
      .filter((img) => img.length > 0);
  };

  /*----------------------------
  ─── Função para converter hashtags de texto para array ───────────────
  ----------------------------*/
  const parseTextToArray = (text: string | null): string[] => {
    if (!text) return [];
    return text
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  // Estado para controlar qual imagem está sendo exibida para cada projeto
  const [currentImageIndexes, setCurrentImageIndexes] = useState<number[]>(
    projects.map(() => 1)
  );

  /*----------------------------
  ─── Atualiza índice da imagem a cada 4 segundos para troca automática ───────────────
  ----------------------------*/
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes((prevIndexes) =>
        prevIndexes.map((index, i) => {
          const projectImages = parseImagesString(projects[i]?.topPageimg || projects[i]?.image || null);
          const totalImages = projectImages.length || 1;
          return (index + 1) % totalImages;
        })
      );
    }, 3000); // <-- intervalo de troca em milissegundos aqui (4 segundos)

    return () => clearInterval(interval);
  }, [projects]);

  /*----------------------------
  ─── Estados e handlers para efeito de cursor customizado ───────────────
  ----------------------------*/
  const [hover, setHover] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
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

  /*----------------------------
  ─── Renderização principal do componente ───────────────
  ----------------------------*/
  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[300vh] bg-white dark:bg-gray-800"
    >
      {/* Linha divisória horizontal */}
      <div className="w-full max-w-7xl border-b border-black dark:border-gray-700 mx-auto" />

      {/* Cabeçalho sticky do título e subtítulo */}
      <div className="sticky top-3 z-3  lg:z-30 bg-white dark:bg-gray-800 py-12 px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.1 }}
          className="
            flex flex-col items-center justify-center gap-3 max-w-7xl
            mx-auto text-center px-6
            md:items-center md:justify-center md:gap-8
            xl:flex-row xl:items-center xl:justify-start xl:gap-8
          "
        >
          <h2 className="text-3xl whitespace-nowrap font-playfair font-bold text-brand-dark dark:text-white mb-1 md:text-3xl lg:text-5xl lg:mb-3">
            {t("projectsTitle")}
          </h2>
          <p className="text-md md:text-lg text-brand-dark/70 dark:text-gray-300 leading-relaxed text-center lg:text-left">
            {t("projectsSubTitle")}
          </p>
        </motion.div>
      </div>

      {/* Tooltip customizado para "Veja Mais" no cursor */}
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

      {/* Container dos cards com overflow hidden para animações */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {projects.slice(0, 3).map((project, index) => {
          // Controle parallax vertical dos cards pelo scroll
          const start = index / 3;
          const total = 4;
          const end = (index + 1) / total;

          const yInitial = isMobile ? "120vh" : isTablet ? "100vh" : "100vh";
          const yFinal = isMobile ? "10vh" : isTablet ? "7vh" : "7vh";

          const y = useTransform(scrollYProgress, [start, end], [yInitial, yFinal]);
          const scale = useTransform(scrollYProgress, [start, end], [1, 1]);
          const opacity = useTransform(scrollYProgress, [start, end], [1, 1]);

          // Função para cores de background alternadas/casuais
          const getBackgroundColor = (projectIndex: number) => {
            const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
            return project.background_color || colors[projectIndex % colors.length];
          };

          // Pegando imagens do projeto como array
          const projectImages = parseImagesString(project.topPageimg || project.image || null);
          const currentImageIndex = currentImageIndexes[index] || 0;
          const currentImageSrc =
            projectImages.length > 0 ? projectImages[currentImageIndex] : (project.topPageimg || project.image);

          /*----------------------------
          ─── Renderização do card individual com animações ───────────────
          ----------------------------*/
          return (
            <motion.div
              key={project.id}
              style={{ y, scale, opacity }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Card clicável com background e cursor customizado */}
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
                {/* Estrutura flexível do conteúdo: texto + imagem */}
                <div className="flex flex-col xl:flex-row h-full max-w-7xl mx-auto">
                  {/* Coluna de texto */}
                  <div className="w-full xl:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center space-y-6">
                    <div className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-10 space-y-6">
                      <div className="space-y-3">
                        <h4 className="text-xl md:text-3xl lg:text-3xl xl:text-2xl font-playfair font-medium text-blue-900 dark:text-white">
                          {project.title}
                        </h4>
                        <div className="text-cyan/90 text-3xl md:text-2xlg lg:text-4xl xl:text-3xl font-bold tracking-wide">
                          {project.role}
                        </div>
                      </div>

                      <div className="space-y-3 text-gray dark:text-white/80 text-sm md:text-base lg:text-lg">
                        <p className="leading-relaxed">{project.solution}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {parseTextToArray(project.hashtags_text)
                          .slice(0, 3)
                          .map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs font-medium text-black dark:text-white bg-white/20 rounded-full px-3 py-1 border border-white/30"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Coluna da imagem do projeto */}
                  <div className="w-full xl:w-4/5 relative overflow-hidden flex items-center justify-center p-6 md:p-8 lg:p-24">
                    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-3xl">
                      <AnimatePresence mode="sync" initial={false}>
                        <motion.img
                          key={currentImageIndex} // Importante para disparar a animação ao trocar imagem
                          src={currentImageSrc}
                          alt={`Projeto ${project.title} imagem ${currentImageIndex + 1}`}
                          className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6 }}
                        />
                      </AnimatePresence>
                      <div className="absolute inset-0 rounded-3xl pointer-events-none"></div>

                      {/* Botão "Veja Mais" visível em mobile/tablet */}
                      {(isMobile || isTablet) && (
                        <button
                          type="button"
                          className="absolute top-10 right-4 bg-orange-900 text-white px-3 py-1 font-semibold shadow-md hover:bg-orange-700 transition duration-300 md:block lg:hidden xl:hidden"
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
