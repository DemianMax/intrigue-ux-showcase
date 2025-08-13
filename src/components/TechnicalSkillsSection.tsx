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
        initial={{ opacity: 0, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-10 h-10 mb-2 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
          <img
            src={getIconUrl(habilidade.icone)}
            alt={habilidade.nome}
            className="w-6 h-6"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)",
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
    <section className="w-full bg-gray-150 dark:bg-gray-800 py-32 px-6 pt-20">
   <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Bloco do título e subtítulo alinhados e responsivos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            flex flex-col
            items-center
            justify-center
            gap-3
            lg:flex-row
            lg:items-center
            lg:justify-center
            lg:gap-16
            mb-24
            text-center
          "
        >
          <h2 className=" font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark dark:text-white mb-1 lg:text-right lg:text-rigth lg:mb-0 lg:max-w-80">
            {t("skillsTitle")}
          </h2>
          <p className="lg:text-left text-base text-brand-dark/70 dark:text-gray-300 leading-relaxed max-w-xl mb-0 lg:ml-0 lg:mb-0 lg:max-w-80">
            {t("skillsSubtitle")}
          </p>
        </motion.div>

        {/* Sessões empilhadas */}
        <div className="flex flex-col gap-12 md:gap-16 lg:gap-6">

          {/* Softwares */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col lg:flex-row lg:items-center text-center lg:text-left gap-2"
          >
            <h3 className="text-xl font-semibold text-brand-dark dark:text-white min-w-[150px] mb-6 lg:mb-0">
              {t("skillsSoftwares")}
            </h3>
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 flex-1">
              {isLoading
                ? renderLoadingSkeletons(6)
                : softwares.map((software) => renderHabilidadeItem(software))}
            </div>
          </motion.div>

          {/* Habilidades */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col lg:flex-row lg:items-center text-center lg:text-left gap-4"
          >
            <h3 className="text-xl font-semibold text-brand-dark dark:text-white min-w-[150px] mb-6 lg:mb-0">
              {t("skillsAbilities")}
            </h3>
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 flex-1">
              {isLoading
                ? renderLoadingSkeletons(6)
                : habilidadesItems.map((item) => renderHabilidadeItem(item))}
            </div>
          </motion.div>

          {/* Conhecimentos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col lg:flex-row lg:items-center text-center lg:text-left gap-4"
          >
            <h3 className="text-xl font-semibold text-brand-dark dark:text-white min-w-[150px] mb-6 lg:mb-0">
              {t("skillsKnowledge")}
            </h3>
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 flex-1">
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
