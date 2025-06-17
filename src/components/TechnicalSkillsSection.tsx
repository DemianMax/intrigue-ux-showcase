
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useHabilidadesTecnicas, type HabilidadeTecnica } from "@/hooks/useHabilidadesTecnicas";

function renderHabilidadeItem(habilidade: HabilidadeTecnica, widthClass: string = "w-20") {
  // Se o ícone for uma URL completa, use diretamente. Senão, use um ícone padrão do Heroicons
  const getIconUrl = (icone: string) => {
    if (icone.startsWith('http') || icone.startsWith('https')) {
      return icone;
    }
    // Usar Heroicons como fallback - ícone de código genérico
    return `https://heroicons.com/24/outline/${pen}.svg`;
  };
  
  return (
    <div key={habilidade.id} className={`flex flex-col items-start ${widthClass}`}>
      <img 
        src={getIconUrl(habilidade.icone)} 
        alt={habilidade.nome}
        className="w-9 h-9 mb-1"
        style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' }}
        onError={(e) => {
          // Fallback para um ícone genérico se a imagem falhar
          e.currentTarget.src = 'https://heroicons.com/24/outline/code-bracket.svg';
        }}
      />
      <span className="text-sm text-muted-foreground text-center">{habilidade.nome}</span>
    </div>
  );
}

function renderLoadingSkeletons(count: number, widthClass: string = "w-20") {
  return Array.from({ length: count }, (_, i) => (
    <div key={i} className={`flex flex-col items-start ${widthClass}`}>
      <Skeleton className="h-9 w-9 mb-1" />
      <Skeleton className="h-4 w-16" />
    </div>
  ));
}

export default function TechnicalSkillsSection() {
  const { data: habilidades, isLoading } = useHabilidadesTecnicas();

  const softwares = habilidades?.filter(h => h.categoria === 'software') || [];
  const habilidadesItems = habilidades?.filter(h => h.categoria === 'habilidade') || [];
  const conhecimentos = habilidades?.filter(h => h.categoria === 'conhecimento') || [];

  return (
    <section className="max-w-4xl mx-auto my-16 px-4">
      <h2 className="font-playfair text-3xl font-bold text-brand-dark mb-8 text-center">
        Habilidades Técnicas
      </h2>

      {/* Parte 1: Softwares */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-brand-dark">Softwares</h3>
        <div className="flex flex-wrap justify-start items-start gap-x-8 gap-y-4 py-2">
          {isLoading ? 
            renderLoadingSkeletons(6, "w-20") : 
            softwares.map(software => renderHabilidadeItem(software, "w-20"))
          }
        </div>
      </div>

      <div className="my-8">
        <Separator />
      </div>

      {/* Parte 2: Habilidades */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-brand-dark">Habilidades</h3>
        <div className="flex flex-wrap justify-start items-start gap-x-8 gap-y-4 py-2">
          {isLoading ? 
            renderLoadingSkeletons(4, "w-20") : 
            habilidadesItems.map(habilidade => renderHabilidadeItem(habilidade, "w-20"))
          }
        </div>
      </div>

      <div className="my-8">
        <Separator />
      </div>

      {/* Parte 3: Conhecimentos */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-brand-dark">Conhecimentos</h3>
        <div className="flex flex-wrap justify-start items-start gap-x-8 gap-y-4 py-2">
          {isLoading ? 
            renderLoadingSkeletons(10, "w-32") : 
            conhecimentos.map(conhecimento => renderHabilidadeItem(conhecimento, "w-32"))
          }
        </div>
      </div>
    </section>
  );
}
