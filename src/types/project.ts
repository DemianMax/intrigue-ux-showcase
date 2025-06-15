
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// A interface CaseStudy não é mais necessária, pois seus campos foram migrados para a interface Project.

export interface Project {
  id: string;
  title: string;
  role: string;
  problem: string;
  solution:string;
  hashtags: string[] | null;
  image: string;
  created_at: string;
  // Campos que antes estavam em 'caseStudy', agora opcionais
  challenge: string | null;
  process_images: string[] | null;
  process_legends: string[] | null;
  solution_image: string | null;
  solution_legend: string | null;
  ui_note: string | null;
  results: string[] | null;
  next_steps: string | null;
}
