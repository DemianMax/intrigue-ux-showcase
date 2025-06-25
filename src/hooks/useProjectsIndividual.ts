
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/types/project";

const fetchProjects = async (language: string): Promise<Project[]> => {
  const tableName = language === "en" ? "projects_en" : "projects_pt";
  const { data, error } = await supabase.from(tableName).select("*").limit(3);
  if (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Could not fetch projects");
  }
  return data as Project[];
};

export function useProjectsIndividual() {
  const { language } = useLanguage();
  return useQuery<Project[]>({
    queryKey: ["projects-individual", language],
    queryFn: () => fetchProjects(language),
  });
}
