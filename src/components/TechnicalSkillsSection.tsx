
import {
  Figma,
  Framer,
  Pencil,
  Play,
  Headphones,
  PenTool,
  LayoutDashboard,
  Text,
  Square,
  Image, // substituto para Photoshop
  PenSquare, // substituto para Illustrator
  Film, // substituto para After Effects
  PenLine // substituto para Sketch
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Substitutos adequados disponíveis no Lucide
const softwares = [
  { name: "Figma", icon: Figma },
  { name: "Framer", icon: Framer },
  { name: "Photoshop", icon: Image },
  { name: "Illustrator", icon: PenSquare },
  { name: "After Effects", icon: Film },
  { name: "Sketch", icon: PenLine },
];

const habilidades = [
  { name: "Ilustração", icon: Pencil },
  { name: "Animação", icon: Play },
  { name: "Edição de vídeo", icon: Play },
  { name: "Edição de áudio", icon: Headphones },
];

const conhecimentos = [
  { name: "Design Thinking", icon: LayoutDashboard },
  { name: "User Experience", icon: PenTool },
  { name: "UX Writing", icon: Text },
  { name: "UX Research", icon: PenTool },
  { name: "Prototipação", icon: LayoutDashboard },
  { name: "Design Responsivo", icon: Square },
  { name: "Design Gráfico", icon: Pencil },
  { name: "Sistemas B2B e B2C", icon: LayoutDashboard },
  { name: "Projetos Ágeis com Scrum", icon: Square },
  { name: "Vibe code", icon: PenTool }
];

export default function TechnicalSkillsSection() {
  return (
    <section className="max-w-4xl mx-auto my-16 px-4">
      <h2 className="font-playfair text-3xl font-bold text-brand-dark mb-8 text-center">
        Habilidades Técnicas
      </h2>

      {/* Parte 1: Softwares */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-brand-dark">Softwares</h3>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 py-2">
          {softwares.map(({ name, icon: Icon }) => (
            <div key={name} className="flex flex-col items-center w-20">
              <Icon size={36} className="text-brand-accent mb-1" />
              <span className="text-sm text-muted-foreground text-center">{name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="my-8">
        <Separator />
      </div>

      {/* Parte 2: Habilidades */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-brand-dark">Habilidades</h3>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 py-2">
          {habilidades.map(({ name, icon: Icon }) => (
            <div key={name} className="flex flex-col items-center w-20">
              <Icon size={36} className="text-brand-accent mb-1" />
              <span className="text-sm text-muted-foreground text-center">{name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="my-8">
        <Separator />
      </div>

      {/* Parte 3: Conhecimentos */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-brand-dark">Conhecimentos</h3>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 py-2">
          {conhecimentos.map(({ name, icon: Icon }) => (
            <div key={name} className="flex flex-col items-center w-32">
              <Icon size={36} className="text-brand-accent mb-1" />
              <span className="text-sm text-muted-foreground text-center">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
