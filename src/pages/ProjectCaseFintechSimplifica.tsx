
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const images = [
  {
    src: "/placeholder.svg",
    alt: "Pesquisa com usuários em entrevista remota",
    legend: "Mapeamento de fricções reais — ouvindo usuários.",
  },
  {
    src: "/placeholder.svg",
    alt: "Mapa de jornada do usuário",
    legend: "Jornada redesenhada: simplificando os pontos de atrito.",
  },
  {
    src: "/placeholder.svg",
    alt: "Protótipo de tela de onboarding",
    legend: "Protótipo iterado e testado para onboarding eficiente.",
  },
  {
    src: "/placeholder.svg",
    alt: "Tela final: dashboard pós-onboarding",
    legend: "Novo onboarding: simples, informativo e inclusivo.",
  },
];

const ProjectCaseFintechSimplifica = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-background min-h-screen py-10 px-5 lg:px-32 flex flex-col items-center">
      <div className="self-start mb-8">
        <button
          className="flex items-center text-brand-accent font-inter font-medium hover:underline hover:text-brand-dark transition"
          onClick={() => navigate(-1)}
        >
          <ChevronRight size={18} className="rotate-180 mr-1" />
          Voltar
        </button>
      </div>
      <div className="max-w-4xl w-full mx-auto">
        <h2 className="text-4xl sm:text-5xl font-playfair text-brand-dark font-bold mb-3">
          Fintech Simplifica
        </h2>
        <div className="text-lg text-brand-accent font-inter font-semibold mb-1">
          UX Lead & UI Designer
        </div>
        <div className="text-xl text-brand-dark/70 font-inter mb-8">
          Projetei um onboarding 3x mais eficaz para usuários de serviços financeiros.
        </div>
        <section className="mb-12">
          <h3 className="text-2xl font-playfair text-brand-dark mb-2">O desafio</h3>
          <p className="text-lg text-brand-dark/70 font-inter mb-4">
            Usuários enfrentavam frustração e abandono ao tentar abrir conta; processos longos e confusos bloqueavam conversão.
          </p>
        </section>
        <section className="mb-12">
          <h3 className="text-2xl font-playfair text-brand-dark mb-5">Processo UX</h3>
          <div className="grid gap-8 md:grid-cols-2">
            {images.slice(0, 3).map(img => (
              <div key={img.alt} className="bg-card rounded-xl shadow-md p-4 flex flex-col items-center">
                <img src={img.src} alt={img.alt} className="w-full h-40 object-cover rounded-md mb-3 border border-border" />
                <div className="text-sm text-brand-dark/80 font-inter w-full">
                  {img.legend}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-12">
          <h3 className="text-2xl font-playfair text-brand-dark mb-2">Solução Final (UI)</h3>
          <div className="flex flex-col items-center">
            <img src={images[3].src} alt={images[3].alt} className="w-full max-w-xl h-60 object-cover rounded-2xl mb-3 border border-border" />
            <div className="text-sm text-brand-dark/80 font-inter mb-2 w-full">{images[3].legend}</div>
            <div className="text-base text-brand-dark/70 font-inter mt-4 w-full">
              Essa arquitetura simplificou o fluxo de abertura de conta: menos etapas, copy clara e feedback visual imediato. A paleta evoca confiança e acessibilidade.
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-2xl font-playfair text-brand-dark mb-2">Resultados & Aprendizados</h3>
          <ul className="mb-4 ml-6 list-disc text-brand-dark/80 font-inter">
            <li>Abandono na abertura de conta caiu de 62% para 21%.</li>
            <li>Usuários relataram 2x mais clareza no processo.</li>
            <li>Aprendi que o simples pode ser marcante — pesquisa e iteração fazem toda a diferença.</li>
          </ul>
          <div className="text-base text-brand-dark/70 font-inter mb-3">
            Próximos passos: Hoje, faria protótipos ainda mais ‘mágicos’, incluindo onboarding progressivo.
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectCaseFintechSimplifica;
