
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Sobre = {
  id: string;
  titulo: string;
  destaque: string | null;
  resumo: string | null;
  imagem_perfil: string | null;
  ativo: boolean | null;
};

async function fetchSobre(): Promise<Sobre | null> {
  const { data, error } = await supabase
    .from("sobre")
    .select("*")
    .eq("ativo", true)
    .order("created_at", { ascending: true })
    .limit(1)
    .single();

  if (error) {
    console.error("Erro ao buscar sessão Sobre:", error);
    return null;
  }
  return data;
}

export function useSobre() {
  return useQuery({
    queryKey: ["sobre"],
    queryFn: fetchSobre,
  });
}
