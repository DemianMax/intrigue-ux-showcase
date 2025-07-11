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

  // Generate positions with horizontal spread and collision detection
  const generateHorizontalPositions = (habilidades: HabilidadeTecnica[], containerWidth: number, containerHeight: number) => {
    const positions: NodePosition[] = [];
    const nodeSize = 80;
    const padding = 40;
    const minDistance = 100; // Minimum distance between nodes to prevent overlap
    
    // Group skills by category
    const skillsByCategory = habilidades.reduce((acc, skill) => {
      if (!acc[skill.categoria]) acc[skill.categoria] = [];
      acc[skill.categoria].push(skill);
      return acc;
    }, {} as Record<string, HabilidadeTecnica[]>);

    const categories = Object.keys(skillsByCategory);
    const totalSkills = habilidades.length;
    
    // Calculate how many skills per row for optimal horizontal spread
    const skillsPerRow = Math.ceil(Math.sqrt(totalSkills * (containerWidth / containerHeight)));
    const rows = Math.ceil(totalSkills / skillsPerRow);
    
    const availableWidth = containerWidth - padding * 2;
    const availableHeight = containerHeight - padding * 2;
    
    const horizontalSpacing = availableWidth / skillsPerRow;
    const verticalSpacing = availableHeight / rows;
    
    let skillIndex = 0;
    
    categories.forEach((categoria) => {
      const categorySkills = skillsByCategory[categoria];
      
      categorySkills.forEach((skill) => {
        const row = Math.floor(skillIndex / skillsPerRow);
        const col = skillIndex % skillsPerRow;
        
        // Base position with grid layout
        let baseX = padding + (col * horizontalSpacing) + (horizontalSpacing / 2);
        let baseY = padding + (row * verticalSpacing) + (verticalSpacing / 2);
        
        // Add some randomness while staying within grid bounds
        const randomOffsetX = (Math.random() - 0.5) * (horizontalSpacing * 0.3);
        const randomOffsetY = (Math.random() - 0.5) * (verticalSpacing * 0.3);
        
        let x = baseX + randomOffsetX;
        let y = baseY + randomOffsetY;
        
        // Ensure nodes stay within container bounds
        x = Math.max(padding + nodeSize/2, Math.min(containerWidth - nodeSize/2 - padding, x));
        y = Math.max(padding + nodeSize/2, Math.min(containerHeight - nodeSize/2 - padding, y));
        
        // Check for collisions with existing positions
        let attempts = 0;
        const maxAttempts = 50;
        
        while (attempts < maxAttempts) {
          let hasCollision = false;
          
          for (const existingPos of positions) {
            const distance = Math.sqrt(Math.pow(x - existingPos.x, 2) + Math.pow(y - existingPos.y, 2));
            if (distance < minDistance) {
              hasCollision = true;
              break;
            }
          }
          
          if (!hasCollision) break;
          
          // Try a new position
          const angle = (Math.random() * 2 * Math.PI);
          const radius = minDistance + (Math.random() * 30);
          x = baseX + Math.cos(angle) * radius;
          y = baseY + Math.sin(angle) * radius;
          
          // Keep within bounds
          x = Math.max(padding + nodeSize/2, Math.min(containerWidth - nodeSize/2 - padding, x));
          y = Math.max(padding + nodeSize/2, Math.min(containerHeight - nodeSize/2 - padding, y));
          
          attempts++;
        }
        
        positions.push({
          id: skill.id,
          x,
          y,
          skill,
          ref: React.createRef<HTMLDivElement>()
        });
        
        skillIndex++;
      });
    });
    
    console.log(`Generated ${positions.length} positions with horizontal spread`);
    return positions;
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

    console.log("Generating horizontal positions for skills:", habilidades.length);
    
    const positions = generateHorizontalPositions(habilidades, containerDimensions.width, containerDimensions.height);
    console.log("Generated positions:", positions);
    setNodePositions(positions);

    // Generate connections within the same category (neural network style)
    const newConnections: Connection[] = [];
    
    // Group positions by category
    const positionsByCategory = positions.reduce((acc, position) => {
      const category = position.skill.categoria;
      if (!acc[category]) acc[category] = [];
      acc[category].push(position);
      return acc;
    }, {} as Record<string, NodePosition[]>);

    // Create connections within each category
    Object.values(positionsByCategory).forEach(categoryNodes => {
      if (categoryNodes.length < 2) return;
      
      // Connect each node to 1-2 other nodes in the same category
      categoryNodes.forEach((node, index) => {
        const connectionsPerNode = Math.min(2, categoryNodes.length - 1);
        const availableNodes = categoryNodes.filter((_, i) => i !== index);
        
        // Sort by distance and connect to closest nodes
        const sortedByDistance = availableNodes
          .map(targetNode => ({
            node: targetNode,
            distance: Math.sqrt(Math.pow(node.x - targetNode.x, 2) + Math.pow(node.y - targetNode.y, 2))
          }))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, connectionsPerNode);

        sortedByDistance.forEach(({ node: targetNode }) => {
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
    });

    // Add some inter-category connections for a more interconnected look
    const categoryKeys = Object.keys(positionsByCategory);
    if (categoryKeys.length > 1) {
      categoryKeys.forEach((category, index) => {
        const currentCategoryNodes = positionsByCategory[category];
        const nextCategoryIndex = (index + 1) % categoryKeys.length;
        const nextCategoryNodes = positionsByCategory[categoryKeys[nextCategoryIndex]];
        
        // Connect 1-2 nodes from current category to next category
        const connectionsToAdd = Math.min(1, Math.min(currentCategoryNodes.length, nextCategoryNodes.length));
        
        for (let i = 0; i < connectionsToAdd; i++) {
          const fromNode = currentCategoryNodes[Math.floor(Math.random() * currentCategoryNodes.length)];
          const toNode = nextCategoryNodes[Math.floor(Math.random() * nextCategoryNodes.length)];
          
          const exists = newConnections.some(conn => 
            (conn.from.id === fromNode.id && conn.to.id === toNode.id) ||
            (conn.from.id === toNode.id && conn.to.id === fromNode.id)
          );
          
          if (!exists) {
            newConnections.push({ from: fromNode, to: toNode });
          }
        }
      });
    }

    console.log("Generated connections:", newConnections.length);
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
          y: [0, -2, 1, 0],
          x: [0, 1, -1, 0],
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
          
          // Determine if this is an intra-category connection
          const sameCategory = from.skill.categoria === to.skill.categoria;
          const strokeWidth = sameCategory ? "2" : "1";
          const opacity = sameCategory ? "text-foreground/30" : "text-foreground/15";
          
          return (
            <motion.line
              key={`${from.id}-${to.id}-${index}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className={opacity}
              initial={{ 
                pathLength: 0,
                opacity: 0 
              }}
              animate={{ 
                pathLength: 1,
                opacity: sameCategory ? [0.2, 0.4, 0.2] : [0.1, 0.2, 0.1]
              }}
              transition={{
                pathLength: { duration: 2, delay: index * 0.1 },
                opacity: {
                  duration: sameCategory ? 3 : 4,
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
      <section className="w-full bg-background py-12">
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
            <div className="h-80 bg-muted animate-pulse rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  console.log("Current state:", {
    habilidades: habilidades?.length || 0,
    nodePositions: nodePositions.length,
    connections: connections.length,
    containerDimensions
  });

  return (
    <section className="w-full bg-background text-foreground py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-5">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
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
          className="flex justify-center items-center gap-8 mb-8 flex-wrap"
        >
          {categories.map((category) => (
            <div key={category.key} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
              <span className="text-sm font-medium text-foreground">{category.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Neural Network Visualization - Reduced height */}
        <motion.div
          ref={containerRef}
          className="relative w-full h-[400px] md:h-[450px] bg-background/50 rounded-2xl border border-border/20 overflow-hidden"
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
