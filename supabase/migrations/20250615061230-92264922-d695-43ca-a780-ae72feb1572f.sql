
-- Remove a coluna 'caseStudy' que é do tipo jsonb.
ALTER TABLE public.projects DROP COLUMN "caseStudy";

-- Adiciona as novas colunas para substituir o jsonb.
ALTER TABLE public.projects
ADD COLUMN challenge text NOT NULL,
ADD COLUMN process_images text[] NOT NULL,
ADD COLUMN process_legends text[] NOT NULL,
ADD COLUMN solution_image text NOT NULL,
ADD COLUMN solution_legend text NOT NULL,
ADD COLUMN ui_note text NOT NULL,
ADD COLUMN results text[] NOT NULL,
ADD COLUMN next_steps text NOT NULL;
