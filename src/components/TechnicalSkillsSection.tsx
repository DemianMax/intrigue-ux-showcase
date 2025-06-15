
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
  Image,     // substituto para Photoshop
  PenSquare, // substituto para Illustrator
  Film,      // substituto para After Effects
  PenLine    // substituto para Sketch
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
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
  { name: "Ilustração", icon: Pencil, level: 90 },
  { name: "Animação", icon: Play, level: 75 },
  { name: "Edição de vídeo", icon: Play, level: 70 },
  { name: "Edição de áudio", icon: Headphones, level: 60 },
];

const conhecimentos = [
  { name: "Design Thinking", icon: LayoutDashboard, level: 85 },
  { name: "User Experience", icon: PenTool, level: 92 },
  { name: "UX Writing", icon: Text, level: 70 },
  { name: "UX Research", icon: PenTool, level: 80 },
  { name: "Prototipação", icon: LayoutDashboard, level: 88 },
  { name: "Design Responsivo", icon: Square, level: 86 },
  { name: "Design Gráfico", icon: Pencil, level: 90 },
  { name: "Sistemas B2B e B2C", icon: LayoutDashboard, level: 78 },
  { name: "Projetos Ágeis com Scrum", icon: Square, level: 75 },
  { name: "Vibe code", icon: PenTool, level: 69 },
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
              <span className="text-sm text-muted-foreground">{name}</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {habilidades.map(({ name, icon: Icon, level }) => (
            <div key={name} className="flex items-center gap-3">
              <Icon size={28} className="text-brand-accent shrink-0" />
              <div className="w-full">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-sm">{name}</span>
                  <span className="text-xs text-muted-foreground">{level}%</span>
                </div>
                <Progress value={level} />
              </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {conhecimentos.map(({ name, icon: Icon, level }) => (
            <div key={name} className="flex items-center gap-3">
              <Icon size={28} className="text-brand-accent shrink-0" />
              <div className="w-full">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-sm">{name}</span>
                  <span className="text-xs text-muted-foreground">{level}%</span>
                </div>
                <Progress value={level} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
