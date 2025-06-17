
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

-- Limpar dados existentes e inserir novos dados com URLs de ícones gratuitos
DELETE FROM public.habilidades_tecnicas;

-- Inserir os dados atualizados com URLs do Simple Icons (gratuito)
-- Softwares
INSERT INTO public.habilidades_tecnicas (categoria, nome, icone, ordem) VALUES
('software', 'Figma', 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/figma.svg', 1),
('software', 'Framer', 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/framer.svg', 2),
('software', 'Photoshop', 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobephotoshop.svg', 3),
('software', 'Illustrator', 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobeillustrator.svg', 4),
('software', 'After Effects', 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobeaftereffects.svg', 5),
('software', 'Sketch', 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/sketch.svg', 6);

-- Habilidades - usando ícones do Heroicons via jsDelivr
INSERT INTO public.habilidades_tecnicas (categoria, nome, icone, ordem) VALUES
('habilidade', 'Ilustração', 'https://heroicons.com/24/outline/paint-brush.svg', 1),
('habilidade', 'Animação', 'https://heroicons.com/24/outline/play.svg', 2),
('habilidade', 'Edição de vídeo', 'https://heroicons.com/24/outline/film.svg', 3),
('habilidade', 'Edição de áudio', 'https://heroicons.com/24/outline/speaker-wave.svg', 4);

-- Conhecimentos - usando ícones do Heroicons
INSERT INTO public.habilidades_tecnicas (categoria, nome, icone, ordem) VALUES
('conhecimento', 'Design Thinking', 'https://heroicons.com/24/outline/light-bulb.svg', 1),
('conhecimento', 'User Experience', 'https://heroicons.com/24/outline/user.svg', 2),
('conhecimento', 'UX Writing', 'https://heroicons.com/24/outline/pencil-square.svg', 3),
('conhecimento', 'UX Research', 'https://heroicons.com/24/outline/magnifying-glass.svg', 4),
('conhecimento', 'Prototipação', 'https://heroicons.com/24/outline/squares-2x2.svg', 5),
('conhecimento', 'Design Responsivo', 'https://heroicons.com/24/outline/device-phone-mobile.svg', 6),
('conhecimento', 'Design Gráfico', 'https://heroicons.com/24/outline/photo.svg', 7),
('conhecimento', 'Sistemas B2B e B2C', 'https://heroicons.com/24/outline/building-office.svg', 8),
('conhecimento', 'Projetos Ágeis com Scrum', 'https://heroicons.com/24/outline/arrow-path.svg', 9),
('conhecimento', 'Vibe code', 'https://heroicons.com/24/outline/code-bracket.svg', 10);
