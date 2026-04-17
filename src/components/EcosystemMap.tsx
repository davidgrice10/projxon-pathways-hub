import { useState, useRef, useEffect, useCallback, forwardRef } from "react";
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
  tint: "blue" | "green" | "gold" | "orange";
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

const connections: Connection[] = [
  // PROJXON → Momentum (parent hierarchy)
  { from: "projxon", to: "momentum", tint: "gold" },
  // Every B2C node connects directly to Momentum (soft blue)
  { from: "phelan", to: "momentum", tint: "blue" },
  { from: "mip", to: "momentum", tint: "blue" },
  { from: "gap", to: "momentum", tint: "blue" },
  { from: "mcp", to: "momentum", tint: "blue" },
  // Every B2B node connects directly to Momentum (soft green)
  { from: "mcs", to: "momentum", tint: "green" },
  { from: "mos", to: "momentum", tint: "green" },
  { from: "michelin", to: "momentum", tint: "green" },
  { from: "orka", to: "momentum", tint: "green" },
  // MOP → Momentum (orange accent)
  { from: "mop", to: "momentum", tint: "orange" },
  // Subtle internal B2C chain (dashed, low-emphasis)
  { from: "phelan", to: "mip", dashed: true, tint: "blue" },
  { from: "mip", to: "gap", dashed: true, tint: "blue" },
  { from: "gap", to: "mcp", dashed: true, tint: "blue" },
  // Subtle internal B2B link (dashed)
  { from: "michelin", to: "orka", dashed: true, tint: "green" },
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

// Color-coded stroke colors for connections
const tintColors: Record<string, { base: string; glow: string }> = {
  blue: { base: "hsl(210, 55%, 45%)", glow: "hsl(210, 70%, 60%)" },
  green: { base: "hsl(145, 35%, 42%)", glow: "hsl(145, 50%, 58%)" },
  gold: { base: "hsl(43, 55%, 48%)", glow: "hsl(43, 75%, 62%)" },
  orange: { base: "hsl(30, 60%, 48%)", glow: "hsl(30, 75%, 62%)" },
};

type Side = "top" | "bottom" | "left" | "right";
interface AnchorPoint { x: number; y: number }

/** Get a specific edge anchor on a node rect (relative to container). */
function getAnchor(rect: DOMRect, containerRect: DOMRect, side: Side): AnchorPoint {
  const cx = rect.left + rect.width / 2 - containerRect.left;
  const cy = rect.top + rect.height / 2 - containerRect.top;
  switch (side) {
    case "top": return { x: cx, y: rect.top - containerRect.top };
    case "bottom": return { x: cx, y: rect.bottom - containerRect.top };
    case "left": return { x: rect.left - containerRect.left, y: cy };
    case "right": return { x: rect.right - containerRect.left, y: cy };
  }
}

/** Choose the best anchor sides for two nodes to avoid overlapping boxes. */
function chooseSides(fromRect: DOMRect, toRect: DOMRect): [Side, Side] {
  const fromCx = fromRect.left + fromRect.width / 2;
  const fromCy = fromRect.top + fromRect.height / 2;
  const toCx = toRect.left + toRect.width / 2;
  const toCy = toRect.top + toRect.height / 2;

  const dx = toCx - fromCx;
  const dy = toCy - fromCy;

  // Primarily horizontal
  if (Math.abs(dx) > Math.abs(dy) * 0.6) {
    if (dx > 0) return ["right", "left"];
    return ["left", "right"];
  }
  // Primarily vertical
  if (dy > 0) return ["bottom", "top"];
  return ["top", "bottom"];
}

/** Build a smooth cubic bezier path between two anchor points. */
function buildCurvePath(from: AnchorPoint, fromSide: Side, to: AnchorPoint, toSide: Side): string {
  const dist = Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2);
  const tension = Math.min(dist * 0.45, 120);

  const cp1 = { ...from };
  const cp2 = { ...to };

  switch (fromSide) {
    case "top": cp1.y -= tension; break;
    case "bottom": cp1.y += tension; break;
    case "left": cp1.x -= tension; break;
    case "right": cp1.x += tension; break;
  }
  switch (toSide) {
    case "top": cp2.y -= tension; break;
    case "bottom": cp2.y += tension; break;
    case "left": cp2.x -= tension; break;
    case "right": cp2.x += tension; break;
  }

  return `M ${from.x} ${from.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${to.x} ${to.y}`;
}

interface CurvedLine {
  path: string;
  tint: string;
  dashed?: boolean;
  fromId: string;
  toId: string;
}

export default function EcosystemMap() {
  const [selected, setSelected] = useState<EcoNode | null>(null);
  const [hoveredConn, setHoveredConn] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [curves, setCurves] = useState<CurvedLine[]>([]);

  const calculate = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newCurves: CurvedLine[] = [];

    for (const conn of connections) {
      const fromEl = nodeRefs.current[conn.from];
      const toEl = nodeRefs.current[conn.to];
      if (!fromEl || !toEl) continue;

      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();

      const [fromSide, toSide] = chooseSides(fromRect, toRect);
      const fromAnchor = getAnchor(fromRect, containerRect, fromSide);
      const toAnchor = getAnchor(toRect, containerRect, toSide);
      const path = buildCurvePath(fromAnchor, fromSide, toAnchor, toSide);

      newCurves.push({ path, tint: conn.tint, dashed: conn.dashed, fromId: conn.from, toId: conn.to });
    }

    setCurves(newCurves);
  }, []);

  useEffect(() => {
    const timer = setTimeout(calculate, 500);
    window.addEventListener("resize", calculate);
    return () => { clearTimeout(timer); window.removeEventListener("resize", calculate); };
  }, [calculate]);

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
      <div ref={containerRef} className="relative max-w-5xl mx-auto" style={{ minHeight: 640 }}>
        {/* SVG — connections layer (above bg, below node borders) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            {Object.entries(tintColors).map(([key, { glow }]) => (
              <filter key={key} id={`conn-glow-${key}`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feFlood floodColor={glow} floodOpacity="0.5" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
          </defs>

          <style>{`
            @keyframes connPulse {
              0%, 100% { opacity: 0.55; }
              50% { opacity: 0.8; }
            }
          `}</style>

          {curves.map((curve, i) => {
            const colors = tintColors[curve.tint] || tintColors.gold;
            const isHovered = hoveredConn === i;
            const isHubLine = curve.fromId === "momentum" || curve.toId === "momentum";

            return (
              <g key={i}>
                {isHubLine && (
                  <motion.path
                    d={curve.path}
                    fill="none"
                    stroke={colors.glow}
                    strokeWidth={4}
                    strokeOpacity={isHovered ? 0.4 : 0.14}
                    strokeDasharray={curve.dashed ? "6 4" : undefined}
                    filter={isHovered ? `url(#conn-glow-${curve.tint})` : undefined}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.05, duration: 0.7, ease: "easeOut" as const }}
                  />
                )}
                <motion.path
                  d={curve.path}
                  fill="none"
                  stroke={isHovered ? colors.glow : colors.base}
                  strokeWidth={isHovered ? 2.5 : 1.8}
                  strokeOpacity={isHovered ? 0.95 : (curve.dashed ? 0.4 : 0.65)}
                  strokeDasharray={curve.dashed ? "5 5" : undefined}
                  strokeLinecap="round"
                  filter={isHovered ? `url(#conn-glow-${curve.tint})` : undefined}
                  style={!isHovered ? { animation: "connPulse 4s ease-in-out infinite", animationDelay: `${i * 0.3}s` } : undefined}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.05, duration: 0.7, ease: "easeOut" as const }}
                />
                <path
                  d={curve.path}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={16}
                  style={{ pointerEvents: "stroke", cursor: "pointer" }}
                  onMouseEnter={() => setHoveredConn(i)}
                  onMouseLeave={() => setHoveredConn(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Grid layout: B2C | Center | B2B — evenly distributed vertically */}
        <div className="grid grid-cols-[1fr_300px_1fr] gap-10 relative items-stretch" style={{ zIndex: 2, minHeight: 640 }}>
          {/* B2C Column — evenly distributed top to bottom */}
          <div className="flex flex-col justify-between py-2">
            {b2cNodes.map((node, i) => (
              <NodeBox key={node.id} node={node} onClick={() => setSelected(node)} delay={0.15 + i * 0.08} ref={setNodeRef(node.id)} />
            ))}
          </div>

          {/* Center Column: PROJXON (top) → MOMENTUM (true center) → MOP (bottom) */}
          <div className="flex flex-col items-center justify-between py-2">
            <NodeBox node={projxonNode} onClick={() => setSelected(projxonNode)} delay={0.1} ref={setNodeRef("projxon")} />

            <motion.button
              ref={setNodeRef("momentum")}
              onClick={() => setSelected(momentumNode)}
              className="w-full border-2 border-primary rounded-2xl py-10 px-6 text-center cursor-pointer backdrop-blur-sm transition-all hover:brightness-125 glow-gold"
              style={{ background: "radial-gradient(circle, hsl(220, 50%, 20%), hsl(220, 40%, 12%))" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 160, damping: 18 }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 50px -5px hsl(43, 72%, 55%)" }}
              whileTap={{ scale: 0.97 }}
            >
              <p className="font-heading font-bold text-xl text-gradient-gold leading-tight">MOMENTUM</p>
              <p className="text-muted-foreground text-xs mt-1">Performance System</p>
              <p className="text-muted-foreground text-[10px] mt-1 opacity-60">Learning · Community · Implementation</p>
            </motion.button>

            <NodeBox node={mopNode} onClick={() => setSelected(mopNode)} delay={0.7} ref={setNodeRef("mop")} />
          </div>

          {/* B2B Column — evenly distributed top to bottom */}
          <div className="flex flex-col justify-between py-2">
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

const NodeBox = forwardRef<HTMLButtonElement, { node: EcoNode; onClick: () => void; delay?: number }>(
  ({ node, onClick, delay = 0 }, ref) => {
    return (
      <motion.button
        ref={ref}
        onClick={onClick}
        className={`w-full border-2 ${borderColors[node.color]} backdrop-blur-sm transition-all hover:brightness-125 ${node.dashed ? "border-dashed" : ""} rounded-lg py-3 px-4 text-center cursor-pointer bg-card/80`}
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
