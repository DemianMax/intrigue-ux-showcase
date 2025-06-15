
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";

const Resume = () => {
  return (
    <div className="bg-background text-brand-dark font-inter min-h-screen">
      <header className="sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="max-w-4xl mx-auto py-4 px-6 flex justify-between items-center border-b">
            <Link to="/">
                <Button variant="ghost">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                </Button>
            </Link>
            <h1 className="hidden sm:block text-2xl font-playfair font-bold">Max Demian</h1>
            <a href="/resume.pdf" download="Curriculo-Max-Demian.pdf">
              <Button variant="default" className="bg-brand-accent hover:bg-brand-accent/90 text-white">
                  Baixar PDF
                  <Download className="ml-2 h-4 w-4" />
              </Button>
            </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 md:p-10">
        <section className="mb-12 text-center md:text-left">
            <h2 className="text-3xl font-playfair font-bold text-brand-dark border-b-2 border-brand-accent inline-block pb-2 mb-6">Currículo</h2>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto md:mx-0">
                Designer de produto com foco em UX/UI, apaixonado por transformar problemas complexos em soluções simples, intuitivas e visualmente atraentes. Experiência em todo o ciclo de vida do produto, desde a pesquisa e ideação até o design de interface e testes de usabilidade.
            </p>
        </section>

        <section className="mb-12">
            <h3 className="text-2xl font-playfair font-bold text-brand-accent mb-6">Resumo Profissional</h3>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 bg-secondary/50 p-6 rounded-lg">
                <p><strong>+5 anos de experiência</strong> em Design de Produto e UX/UI.</p>
                <p><strong>Especialista em:</strong> Pesquisa de usuário, Arquitetura de Informação, Design de Interação, Prototipação, Testes de Usabilidade e Design Systems.</p>
                <p><strong>Ferramentas:</strong> Figma, Sketch, Adobe XD, Miro, Jira.</p>
                <p><strong>Metodologias:</strong> Design Thinking, Lean UX, Agile.</p>
            </div>
        </section>

        <section>
            <h3 className="text-2xl font-playfair font-bold text-brand-accent mb-6">Experiência Completa</h3>
            
            <div className="border-l-2 border-brand-accent/50 pl-6 relative space-y-10">
                {/* Timeline item 1 */}
                <div className="relative">
                    <div className="absolute -left-[34px] top-1 w-4 h-4 bg-brand-accent rounded-full border-4 border-background"></div>
                    <h4 className="font-bold text-xl text-brand-dark">UX/UI Designer Sênior</h4>
                    <p className="text-sm text-brand-dark/70 mb-2">Tech Solutions Inc. | 2021 - Presente</p>
                    <ul className="list-disc pl-5 space-y-1 text-brand-dark/90">
                        <li>Liderança do design do principal produto SaaS da empresa, resultando em um aumento de 20% na retenção de usuários.</li>
                        <li>Criação e manutenção do Design System, garantindo consistência e agilidade no desenvolvimento.</li>
                        <li>Condução de pesquisas com usuários e testes de usabilidade para validar hipóteses e iterar sobre o design.</li>
                    </ul>
                </div>
                
                {/* Timeline item 2 */}
                <div className="relative">
                    <div className="absolute -left-[34px] top-1 w-4 h-4 bg-brand-accent rounded-full border-4 border-background"></div>
                    <h4 className="font-bold text-xl text-brand-dark">UX/UI Designer Pleno</h4>
                    <p className="text-sm text-brand-dark/70 mb-2">Creative Minds Agency | 2018 - 2021</p>
                    <ul className="list-disc pl-5 space-y-1 text-brand-dark/90">
                        <li>Projetei interfaces para aplicativos móveis e websites para clientes de diversos setores.</li>
                        <li>Participei de workshops de Design Thinking para definir estratégias de produto.</li>
                        <li>Criei protótipos interativos para apresentações a stakeholders e testes com usuários.</li>
                    </ul>
                </div>

                {/* Timeline item 3 */}
                 <div className="relative">
                    <div className="absolute -left-[34px] top-1 w-4 h-4 bg-brand-accent rounded-full border-4 border-background"></div>
                    <h4 className="font-bold text-xl text-brand-dark">Estagiário de Design Gráfico</h4>
                    <p className="text-sm text-brand-dark/70 mb-2">Comunica Visual | 2017 - 2018</p>
                    <ul className="list-disc pl-5 space-y-1 text-brand-dark/90">
                        <li>Criação de materiais gráficos para mídias sociais e campanhas de marketing.</li>
                        <li>Apoio na diagramação de materiais impressos.</li>
                    </ul>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
};

export default Resume;
