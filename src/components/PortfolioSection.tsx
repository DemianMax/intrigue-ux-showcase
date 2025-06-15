
import React from "react";
import { Button } from "@/components/ui/button";

const portfolioItems = [
  {
    img: "/public/lovable-uploads/photo-1488590528505-98d2b5aba04b",
    alt: "Laptop workspace designer",
    link: "https://www.behance.net/maxdemian/project1",
  },
  {
    img: "/public/lovable-uploads/photo-1461749280684-dccba630e2f6",
    alt: "Java code on monitor",
    link: "https://www.behance.net/maxdemian/project2",
  },
  {
    img: "/public/lovable-uploads/photo-1486312338219-ce68d2c6f44d",
    alt: "Person using MacBook Pro",
    link: "https://www.behance.net/maxdemian/project3",
  },
  {
    img: "/public/lovable-uploads/photo-1581091226825-a6a2a5aee158",
    alt: "Woman using laptop",
    link: "https://www.behance.net/maxdemian/project4",
  },
  {
    img: "/public/lovable-uploads/photo-1487058792275-0ad4aaf24ca7",
    alt: "Monitor with code",
    link: "https://www.behance.net/maxdemian/project5",
  },
  {
    img: "/public/lovable-uploads/photo-1498050108023-c5249f4df085",
    alt: "MacBook with code",
    link: "https://www.behance.net/maxdemian/project6",
  },
  {
    img: "/public/lovable-uploads/1f92fddb-352c-44f3-a639-ab30f54cd665.jpg",
    alt: "Design mockup",
    link: "https://www.behance.net/maxdemian/project7",
  },
  {
    img: "/public/lovable-uploads/b5362a7a-ef6f-46c7-ac27-99fa2fcde1f1.jpg",
    alt: "Brand identity",
    link: "https://www.behance.net/maxdemian/project8",
  },
];

const behanceLink = "https://www.behance.net/maxdemian/";

const PortfolioSection = () => {
  return (
    <section
      id="portfolio"
      className="max-w-6xl mx-auto w-full flex flex-col items-center gap-8 py-20 px-4"
    >
      <h2 className="text-3xl md:text-4xl font-bold font-playfair text-brand-dark mb-8 text-center">
        Portfólio
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 w-full">
        {portfolioItems.map((item, idx) => (
          <a
            key={idx}
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
        ))}
      </div>
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
