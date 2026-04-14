import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
  label?: string;
  dashed?: boolean;
}

const nodes: EcoNode[] = [
  { id: "projxon", label: "PROJXON", subtitle: "Incubator & Parent System", x: 400, y: 60, color: "gold", width: 220, height: 70, details: ["Parent company and incubator", "Connects all ecosystem components", "Drives strategic vision", "Workforce development mission"] },
  { id: "phelan", label: "The Phelan Focus", subtitle: "Top-of-Funnel Philosophy", x: 100, y: 180, color: "blue", width: 200, height: 60, details: ["Content & media brand", "Builds awareness and trust", "Attracts top-of-funnel talent", "Philosophy-driven engagement"] },
  { id: "mip", label: "Momentum Internship Program", subtitle: "Entry Point", x: 100, y: 280, color: "blue", width: 200, height: 60, details: ["Standardized internship frameworks", "Company ratings (1-5 stars)", "Talent-employer matching", "Career readiness benchmark"] },
  { id: "gap", label: "Growth Advisory Program", subtitle: "Development Layer", x: 100, y: 380, color: "blue", width: 200, height: 60, details: ["Professional development", "Mentorship and coaching", "Skill building pathways", "Career acceleration"] },
  { id: "mcp", label: "Momentum Coaching Program", subtitle: "Coaching Layer", x: 100, y: 480, color: "blue", width: 200, height: 60, details: ["1-on-1 coaching sessions", "Leadership development", "Performance improvement", "Personal growth plans"] },
  { id: "momentum", label: "MOMENTUM", subtitle: "Performance System", x: 380, y: 370, color: "navy", width: 180, height: 90, details: ["Learning · Community · Implementation", "Powered by Ivory.io (GoHighLevel)", "Central performance hub", "Connects B2C and B2B tracks"] },
  { id: "mcs", label: "Momentum Consulting System", subtitle: "Client Delivery", x: 680, y: 180, color: "green", width: 200, height: 60, details: ["B2B consulting services", "Client project delivery", "Business transformation", "Revenue generation engine"] },
  { id: "mos", label: "Momentum Operating System", subtitle: "Business Framework", x: 680, y: 280, color: "green", width: 200, height: 60, details: ["Internal operations framework", "Scalable business processes", "Team management systems", "Operational excellence"] },
  { id: "michelin", label: "Michelin Method", subtitle: "Management & Production", x: 680, y: 380, color: "green", width: 200, height: 60, details: ["Michelin Management Method", "Michelin Production Process", "Quality standards framework", "Excellence methodology"] },
  { id: "orka", label: "ORKA OS", subtitle: "B2B SaaS · In Development", x: 700, y: 490, color: "green", width: 180, height: 55, dashed: true, details: ["B2B SaaS Platform", "Currently in development", "Will productize consulting IP", "Scalable tech solution"] },
  { id: "mop", label: "Momentum Office Parties", subtitle: "Networking & Events", x: 370, y: 550, color: "orange", width: 240, height: 65, details: ["In-person networking events", "Professional development events", "Community building", "Culture & connection"] },
];

const connections: Connection[] = [
  { from: "projxon", to: "phelan" },
  { from: "projxon", to: "mcs", dashed: true, label: "connects back" },
  { from: "projxon", to: "momentum" },
  { from: "phelan", to: "mip", dashed: true },
  { from: "mip", to: "gap", dashed: true },
  { from: "gap", to: "mcp", dashed: true, label: "feeds into" },
  { from: "mcp", to: "momentum" },
  { from: "momentum", to: "mcs", label: "enables" },
  { from: "momentum", to: "mos" },
  { from: "momentum", to: "michelin" },
  { from: "momentum", to: "mop" },
];

const colorMap = {
  gold: { bg: "bg-primary", border: "border-primary", glow: "glow-gold", text: "text-primary-foreground" },
  blue: { bg: "bg-eco-blue", border: "border-eco-blue", glow: "glow-blue", text: "text-secondary-foreground" },
  green: { bg: "bg-eco-green", border: "border-eco-green", glow: "glow-green", text: "text-accent-foreground" },
  orange: { bg: "bg-eco-orange", border: "border-eco-orange", glow: "glow-orange", text: "text-foreground" },
  navy: { bg: "bg-navy", border: "border-primary", glow: "glow-gold", text: "text-foreground" },
};

const getNodeCenter = (node: EcoNode) => ({ x: node.x + node.width / 2, y: node.y + node.height / 2 });

export default function EcosystemMap() {
  const [selected, setSelected] = useState<EcoNode | null>(null);

  return (
    <div className="relative w-full">
      <div className="text-center mb-8">
        <p className="text-muted-foreground tracking-widest-custom text-sm uppercase mb-2 font-heading">Ecosystem Map</p>
        <h2 className="text-4xl font-bold font-heading text-gradient-gold">PROJXON</h2>
      </div>

      {/* Labels for B2C / B2B zones */}
      <div className="relative mx-auto" style={{ maxWidth: 960 }}>
        <div className="flex justify-between mb-4 px-4">
          <span className="text-eco-blue-light tracking-widest-custom text-xs uppercase font-heading">B2C · Talent & Development</span>
          <span className="text-eco-green-light tracking-widest-custom text-xs uppercase font-heading">B2B · Business Systems & Execution</span>
        </div>

        {/* SVG canvas for connections */}
        <div className="relative" style={{ height: 650 }}>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 960 650" preserveAspectRatio="xMidYMid meet">
            {connections.map((conn, i) => {
              const fromNode = nodes.find(n => n.id === conn.from)!;
              const toNode = nodes.find(n => n.id === conn.to)!;
              const from = getNodeCenter(fromNode);
              const to = getNodeCenter(toNode);
              return (
                <g key={i}>
                  <line
                    x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke="hsl(43, 40%, 35%)"
                    strokeWidth="1.5"
                    strokeDasharray={conn.dashed ? "6 4" : undefined}
                    opacity={0.5}
                  />
                  {conn.label && (
                    <text
                      x={(from.x + to.x) / 2 + 10}
                      y={(from.y + to.y) / 2 - 8}
                      fill="hsl(43, 50%, 50%)"
                      fontSize="11"
                      fontStyle="italic"
                      fontFamily="Inter"
                    >{conn.label}</text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => {
            const colors = colorMap[node.color];
            const isCircle = node.id === "momentum";
            return (
              <motion.button
                key={node.id}
                className={`absolute cursor-pointer border-2 ${colors.border} ${colors.glow} backdrop-blur-sm transition-all hover:scale-105 ${node.dashed ? "border-dashed" : ""} ${isCircle ? "rounded-full flex flex-col items-center justify-center" : "rounded-lg"}`}
                style={{
                  left: `${(node.x / 960) * 100}%`,
                  top: node.y,
                  width: node.width,
                  height: isCircle ? node.width * 0.9 : node.height,
                  background: isCircle
                    ? "radial-gradient(circle, hsl(220, 50%, 20%), hsl(220, 40%, 12%))"
                    : `linear-gradient(135deg, hsl(var(--${node.color === "gold" ? "primary" : node.color === "blue" ? "eco-blue" : node.color === "green" ? "eco-green" : node.color === "orange" ? "eco-orange" : "navy"}) / 0.15), hsl(var(--card)))`,
                }}
                onClick={() => setSelected(node)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`${isCircle ? "text-center px-2" : "px-4 py-2 text-left"}`}>
                  <p className={`font-heading font-bold text-sm ${node.color === "gold" ? "text-gradient-gold" : node.color === "navy" ? "text-primary" : ""}`}>{node.label}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{node.subtitle}</p>
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
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
              <h3 className="font-heading text-xl font-bold text-gradient-gold">{selected.label}</h3>
              <p className="text-muted-foreground text-sm mb-4">{selected.subtitle}</p>
              <ul className="space-y-2">
                {selected.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
