
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
  solution: string;
  hashtags: string[] | null;
  image: string;
  created_at: string;
  // Campos que antes estavam em 'caseStudy'
  challenge: string;
  process_images: string[];
  process_legends: string[];
  solution_image: string;
  solution_legend: string;
  ui_note: string;
  results: string[];
  next_steps: string;
}
