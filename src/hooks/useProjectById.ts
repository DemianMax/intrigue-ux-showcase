import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/types/project";

export const useProjectById = (projectId: string) => {
  const { language } = useLanguage();

  return useQuery<Project | null>({
    queryKey: ["project", projectId, language],
    queryFn: async () => {
      const tableName = language === "en" ? "projects_en" : "projects_pt";
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .eq("id", projectId)
        .single();

      if (error) {
        console.error("Error fetching project:", error);
        throw new Error("Could not fetch project");
      }

      return data as Project;
    },
    enabled: !!projectId,
  });
};
