import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NotFound from "./NotFound";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Navigation from "@/components/Navigation";
import { useProjectById } from "@/hooks/useProjectById";
import FooterSection from "@/components/FooterSection";

const ProjectCasePage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const { data: project, isLoading, isError } = useProjectById(projectId!);

  // Função para converter texto separado por vírgulas ou quebras de linha em array
  const parseTextToArray = (text: string | null | undefined): string[] => {
    if (!text) return [];
    return text
      .split(/[,\\n]/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .filter((item) => {
        try {
          new URL(item);
          return true;
        } catch {
          return /\\.(jpg|jpeg|png|gif|webp|svg)$/i.test(item);
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

      {/* Imagem topo fora a fora da janela */}

      {(project.topPageimg || project.image) && (
        <div className="w-screen h-[60vh] overflow-hidden relative z-0">
          <img
            src={project.topPageimg ?? project.image}
            alt={`Imagem destaque do projeto ${project.title}`}
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}


      {/* Conteúdo com padding para navbar fixa e para não sobrepor a imagem topo */}
      <div className="py-10 px-5 lg:px-32 flex flex-col items-start pt-[calc(24px+5vh)] relative z-10">

        {/* Seção resumo do caso de estudo */}
        <div className="max-w-4xl w-full mx-auto mb-16">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Texto à esquerda */}
            <div className="w-full lg:w-2/3">
              <h2 className="text-4xl sm:text-5xl font-playfair text-brand-dark dark:text-white font-bold mb-4 text-left">
                {project.title}
              </h2>
              <div className="text-lg text-brand-accent font-inter font-semibold mb-4 text-left">
                {project.role}
              </div>
              <div className="text-xl text-brand-dark/70 dark:text-gray-300 font-inter mb-6 text-left">
                {project.solution}
              </div>
              <div className="text-lg text-brand-dark/80 dark:text-gray-300 font-inter text-left">
                {project.problem}
              </div>
            </div>
            
            {/* Imagem à direita */}
            <div className="w-full lg:w-1/3 flex justify-center">
              <img
                src={project.image}
                alt={`Projeto ${project.title}`}
                className="w-full max-w-xs h-auto object-cover rounded-2xl border border-border shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Seção O Desafio */}
        {project.challenge && (
          <div className="max-w-4xl w-full mx-auto mb-16">
            <h3 className="text-3xl font-playfair text-brand-dark dark:text-white mb-6 text-left">
              {t("caseStudyChallenge")}
            </h3>
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Texto à esquerda */}
              <div className="w-full lg:w-2/3">
                <p className="text-lg text-brand-dark/70 dark:text-gray-300 font-inter leading-relaxed text-left">
                  {project.challenge}
                </p>
              </div>
              
              {/* Carrossel de imagens à direita */}
              {project.challenge_images && (
                <div className="w-full lg:w-1/3">
                  <Carousel className="w-full max-w-xs mx-auto" opts={{ align: "start", loop: true }}>
                    <CarouselContent>
                      {parseTextToArray(project.challenge_images).map((img, index) => (
                        <CarouselItem key={`challenge-${index}`}>
                          <div className="p-1">
                            <img
                              src={img}
                              alt={`Challenge image ${index + 1}`}
                              className="w-full h-48 object-cover border border-border shadow-md"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Seção Processo - Grid de imagens */}
        {(project.process_images_data
          ? Array.isArray(project.process_images_data)
            ? project.process_images_data.length
            : 0
          : processImages.length) > 0 && (
          <div className="max-w-4xl w-full mx-auto mb-16">
            <h3 className="text-3xl font-playfair text-brand-dark dark:text-white mb-6 text-left">
              {t("caseStudyProcess")}
            </h3>
            {project.process_text && (
              <p className="text-lg text-brand-dark/70 dark:text-gray-300 font-inter leading-relaxed mb-8 text-left">
                {project.process_text}
              </p>
            )}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {project.process_images_data && Array.isArray(project.process_images_data) ? (
                project.process_images_data.map((item, index) => (
                  <div
                    key={`process-jsonb-${index}`}
                    className="bg-card rounded-xl shadow-md p-4 flex flex-col items-center"
                  >
                    <img
                      src={item.url}
                      alt={item.caption ?? `Process image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-md mb-3 border border-border"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="text-sm text-brand-dark/80 dark:text-gray-300 font-inter text-center">
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
                      className="w-full h-48 object-cover rounded-md mb-3 border border-border"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="text-sm text-brand-dark/80 dark:text-gray-300 font-inter text-center">
                      {processLegends[index] ?? `Processo ${index + 1}`}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Seção Prototyping & Interaction */}
        {(project.prototyping_title || project.prototyping_text || project.prototyping_images) && (
          <div className="max-w-4xl w-full mx-auto mb-16">
            <h3 className="text-3xl font-playfair text-brand-dark dark:text-white mb-6 text-left">
              {project.prototyping_title || "Prototyping & Interaction"}
            </h3>
            {project.prototyping_text && (
              <p className="text-lg text-brand-dark/70 dark:text-gray-300 font-inter leading-relaxed mb-8 text-left">
                {project.prototyping_text}
              </p>
            )}
            {project.prototyping_images && Array.isArray(project.prototyping_images) && (
              <div className="grid gap-6 md:grid-cols-2">
                {project.prototyping_images.map((item, index) => (
                  <div key={`prototyping-${index}`} className="bg-card rounded-xl shadow-md p-4 flex flex-col items-center">
                    <img
                      src={item.url}
                      alt={item.caption ?? `Prototyping image ${index + 1}`}
                      className="w-full h-64 object-cover rounded-md mb-3 border border-border"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="text-sm text-brand-dark/80 dark:text-gray-300 font-inter text-center">
                      {item.caption ?? `Protótipo ${index + 1}`}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Seção Solução Final */}
        {(project.final_solution_title || project.final_solution_text || project.final_solution_video || project.final_solution_images) && (
          <div className="max-w-4xl w-full mx-auto mb-16">
            <h3 className="text-3xl font-playfair text-brand-dark dark:text-white mb-6 text-left">
              {project.final_solution_title || "Solução Final"}
            </h3>
            {project.final_solution_text && (
              <p className="text-lg text-brand-dark/70 dark:text-gray-300 font-inter leading-relaxed mb-8 text-left">
                {project.final_solution_text}
              </p>
            )}
            
            {/* Vídeo da solução final */}
            {project.final_solution_video && (
              <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                <video
                  controls
                  className="w-full h-auto"
                  poster={project.image}
                >
                  <source src={project.final_solution_video} type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              </div>
            )}

            {/* Imagens da solução final */}
            {project.final_solution_images && (
              <div className="grid gap-6 md:grid-cols-2">
                {parseTextToArray(project.final_solution_images).map((img, index) => (
                  <div key={`final-solution-${index}`} className="rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={img}
                      alt={`Final solution image ${index + 1}`}
                      className="w-full h-auto object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Grid adicional de imagens */}
        {project.additional_images_grid && (
          <div className="max-w-4xl w-full mx-auto mb-16">
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {parseTextToArray(project.additional_images_grid).map((img, index) => (
                <div key={`additional-${index}`} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={img}
                    alt={`Additional image ${index + 1}`}
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Seção Solução (legacy) */}
        {solutionImages.length > 0 && (
          <div className="max-w-4xl w-full mx-auto mb-16">
            <h3 className="text-3xl font-playfair text-brand-dark dark:text-white mb-8 text-left">
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
                    className="w-full max-w-2xl h-auto object-cover rounded-2xl mb-3 border border-border shadow-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  {solutionLegends[index] && (
                    <div className="text-sm text-brand-dark/80 dark:text-gray-300 font-inter mb-2 text-center">
                      {solutionLegends[index]}
                    </div>
                  )}
                </div>
              ))}
              {project.ui_note && (
                <div className="text-base text-brand-dark/70 dark:text-gray-300 font-inter text-center mt-4">
                  {project.ui_note}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Seção Aprendizado e Conclusão */}
        {(project.learning_conclusion_title || project.learning_conclusion_text) && (
          <div className="max-w-4xl w-full mx-auto mb-16">
            <h3 className="text-3xl font-playfair text-brand-dark dark:text-white mb-6 text-left">
              {project.learning_conclusion_title || "Aprendizado e Conclusão"}
            </h3>
            {project.learning_conclusion_text && (
              <p className="text-lg text-brand-dark/70 dark:text-gray-300 font-inter leading-relaxed text-left">
                {project.learning_conclusion_text}
              </p>
            )}
          </div>
        )}

        {/* Seção Resultados e Próximos Passos */}
        {(results.length > 0 || project.next_steps) && (
          <div className="max-w-4xl w-full mx-auto mb-16">
            {results.length > 0 && (
              <>
                <h3 className="text-3xl font-playfair text-brand-dark dark:text-white mb-6 text-left">
                  {t("caseStudyResults")}
                </h3>
                <ul className="mb-8 ml-6 list-disc text-brand-dark/80 dark:text-gray-300 font-inter text-left space-y-2">
                  {results.map((res, idx) => (
                    <li key={`result-${idx}`} className="text-lg">{res}</li>
                  ))}
                </ul>
              </>
            )}
            {project.next_steps && (
              <div className="text-lg text-brand-dark/70 dark:text-gray-300 font-inter text-left">
                <strong className="text-brand-dark dark:text-white">{t("caseStudyNextSteps")}</strong> {project.next_steps}
              </div>
            )}
          </div>
        )}

        {/* Seção Veja outros projetos (placeholder) */}
        <div className="max-w-4xl w-full mx-auto">
          <h3 className="text-3xl font-playfair text-brand-dark dark:text-white mb-8 text-center">
            Veja outros projetos em destaque
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Placeholder para outros projetos */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-card rounded-xl p-6 shadow-md">
                <div className="w-full h-32 bg-muted rounded-lg mb-4"></div>
                <h4 className="font-playfair text-xl mb-2 text-brand-dark dark:text-white">Projeto {item}</h4>
                <p className="text-brand-dark/70 dark:text-gray-300 text-sm">Descrição do projeto...</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default ProjectCasePage;
