
-- Criação da tabela 'sobre'
CREATE TABLE public.sobre (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  titulo TEXT NOT NULL,
  destaque TEXT,
  resumo TEXT,
  imagem_perfil TEXT,
  ativo BOOLEAN DEFAULT TRUE
);

-- Index para facilitar buscas pela sessão ativa
CREATE INDEX idx_sobre_ativo ON public.sobre(ativo);

-- Populando o registro inicial com as informações existentes da sessão Sobre
INSERT INTO public.sobre (
  titulo,
  destaque,
  resumo,
  imagem_perfil,
  ativo
) VALUES (
  'Muito prazer, sou Max Demian',
  'Designer apaixonado por criar experiências intuitivas e envolventes',
  'Entrego mais do que telas bonitas: pesquiso, facilito, crio soluções visuais e estratégias focadas nas pessoas. Minhas habilidades em ilustração/infografia tornam o complexo em simples visível, potencializando meus projetos de UX.',
  '/lovable-uploads/b5362a7a-ef6f-46c7-ac27-99fa2fcde1f1.jpg',
  TRUE
);

