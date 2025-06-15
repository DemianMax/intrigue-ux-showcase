
export interface Project {
  id: string;
  title: string;
  role: string;
  problem: string;
  solution: string;
  hashtags?: string[];
  image: string;
  caseStudy: {
    challenge: string;
    process: { img: string; legend: string }[];
    solutionImg: string;
    solutionLegend: string;
    uiNote: string;
    results: string[];
    next: string;
  };
}

export const projects: Project[] = [
  {
    id: "fintech-simplifica",
    title: "Fintech Simplifica",
    role: "UX Lead & UI Designer",
    problem: "Processo de onboarding longo e confuso, resultando em alta taxa de abandono de usuários.",
    solution: "Redesenhei o fluxo de cadastro, o que triplicou a conversão de novos usuários em serviços financeiros.",
    hashtags: ["#onboarding", "#fintech", "#mobile"],
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=800&h=600&fit=crop",
    caseStudy: {
      challenge: "Usuários enfrentavam frustração e abandono ao tentar abrir conta; processos longos e confusos bloqueavam conversão.",
      process: [
        { img: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=800&h=600&fit=crop", legend: "Mapeamento de fricções reais — ouvindo usuários." },
        { img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&h=600&fit=crop", legend: "Jornada redesenhada: simplificando os pontos de atrito." },
        { img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=800&h=600&fit=crop", legend: "Protótipo iterado e testado para onboarding eficiente." }
      ],
      solutionImg: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&h=600&fit=crop",
      solutionLegend: "Novo onboarding: simples, informativo e inclusivo.",
      uiNote: "Essa arquitetura simplificou o fluxo de abertura de conta: menos etapas, copy clara e feedback visual imediato. A paleta evoca confiança e acessibilidade.",
      results: [
        "Abandono na abertura de conta caiu de 62% para 21%",
        "Usuários relataram 2x mais clareza no processo",
        "Aprendi que o simples pode ser marcante — pesquisa e iteração fazem toda a diferença."
      ],
      next: "Hoje faria protótipos ainda mais ‘mágicos’, incluindo onboarding progressivo."
    }
  },
  {
    id: "app-delivery-ui",
    title: "App Delivery UI",
    role: "UI Designer",
    problem: "A interface anterior gerava dúvidas e solicitações excessivas no suporte ao cliente.",
    solution: "Redesenhei a interface com foco na clareza do fluxo, o que reduziu em 38% os tickets de suporte.",
    hashtags: ["#delivery", "#ui", "#designsystem"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&h=600&fit=crop",
    caseStudy: {
      challenge: "A interface anterior gerava dúvidas e solicitações no suporte. Precisávamos simplificar e clarear o fluxo de pedidos.",
      process: [
        { img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&h=600&fit=crop", legend: "Pesquisa de experiência do usuário e pontos de frustração." },
        { img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=800&h=600&fit=crop", legend: "Wireframes para novo fluxo sem ambiguidade." },
        { img: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=800&h=600&fit=crop", legend: "Prototipação de telas mobile e validação." }
      ],
      solutionImg: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&h=600&fit=crop",
      solutionLegend: "Interface enxuta e explicativa, evitando erros e demandas por suporte.",
      uiNote: "Optei por uso consistente de cores e componentes reutilizáveis. Tipografia limpa eleva legibilidade.",
      results: [
        "Redução de 38% nos tickets de suporte.",
        "Usuários avaliaram mais intuitivo no pós-teste.",
        "Comprovação do valor de protótipos mesmo para pequenos fluxos."
      ],
      next: "Faria testes A/B para micro animações explicativas."
    }
  },
  {
    id: "ecommerce-dashboard",
    title: "E-commerce Dashboard",
    role: "UX/UI Designer",
    problem: "Diretores e gerentes tinham dificuldade em encontrar KPIs essenciais de forma rápida para tomada de decisão.",
    solution: "Criei um novo dashboard focado em visualização de dados e navegação simplificada, agilizando as decisões.",
    hashtags: ["#dashboard", "#ecommerce", "#uxresearch"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&h=600&fit=crop",
    caseStudy: {
      challenge: "Diretores tinham dificuldade em encontrar KPIs essenciais rapidamente.",
      process: [
        { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&h=600&fit=crop", legend: "Entrevistas com stakeholders para mapear necessidades." },
        { img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&h=600&fit=crop", legend: "Wireframes e refinamento da arquitetura de informação." },
        { img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=800&h=600&fit=crop", legend: "Validação da solução com usuários-chave." }
      ],
      solutionImg: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=800&h=600&fit=crop",
      solutionLegend: "Painéis modulares que destacam métricas críticas e facilitam decisões rápidas.",
      uiNote: "Utilização de componentes visuais consistentes e cores para hierarquia da informação.",
      results: [
        "Tomada de decisão 30% mais rápida.",
        "Feedback positivo das áreas comerciais.",
        "Aprendi o poder do co-design na definição de dashboards."
      ],
      next: "Exploraria integrações com assistentes de voz ou bots de insights."
    }
  },
  {
    id: "landingpage-campanha",
    title: "Landing Page Campanha",
    role: "UX Designer",
    problem: "A página da campanha de marketing possuía uma taxa de conversão abaixo da meta esperada.",
    solution: "Desenvolvi uma landing page com foco em storytelling visual, que aumentou a conversão em 24%.",
    hashtags: ["#landingpage", "#storytelling", "#a11y"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&h=600&fit=crop",
    caseStudy: {
      challenge: "Conversão da campanha estava abaixo do ideal, dificuldade em comunicar o diferencial.",
      process: [
        { img: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=800&h=600&fit=crop", legend: "Mapeamento de argumentos persuasivos juntos ao marketing." },
        { img: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&h=600&fit=crop", legend: "Testes de diferentes retóricas visuais e botões." },
        { img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&h=600&fit=crop", legend: "Ajustes após análise de mapas de calor." }
      ],
      solutionImg: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=800&h=600&fit=crop",
      solutionLegend: "Fluxo visual que conta uma história e leva ao CTA sem distrações.",
      uiNote: "Priorizei contraste, hierarquia e acessibilidade para todos.",
      results: [
        "Conversão cresceu 24%.",
        "Usuários elogiaram clareza e navegação.",
        "Entendi como pequenas mudanças de texto impactam grandes resultados."
      ],
      next: "Aprofundaria testes com usuários PcDs e SEO técnico."
    }
  }
];
