
export interface Project {
  id: string;
  title: string;
  role: string;
  problem: string;
  solution: string;
  challenge?: string;
  hashtags_text?: string;
  process_images_text?: string;
  process_legends_text?: string;
  solution_images_text?: string;
  solution_images_legends_text?: string;
  ui_note?: string;
  results_text?: string;
  next_steps?: string;
  image?: string;
  created_at?: string;
  // Corrigindo o tipo para corresponder ao banco de dados
  process_images_data?: any; // Json type from Supabase
}
