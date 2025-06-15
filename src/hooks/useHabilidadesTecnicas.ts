
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type HabilidadeTecnica = {
  id: string;
  categoria: 'software' | 'habilidade' | 'conhecimento';
  nome: string;
  icone: string;
  ordem: number;
  ativo: boolean;
};

async function fetchHabilidadesTecnicas(): Promise<HabilidadeTecnica[]> {
  const { data, error } = await supabase
    .from("habilidades_tecnicas")
    .select("*")
    .eq("ativo", true)
    .order("ordem", { ascending: true });

  if (error) {
    console.error("Erro ao buscar habilidades técnicas:", error);
    return [];
  }
  
  return data || [];
}

export function useHabilidadesTecnicas() {
  return useQuery({
    queryKey: ["habilidades-tecnicas"],
    queryFn: fetchHabilidadesTecnicas,
  });
}
