
-- Remover campos atuais da solução que são limitados a uma imagem
ALTER TABLE public.projects 
DROP COLUMN solution_image,
DROP COLUMN solution_legend;

-- Adicionar novos campos para múltiplas imagens da solução
ALTER TABLE public.projects 
ADD COLUMN solution_images_text text,
ADD COLUMN solution_images_legends_text text;

-- Atualizar dados existentes para manter compatibilidade (exemplo)
UPDATE public.projects 
SET solution_images_text = 'https://ybggbbekoxgkeyvkiech.supabase.co/storage/v1/object/sign/imgproj/signovo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zNTI2MzU4YS0wMGRhLTQwZTQtODY2My1lNDlkODk0NTRkZjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWdwcm9qL3NpZ25vdm8ucG5nIiwiaWF0IjoxNzQ5OTk3MDE0LCJleHAiOjE3ODE1MzMwMTR9.-7ceSixLpNA6owV1zi58mqynJW3m-zgF683hB3vxf-U,https://ybggbbekoxgkeyvkiech.supabase.co/storage/v1/object/sign/imgproj/signovo-mobile.png?token=example',
    solution_images_legends_text = 'Interface desktop do sistema Signovo,Interface mobile responsiva'
WHERE id = '5154d0fa-1613-4bda-b85b-8c532c9f190d';

-- Atualizar legendas dos processos com exemplos mais descritivos
UPDATE public.projects 
SET process_legends_text = 'Análise dos requisitos e mapeamento de funcionalidades,Criação de wireframes e definição da arquitetura,Desenvolvimento do protótipo interativo'
WHERE id = '5154d0fa-1613-4bda-b85b-8c532c9f190d';
