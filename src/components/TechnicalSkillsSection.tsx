
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

export default function TechnicalSkillsSection() {
  const { t } = useLanguage();
  const { data: habilidades, isLoading } = useHabilidadesTecnicas();

  const softwares = habilidades?.filter((h) => h.categoria === "software") || [];
  const habilidadesItems = habilidades?.filter((h) => h.categoria === "habilidade") || [];
  const conhecimentos = habilidades?.filter((h) => h.categoria === "conhecimento") || [];

  function renderHabilidadeItem(habilidade: HabilidadeTecnica) {
    const getIconUrl = (icone: string) => {
      if (icone.startsWith("http")) return icone;
      return `https://heroicons.com/24/outline/${icone}.svg`;
    };

    const normalizedKey = normalizeKey(habilidade.nome);
    const label = t(`skills.${normalizedKey}`) || habilidade.nome;

    return (
      <motion.div
        key={habilidade.id}
        className="flex flex-col items-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-10 h-10 mb-2 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
          <img
            src={getIconUrl(habilidade.icone)}
            alt={habilidade.nome}
            className="w-6 h-6"
            style={{
              filter: "brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)",
            }}
            onError={(e) => {
              e.currentTarget.src = "https://heroicons.com/24/outline/code-bracket.svg";
            }}
          />
        </div>
        <span className="text-xs text-gray-600 dark:text-gray-300 text-center font-medium">
          {label}
        </span>
      </motion.div>
    );
  }

  function renderLoadingSkeletons(count: number) {
    return Array.from({ length: count }, (_, i) => (
      <div key={i} className="flex flex-col items-center mb-4">
        <div className="h-10 w-10 mb-2 rounded-lg bg-gray-200 dark:bg-gray-600 animate-pulse" />
        <div className="h-3 w-12 bg-gray-200 dark:bg-gray-600 animate-pulse rounded" />
      </div>
    ));
  }

  return (
    <section className="w-full bg-gray-50 dark:bg-gray-800 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Título da seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-dark dark:text-white mb-3">
            {t("skillsTitle")}
          </h2>
          <div className="w-16 h-1 bg-brand-accent mx-auto rounded-full mb-4"></div>
          <p className="text-base text-brand-dark/70 dark:text-gray-300 leading-relaxed max-w-xl mx-auto">
            Ferramentas e conhecimentos que utilizo no meu dia a dia profissional
          </p>
        </motion.div>

        {/* Grid de 3 colunas */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Coluna Softwares */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold mb-6 text-brand-dark dark:text-white">
              {t("skillsSoftwares")}
            </h3>
            <div className="grid grid-cols-3 gap-4 justify-items-center">
              {isLoading
                ? renderLoadingSkeletons(6)
                : softwares.map((software) => renderHabilidadeItem(software))}
            </div>
          </motion.div>

          {/* Coluna Habilidades */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold mb-6 text-brand-dark dark:text-white">
              {t("skillsAbilities")}
            </h3>
            <div className="grid grid-cols-3 gap-4 justify-items-center">
              {isLoading
                ? renderLoadingSkeletons(6)
                : habilidadesItems.map((item) => renderHabilidadeItem(item))}
            </div>
          </motion.div>

          {/* Coluna Conhecimentos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold mb-6 text-brand-dark dark:text-white">
              {t("skillsKnowledge")}
            </h3>
            <div className="grid grid-cols-2 gap-4 justify-items-center">
              {isLoading
                ? renderLoadingSkeletons(4)
                : conhecimentos.map((item) => renderHabilidadeItem(item))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
