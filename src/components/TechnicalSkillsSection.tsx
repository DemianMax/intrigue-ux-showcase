import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useHabilidadesTecnicas, type HabilidadeTecnica } from "@/hooks/useHabilidadesTecnicas";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

// Função para normalizar as chaves
function normalizeKey(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");
}

// Skeletons de loading
function renderLoadingSkeletons(count: number, widthClass: string = "w-20") {
  return Array.from({ length: count }, (_, i) => (
    <div key={i} className={`flex flex-col items-center ${widthClass}`}>
      <Skeleton className="h-9 w-9 mb-1" />
      <Skeleton className="h-4 w-16" />
    </div>
  ));
}

export default function TechnicalSkillsSection() {
  const { t } = useLanguage();
  const { data: habilidades, isLoading } = useHabilidadesTecnicas();

  const softwares = habilidades?.filter((h) => h.categoria === "software") || [];
  const habilidadesItems = habilidades?.filter((h) => h.categoria === "habilidade") || [];
  const conhecimentos = habilidades?.filter((h) => h.categoria === "conhecimento") || [];

  // Agora colocamos a renderização DENTRO do componente principal
  function renderHabilidadeItem(habilidade: HabilidadeTecnica, widthClass: string = "w-20") {
    const getIconUrl = (icone: string) => {
      if (icone.startsWith("http")) return icone;
      return `https://heroicons.com/24/outline/${icone}.svg`;
    };

    const normalizedKey = normalizeKey(habilidade.nome);
    const label = t(`skills.${normalizedKey}`) || habilidade.nome;

    return (
      <motion.div
        key={habilidade.id}
        className={`flex flex-col items-center ${widthClass}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <img
          src={getIconUrl(habilidade.icone)}
          alt={habilidade.nome}
          className="w-9 h-9 mb-1"
          style={{
            filter:
              "brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)",
          }}
          onError={(e) => {
            e.currentTarget.src =
              "https://heroicons.com/24/outline/code-bracket.svg";
          }}
        />
        <span className="text-sm text-muted-foreground text-center">{label}</span>
      </motion.div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto my-20 px-4">
      <h2 className="font-playfair text-3xl font-bold text-brand-dark mb-10 text-center">
        {t("skillsTitle")}
      </h2>

      <div>
        <h3 className="text-xl font-semibold mb-3 text-brand-dark">
          {t("skillsSoftwares")}
        </h3>
        <div className="flex flex-wrap justify-center items-start gap-x-8 gap-y-4 py-2">
          {isLoading
            ? renderLoadingSkeletons(6, "w-20")
            : softwares.map((software) => renderHabilidadeItem(software, "w-20"))}
        </div>
      </div>

      <div className="my-8">
        <Separator />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3 text-brand-dark">
          {t("skillsAbilities")}
        </h3>
        <div className="flex flex-wrap justify-center items-start gap-x-8 gap-y-4 py-2">
          {isLoading
            ? renderLoadingSkeletons(4, "w-20")
            : habilidadesItems.map((item) => renderHabilidadeItem(item, "w-20"))}
        </div>
      </div>

      <div className="my-8">
        <Separator />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3 text-brand-dark">
          {t("skillsKnowledge")}
        </h3>
        <div className="flex flex-wrap justify-center items-start gap-x-8 gap-y-4 py-2">
          {isLoading
            ? renderLoadingSkeletons(10, "w-32")
            : conhecimentos.map((item) => renderHabilidadeItem(item, "w-32"))}
        </div>
      </div>
    </section>
  );
}
