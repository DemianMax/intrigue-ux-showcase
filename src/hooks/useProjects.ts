import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/types/project";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";

// Função que retorna o nome da tabela baseado no idioma
const getTableNameByLanguage = (language: 'pt' | 'en') => {
  if (language === 'pt') return 'projects_pt';
  if (language === 'en') return 'projects_en';
  return 'projects_pt';  // fallback de segurança
};

export const useProjects = () => {
  const { language } = useLanguage();

  return useQuery<Project[]>({
    queryKey: ['projects', language],
    queryFn: async () => {
      const tableName = getTableNameByLanguage(language);
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        throw new Error('Could not fetch projects');
      }

      return (data as Project[]) || [];
    }
  });
};
