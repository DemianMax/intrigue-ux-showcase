
-- Tabela para conteúdo do currículo (profile, experiências, etc)
CREATE TABLE public.curriculo (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  titulo text NOT NULL,
  resumo text NOT NULL,
  resumo_profissional text NOT NULL,
  -- Experiências (array jsonb para facilitar e expandir no futuro)
  experiencias jsonb NOT NULL,
  -- Data de criação/atualização
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Exemplo de conteúdo inicial baseado na página:
INSERT INTO public.curriculo (nome, titulo, resumo, resumo_profissional, experiencias)
VALUES (
  'Max Demian',
  'Designer de Produto • UX/UI',
  'Designer de produto com foco em UX/UI, apaixonado por transformar problemas complexos em soluções simples, intuitivas e visualmente atraentes. Experiência em todo o ciclo de vida do produto, desde a pesquisa e ideação até o design de interface e testes de usabilidade.',
  ' +5 anos de experiência em Design de Produto e UX/UI. Especialista em Pesquisa de usuário, Arquitetura de Informação, Design de Interação, Prototipação, Testes de Usabilidade e Design Systems. Ferramentas: Figma, Sketch, Adobe XD, Miro, Jira. Metodologias: Design Thinking, Lean UX, Agile.',
  '[
    {
      "cargo": "UX/UI Designer Sênior",
      "empresa": "Tech Solutions Inc.",
      "periodo": "2021 - Presente",
      "descricao": [
        "Liderança do design do principal produto SaaS da empresa, resultando em um aumento de 20% na retenção de usuários.",
        "Criação e manutenção do Design System, garantindo consistência e agilidade no desenvolvimento.",
        "Condução de pesquisas com usuários e testes de usabilidade para validar hipóteses e iterar sobre o design."
      ]
    },
    {
      "cargo": "UX/UI Designer Pleno",
      "empresa": "Creative Minds Agency",
      "periodo": "2018 - 2021",
      "descricao": [
        "Projetei interfaces para aplicativos móveis e websites para clientes de diversos setores.",
        "Participei de workshops de Design Thinking para definir estratégias de produto.",
        "Criei protótipos interativos para apresentações a stakeholders e testes com usuários."
      ]
    },
    {
      "cargo": "Estagiário de Design Gráfico",
      "empresa": "Comunica Visual",
      "periodo": "2017 - 2018",
      "descricao": [
        "Criação de materiais gráficos para mídias sociais e campanhas de marketing.",
        "Apoio na diagramação de materiais impressos."
      ]
    }
  ]'
);
