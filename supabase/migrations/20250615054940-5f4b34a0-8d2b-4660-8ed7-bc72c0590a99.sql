
-- Cria a tabela 'projects' para armazenar os dados do portfólio.
CREATE TABLE public.projects (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  role text NOT NULL,
  problem text NOT NULL,
  solution text NOT NULL,
  hashtags text[],
  image text NOT NULL,
  "caseStudy" jsonb NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Habilita a Segurança em Nível de Linha (RLS) para garantir a proteção dos dados.
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Cria uma política que permite que qualquer pessoa (visitantes do site) visualize os projetos.
CREATE POLICY "Public projects are viewable by everyone."
ON public.projects FOR SELECT
USING ( true );

-- Cria uma política que permite que usuários autenticados (como você, no painel do Supabase) insiram novos projetos.
CREATE POLICY "Authenticated users can insert projects."
ON public.projects FOR INSERT
WITH CHECK ( auth.role() = 'authenticated' );

-- Cria uma política que permite que usuários autenticados atualizem os projetos existentes.
CREATE POLICY "Authenticated users can update projects."
ON public.projects FOR UPDATE
USING ( auth.role() = 'authenticated' );

-- Cria uma política que permite que usuários autenticados deletem projetos.
CREATE POLICY "Authenticated users can delete projects."
ON public.projects FOR DELETE
USING ( auth.role() = 'authenticated' );
