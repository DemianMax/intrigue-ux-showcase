-- Alterar campo prototyping_images para JSON em projects_pt
ALTER TABLE public.projects_pt 
ALTER COLUMN prototyping_images TYPE jsonb USING 
CASE 
  WHEN prototyping_images IS NULL THEN NULL
  ELSE jsonb_build_array(jsonb_build_object('url', prototyping_images, 'caption', 'Processo e Pesquisa'))
END;

-- Alterar campo prototyping_images para JSON em projects_en  
ALTER TABLE public.projects_en 
ALTER COLUMN prototyping_images TYPE jsonb USING 
CASE 
  WHEN prototyping_images IS NULL THEN NULL
  ELSE jsonb_build_array(jsonb_build_object('url', prototyping_images, 'caption', 'Process and Research'))
END;