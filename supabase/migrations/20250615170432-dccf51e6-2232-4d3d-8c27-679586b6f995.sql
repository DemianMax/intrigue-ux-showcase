
-- Habilita Row Level Security na tabela portfolio_items
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

-- Permite SELECT para todos (sem exigir autenticação/login)
CREATE POLICY "Public read portfolio_items"
  ON public.portfolio_items
  FOR SELECT
  USING (true);
