-- Add challenge_images field to both projects tables
ALTER TABLE public.projects_pt 
ADD COLUMN challenge_images text;

ALTER TABLE public.projects_en 
ADD COLUMN challenge_images text;