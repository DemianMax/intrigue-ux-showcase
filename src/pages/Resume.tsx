import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import TechnicalSkillsSection from "@/components/TechnicalSkillsSection";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurriculo } from "@/hooks/useCurriculo";

const Resume = () => {
  const { t, language } = useLanguage();
  const tableName = language === "en" ? "curriculo_en" : "curriculo";
  const { data: curriculo, isLoading } = useCurriculo(tableName);
  const navigate = useNavigate();

  const irParaSessao = (sectionIndex: number) => {
    navigate("/", { state: { sectionIndex } });
  };

  return (
    <div className="bg-background text-foreground font-inter min-h-screen">
      <Navigation />

      {/* Menu rápido para navegar para sessões da Home */}
      <nav className="my-8 flex gap-4 justify-center md:justify-start">
        <button onClick={() => irParaSessao(0)} className="underline text-brand-accent">{t("navHome")}</button>
        <button onClick={() => irParaSessao(1)} className="underline text-brand-accent">{t("navProjects")}</button>
        <button onClick={() => irParaSessao(2)} className="underline text-brand-accent">{t("portfolioSectionTitle")}</button>
        <button onClick={() => irParaSessao(3)} className="underline text-brand-accent">{t("navSkills")}</button>
        <button onClick={() => irParaSessao(4)} className="underline text-brand-accent">{t("navContact")}</button>
      </nav>

      <main className="max-w-7xl mx-auto p-6 md:p-4 pt-24">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("resumeSectionBack")}
            </Button>
          </Link>
          <a href="/Curriculo-Max-Demian.pdf" target="_blank" rel="noopener noreferrer">
            <Button
              variant="default"
              className="bg-brand-accent hover:bg-brand-accent/90 text-white"
            >
              {t("resumeSectionDownload")}
              <Download className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>

        {/* Resumo do topo */}
        <section className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-playfair font-bold text-brand-dark dark:text-white border-b-2 border-brand-accent inline-block pb-2 mb-6">
            {t("resumeSectionTitle")}
          </h2>
          {isLoading ? (
            <Skeleton className="h-5 w-full max-w-3xl mb-2" />
          ) : (
            <p className="text-lg leading-relaxed max-w-3xl mx-auto md:mx-0 text-muted-foreground">
              {curriculo?.resumo}
            </p>
          )}
        </section>

        {/* Resumo Profissional */}
        <section className="mb-12">
          <h3 className="text-2xl font-playfair font-bold text-brand-accent mb-6">
            {t("resumeSectionProfessionalSummary")}
          </h3>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 bg-secondary/50 dark:bg-secondary/20 p-6 rounded-lg">
            {isLoading ? (
              <>
                <Skeleton className="h-6 w-52 mb-2" />
                <Skeleton className="h-6 w-80 mb-2" />
                <Skeleton className="h-6 w-28 mb-2" />
                <Skeleton className="h-6 w-32 mb-2" />
              </>
            ) : (
              <span className="md:col-span-2 text-muted-foreground">{curriculo?.resumo_profissional}</span>
            )}
          </div>
        </section>

        {/* Experiência Completa */}
        <section className="mb-12">
          <h3 className="text-2xl font-playfair font-bold text-brand-accent mb-6">
            {t("resumeSectionExperience")}
          </h3>
          <div className="border-l-2 border-brand-accent/50 pl-6 relative space-y-10">
            {isLoading ? (
              <>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-10 w-full mb-5" />
              </>
            ) : (
              curriculo?.experiencias?.map((exp, idx) => (
                <div className="relative" key={idx}>
                  <div className="absolute -left-[34px] top-1 w-4 h-4 bg-brand-accent rounded-full border-4 border-background"></div>
                  <h4 className="font-bold text-xl text-brand-dark dark:text-white">{exp.cargo}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {exp.empresa} | {exp.periodo}
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {exp.descricao.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Educação */}
        <section className="mb-12">
          <h3 className="text-2xl font-playfair font-bold text-brand-accent mb-6">
            {t("resumeSectionEducation")}
          </h3>
          <div className="border-l-2 border-brand-accent/50 pl-6 relative space-y-10">
            {isLoading ? (
              <>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-10 w-full mb-5" />
              </>
            ) : (
              curriculo?.educacao?.map((edu, idx) => (
                <div className="relative" key={idx}>
                  <div className="absolute -left-[34px] top-1 w-4 h-4 bg-brand-accent rounded-full border-4 border-background"></div>
                  <h4 className="font-bold text-xl text-brand-dark dark:text-white">{edu.curso}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {edu.instituicao} | {edu.periodo}
                  </p>
                  <p className="text-muted-foreground">{edu.descricao}</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Sessão Habilidades Técnicas */}
        <section className="mb-12">
          <TechnicalSkillsSection />
        </section>
      </main>
    </div>
  );
};

export default Resume;
