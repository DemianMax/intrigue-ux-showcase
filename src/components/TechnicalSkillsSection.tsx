
import { useHabilidadesTecnicas, type HabilidadeTecnica } from "@/hooks/useHabilidadesTecnicas";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function normalizeKey(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");
}

interface NodePosition {
  id: string;
  x: number;
  y: number;
  skill: HabilidadeTecnica;
}

interface Connection {
  from: NodePosition;
  to: NodePosition;
}

export default function TechnicalSkillsSection() {
  const { t } = useLanguage();
  const { data: habilidades, isLoading } = useHabilidadesTecnicas();
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodePositions, setNodePositions] = useState<NodePosition[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  // Generate random positions for nodes when data loads
  useEffect(() => {
    if (!habilidades || habilidades.length === 0 || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const nodeSize = 80; // Approximate node size
    const padding = 50;

    const positions: NodePosition[] = habilidades.map((skill, index) => {
      // Create a more organic distribution
      const angle = (index / habilidades.length) * 2 * Math.PI + Math.random() * 0.5;
      const radius = Math.random() * 200 + 100;
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;
      
      let x = centerX + Math.cos(angle) * radius;
      let y = centerY + Math.sin(angle) * radius;

      // Ensure nodes stay within bounds
      x = Math.max(padding, Math.min(containerRect.width - nodeSize - padding, x));
      y = Math.max(padding, Math.min(containerRect.height - nodeSize - padding, y));

      return {
        id: skill.id,
        x,
        y,
        skill
      };
    });

    setNodePositions(positions);

    // Generate connections between nearby nodes
    const newConnections: Connection[] = [];
    positions.forEach((node, i) => {
      // Connect to 2-3 nearby nodes
      const distances = positions
        .map((otherNode, j) => ({
          node: otherNode,
          distance: Math.sqrt(Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)),
          index: j
        }))
        .filter((_, j) => j !== i)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, Math.floor(Math.random() * 2) + 2);

      distances.forEach(({ node: targetNode }) => {
        // Avoid duplicate connections
        const existsReverse = newConnections.some(conn => 
          conn.from.id === targetNode.id && conn.to.id === node.id
        );
        if (!existsReverse) {
          newConnections.push({ from: node, to: targetNode });
        }
      });
    });

    setConnections(newConnections);
  }, [habilidades]);

  const getCategoryColor = (categoria: string) => {
    switch (categoria) {
      case 'habilidade':
        return 'bg-brand-orange-light dark:bg-brand-orange-dark border-brand-orange-light dark:border-brand-orange-dark';
      case 'conhecimento':
        return 'bg-brand-blue-light dark:bg-brand-blue-dark border-brand-blue-light dark:border-brand-blue-dark';
      case 'software':
        return 'bg-brand-green-light dark:bg-brand-green-dark border-brand-green-light dark:border-brand-green-dark';
      default:
        return 'bg-gray-400 dark:bg-gray-600 border-gray-400 dark:border-gray-600';
    }
  };

  const getCategoryLabel = (categoria: string) => {
    switch (categoria) {
      case 'habilidade':
        return t("skillsAbilities") || "Habilidades";
      case 'conhecimento':
        return t("skillsKnowledge") || "Conhecimentos";
      case 'software':
        return t("skillsSoftwares") || "Softwares";
      default:
        return categoria;
    }
  };

  const renderSkillNode = (position: NodePosition, index: number) => {
    const { skill } = position;
    const normalizedKey = normalizeKey(skill.nome);
    const label = t(`skills.${normalizedKey}`) || skill.nome;
    const categoryColor = getCategoryColor(skill.categoria);

    const getIconUrl = (icone: string) => {
      if (icone.startsWith("http")) return icone;
      return `https://heroicons.com/24/outline/${icone}.svg`;
    };

    const floatDelay = index * 0.2;
    const floatDuration = 6 + (index % 3);

    return (
      <motion.div
        key={skill.id}
        className={`absolute flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 shadow-lg cursor-pointer ${categoryColor}`}
        style={{
          left: position.x - 40,
          top: position.y - 40,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: [0, -10, 5, 0],
          x: [0, 5, -5, 0],
        }}
        transition={{
          opacity: { duration: 0.5, delay: index * 0.1 },
          scale: { duration: 0.5, delay: index * 0.1 },
          y: {
            duration: floatDuration,
            delay: floatDelay,
            repeat: Infinity,
            ease: "easeInOut"
          },
          x: {
            duration: floatDuration + 1,
            delay: floatDelay + 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          transition: { duration: 0.2 }
        }}
      >
        <img
          src={getIconUrl(skill.icone)}
          alt={skill.nome}
          className="w-6 h-6 mb-1 brightness-0 invert"
          onError={(e) => {
            e.currentTarget.src = "https://heroicons.com/24/outline/code-bracket.svg";
          }}
        />
        <span className="text-xs font-medium text-white text-center leading-tight px-1">
          {label.length > 8 ? label.substring(0, 8) + "..." : label}
        </span>
      </motion.div>
    );
  };

  const renderConnections = () => {
    return connections.map((connection, index) => {
      const { from, to } = connection;
      const length = Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
      const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI);
      
      return (
        <motion.div
          key={`${from.id}-${to.id}`}
          className="absolute h-px bg-foreground/20"
          style={{
            left: from.x,
            top: from.y,
            width: length,
            transformOrigin: '0 0',
            transform: `rotate(${angle}deg)`,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: 1, 
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            scaleX: { duration: 1, delay: index * 0.1 },
            opacity: {
              duration: 3,
              delay: index * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      );
    });
  };

  const categories = [
    { key: 'software', label: getCategoryLabel('software'), color: 'bg-brand-green-light dark:bg-brand-green-dark' },
    { key: 'habilidade', label: getCategoryLabel('habilidade'), color: 'bg-brand-orange-light dark:bg-brand-orange-dark' },
    { key: 'conhecimento', label: getCategoryLabel('conhecimento'), color: 'bg-brand-blue-light dark:bg-brand-blue-dark' },
  ];

  if (isLoading) {
    return (
      <section className="w-full bg-background py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center">
            <div className="h-12 w-64 bg-muted animate-pulse rounded mx-auto mb-4"></div>
            <div className="h-6 w-96 bg-muted animate-pulse rounded mx-auto mb-8"></div>
            <div className="grid grid-cols-3 gap-4 mb-12">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 bg-muted animate-pulse rounded-full"></div>
                  <div className="h-4 w-20 bg-muted animate-pulse rounded"></div>
                </div>
              ))}
            </div>
            <div className="h-96 bg-muted animate-pulse rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-background text-foreground py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-5">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("skillsTitle") || "Minhas Habilidades e Conhecimentos"}
          </h2>
          <div className="w-16 h-1 bg-brand-accent mx-auto rounded-full mb-6"></div>
          <p className="text-base text-foreground/70 leading-relaxed max-w-xl mx-auto">
            Uma rede interconectada de competências e ferramentas que utilizo no desenvolvimento de soluções
          </p>
        </motion.div>

        {/* Category Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center items-center gap-8 mb-12 flex-wrap"
        >
          {categories.map((category) => (
            <div key={category.key} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
              <span className="text-sm font-medium text-foreground">{category.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Neural Network Visualization */}
        <motion.div
          ref={containerRef}
          className="relative w-full h-[600px] md:h-[700px] bg-background/50 rounded-2xl border border-border/20 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Connections */}
          <div className="absolute inset-0">
            {renderConnections()}
          </div>

          {/* Skill Nodes */}
          <div className="absolute inset-0">
            {nodePositions.map((position, index) => renderSkillNode(position, index))}
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 via-transparent to-brand-accent/5"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
