import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import TechnicalSkillsSection from "@/components/TechnicalSkillsSection";
import Navigation from "@/components/Navigation";

// Tipagem para os dados do curriculo
type Experiencia = {
  cargo: string;
  empresa: string;
  periodo: string;
  descricao: string[];
};

type Educacao = {
  instituicao: string;
  curso: string;
  periodo: string;
  descricao: string;
};

type Curriculo = {
  id: string;
  nome: string;
  titulo: string;
  resumo: string;
  resumo_profissional: string;
  experiencias: Experiencia[];
  educacao: Educacao[];
};

const fetchCurriculo = async (): Promise<Curriculo | null> => {
  const { data, error } = await supabase
    .from("curriculo")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error("Erro ao buscar currículo.");
  if (!data) return null;

  // Parse experiencias to type Experiencia[] only if valid
  let experiencias: Experiencia[] = [];
  if (Array.isArray(data.experiencias)) {
    // If the object properties match, assign directly (trusting backend shape)
    experiencias = data.experiencias as Experiencia[];
  } else if (typeof data.experiencias === "string") {
    // If for some reason stored as string, try to parse
    try {
      const parsed = JSON.parse(data.experiencias);
      if (Array.isArray(parsed)) {
        experiencias = parsed as Experiencia[];
      }
    } catch {}
  }

  // Parse educacao to type Educacao[] only if valid
  let educacao: Educacao[] = [];
  if (Array.isArray(data.educacao)) {
    educacao = data.educacao as Educacao[];
  } else if (typeof data.educacao === "string") {
    try {
      const parsed = JSON.parse(data.educacao);
      if (Array.isArray(parsed)) {
        educacao = parsed as Educacao[];
      }
    } catch {}
  }

  return {
    id: data.id,
    nome: data.nome,
    titulo: data.titulo,
    resumo: data.resumo,
    resumo_profissional: data.resumo_profissional,
    experiencias: experiencias,
    educacao: educacao,
  };
};

const Resume = () => {
  const { data: curriculo, isLoading } = useQuery({
    queryKey: ["curriculo"],
    queryFn: fetchCurriculo,
  });

  return (
    <div className="bg-background text-foreground font-inter min-h-screen">
      <Navigation />

      <main className="max-w-4xl mx-auto p-6 md:p-10 pt-24">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
          
          <a href="/Curriculo-Max-Demian.pdf" target="_blank" rel="noopener noreferrer">
            <Button
              variant="default"
              className="bg-brand-accent hover:bg-brand-accent/90 text-white"
            >
              Baixar PDF
              <Download className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>

        {/* Resumo do topo */}
        <section className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-playfair font-bold text-brand-dark dark:text-white border-b-2 border-brand-accent inline-block pb-2 mb-6">
            Currículo
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
            Resumo Profissional
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
            Experiência Completa
          </h3>

          <div className="border-l-2 border-brand-accent/50 pl-6 relative space-y-10">
            {isLoading ? (
              <>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-10 w-full mb-5" />
              </>
            ) : (
              curriculo?.experiencias.map((exp, idx) => (
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
            Educação
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
