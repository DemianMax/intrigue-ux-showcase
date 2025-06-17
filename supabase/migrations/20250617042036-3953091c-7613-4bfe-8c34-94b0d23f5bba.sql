
-- Adicionar coluna de educação na tabela curriculo
ALTER TABLE public.curriculo 
ADD COLUMN educacao jsonb;

-- Inserir dados de exemplo para educação
UPDATE public.curriculo 
SET educacao = '[
  {
    "instituicao": "Universidade Federal de São Paulo",
    "curso": "Bacharelado em Design",
    "periodo": "2015 - 2019",
    "descricao": "Graduação com foco em Design Gráfico e Digital, incluindo disciplinas de UX/UI Design, Tipografia e Teoria das Cores."
  },
  {
    "instituicao": "Escola de Design Thinking",
    "curso": "Certificação em Design Thinking",
    "periodo": "2020",
    "descricao": "Curso intensivo sobre metodologias de Design Thinking aplicadas ao desenvolvimento de produtos digitais."
  },
  {
    "instituicao": "Google UX Design Certificate",
    "curso": "UX Design Professional Certificate",
    "periodo": "2021",
    "descricao": "Certificação profissional em UX Design com foco em pesquisa de usuários, prototipação e testes de usabilidade."
  }
]'
WHERE id = (SELECT id FROM public.curriculo ORDER BY created_at DESC LIMIT 1);
