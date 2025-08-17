-- Add hero section fields to projects_pt table
ALTER TABLE public.projects_pt 
ADD COLUMN hero_title TEXT,
ADD COLUMN hero_subtitle TEXT, 
ADD COLUMN hero_description TEXT,
ADD COLUMN hero_image TEXT;

-- Add hero section fields to projects_en table  
ALTER TABLE public.projects_en
ADD COLUMN hero_title TEXT,
ADD COLUMN hero_subtitle TEXT,
ADD COLUMN hero_description TEXT, 
ADD COLUMN hero_image TEXT;