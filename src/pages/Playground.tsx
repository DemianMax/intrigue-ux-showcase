import React from "react";
import Navigation from "@/components/Navigation";
import FooterSection from "@/components/FooterSection";

const Playground = () => {
  return (
    <div className="relative font-inter bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section com título, subtítulo e texto à esquerda, imagem à direita */}
      <section className="pt-20 lg:pt-32 pb-16 lg:pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-foreground mb-6">
                Playground
              </h1>
              <h2 className="text-xl lg:text-2xl text-muted-foreground font-medium mb-8">
                Explorando criatividade e inovação
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Um espaço dedicado à experimentação e criação. Aqui você encontra 
                projetos experimentais, estudos de caso e explorações criativas que 
                demonstram diferentes abordagens de design e desenvolvimento.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-full h-64 lg:h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                <div className="text-6xl">🎨</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Destaques - Dois cards lado a lado */}
      <section className="py-16 lg:py-24 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Destaque 1 */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 lg:h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <div className="text-4xl">🚀</div>
              </div>
              <div className="p-6 lg:p-8">
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
                  Projetos Experimentais
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Explore conceitos inovadores e soluções criativas que pushram 
                  os limites do design tradicional.
                </p>
              </div>
            </div>

            {/* Destaque 2 */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 lg:h-64 bg-gradient-to-br from-green-500/20 to-teal-500/20 flex items-center justify-center">
                <div className="text-4xl">⚡</div>
              </div>
              <div className="p-6 lg:p-8">
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
                  Estudos de Caso
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Análises detalhadas de processos criativos e metodologias 
                  aplicadas em projetos reais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mosaico de Imagens do Instagram */}
      <section className="py-16 lg:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-playfair font-bold text-foreground mb-4">
              Instagram Feed
            </h3>
            <p className="text-muted-foreground text-lg">
              Acompanhe os últimos trabalhos e inspirações
            </p>
          </div>
          
          {/* Grid de imagens placeholder - futuramente conectado ao Instagram */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <a
                key={index}
                href="#"
                className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg overflow-hidden hover:scale-105 transition-transform group"
              >
                <div className="w-full h-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <div className="text-2xl opacity-50">📸</div>
                </div>
              </a>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              * Em breve conectado ao feed do Instagram com hashtag específica
            </p>
          </div>
        </div>
      </section>

      {/* Seção de Contato (reutilizando o FooterSection) */}
      <FooterSection />
    </div>
  );
};

export default Playground;