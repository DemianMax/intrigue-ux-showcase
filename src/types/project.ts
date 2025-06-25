
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
  // Adicionando as propriedades que estavam faltando
  process_images_data?: string;
}
