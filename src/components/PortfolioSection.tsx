
import React from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type PortfolioItem = {
  id: string;
  img: string;
  alt: string;
  link: string;
};

const behanceLink = "https://www.behance.net/maxdemian/";

async function fetchPortfolioItems(): Promise<PortfolioItem[]> {
  const { data, error } = await supabase
    .from("portfolio_items")
    .select("id, img, alt, link")
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Falha ao carregar portfólio.");
  }
  return data ?? [];
}

const PortfolioSection = () => {
  const { data: portfolioItems, isLoading, error } = useQuery({
    queryKey: ["portfolio_items"],
    queryFn: fetchPortfolioItems,
  });

  // Pegue apenas os 6 primeiros itens para exibir na grade
  const previewItems = portfolioItems ? portfolioItems.slice(0, 6) : [];

  return (
    <section
      id="portfolio"
      className="max-w-6xl mx-auto w-full flex flex-col items-center gap-8 py-20 px-4"
    >
      <h2 className="text-3xl md:text-4xl font-bold font-playfair text-brand-dark mb-8 text-center">
        Portfólio
      </h2>

      {isLoading ? (
        <div className="w-full py-20 flex justify-center items-center">
          <span className="text-muted-foreground text-lg">Carregando...</span>
        </div>
      ) : error ? (
        <div className="w-full py-20 flex justify-center items-center">
          <span className="text-destructive">Falha ao carregar portfólio.</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 w-full">
          {previewItems && previewItems.length > 0 ? (
            previewItems.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg overflow-hidden shadow group"
                aria-label={item.alt}
              >
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
              </a>
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground py-8">
              Nenhum item de portfólio cadastrado.
            </div>
          )}
        </div>
      )}

      <Button
        asChild
        className="mt-10 px-8 py-4 rounded-full text-lg font-semibold bg-brand-accent text-white hover:bg-orange-600 transition-all shadow hover:scale-105"
      >
        <a href={behanceLink} target="_blank" rel="noopener noreferrer">
          Veja meu Behance
        </a>
      </Button>
    </section>
  );
};

export default PortfolioSection;

