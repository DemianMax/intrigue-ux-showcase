
export interface Project {
  id: string;
  title: string;
  role: string;
  problem: string;
  solution: string;
  challenge?: string;
  challenge_images?: string;
  hashtags_text?: string;
  process_text?: string;
  process_images_text?: string;
  process_legends_text?: string;
  solution_images_text?: string;
  solution_images_legends_text?: string;
  ui_note?: string;
  results_text?: string;
  next_steps?: string;
  image?: string;
  created_at?: string;
  // Novos campos baseados no wireframe
  topPageimg?: string;
  process_images_data?: any; // Json type from Supabase
  prototyping_title?: string;
  prototyping_text?: string;
  prototyping_images?: any; // Json type from Supabase
  final_solution_title?: string;
  final_solution_text?: string;
  final_solution_video?: string;
  final_solution_images?: string;
  learning_conclusion_title?: string;
  learning_conclusion_text?: string;
  additional_images_grid?: string;
  project_type?: string;
  tools_used?: string;
  project_period?: string;
  project_role_detail?: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_description?: string;
  hero_image?: string;
  background_color?: string;
}
