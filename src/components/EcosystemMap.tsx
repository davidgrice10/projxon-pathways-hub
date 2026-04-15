import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MousePointerClick } from "lucide-react";

interface EcoNode {
  id: string;
  label: string;
  subtitle: string;
  cx: number;
  cy: number;
  w: number;
  h: number;
  color: "gold" | "blue" | "green" | "orange" | "navy";
  dashed?: boolean;
  details: string[];
}

const VB_W = 900;
const VB_H = 520;

const nodes: EcoNode[] = [
  // Top center - PROJXON
  { id: "projxon", label: "PROJXON", subtitle: "Incubator & Parent System", cx: 450, cy: 45, w: 190, h: 54, color: "gold", details: ["Parent company and incubator", "Connects all ecosystem components", "Drives strategic vision", "Workforce development mission"] },

  // B2C left column
  { id: "phelan", label: "The Phelan Focus", subtitle: "Top-of-Funnel Philosophy", cx: 150, cy: 140, w: 200, h: 50, color: "blue", details: ["Content & media brand", "Builds awareness and trust", "Attracts top-of-funnel talent", "Philosophy-driven engagement"] },
  { id: "mip", label: "Momentum Internship", subtitle: "Entry Point", cx: 150, cy: 220, w: 200, h: 50, color: "blue", details: ["Standardized internship frameworks", "Company ratings (1-5 stars)", "Talent-employer matching", "Career readiness benchmark"] },
  { id: "gap", label: "Growth Advisory", subtitle: "Development Layer", cx: 150, cy: 300, w: 200, h: 50, color: "blue", details: ["Professional development", "Mentorship and coaching", "Skill building pathways", "Career acceleration"] },
  { id: "mcp", label: "Momentum Coaching", subtitle: "Coaching Layer", cx: 150, cy: 380, w: 200, h: 50, color: "blue", details: ["1-on-1 coaching sessions", "Leadership development", "Performance improvement", "Personal growth plans"] },

  // Center - MOMENTUM (vertically centered between 140 and 380 → 260)
  { id: "momentum", label: "MOMENTUM", subtitle: "Performance System", cx: 450, cy: 260, w: 210, h: 100, color: "navy", details: ["Learning · Community · Implementation", "Powered by Ivory.io (GoHighLevel)", "Central performance hub", "Connects B2C and B2B tracks"] },

  // B2B right column
  { id: "mcs", label: "Consulting System", subtitle: "Client Delivery", cx: 750, cy: 140, w: 200, h: 50, color: "green", details: ["B2B consulting services", "Client project delivery", "Business transformation", "Revenue generation engine"] },
  { id: "mos", label: "Operating System", subtitle: "Business Framework", cx: 750, cy: 220, w: 200, h: 50, color: "green", details: ["Internal operations framework", "Scalable business processes", "Team management systems", "Operational excellence"] },
  { id: "michelin", label: "Michelin Method", subtitle: "Management & Production", cx: 750, cy: 300, w: 200, h: 50, color: "green", details: ["Michelin Management Method", "Michelin Production Process", "Quality standards framework", "Excellence methodology"] },
  { id: "orka", label: "ORKA OS", subtitle: "B2B SaaS · In Development", cx: 750, cy: 380, w: 200, h: 50, color: "green", dashed: true, details: ["B2B SaaS Platform", "Currently in development", "Will productize consulting IP", "Scalable tech solution"] },

  // Bottom center
  { id: "mop", label: "Momentum Office Parties", subtitle: "Networking & Events", cx: 450, cy: 470, w: 230, h: 50, color: "orange", details: ["In-person networking events", "Professional development events", "Community building", "Culture & connection"] },
];

interface Connection { from: string; to: string; dashed?: boolean }

const connections: Connection[] = [
  { from: "projxon", to: "phelan" },
  { from: "projxon", to: "mcs" },
  { from: "projxon", to: "momentum" },
  { from: "phelan", to: "mip", dashed: true },
  { from: "mip", to: "gap", dashed: true },
  { from: "gap", to: "mcp", dashed: true },
  { from: "mcp", to: "momentum" },
  { from: "momentum", to: "mcs" },
  { from: "momentum", to: "mos" },
  { from: "momentum", to: "michelin" },
  { from: "momentum", to: "orka" },
  { from: "momentum", to: "mop" },
  { from: "michelin", to: "orka", dashed: true },
];

const fillColors: Record<string, string> = {
  gold: "hsl(43, 72%, 55%)",
  blue: "hsl(210, 60%, 35%)",
  green: "hsl(145, 40%, 38%)",
  orange: "hsl(30, 70%, 50%)",
  navy: "hsl(220, 50%, 18%)",
};

const strokeColors: Record<string, string> = {
  gold: "hsl(43, 72%, 55%)",
  blue: "hsl(210, 60%, 45%)",
  green: "hsl(145, 40%, 48%)",
  orange: "hsl(30, 70%, 60%)",
  navy: "hsl(43, 72%, 55%)",
};

const glowFilters = ["gold", "blue", "green", "orange", "navy"] as const;

function getEdgePoint(node: EcoNode, targetCx: number, targetCy: number) {
  const dx = targetCx - node.cx;
  const dy = targetCy - node.cy;
  const hw = node.w / 2;
  const hh = node.h / 2;

  if (dx === 0 && dy === 0) return { x: node.cx, y: node.cy };

  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  // Determine which edge to use
  const scaleX = hw / (absDx || 1);
  const scaleY = hh / (absDy || 1);
  const scale = Math.min(scaleX, scaleY);

  return {
    x: node.cx + dx * scale,
    y: node.cy + dy * scale,
  };
}

export default function EcosystemMap() {
  const [selected, setSelected] = useState<EcoNode | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const getNode = (id: string) => nodes.find(n => n.id === id)!;

  return (
    <div className="relative w-full">
      <div className="text-center mb-4">
        <p className="text-muted-foreground tracking-widest-custom text-sm uppercase mb-2 font-heading">Ecosystem Map</p>
        <h2 className="text-4xl font-bold font-heading text-gradient-gold">PROJXON</h2>
      </div>

      {/* Zone labels */}
      <div className="flex justify-between mb-2 px-4 max-w-4xl mx-auto">
        <span className="text-eco-blue-light tracking-widest-custom text-xs uppercase font-heading">B2C · Talent & Development</span>
        <span className="text-eco-green-light tracking-widest-custom text-xs uppercase font-heading">B2B · Business Systems</span>
      </div>

      {/* Tip */}
      <div className="flex items-center justify-center gap-1.5 mb-3 text-muted-foreground text-xs">
        <MousePointerClick size={13} />
        <span>Click any node to view details</span>
      </div>

      {/* SVG Map */}
      <div className="w-full max-w-4xl mx-auto">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="w-full h-auto"
          style={{ maxHeight: "65vh" }}
        >
          <defs>
            {glowFilters.map(c => (
              <filter key={c} id={`glow-${c}`} x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feFlood floodColor={strokeColors[c]} floodOpacity="0.35" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
            <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(43, 50%, 45%)" stopOpacity="0.25" />
              <stop offset="50%" stopColor="hsl(43, 60%, 55%)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="hsl(43, 50%, 45%)" stopOpacity="0.25" />
            </linearGradient>
            {/* Animated dash pattern */}
            <linearGradient id="connGradBright" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(43, 70%, 60%)" stopOpacity="0.4" />
              <stop offset="50%" stopColor="hsl(43, 80%, 65%)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="hsl(43, 70%, 60%)" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Connections */}
          {connections.map((conn, i) => {
            const fromNode = getNode(conn.from);
            const toNode = getNode(conn.to);
            const from = getEdgePoint(fromNode, toNode.cx, toNode.cy);
            const to = getEdgePoint(toNode, fromNode.cx, fromNode.cy);
            const isHighlighted = hovered === conn.from || hovered === conn.to;

            return (
              <motion.line
                key={i}
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke={isHighlighted ? "url(#connGradBright)" : "url(#connGrad)"}
                strokeWidth={isHighlighted ? 2.5 : 1.5}
                strokeDasharray={conn.dashed ? "6 4" : undefined}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.5, ease: "easeOut" }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node, i) => {
            const isHub = node.id === "momentum";
            const rx = isHub ? 16 : 10;
            const isHov = hovered === node.id;

            return (
              <motion.g
                key={node.id}
                style={{ cursor: "pointer" }}
                onClick={() => setSelected(node)}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.05, type: "spring", stiffness: 180, damping: 18 }}
              >
                {/* Background rect */}
                <rect
                  x={node.cx - node.w / 2}
                  y={node.cy - node.h / 2}
                  width={node.w}
                  height={node.h}
                  rx={rx}
                  fill={isHub ? "url(#hubGrad)" : fillColors[node.color]}
                  fillOpacity={isHub ? 1 : 0.12}
                  stroke={strokeColors[node.color]}
                  strokeWidth={isHov ? 2.5 : 1.5}
                  strokeDasharray={node.dashed ? "6 3" : undefined}
                  filter={isHov ? `url(#glow-${node.color})` : undefined}
                  style={{ transition: "stroke-width 0.2s, filter 0.2s" }}
                />
                {/* Hub gradient */}
                {isHub && (
                  <defs>
                    <radialGradient id="hubGrad" cx="50%" cy="50%">
                      <stop offset="0%" stopColor="hsl(220, 50%, 22%)" />
                      <stop offset="100%" stopColor="hsl(220, 40%, 13%)" />
                    </radialGradient>
                  </defs>
                )}
                {/* Label */}
                <text
                  x={node.cx}
                  y={node.cy - (node.subtitle ? 5 : 0)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={node.color === "gold" || node.color === "navy" ? "hsl(43, 72%, 55%)" : "hsl(40, 20%, 90%)"}
                  fontSize={isHub ? 15 : 12}
                  fontWeight="700"
                  fontFamily="'Space Grotesk', sans-serif"
                >
                  {node.label}
                </text>
                {/* Subtitle */}
                {node.subtitle && (
                  <text
                    x={node.cx}
                    y={node.cy + (isHub ? 18 : 12)}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="hsl(220, 10%, 55%)"
                    fontSize={9}
                    fontFamily="'Inter', sans-serif"
                  >
                    {node.subtitle}
                  </text>
                )}
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-w-md w-full mx-4 rounded-xl border-2 bg-card p-6"
              style={{ borderColor: strokeColors[selected.color], boxShadow: `0 0 40px -10px ${strokeColors[selected.color]}` }}
              initial={{ scale: 0.85, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
                <X size={20} />
              </button>
              <h3 className="font-heading text-xl font-bold text-gradient-gold">{selected.label}</h3>
              <p className="text-muted-foreground text-sm mb-4">{selected.subtitle}</p>
              <ul className="space-y-2">
                {selected.details.map((d, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {d}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
