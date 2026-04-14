import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MousePointerClick } from "lucide-react";

interface EcoNode {
  id: string;
  label: string;
  subtitle: string;
  x: number;
  y: number;
  color: "gold" | "blue" | "green" | "orange" | "navy";
  width: number;
  height: number;
  dashed?: boolean;
  details: string[];
}

interface Connection {
  from: string;
  to: string;
  dashed?: boolean;
}

const nodes: EcoNode[] = [
  { id: "projxon", label: "PROJXON", subtitle: "Incubator & Parent System", x: 380, y: 30, color: "gold", width: 200, height: 64, details: ["Parent company and incubator", "Connects all ecosystem components", "Drives strategic vision", "Workforce development mission"] },

  // B2C left column — evenly spaced
  { id: "phelan", label: "The Phelan Focus", subtitle: "Top-of-Funnel Philosophy", x: 60, y: 150, color: "blue", width: 220, height: 56, details: ["Content & media brand", "Builds awareness and trust", "Attracts top-of-funnel talent", "Philosophy-driven engagement"] },
  { id: "mip", label: "Momentum Internship", subtitle: "Entry Point", x: 60, y: 240, color: "blue", width: 220, height: 56, details: ["Standardized internship frameworks", "Company ratings (1-5 stars)", "Talent-employer matching", "Career readiness benchmark"] },
  { id: "gap", label: "Growth Advisory", subtitle: "Development Layer", x: 60, y: 330, color: "blue", width: 220, height: 56, details: ["Professional development", "Mentorship and coaching", "Skill building pathways", "Career acceleration"] },
  { id: "mcp", label: "Momentum Coaching", subtitle: "Coaching Layer", x: 60, y: 420, color: "blue", width: 220, height: 56, details: ["1-on-1 coaching sessions", "Leadership development", "Performance improvement", "Personal growth plans"] },

  // Center hub
  { id: "momentum", label: "MOMENTUM", subtitle: "Performance System", x: 370, y: 300, color: "navy", width: 220, height: 110, details: ["Learning · Community · Implementation", "Powered by Ivory.io (GoHighLevel)", "Central performance hub", "Connects B2C and B2B tracks"] },

  // B2B right column — evenly spaced
  { id: "mcs", label: "Consulting System", subtitle: "Client Delivery", x: 680, y: 150, color: "green", width: 220, height: 56, details: ["B2B consulting services", "Client project delivery", "Business transformation", "Revenue generation engine"] },
  { id: "mos", label: "Operating System", subtitle: "Business Framework", x: 680, y: 240, color: "green", width: 220, height: 56, details: ["Internal operations framework", "Scalable business processes", "Team management systems", "Operational excellence"] },
  { id: "michelin", label: "Michelin Method", subtitle: "Management & Production", x: 680, y: 330, color: "green", width: 220, height: 56, details: ["Michelin Management Method", "Michelin Production Process", "Quality standards framework", "Excellence methodology"] },
  { id: "orka", label: "ORKA OS", subtitle: "B2B SaaS · In Development", x: 680, y: 420, color: "green", width: 220, height: 56, dashed: true, details: ["B2B SaaS Platform", "Currently in development", "Will productize consulting IP", "Scalable tech solution"] },

  // Bottom center
  { id: "mop", label: "Momentum Office Parties", subtitle: "Networking & Events", x: 350, y: 480, color: "orange", width: 260, height: 56, details: ["In-person networking events", "Professional development events", "Community building", "Culture & connection"] },
];

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
  { from: "momentum", to: "mop" },
  { from: "michelin", to: "orka", dashed: true },
];

const colorMap = {
  gold: { border: "border-primary", glow: "glow-gold" },
  blue: { border: "border-eco-blue", glow: "glow-blue" },
  green: { border: "border-eco-green", glow: "glow-green" },
  orange: { border: "border-eco-orange", glow: "glow-orange" },
  navy: { border: "border-primary", glow: "glow-gold" },
};

const getNodeCenter = (node: EcoNode) => ({ x: node.x + node.width / 2, y: node.y + node.height / 2 });

export default function EcosystemMap() {
  const [selected, setSelected] = useState<EcoNode | null>(null);

  return (
    <div className="relative w-full">
      <div className="text-center mb-6">
        <p className="text-muted-foreground tracking-widest-custom text-sm uppercase mb-2 font-heading">Ecosystem Map</p>
        <h2 className="text-4xl font-bold font-heading text-gradient-gold">PROJXON</h2>
      </div>

      <div className="relative mx-auto" style={{ maxWidth: 960 }}>
        {/* Zone labels */}
        <div className="flex justify-between mb-3 px-4">
          <span className="text-eco-blue-light tracking-widest-custom text-xs uppercase font-heading">B2C · Talent & Development</span>
          <span className="text-eco-green-light tracking-widest-custom text-xs uppercase font-heading">B2B · Business Systems</span>
        </div>

        {/* Tip */}
        <div className="flex items-center justify-center gap-1.5 mb-4 text-muted-foreground text-xs">
          <MousePointerClick size={13} />
          <span>Click any node to view details</span>
        </div>

        {/* SVG canvas */}
        <div className="relative" style={{ height: 570 }}>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 960 570" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(43, 40%, 35%)" stopOpacity="0.3" />
                <stop offset="50%" stopColor="hsl(43, 50%, 50%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(43, 40%, 35%)" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {connections.map((conn, i) => {
              const fromNode = nodes.find(n => n.id === conn.from)!;
              const toNode = nodes.find(n => n.id === conn.to)!;
              const from = getNodeCenter(fromNode);
              const to = getNodeCenter(toNode);
              return (
                <motion.line
                  key={i}
                  x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke="url(#connGrad)"
                  strokeWidth="1.5"
                  strokeDasharray={conn.dashed ? "6 4" : undefined}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node, i) => {
            const colors = colorMap[node.color];
            const isHub = node.id === "momentum";
            return (
              <motion.button
                key={node.id}
                className={`absolute cursor-pointer border-2 ${colors.border} ${colors.glow} backdrop-blur-sm transition-colors hover:brightness-125 ${node.dashed ? "border-dashed" : ""} ${isHub ? "rounded-2xl" : "rounded-lg"}`}
                style={{
                  left: `${(node.x / 960) * 100}%`,
                  top: node.y,
                  width: node.width,
                  height: node.height,
                  background: isHub
                    ? "radial-gradient(circle, hsl(220, 50%, 20%), hsl(220, 40%, 12%))"
                    : `linear-gradient(135deg, hsl(var(--${node.color === "gold" ? "primary" : node.color === "blue" ? "eco-blue" : node.color === "green" ? "eco-green" : node.color === "orange" ? "eco-orange" : "navy"}) / 0.15), hsl(var(--card)))`,
                }}
                onClick={() => setSelected(node)}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.06, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className={`flex flex-col items-center justify-center h-full px-3 text-center`}>
                  <p className={`font-heading font-bold text-xs leading-tight ${node.color === "gold" ? "text-gradient-gold" : node.color === "navy" ? "text-primary" : "text-foreground"}`}>{node.label}</p>
                  <p className="text-muted-foreground text-[10px] mt-0.5 leading-tight">{node.subtitle}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
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
              className={`relative max-w-md w-full mx-4 rounded-xl border-2 ${colorMap[selected.color].border} ${colorMap[selected.color].glow} bg-card p-6`}
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
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
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
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
