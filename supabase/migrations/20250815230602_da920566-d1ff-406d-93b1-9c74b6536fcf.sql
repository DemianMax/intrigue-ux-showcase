-- Add process_text field to both projects tables
ALTER TABLE public.projects_pt 
ADD COLUMN process_text text;

ALTER TABLE public.projects_en 
ADD COLUMN process_text text;