
-- Simplifica a estrutura da tabela projects removendo os campos de array
-- e substituindo por campos de texto simples

-- Remove os campos de array problemáticos
ALTER TABLE public.projects 
DROP COLUMN hashtags,
DROP COLUMN process_images,
DROP COLUMN process_legends,
DROP COLUMN results;

-- Adiciona campos de texto simples para substituir os arrays
ALTER TABLE public.projects 
ADD COLUMN hashtags_text text,
ADD COLUMN process_images_text text,
ADD COLUMN process_legends_text text,
ADD COLUMN results_text text;
