
import React, { useState } from "react";
import ProjectCard from "./ProjectCard";

interface Project {
  id: string;
  title: string;
  role: string;
  short: string;
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

const projects: Project[] = [
  {
    id: "fintech-simplifica",
    title: "Fintech Simplifica",
    role: "UX Lead & UI Designer",
    short: "Redesenhei o onboarding para triplicar a conversão de usuários em serviços financeiros.",
    hashtags: ["#onboarding", "#fintech", "#mobile"],
    image: "/placeholder.svg",
    caseStudy: {
      challenge: "Usuários enfrentavam frustração e abandono ao tentar abrir conta; processos longos e confusos bloqueavam conversão.",
      process: [
        { img: "/placeholder.svg", legend: "Mapeamento de fricções reais — ouvindo usuários." },
        { img: "/placeholder.svg", legend: "Jornada redesenhada: simplificando os pontos de atrito." },
        { img: "/placeholder.svg", legend: "Protótipo iterado e testado para onboarding eficiente." }
      ],
      solutionImg: "/placeholder.svg",
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
    short: "Interface redesenhada focando clareza de fluxo e feedback visual instantâneo ao usuário.",
    hashtags: ["#delivery", "#ui", "#designsystem"],
    image: "/placeholder.svg",
    caseStudy: {
      challenge: "A interface anterior gerava dúvidas e solicitações no suporte. Precisávamos simplificar e clarear o fluxo de pedidos.",
      process: [
        { img: "/placeholder.svg", legend: "Pesquisa de experiência do usuário e pontos de frustração." },
        { img: "/placeholder.svg", legend: "Wireframes para novo fluxo sem ambiguidade." },
        { img: "/placeholder.svg", legend: "Prototipação de telas mobile e validação." }
      ],
      solutionImg: "/placeholder.svg",
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
    short: "Novo dashboard para gerenciamento de vendas com dados visuais e navegação simplificada.",
    hashtags: ["#dashboard", "#ecommerce", "#uxresearch"],
    image: "/placeholder.svg",
    caseStudy: {
      challenge: "Diretores tinham dificuldade em encontrar KPIs essenciais rapidamente.",
      process: [
        { img: "/placeholder.svg", legend: "Entrevistas com stakeholders para mapear necessidades." },
        { img: "/placeholder.svg", legend: "Wireframes e refinamento da arquitetura de informação." },
        { img: "/placeholder.svg", legend: "Validação da solução com usuários-chave." }
      ],
      solutionImg: "/placeholder.svg",
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
    short: "Landing com experiência persuasiva para campanha de inscrição — foco: storytelling visual.",
    hashtags: ["#landingpage", "#storytelling", "#a11y"],
    image: "/placeholder.svg",
    caseStudy: {
      challenge: "Conversão da campanha estava abaixo do ideal, dificuldade em comunicar o diferencial.",
      process: [
        { img: "/placeholder.svg", legend: "Mapeamento de argumentos persuasivos juntos ao marketing." },
        { img: "/placeholder.svg", legend: "Testes de diferentes retóricas visuais e botões." },
        { img: "/placeholder.svg", legend: "Ajustes após análise de mapas de calor." }
      ],
      solutionImg: "/placeholder.svg",
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

const ProjectsGrid: React.FC = () => {
  const [openCase, setOpenCase] = useState<string | null>(null);

  return (
    <section className="w-full max-w-6xl mx-auto px-2 py-12" id="projetos">
      <h3 className="text-3xl font-playfair font-bold text-brand-dark mb-10 text-center">Um pouco de UX e UI</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} openCase={openCase} setOpenCase={setOpenCase} />
        ))}
      </div>
    </section>
  );
};
export default ProjectsGrid;
