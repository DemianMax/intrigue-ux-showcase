
import React from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

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

  const previewItems = portfolioItems ? portfolioItems.slice(0, 6) : [];

  return (
    <section
      id="portfolio"
      className="w-full flex flex-col items-center bg-white dark:bg-gray-900 py-20 px-6"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Título da seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-brand-dark dark:text-white mb-4">
            Portfólio
          </h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-brand-dark/70 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Uma seleção dos meus trabalhos de design e projetos criativos
          </p>
        </motion.div>

        {isLoading ? (
          <div className="w-full py-20 flex justify-center items-center">
            <span className="text-muted-foreground text-lg">Carregando...</span>
          </div>
        ) : error ? (
          <div className="w-full py-20 flex justify-center items-center">
            <span className="text-destructive">Falha ao carregar portfólio.</span>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 w-full mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {previewItems && previewItems.length > 0 ? (
              previewItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300"
                  aria-label={item.alt}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </motion.a>
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground py-8">
                Nenhum item de portfólio cadastrado.
              </div>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button
            asChild
            className="px-8 py-4 rounded-full text-lg font-semibold bg-brand-accent text-white hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
          >
            <a href={behanceLink} target="_blank" rel="noopener noreferrer">
              Veja meu Behance
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
