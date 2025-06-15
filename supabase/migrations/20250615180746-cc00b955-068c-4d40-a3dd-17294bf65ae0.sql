
-- Habilita Row Level Security na tabela sobre
ALTER TABLE public.sobre ENABLE ROW LEVEL SECURITY;

-- (opcional) Permite SELECT para todos (sem exigir login/autenticação)
CREATE POLICY "Public read sobre"
  ON public.sobre
  FOR SELECT
  USING (true);
