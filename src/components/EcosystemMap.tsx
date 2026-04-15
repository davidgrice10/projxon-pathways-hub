import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MousePointerClick } from "lucide-react";

interface EcoNode {
  id: string;
  label: string;
  subtitle: string;
  color: "gold" | "blue" | "green" | "orange" | "navy";
  dashed?: boolean;
  details: string[];
}

interface Connection {
  from: string;
  to: string;
  dashed?: boolean;
}

const b2cNodes: EcoNode[] = [
  { id: "phelan", label: "The Phelan Focus", subtitle: "Top-of-Funnel Philosophy", color: "blue", details: ["Content & media brand", "Builds awareness and trust", "Attracts top-of-funnel talent", "Philosophy-driven engagement"] },
  { id: "mip", label: "Momentum Internship", subtitle: "Entry Point", color: "blue", details: ["Standardized internship frameworks", "Company ratings (1-5 stars)", "Talent-employer matching", "Career readiness benchmark"] },
  { id: "gap", label: "Growth Advisory", subtitle: "Development Layer", color: "blue", details: ["Professional development", "Mentorship and coaching", "Skill building pathways", "Career acceleration"] },
  { id: "mcp", label: "Momentum Coaching", subtitle: "Coaching Layer", color: "blue", details: ["1-on-1 coaching sessions", "Leadership development", "Performance improvement", "Personal growth plans"] },
];

const b2bNodes: EcoNode[] = [
  { id: "mcs", label: "Consulting System", subtitle: "Client Delivery", color: "green", details: ["B2B consulting services", "Client project delivery", "Business transformation", "Revenue generation engine"] },
  { id: "mos", label: "Operating System", subtitle: "Business Framework", color: "green", details: ["Internal operations framework", "Scalable business processes", "Team management systems", "Operational excellence"] },
  { id: "michelin", label: "Michelin Method", subtitle: "Management & Production", color: "green", details: ["Michelin Management Method", "Michelin Production Process", "Quality standards framework", "Excellence methodology"] },
  { id: "orka", label: "ORKA OS", subtitle: "B2B SaaS · In Development", color: "green", dashed: true, details: ["B2B SaaS Platform", "Currently in development", "Will productize consulting IP", "Scalable tech solution"] },
];

const projxonNode: EcoNode = { id: "projxon", label: "PROJXON", subtitle: "Incubator & Parent System", color: "gold", details: ["Parent company and incubator", "Connects all ecosystem components", "Drives strategic vision", "Workforce development mission"] };
const momentumNode: EcoNode = { id: "momentum", label: "MOMENTUM", subtitle: "Performance System", color: "navy", details: ["Learning · Community · Implementation", "Powered by Ivory.io (GoHighLevel)", "Central performance hub", "Connects B2C and B2B tracks"] };
const mopNode: EcoNode = { id: "mop", label: "Momentum Office Parties", subtitle: "Networking & Events", color: "orange", details: ["In-person networking events", "Professional development events", "Community building", "Culture & connection"] };

const allNodes = [projxonNode, ...b2cNodes, momentumNode, ...b2bNodes, mopNode];

const connections: Connection[] = [
  { from: "projxon", to: "phelan" },
  { from: "projxon", to: "momentum" },
  { from: "projxon", to: "mcs" },
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

const borderColors: Record<string, string> = {
  gold: "border-primary",
  blue: "border-eco-blue",
  green: "border-eco-green",
  orange: "border-eco-orange",
  navy: "border-primary",
};

const glowClasses: Record<string, string> = {
  gold: "glow-gold",
  blue: "glow-blue",
  green: "glow-green",
  orange: "glow-orange",
  navy: "glow-gold",
};

export default function EcosystemMap() {
  const [selected, setSelected] = useState<EcoNode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number; dashed?: boolean }[]>([]);

  // Calculate SVG connection lines from DOM positions
  useEffect(() => {
    const calculate = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const newLines: typeof lines = [];

      for (const conn of connections) {
        const fromEl = nodeRefs.current[conn.from];
        const toEl = nodeRefs.current[conn.to];
        if (!fromEl || !toEl) continue;

        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();

        const fromCx = fromRect.left + fromRect.width / 2 - containerRect.left;
        const fromCy = fromRect.top + fromRect.height / 2 - containerRect.top;
        const toCx = toRect.left + toRect.width / 2 - containerRect.left;
        const toCy = toRect.top + toRect.height / 2 - containerRect.top;

        // Calculate edge intersection points
        const dx = toCx - fromCx;
        const dy = toCy - fromCy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist === 0) continue;

        const nx = dx / dist;
        const ny = dy / dist;

        // From edge
        const fHw = fromRect.width / 2;
        const fHh = fromRect.height / 2;
        const fScaleX = Math.abs(nx) > 0.001 ? fHw / Math.abs(nx) : Infinity;
        const fScaleY = Math.abs(ny) > 0.001 ? fHh / Math.abs(ny) : Infinity;
        const fScale = Math.min(fScaleX, fScaleY);
        const x1 = fromCx + nx * fScale;
        const y1 = fromCy + ny * fScale;

        // To edge
        const tHw = toRect.width / 2;
        const tHh = toRect.height / 2;
        const tScaleX = Math.abs(nx) > 0.001 ? tHw / Math.abs(nx) : Infinity;
        const tScaleY = Math.abs(ny) > 0.001 ? tHh / Math.abs(ny) : Infinity;
        const tScale = Math.min(tScaleX, tScaleY);
        const x2 = toCx - nx * tScale;
        const y2 = toCy - ny * tScale;

        newLines.push({ x1, y1, x2, y2, dashed: conn.dashed });
      }

      setLines(newLines);
    };

    // Calculate after layout settles
    const timer = setTimeout(calculate, 600);
    window.addEventListener("resize", calculate);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculate);
    };
  }, []);

  const setNodeRef = (id: string) => (el: HTMLButtonElement | null) => {
    nodeRefs.current[id] = el;
  };

  return (
    <div className="relative w-full">
      <div className="text-center mb-4">
        <p className="text-muted-foreground tracking-widest-custom text-sm uppercase mb-2 font-heading">Ecosystem Map</p>
        <h2 className="text-4xl font-bold font-heading text-gradient-gold">PROJXON</h2>
      </div>

      {/* Zone labels */}
      <div className="flex justify-between mb-3 px-4 max-w-5xl mx-auto">
        <span className="text-eco-blue-light tracking-widest-custom text-xs uppercase font-heading">B2C · Talent & Development</span>
        <span className="text-eco-green-light tracking-widest-custom text-xs uppercase font-heading">B2B · Business Systems</span>
      </div>

      {/* Tip */}
      <div className="flex items-center justify-center gap-1.5 mb-5 text-muted-foreground text-xs">
        <MousePointerClick size={13} />
        <span>Click any node to view details</span>
      </div>

      {/* Map container */}
      <div ref={containerRef} className="relative max-w-5xl mx-auto" style={{ minHeight: 480 }}>
        {/* SVG overlay for connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(43, 50%, 45%)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="hsl(43, 65%, 55%)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="hsl(43, 50%, 45%)" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {lines.map((line, i) => (
            <motion.line
              key={i}
              x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
              stroke="url(#lineGrad)"
              strokeWidth={1.5}
              strokeDasharray={line.dashed ? "6 4" : undefined}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.06, duration: 0.4 }}
            />
          ))}
        </svg>

        {/* Grid layout: B2C | Center | B2B */}
        <div className="grid grid-cols-[1fr_280px_1fr] gap-6 relative" style={{ zIndex: 1 }}>
          {/* B2C Column */}
          <div className="flex flex-col gap-3 pt-12">
            {b2cNodes.map((node, i) => (
              <NodeBox key={node.id} node={node} onClick={() => setSelected(node)} delay={0.15 + i * 0.08} ref={setNodeRef(node.id)} />
            ))}
          </div>

          {/* Center Column: PROJXON → MOMENTUM → MOP */}
          <div className="flex flex-col items-center gap-3">
            {/* PROJXON */}
            <NodeBox node={projxonNode} onClick={() => setSelected(projxonNode)} delay={0.1} ref={setNodeRef("projxon")} />

            {/* Spacer to vertically center momentum */}
            <div className="flex-1" />

            {/* MOMENTUM - large hub */}
            <motion.button
              ref={setNodeRef("momentum")}
              onClick={() => setSelected(momentumNode)}
              className="w-full border-2 border-primary rounded-2xl py-8 px-6 text-center cursor-pointer backdrop-blur-sm transition-all hover:brightness-125"
              style={{ background: "radial-gradient(circle, hsl(220, 50%, 20%), hsl(220, 40%, 12%))" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 160, damping: 18 }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px -5px hsl(43, 72%, 55%)" }}
              whileTap={{ scale: 0.97 }}
            >
              <p className="font-heading font-bold text-lg text-gradient-gold leading-tight">MOMENTUM</p>
              <p className="text-muted-foreground text-xs mt-1">Performance System</p>
              <p className="text-muted-foreground text-[10px] mt-1 opacity-60">Learning · Community · Implementation</p>
            </motion.button>

            <div className="flex-1" />

            {/* MOP */}
            <NodeBox node={mopNode} onClick={() => setSelected(mopNode)} delay={0.7} ref={setNodeRef("mop")} />
          </div>

          {/* B2B Column */}
          <div className="flex flex-col gap-3 pt-12">
            {b2bNodes.map((node, i) => (
              <NodeBox key={node.id} node={node} onClick={() => setSelected(node)} delay={0.15 + i * 0.08} ref={setNodeRef(node.id)} />
            ))}
          </div>
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
              className={`relative max-w-md w-full mx-4 rounded-xl border-2 ${borderColors[selected.color]} ${glowClasses[selected.color]} bg-card p-6`}
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

// Forwarded ref NodeBox component
import { forwardRef } from "react";

const NodeBox = forwardRef<HTMLButtonElement, { node: EcoNode; onClick: () => void; delay?: number }>(
  ({ node, onClick, delay = 0 }, ref) => {
    return (
      <motion.button
        ref={ref}
        onClick={onClick}
        className={`w-full border-2 ${borderColors[node.color]} backdrop-blur-sm transition-all hover:brightness-125 ${node.dashed ? "border-dashed" : ""} rounded-lg py-3 px-4 text-center cursor-pointer`}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, type: "spring", stiffness: 180, damping: 18 }}
        whileHover={{ scale: 1.04, boxShadow: `0 0 25px -5px ${node.color === "gold" ? "hsl(43, 72%, 55%)" : node.color === "blue" ? "hsl(210, 60%, 45%)" : node.color === "green" ? "hsl(145, 40%, 48%)" : "hsl(30, 70%, 60%)"}` }}
        whileTap={{ scale: 0.97 }}
      >
        <p className={`font-heading font-bold text-xs leading-tight ${node.color === "gold" ? "text-gradient-gold" : "text-foreground"}`}>{node.label}</p>
        <p className="text-muted-foreground text-[10px] mt-0.5 leading-tight">{node.subtitle}</p>
      </motion.button>
    );
  }
);
NodeBox.displayName = "NodeBox";
