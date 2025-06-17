import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Sobre Mim</h2>
        <p className="mb-6 text-lg">
          Sou um profissional focado em criar experiências significativas para as pessoas. Trabalho com design, UX e tecnologia, buscando sempre soluções inovadoras e centradas no usuário.
        </p>

        <Link to="/curriculo">
          <Button size="lg" className="bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold">
            {t('aboutButton')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
