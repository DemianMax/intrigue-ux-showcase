import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Experiencia = {
  cargo: string;
  empresa: string;
  periodo: string;
  descricao: string[];
};

export type Educacao = {
  instituicao: string;
  curso: string;
  periodo: string;
  descricao: string;
};

export type Curriculo = {
  id: string;
  nome: string;
  titulo: string;
  resumo: string;
  resumo_profissional: string;
  experiencias: Experiencia[];
  educacao: Educacao[];
};

async function fetchCurriculo(tableName: string): Promise<Curriculo | null> {
  // Supressão de tipagem do Supabase Client para permitir string dinâmica ao buscar tabelas multilíngues.
  const { data, error } = await (supabase.from as any)(tableName)
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Erro ao buscar currículo:", error);
    return null;
  }
  if (!data) return null;

  // Parse seguro para garantir array mesmo se salvo como string JSON
  let experiencias: Experiencia[] = [];
  if (Array.isArray(data.experiencias)) {
    experiencias = data.experiencias as Experiencia[];
  } else if (typeof data.experiencias === "string") {
    try {
      const parsed = JSON.parse(data.experiencias);
      if (Array.isArray(parsed)) experiencias = parsed as Experiencia[];
    } catch {}
  }

  let educacao: Educacao[] = [];
  if (Array.isArray(data.educacao)) {
    educacao = data.educacao as Educacao[];
  } else if (typeof data.educacao === "string") {
    try {
      const parsed = JSON.parse(data.educacao);
      if (Array.isArray(parsed)) educacao = parsed as Educacao[];
    } catch {}
  }

  return {
    id: data.id ?? "",
    nome: data.nome ?? "",
    titulo: data.titulo ?? "",
    resumo: data.resumo ?? "",
    resumo_profissional: data.resumo_profissional ?? "",
    experiencias,
    educacao,
  };
}

export function useCurriculo(tableName: string = "curriculo") {
  return useQuery<Curriculo | null>({
    queryKey: ["curriculo", tableName],
    queryFn: () => fetchCurriculo(tableName),
    staleTime: 1000 * 60 * 5,
  });
}
