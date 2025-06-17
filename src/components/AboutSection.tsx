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
          <Button size="lg" className="bg-brand-accent hover:bg-bran
