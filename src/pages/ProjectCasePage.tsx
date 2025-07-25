import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NotFound from "./NotFound";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import Navigation from "@/components/Navigation";
import { useProjectById } from "@/hooks/useProjectById";

const ProjectCasePage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const { data: project, isLoading, isError } = useProjectById(projectId!);

  // Função para converter texto separado por vírgulas ou quebras de linha em array
  const parseTextToArray = (text: string | null | undefined): string[] => {
    if (!text) return [];
    return text
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .filter((item) => {
        try {
          new URL(item);
          return true;
        } catch {
          return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(item);
        }
      });
  };

  // Função para converter texto separado por vírgulas em array (legendas)
  const parseLegendsToArray = (text: string | null | undefined): string[] => {
    if (!text) return [];
    return text
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <Navigation />
        <div className="py-10 px-5 lg:px-32 flex flex-col items-start pt-24">
          <div className="self-start mb-8 w-full max-w-4xl mx-auto">
            <Skeleton className="h-8 w-24" />
          </div>
          <div className="max-w-4xl w-full mx-auto space-y-4">
            <Skeleton className="h-14 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-8 w-full mb-4" />
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !project) {
    return <NotFound />;
  }

  const processImages = parseTextToArray(project.process_images_text);
  const processLegends = parseLegendsToArray(project.process_legends_text);
  const solutionImages = parseTextToArray(project.solution_images_text);
  const solutionLegends = parseLegendsToArray(project.solution_images_legends_text);
  const results = parseLegendsToArray(project.results_text);

  return (
    <div className="bg-background min-h-screen relative font-inter">
      <Navigation />

      {/* Conteúdo com padding para navbar fixa */}
      <div className="py-10 px-5 lg:px-32 flex flex-col items-start pt-24">
        <div className="self-start mb-8 w-full max-w-4xl mx-auto">
          <button
            className="flex items-center text-brand-accent font-inter font-medium hover:underline hover:text-brand-dark transition"
            onClick={() => navigate("/")}
          >
            <ChevronRight size={18} className="rotate-180 mr-1" />
            Voltar
          </button>
        </div>

        {/* Bloco principal: Imagem à direita e texto à esquerda (desktop) */}
        <div className="max-w-4xl w-full mx-auto mb-10">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
            {/* Imagem do projeto: à direita no desktop */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src={project.image}
                alt={`Projeto ${project.title}`}
                className="w-full max-w-xs h-auto object-cover rounded-2xl border border-border shadow-lg"
                style={{ minWidth: 220, maxHeight: 340 }}
              />
            </div>
            {/* Texto do projeto: à esquerda */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl sm:text-5xl font-playfair text-brand-dark dark:text-white font-bold mb-3 text-left">
                {project.title}
              </h2>
              <div className="text-lg text-brand-accent font-inter font-semibold mb-1 text-left">
                {project.role}
              </div>
              <div className="text-xl text-brand-dark/70 dark:text-gray-300 font-inter mb-8 text-left">
                {project.solution}
              </div>
            </div>
          </div>
        </div>

        {/* Demais seções da página seguem como estavam */}
        <div className="max-w-4xl w-full mx-auto">
          {project.challenge && (
            <section className="mb-12">
              <h3 className="text-2xl font-playfair text-brand-dark dark:text-white mb-2 text-left">
                {t("caseStudyChallenge")}
              </h3>
              <p className="text-lg text-brand-dark/70 dark:text-gray-300 font-inter mb-4 text-left">
                {project.challenge}
              </p>
            </section>
          )}

          {(project.process_images_data ? 
           (Array.isArray(project.process_images_data) ? project.process_images_data.length : 0) : 
           processImages.length) > 0 && (
            <section className="mb-12">
              <h3 className="text-2xl font-playfair text-brand-dark mb-5 text-left">
                {t("caseStudyProcess")}
              </h3>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {project.process_images_data && Array.isArray(project.process_images_data) ? (
                  project.process_images_data.map((item, index) => (
                    <div
                      key={`process-jsonb-${index}`}
                      className="bg-card rounded-xl shadow-md p-4 flex flex-col items-center"
                    >
                      <img
                        src={item.url}
                        alt={item.caption ?? `Process image ${index + 1}`}
                        className="w-full h-40 object-cover rounded-md mb-3 border border-border"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div className="text-sm text-brand-dark/80 font-inter text-center">
                        {item.caption ?? `Processo ${index + 1}`}
                      </div>
                    </div>
                  ))
                ) : (
                  processImages.map((img, index) => (
                    <div
                      key={`process-legacy-${index}`}
                      className="bg-card rounded-xl shadow-md p-4 flex flex-col items-center"
                    >
                      <img
                        src={img}
                        alt={processLegends[index] ?? `Process image ${index + 1}`}
                        className="w-full h-40 object-cover rounded-md mb-3 border border-border"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div className="text-sm text-brand-dark/80 font-inter text-center">
                        {processLegends[index] ?? `Processo ${index + 1}`}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}

          {solutionImages.length > 0 && (
            <section className="mb-12">
              <h3 className="text-2xl font-playfair text-brand-dark mb-5 text-left">
                {t("caseStudySolution")}
              </h3>
              <div className="space-y-8">
                {solutionImages.map((img, index) => (
                  <div
                    key={`solution-${index}`}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={img}
                      alt={solutionLegends[index] ?? `Solution image ${index + 1}`}
                      className="w-full max-w-2xl h-auto object-cover rounded-2xl mb-3 border border-border"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    {solutionLegends[index] && (
                      <div className="text-sm text-brand-dark/80 font-inter mb-2 text-center">
                        {solutionLegends[index]}
                      </div>
                    )}
                  </div>
                ))}
                {project.ui_note && (
                  <div className="text-base text-brand-dark/70 font-inter text-center mt-4">
                    {project.ui_note}
                  </div>
                )}
              </div>
            </section>
          )}

          {(results.length > 0 || project.next_steps) && (
            <section>
              {results.length > 0 && (
                <>
                  <h3 className="text-2xl font-playfair text-brand-dark mb-2 text-left">
                    {t("caseStudyResults")}
                  </h3>
                  <ul className="mb-4 ml-6 list-disc text-brand-dark/80 font-inter text-left">
                    {results.map((res, idx) => (
                      <li key={`result-${idx}`}>{res}</li>
                    ))}
                  </ul>
                </>
              )}
              {project.next_steps && (
                <div className="text-base text-brand-dark/70 font-inter mb-3 text-left">
                  <strong>{t("caseStudyNextSteps")}</strong> {project.next_steps}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCasePage;
