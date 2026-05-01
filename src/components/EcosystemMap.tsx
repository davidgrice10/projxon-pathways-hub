import { useState, useRef, useEffect, useCallback, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MousePointerClick } from "lucide-react";

interface NodeSections {
  what: string;
  why: string;
  connects: string[];
}

interface EcoNode {
  id: string;
  label: string;
  subtitle: string;
  color: "gold" | "blue" | "green" | "orange" | "navy";
  dashed?: boolean;
  sections: NodeSections;
}

interface Connection {
  from: string;
  to: string;
  dashed?: boolean;
  tint: "blue" | "green" | "gold" | "orange";
}

const b2cNodes: EcoNode[] = [
  { id: "phelan", label: "The Phelan Focus", subtitle: "Top-of-Funnel Philosophy", color: "blue",
    sections: {
      what: "Content & media brand that drives ecosystem awareness.",
      why: "Builds trust and attracts top-of-funnel talent.",
      connects: ["Feeds into Momentum Internship", "Powers B2C talent pipeline"],
    }
  },
  { id: "mip", label: "Momentum Internship", subtitle: "Entry Point", color: "blue",
    sections: {
      what: "Standardized internship platform with company ratings.",
      why: "Sets a new benchmark for career readiness and matching.",
      connects: ["Sits between Phelan and Growth Advisory", "Pipelines talent into Momentum"],
    }
  },
  { id: "gap", label: "Growth Advisory", subtitle: "Development Layer", color: "blue",
    sections: {
      what: "Mentorship and skill-building for emerging professionals.",
      why: "Accelerates careers beyond the internship stage.",
      connects: ["Bridges Internship to Coaching", "Develops talent for partner orgs"],
    }
  },
  { id: "mcp", label: "Momentum Coaching", subtitle: "Coaching Layer", color: "blue",
    sections: {
      what: "1-on-1 coaching for leadership and performance.",
      why: "Deepens long-term growth and retention.",
      connects: ["Top of B2C development stack", "Feeds leaders into Momentum"],
    }
  },
];

const b2bNodes: EcoNode[] = [
  { id: "mcs", label: "Consulting System", subtitle: "Client Delivery", color: "green",
    sections: {
      what: "B2B consulting that delivers business transformation.",
      why: "Primary revenue engine for the ecosystem.",
      connects: ["Productized through ORKA OS", "Powered by Momentum frameworks"],
    }
  },
  { id: "mos", label: "Operating System", subtitle: "Business Framework", color: "green",
    sections: {
      what: "Internal operations and team management framework.",
      why: "Scales small teams into mature operations.",
      connects: ["Underpins all consulting work", "Feeds back into Momentum"],
    }
  },
  { id: "michelin", label: "Michelin Method", subtitle: "Management & Production", color: "green",
    sections: {
      what: "Quality and production methodology framework.",
      why: "Sets the excellence standard across delivery.",
      connects: ["Codified inside ORKA OS", "Used across consulting projects"],
    }
  },
  { id: "orka", label: "ORKA OS", subtitle: "B2B SaaS · In Development", color: "green", dashed: true,
    sections: {
      what: "B2B SaaS platform productizing consulting IP.",
      why: "Turns services into scalable software revenue.",
      connects: ["Built on Michelin Method", "Distributed via Momentum"],
    }
  },
];

const projxonNode: EcoNode = { id: "projxon", label: "PROJXON", subtitle: "Incubator & Parent System", color: "gold",
  sections: {
    what: "Parent company incubating the full ecosystem.",
    why: "Drives the workforce development mission.",
    connects: ["Owns Momentum and all sub-brands", "Sets strategic direction"],
  }
};
const momentumNode: EcoNode = { id: "momentum", label: "MOMENTUM", subtitle: "Performance System", color: "navy",
  sections: {
    what: "Central performance hub for learning and community.",
    why: "Connects B2C talent and B2B business tracks.",
    connects: ["Hub for every ecosystem node", "Powered by Ivory.io (GoHighLevel)"],
  }
};
const mopNode: EcoNode = { id: "mop", label: "Momentum Office Parties", subtitle: "Networking & Events", color: "orange",
  sections: {
    what: "In-person networking and culture events.",
    why: "Builds community across the ecosystem.",
    connects: ["Activates Momentum members", "Bridges B2C and B2B audiences"],
  }
};

const connections: Connection[] = [
  // PROJXON → Momentum (vertical hierarchy)
  { from: "projxon", to: "momentum", tint: "gold" },
  // B2C → Momentum (horizontal spokes from left)
  { from: "phelan", to: "momentum", tint: "blue" },
  { from: "mip", to: "momentum", tint: "blue" },
  { from: "gap", to: "momentum", tint: "blue" },
  { from: "mcp", to: "momentum", tint: "blue" },
  // B2B → Momentum (horizontal spokes from right)
  { from: "mcs", to: "momentum", tint: "green" },
  { from: "mos", to: "momentum", tint: "green" },
  { from: "michelin", to: "momentum", tint: "green" },
  { from: "orka", to: "momentum", tint: "green" },
  // MOP → Momentum (vertical from below)
  { from: "mop", to: "momentum", tint: "orange" },
  // Internal B2C vertical chain (dashed)
  { from: "phelan", to: "mip", dashed: true, tint: "blue" },
  { from: "mip", to: "gap", dashed: true, tint: "blue" },
  { from: "gap", to: "mcp", dashed: true, tint: "blue" },
  // Internal B2B vertical chain (dashed)
  { from: "michelin", to: "orka", dashed: true, tint: "green" },
];

const borderColors: Record<string, string> = {
  gold: "border-primary/90",
  blue: "border-eco-blue/90",
  green: "border-eco-green/90",
  orange: "border-eco-orange/90",
  navy: "border-primary/90",
};

const nodeGradients: Record<string, string> = {
  gold: "linear-gradient(160deg, hsl(220, 20%, 14%) 0%, hsl(43, 28%, 10%) 100%)",
  blue: "linear-gradient(160deg, hsl(220, 20%, 14%) 0%, hsl(210, 32%, 11%) 100%)",
  green: "linear-gradient(160deg, hsl(220, 20%, 14%) 0%, hsl(145, 24%, 10%) 100%)",
  orange: "linear-gradient(160deg, hsl(220, 20%, 14%) 0%, hsl(30, 28%, 11%) 100%)",
  navy: "linear-gradient(160deg, hsl(220, 20%, 14%) 0%, hsl(220, 32%, 11%) 100%)",
};

const nodeGlow: Record<string, string> = {
  gold: "0 0 18px -10px hsl(43, 72%, 55%, 0.35)",
  blue: "0 0 18px -10px hsl(210, 60%, 55%, 0.35)",
  green: "0 0 18px -10px hsl(145, 45%, 50%, 0.35)",
  orange: "0 0 18px -10px hsl(30, 65%, 55%, 0.35)",
  navy: "0 0 18px -10px hsl(43, 72%, 55%, 0.35)",
};

const modalGlow: Record<string, string> = {
  gold: "shadow-[0_0_40px_-10px_hsl(43,72%,55%,0.5)]",
  blue: "shadow-[0_0_40px_-10px_hsl(210,60%,45%,0.5)]",
  green: "shadow-[0_0_40px_-10px_hsl(145,40%,48%,0.5)]",
  orange: "shadow-[0_0_40px_-10px_hsl(30,70%,50%,0.5)]",
  navy: "shadow-[0_0_40px_-10px_hsl(43,72%,55%,0.5)]",
};

// Color-coded stroke colors for connections — refined for SaaS architecture look
const tintColors: Record<string, { base: string; glow: string }> = {
  blue: { base: "hsl(210, 60%, 55%)", glow: "hsl(210, 75%, 65%)" },
  green: { base: "hsl(145, 45%, 50%)", glow: "hsl(145, 60%, 62%)" },
  gold: { base: "hsl(43, 65%, 58%)", glow: "hsl(43, 80%, 68%)" },
  orange: { base: "hsl(30, 65%, 55%)", glow: "hsl(30, 80%, 65%)" },
};

type Side = "top" | "bottom" | "left" | "right";
interface Point { x: number; y: number }

/** Get the center of a specific edge of a node rect (relative to container). */
function getEdgePoint(rect: DOMRect, containerRect: DOMRect, side: Side): Point {
  const cx = rect.left + rect.width / 2 - containerRect.left;
  const cy = rect.top + rect.height / 2 - containerRect.top;
  switch (side) {
    case "top": return { x: cx, y: rect.top - containerRect.top };
    case "bottom": return { x: cx, y: rect.bottom - containerRect.top };
    case "left": return { x: rect.left - containerRect.left, y: cy };
    case "right": return { x: rect.right - containerRect.left, y: cy };
  }
}

/** Choose best edges for an orthogonal connection between two rects. */
function chooseSides(fromRect: DOMRect, toRect: DOMRect): [Side, Side] {
  const fromCx = fromRect.left + fromRect.width / 2;
  const fromCy = fromRect.top + fromRect.height / 2;
  const toCx = toRect.left + toRect.width / 2;
  const toCy = toRect.top + toRect.height / 2;

  const dx = toCx - fromCx;
  const dy = toCy - fromCy;

  // Primarily horizontal — connect side-to-side
  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0) return ["right", "left"];
    return ["left", "right"];
  }
  // Primarily vertical — connect top/bottom
  if (dy > 0) return ["bottom", "top"];
  return ["top", "bottom"];
}

/**
 * Build an orthogonal (right-angle) path between two edge points.
 * Routes with vertical+horizontal segments only — no curves, no diagonals.
 */
function buildOrthogonalPath(from: Point, fromSide: Side, to: Point, toSide: Side): string {
  // Same-axis straight line
  if (fromSide === "left" && toSide === "right" || fromSide === "right" && toSide === "left") {
    if (Math.abs(from.y - to.y) < 1) {
      // Pure straight horizontal
      return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
    }
    // Horizontal → vertical → horizontal (Z routing)
    const midX = (from.x + to.x) / 2;
    return `M ${from.x} ${from.y} L ${midX} ${from.y} L ${midX} ${to.y} L ${to.x} ${to.y}`;
  }
  if (fromSide === "top" && toSide === "bottom" || fromSide === "bottom" && toSide === "top") {
    if (Math.abs(from.x - to.x) < 1) {
      return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
    }
    const midY = (from.y + to.y) / 2;
    return `M ${from.x} ${from.y} L ${from.x} ${midY} L ${to.x} ${midY} L ${to.x} ${to.y}`;
  }
  // L-shape (mixed sides) — short stub then perpendicular
  const stub = 16;
  let p1 = { ...from };
  switch (fromSide) {
    case "top": p1.y -= stub; break;
    case "bottom": p1.y += stub; break;
    case "left": p1.x -= stub; break;
    case "right": p1.x += stub; break;
  }
  let p2 = { ...to };
  switch (toSide) {
    case "top": p2.y -= stub; break;
    case "bottom": p2.y += stub; break;
    case "left": p2.x -= stub; break;
    case "right": p2.x += stub; break;
  }
  // Connect p1 → p2 with one bend
  const fromHorizontal = fromSide === "left" || fromSide === "right";
  if (fromHorizontal) {
    return `M ${from.x} ${from.y} L ${p1.x} ${p1.y} L ${p1.x} ${p2.y} L ${p2.x} ${p2.y} L ${to.x} ${to.y}`;
  }
  return `M ${from.x} ${from.y} L ${p1.x} ${p1.y} L ${p2.x} ${p1.y} L ${p2.x} ${p2.y} L ${to.x} ${to.y}`;
}

interface OrthoLine {
  path: string;
  tint: string;
  dashed?: boolean;
  fromId: string;
  toId: string;
  endPoint: Point;
}

interface EcosystemMapProps {
  onNodeClick?: (label: string) => void;
}

export default function EcosystemMap({ onNodeClick }: EcosystemMapProps = {}) {
  const [selected, setSelected] = useState<EcoNode | null>(null);
  const handleSelect = (node: EcoNode) => {
    setSelected(node);
    onNodeClick?.(node.label);
  };
  const [hoveredConn, setHoveredConn] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [lines, setLines] = useState<OrthoLine[]>([]);

  // Build related-node set for focused node (for highlight/fade)
  const focusedId = selected?.id ?? null;
  const relatedIds = (() => {
    if (!focusedId) return null;
    const set = new Set<string>([focusedId]);
    for (const c of connections) {
      if (c.from === focusedId) set.add(c.to);
      if (c.to === focusedId) set.add(c.from);
    }
    return set;
  })();

  // Close on Escape
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const calculate = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newLines: OrthoLine[] = [];

    for (const conn of connections) {
      const fromEl = nodeRefs.current[conn.from];
      const toEl = nodeRefs.current[conn.to];
      if (!fromEl || !toEl) continue;

      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();

      const [fromSide, toSide] = chooseSides(fromRect, toRect);
      const fromPoint = getEdgePoint(fromRect, containerRect, fromSide);
      const toPoint = getEdgePoint(toRect, containerRect, toSide);
      const path = buildOrthogonalPath(fromPoint, fromSide, toPoint, toSide);

      newLines.push({ path, tint: conn.tint, dashed: conn.dashed, fromId: conn.from, toId: conn.to, endPoint: toPoint });
    }

    setLines(newLines);
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
    <div ref={panelRef} className="relative w-full overflow-hidden">
      <div className="text-center mb-4 flex flex-col items-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/20 bg-amber-400/5 text-[10px] font-bold tracking-[0.2em] uppercase text-amber-400/75">
          Ecosystem Map
        </span>
        <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground leading-tight">PROJXON</h2>
      </div>

      {/* Zone labels */}
      <div className="flex justify-between mb-3 px-4 max-w-5xl mx-auto">
        <span className="text-eco-blue-light tracking-widest-custom text-xs uppercase font-heading">B2C · Talent & Development</span>
        <span className="text-eco-green-light tracking-widest-custom text-xs uppercase font-heading">B2B · Business Systems</span>
      </div>

      {/* Tip */}
      <div className="flex items-center justify-center gap-1.5 mb-5 text-muted-foreground text-xs">
        <MousePointerClick size={13} />
        <span>Click any node to explore program details</span>
      </div>

      {/* Map container */}
      <div ref={containerRef} className="relative max-w-5xl mx-auto" style={{ minHeight: 640 }}>
        {/* SVG — orthogonal connections layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            {Object.entries(tintColors).map(([key, { glow }]) => (
              <filter key={key} id={`conn-glow-${key}`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feFlood floodColor={glow} floodOpacity="0.6" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
          </defs>

          {lines.map((line, i) => {
            const colors = tintColors[line.tint] || tintColors.gold;
            const isHovered = hoveredConn === i;
            const isConnRelated = relatedIds
              ? (relatedIds.has(line.fromId) && relatedIds.has(line.toId) &&
                 (line.fromId === focusedId || line.toId === focusedId))
              : false;
            const isDimmed = relatedIds !== null && !isConnRelated;
            const highlight = isHovered || isConnRelated;

            return (
              <g key={i}>
                <motion.path
                  d={line.path}
                  fill="none"
                  stroke={highlight ? colors.glow : colors.base}
                  strokeWidth={highlight ? 2.2 : 1.6}
                  strokeOpacity={isDimmed ? 0.12 : highlight ? 1 : (line.dashed ? 0.45 : 0.7)}
                  strokeDasharray={line.dashed ? "4 4" : undefined}
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  filter={highlight ? `url(#conn-glow-${line.tint})` : undefined}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.04, duration: 0.6, ease: "easeOut" as const }}
                  style={{ transition: "stroke-opacity 0.3s, stroke-width 0.3s" }}
                />
                {/* Endpoint dot at target node edge */}
                {!line.dashed && (
                  <motion.circle
                    cx={line.endPoint.x}
                    cy={line.endPoint.y}
                    r={highlight ? 3 : 2}
                    fill={highlight ? colors.glow : colors.base}
                    fillOpacity={isDimmed ? 0.15 : highlight ? 1 : 0.85}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 + i * 0.04 }}
                  />
                )}
                {/* Invisible fat hitbox */}
                <path
                  d={line.path}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={14}
                  style={{ pointerEvents: "stroke", cursor: "pointer" }}
                  onMouseEnter={() => setHoveredConn(i)}
                  onMouseLeave={() => setHoveredConn(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Grid layout: B2C | Center | B2B — evenly distributed vertically */}
        <div className="grid grid-cols-[1fr_300px_1fr] gap-12 relative items-stretch" style={{ zIndex: 2, minHeight: 640 }}>
          {/* B2C Column */}
          <div className="flex flex-col justify-between py-2">
            {b2cNodes.map((node, i) => (
              <NodeBox key={node.id} node={node} onClick={() => handleSelect(node)} delay={0.15 + i * 0.08} ref={setNodeRef(node.id)} dimmed={!!relatedIds && !relatedIds.has(node.id)} highlighted={focusedId === node.id} />
            ))}
          </div>

          {/* Center Column: PROJXON → MOMENTUM → MOP */}
          <div className="flex flex-col items-center justify-between py-2">
            <NodeBox node={projxonNode} onClick={() => handleSelect(projxonNode)} delay={0.1} ref={setNodeRef("projxon")} dimmed={!!relatedIds && !relatedIds.has("projxon")} highlighted={focusedId === "projxon"} />

            {(() => {
              const momDimmed = !!relatedIds && !relatedIds.has("momentum");
              const momHighlighted = focusedId === "momentum";
              return (
                <motion.button
                  ref={setNodeRef("momentum")}
                  onClick={() => handleSelect(momentumNode)}
                  className="w-full border-[1.5px] border-primary/90 rounded-xl py-12 px-7 text-center cursor-pointer"
                  style={{
                    background: "linear-gradient(160deg, hsl(220, 45%, 18%), hsl(220, 35%, 10%))",
                    boxShadow: momHighlighted
                      ? "0 0 0 1px hsl(43, 72%, 55%, 0.4), 0 12px 40px -12px hsl(43, 72%, 55%, 0.7), inset 0 1px 0 hsl(43, 72%, 55%, 0.15)"
                      : "0 0 0 1px hsl(43, 72%, 55%, 0.15), 0 8px 32px -12px hsl(43, 72%, 55%, 0.4), inset 0 1px 0 hsl(43, 72%, 55%, 0.1)",
                    opacity: momDimmed ? 0.28 : 1,
                    transition: "opacity 0.3s, box-shadow 0.3s",
                  }}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: momDimmed ? 0.28 : 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 160, damping: 20 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <p className="font-heading font-bold text-2xl text-gradient-gold leading-tight tracking-tight">MOMENTUM</p>
                  <p className="text-foreground/70 text-xs mt-1.5 font-medium">Performance System</p>
                  <p className="text-muted-foreground text-[10px] mt-2 opacity-70">Learning · Community · Implementation</p>
                </motion.button>
              );
            })()}

            <NodeBox node={mopNode} onClick={() => handleSelect(mopNode)} delay={0.7} ref={setNodeRef("mop")} dimmed={!!relatedIds && !relatedIds.has("mop")} highlighted={focusedId === "mop"} />
          </div>

          {/* B2B Column */}
          <div className="flex flex-col justify-between py-2">
            {b2bNodes.map((node, i) => (
              <NodeBox key={node.id} node={node} onClick={() => handleSelect(node)} delay={0.15 + i * 0.08} ref={setNodeRef(node.id)} dimmed={!!relatedIds && !relatedIds.has(node.id)} highlighted={focusedId === node.id} />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

const NodeBox = forwardRef<HTMLButtonElement, { node: EcoNode; onClick: () => void; delay?: number; dimmed?: boolean; highlighted?: boolean }>(
  ({ node, onClick, delay = 0, dimmed = false, highlighted = false }, ref) => {
    return (
      <motion.button
        ref={ref}
        onClick={onClick}
        className={`w-full border-[1.5px] ${borderColors[node.color]} hover:brightness-110 ${node.dashed ? "border-dashed" : ""} rounded-xl py-6 px-5 text-center cursor-pointer`}
        style={{
          background: nodeGradients[node.color],
          boxShadow: highlighted
            ? `0 1px 0 hsl(0, 0%, 100%, 0.06) inset, ${nodeGlow[node.color]}, 0 0 32px -10px currentColor`
            : `0 1px 0 hsl(0, 0%, 100%, 0.04) inset, ${nodeGlow[node.color]}`,
          opacity: dimmed ? 0.28 : 1,
          transition: "opacity 0.3s ease, box-shadow 0.3s ease",
        }}
        initial={{ opacity: 0, scale: 0.92, y: 8 }}
        animate={{ opacity: dimmed ? 0.28 : 1, scale: highlighted ? 1.03 : 1, y: 0 }}
        transition={{ delay, type: "spring", stiffness: 180, damping: 20 }}
        whileHover={{ scale: highlighted ? 1.04 : 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        <p className={`font-heading font-bold text-sm leading-tight tracking-tight ${node.color === "gold" ? "text-gradient-gold" : "text-foreground"}`}>{node.label}</p>
        <p className="text-muted-foreground text-[11px] mt-1 leading-tight font-medium">{node.subtitle}</p>
      </motion.button>
    );
  }
);
NodeBox.displayName = "NodeBox";
