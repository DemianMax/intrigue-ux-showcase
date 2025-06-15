
-- Torna as novas colunas da tabela 'projects' nulas para evitar erros de inserção.
ALTER TABLE public.projects
ALTER COLUMN challenge DROP NOT NULL,
ALTER COLUMN process_images DROP NOT NULL,
ALTER COLUMN process_legends DROP NOT NULL,
ALTER COLUMN solution_image DROP NOT NULL,
ALTER COLUMN solution_legend DROP NOT NULL,
ALTER COLUMN ui_note DROP NOT NULL,
ALTER COLUMN results DROP NOT NULL,
ALTER COLUMN next_steps DROP NOT NULL;
