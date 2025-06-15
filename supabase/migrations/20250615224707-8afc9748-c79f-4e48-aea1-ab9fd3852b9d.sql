
-- Criar tabela para habilidades técnicas
CREATE TABLE public.habilidades_tecnicas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  categoria TEXT NOT NULL CHECK (categoria IN ('software', 'habilidade', 'conhecimento')),
  nome TEXT NOT NULL,
  icone TEXT NOT NULL,
  ordem INTEGER DEFAULT 0,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS desde o início
ALTER TABLE public.habilidades_tecnicas ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública (qualquer pessoa pode ver)
CREATE POLICY "Public read habilidades_tecnicas"
  ON public.habilidades_tecnicas
  FOR SELECT
  USING (true);

-- Inserir os dados que já estão no código atual
-- Softwares
INSERT INTO public.habilidades_tecnicas (categoria, nome, icone, ordem) VALUES
('software', 'Figma', 'Figma', 1),
('software', 'Framer', 'Framer', 2),
('software', 'Photoshop', 'Image', 3),
('software', 'Illustrator', 'PenSquare', 4),
('software', 'After Effects', 'Film', 5),
('software', 'Sketch', 'PenLine', 6);

-- Habilidades
INSERT INTO public.habilidades_tecnicas (categoria, nome, icone, ordem) VALUES
('habilidade', 'Ilustração', 'Pencil', 1),
('habilidade', 'Animação', 'Play', 2),
('habilidade', 'Edição de vídeo', 'Play', 3),
('habilidade', 'Edição de áudio', 'Headphones', 4);

-- Conhecimentos
INSERT INTO public.habilidades_tecnicas (categoria, nome, icone, ordem) VALUES
('conhecimento', 'Design Thinking', 'LayoutDashboard', 1),
('conhecimento', 'User Experience', 'PenTool', 2),
('conhecimento', 'UX Writing', 'Text', 3),
('conhecimento', 'UX Research', 'PenTool', 4),
('conhecimento', 'Prototipação', 'LayoutDashboard', 5),
('conhecimento', 'Design Responsivo', 'Square', 6),
('conhecimento', 'Design Gráfico', 'Pencil', 7),
('conhecimento', 'Sistemas B2B e B2C', 'LayoutDashboard', 8),
('conhecimento', 'Projetos Ágeis com Scrum', 'Square', 9),
('conhecimento', 'Vibe code', 'PenTool', 10);
