
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Project {
  id: string;
  title: string;
  role: string;
  problem: string;
  solution:string;
  hashtags_text: string | null;
  image: string;
  created_at: string;
  // Campos que antes estavam em 'caseStudy', agora opcionais
  challenge: string | null;
  process_images_text: string | null;
  process_legends_text: string | null;
  solution_images_text: string | null;
  solution_images_legends_text: string | null;
  ui_note: string | null;
  results_text: string | null;
  next_steps: string | null;
}
