-- Add project details fields to projects_pt table
ALTER TABLE public.projects_pt 
ADD COLUMN project_type TEXT,
ADD COLUMN tools_used TEXT,
ADD COLUMN project_period TEXT,
ADD COLUMN project_role_detail TEXT;

-- Add project details fields to projects_en table  
ALTER TABLE public.projects_en
ADD COLUMN project_type TEXT,
ADD COLUMN tools_used TEXT,
ADD COLUMN project_period TEXT,
ADD COLUMN project_role_detail TEXT;