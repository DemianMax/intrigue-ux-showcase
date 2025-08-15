-- Adicionar novos campos na tabela projects_pt para suportar o novo layout da página individual
ALTER TABLE public.projects_pt 
ADD COLUMN IF NOT EXISTS prototyping_title TEXT,
ADD COLUMN IF NOT EXISTS prototyping_text TEXT,
ADD COLUMN IF NOT EXISTS prototyping_images TEXT,
ADD COLUMN IF NOT EXISTS final_solution_title TEXT,
ADD COLUMN IF NOT EXISTS final_solution_text TEXT,
ADD COLUMN IF NOT EXISTS final_solution_video TEXT,
ADD COLUMN IF NOT EXISTS final_solution_images TEXT,
ADD COLUMN IF NOT EXISTS learning_conclusion_title TEXT,
ADD COLUMN IF NOT EXISTS learning_conclusion_text TEXT,
ADD COLUMN IF NOT EXISTS additional_images_grid TEXT;

-- Adicionar novos campos na tabela projects_en para suportar o novo layout da página individual
ALTER TABLE public.projects_en 
ADD COLUMN IF NOT EXISTS prototyping_title TEXT,
ADD COLUMN IF NOT EXISTS prototyping_text TEXT,
ADD COLUMN IF NOT EXISTS prototyping_images TEXT,
ADD COLUMN IF NOT EXISTS final_solution_title TEXT,
ADD COLUMN IF NOT EXISTS final_solution_text TEXT,
ADD COLUMN IF NOT EXISTS final_solution_video TEXT,
ADD COLUMN IF NOT EXISTS final_solution_images TEXT,
ADD COLUMN IF NOT EXISTS learning_conclusion_title TEXT,
ADD COLUMN IF NOT EXISTS learning_conclusion_text TEXT,
ADD COLUMN IF NOT EXISTS additional_images_grid TEXT;