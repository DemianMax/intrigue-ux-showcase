import React, { useEffect, useRef, useState, useCallback } from "react";
import { useHabilidadesTecnicas, type HabilidadeTecnica } from "@/hooks/useHabilidadesTecnicas";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

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
  ref: React.RefObject<HTMLDivElement>;
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
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  // Update container dimensions on resize
  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerDimensions({ width: rect.width, height: rect.height });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  // Generate initial positions avoiding overlap
  const generateNodePosition = (index: number, total: number, existing: NodePosition[], containerWidth: number, containerHeight: number) => {
    const nodeSize = 80;
    const padding = 40;
    const minDistance = 100;
    
    let attempts = 0;
    let position;
    
    do {
      // Use a more predictable distribution pattern
      const cols = Math.ceil(Math.sqrt(total));
      const rows = Math.ceil(total / cols);
      
      const col = index % cols;
      const row = Math.floor(index / cols);
      
      const baseX = (containerWidth / (cols + 1)) * (col + 1);
      const baseY = (containerHeight / (rows + 1)) * (row + 1);
      
      // Add some randomness but keep within bounds
      const randomX = (Math.random() - 0.5) * 60;
      const randomY = (Math.random() - 0.5) * 60;
      
      let x = baseX + randomX;
      let y = baseY + randomY;

      // Ensure nodes stay within bounds
      x = Math.max(padding + nodeSize/2, Math.min(containerWidth - nodeSize/2 - padding, x));
      y = Math.max(padding + nodeSize/2, Math.min(containerHeight - nodeSize/2 - padding, y));

      position = { x, y };
      attempts++;
      
      // Check distance from existing nodes
      const tooClose = existing.some(existing => {
        const distance = Math.sqrt(Math.pow(position.x - existing.x, 2) + Math.pow(position.y - existing.y, 2));
        return distance < minDistance;
      });
      
      if (!tooClose || attempts > 20) break;
      
    } while (attempts < 20);
    
    return position;
  };

  // Generate positions and connections when data loads
  useEffect(() => {
    if (!habilidades || habilidades.length === 0) {
      console.log("No habilidades data available");
      return;
    }
    
    if (containerDimensions.width === 0 || containerDimensions.height === 0) {
      console.log("Container dimensions not ready:", containerDimensions);
      return;
    }

    console.log("Generating positions for skills:", habilidades.length);
    
    const positions: NodePosition[] = [];
    
    habilidades.forEach((skill, index) => {
      const position = generateNodePosition(index, habilidades.length, positions, containerDimensions.width, containerDimensions.height);
      positions.push({
        id: skill.id,
        x: position.x,
        y: position.y,
        skill,
        ref: React.createRef<HTMLDivElement>()
      });
    });

    console.log("Generated positions:", positions);
    setNodePositions(positions);

    // Generate connections with preference for cross-category links
    const newConnections: Connection[] = [];
    positions.forEach((node, i) => {
      const connectionsPerNode = Math.min(2, positions.length - 1);
      const availableNodes = positions.filter((_, j) => j !== i);
      
      // Separate nodes by category
      const differentCategory = availableNodes.filter(n => n.skill.categoria !== node.skill.categoria);
      
      // Prioritize cross-category connections
      const targetPool = differentCategory.length > 0 ? differentCategory : availableNodes;
      
      // Sort by distance and pick closest ones
      const sortedByDistance = targetPool
        .map(targetNode => ({
          node: targetNode,
          distance: Math.sqrt(Math.pow(node.x - targetNode.x, 2) + Math.pow(node.y - targetNode.y, 2))
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, Math.min(connectionsPerNode * 2, targetPool.length));
      
      // Select connections
      const selectedConnections = sortedByDistance
        .slice(0, connectionsPerNode);

      selectedConnections.forEach(({ node: targetNode }) => {
        // Avoid duplicate connections
        const existsReverse = newConnections.some(conn => 
          conn.from.id === targetNode.id && conn.to.id === node.id
        );
        const existsForward = newConnections.some(conn => 
          conn.from.id === node.id && conn.to.id === targetNode.id
        );
        
        if (!existsReverse && !existsForward) {
          newConnections.push({ from: node, to: targetNode });
        }
      });
    });

    setConnections(newConnections);
  }, [habilidades, containerDimensions]);

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

    // Reduced animation ranges to prevent overlap
    const floatDelay = index * 0.2;
    const floatDuration = 6 + (index % 3);

    return (
      <motion.div
        key={skill.id}
        ref={position.ref}
        className={`absolute flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 shadow-lg cursor-pointer ${categoryColor}`}
        style={{
          left: position.x - 40,
          top: position.y - 40,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: [0, -4, 2, 0],
          x: [0, 2, -2, 0],
        }}
        transition={{
          opacity: { duration: 0.6, delay: index * 0.1 },
          scale: { duration: 0.6, delay: index * 0.1 },
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
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
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
    if (!containerRef.current || connections.length === 0) return null;
    
    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {connections.map((connection, index) => {
          const { from, to } = connection;
          
          return (
            <motion.line
              key={`${from.id}-${to.id}-${index}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="currentColor"
              strokeWidth="1"
              className="text-foreground/20"
              initial={{ 
                pathLength: 0,
                opacity: 0 
              }}
              animate={{ 
                pathLength: 1,
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                pathLength: { duration: 2, delay: index * 0.1 },
                opacity: {
                  duration: 4,
                  delay: index * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
          );
        })}
      </svg>
    );
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

  // Debug information
  console.log("Current state:", {
    habilidades: habilidades?.length || 0,
    nodePositions: nodePositions.length,
    connections: connections.length,
    containerDimensions
  });

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
          {/* Connection Lines */}
          {renderConnections()}

          {/* Skill Nodes */}
          <div className="absolute inset-0" style={{ zIndex: 2 }}>
            {nodePositions.map((position, index) => renderSkillNode(position, index))}
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5" style={{ zIndex: 0 }}>
            <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 via-transparent to-brand-accent/5"></div>
          </div>

          {/* Debug Info */}
          {habilidades && habilidades.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-foreground/50">Nenhuma habilidade encontrada</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
