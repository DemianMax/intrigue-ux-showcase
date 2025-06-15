
-- Habilita Row Level Security na tabela curriculo
ALTER TABLE public.curriculo ENABLE ROW LEVEL SECURITY;

-- (opcional) Permite SELECT para todos (sem exigir login/autenticação)
CREATE POLICY "Public read curriculo"
  ON public.curriculo
  FOR SELECT
  USING (true);
