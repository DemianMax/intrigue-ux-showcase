-- Add background_color field to projects tables
ALTER TABLE public.projects_pt ADD COLUMN background_color VARCHAR(7) DEFAULT '#3B82F6';
ALTER TABLE public.projects_en ADD COLUMN background_color VARCHAR(7) DEFAULT '#3B82F6';