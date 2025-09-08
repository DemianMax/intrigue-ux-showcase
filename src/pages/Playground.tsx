import React from "react";
import Navigation from "@/components/Navigation";
import FooterSection from "@/components/FooterSection";
import InstagramFeed from "@/components/InstagramFeed";

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
              @maxdemian.lab
            </h3>
            <p className="text-muted-foreground text-lg">
              Acompanhe os últimos trabalhos e inspirações no Instagram
            </p>
          </div>
          
          {/* Feed real do Instagram */}
          <InstagramFeed />
          
          <div className="text-center mt-8">
            <a 
              href="https://instagram.com/maxdemian.lab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Seguir no Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Seção de Contato (reutilizando o FooterSection) */}
      <FooterSection />
    </div>
  );
};

export default Playground;