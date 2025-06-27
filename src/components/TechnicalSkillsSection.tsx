
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useHabilidadesTecnicas, type HabilidadeTecnica } from "@/hooks/useHabilidadesTecnicas";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

function normalizeKey(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function renderLoadingSkeletons(count: number, widthClass: string = "w-20") {
  return Array.from({ length: count }, (_, i) => (
    <div key={i} className={`flex flex-col items-center ${widthClass}`}>
      <Skeleton className="h-12 w-12 mb-2 rounded-lg" />
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
        className={`flex flex-col items-center ${widthClass} group`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.05, y: -2 }}
      >
        <div className="w-12 h-12 mb-3 flex items-center justify-center bg-white rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-brand-orange-400 group-hover:to-brand-pink-500 border-2 border-brand-orange-100">
          <img
            src={getIconUrl(habilidade.icone)}
            alt={habilidade.nome}
            className="w-8 h-8 group-hover:brightness-0 group-hover:invert transition-all duration-300"
            style={{
              filter: "brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)",
            }}
            onError={(e) => {
              e.currentTarget.src = "https://heroicons.com/24/outline/code-bracket.svg";
            }}
          />
        </div>
        <span className="text-sm text-gray-600 text-center font-medium group-hover:text-brand-dark transition-colors">
          {label}
        </span>
      </motion.div>
    );
  }

  return (
    <section className="w-full bg-gradient-to-br from-brand-orange-50 via-brand-pink-50 to-brand-orange-100 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Título da seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block relative">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-brand-dark mb-4">
              {t("skillsTitle")}
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange-500 to-brand-pink-500 rounded-full"></div>
          </div>
          <p className="text-lg text-brand-dark/70 leading-relaxed max-w-2xl mx-auto mt-6">
            Ferramentas e conhecimentos que utilizo no meu dia a dia profissional
          </p>
        </motion.div>

        <div className="space-y-16">
          {/* Softwares */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-8 text-brand-dark text-center">
              {t("skillsSoftwares")}
            </h3>
            <div className="flex flex-wrap justify-center items-start gap-8">
              {isLoading
                ? renderLoadingSkeletons(6, "w-20")
                : softwares.map((software) => renderHabilidadeItem(software, "w-20"))}
            </div>
          </motion.div>

          {/* Habilidades */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-8 text-brand-dark text-center">
              {t("skillsAbilities")}
            </h3>
            <div className="flex flex-wrap justify-center items-start gap-8">
              {isLoading
                ? renderLoadingSkeletons(4, "w-20")
                : habilidadesItems.map((item) => renderHabilidadeItem(item, "w-20"))}
            </div>
          </motion.div>

          {/* Conhecimentos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-8 text-brand-dark text-center">
              {t("skillsKnowledge")}
            </h3>
            <div className="flex flex-wrap justify-center items-start gap-8">
              {isLoading
                ? renderLoadingSkeletons(10, "w-32")
                : conhecimentos.map((item) => renderHabilidadeItem(item, "w-32"))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
