import { useState } from "react";
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

function NodeBox({ node, onClick, delay = 0 }: { node: EcoNode; onClick: () => void; delay?: number }) {
  const isHub = node.id === "momentum";
  return (
    <motion.button
      onClick={onClick}
      className={`w-full border-2 ${borderColors[node.color]} backdrop-blur-sm transition-all hover:brightness-125 ${node.dashed ? "border-dashed" : ""} ${isHub ? "rounded-2xl py-6" : "rounded-lg py-3"} px-4 text-center cursor-pointer`}
      style={{
        background: isHub
          ? "radial-gradient(circle, hsl(220, 50%, 20%), hsl(220, 40%, 12%))"
          : undefined,
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 180, damping: 18 }}
      whileHover={{ scale: 1.04, boxShadow: `0 0 30px -5px ${node.color === "gold" || node.color === "navy" ? "hsl(43, 72%, 55%)" : node.color === "blue" ? "hsl(210, 60%, 45%)" : node.color === "green" ? "hsl(145, 40%, 48%)" : "hsl(30, 70%, 60%)"}` }}
      whileTap={{ scale: 0.97 }}
    >
      <p className={`font-heading font-bold text-sm leading-tight ${node.color === "gold" || node.color === "navy" ? "text-gradient-gold" : "text-foreground"}`}>{node.label}</p>
      <p className="text-muted-foreground text-[11px] mt-0.5 leading-tight">{node.subtitle}</p>
    </motion.button>
  );
}

function ConnectionLine({ direction, dashed, delay = 0 }: { direction: "down" | "horizontal-left" | "horizontal-right"; dashed?: boolean; delay?: number }) {
  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
    >
      {direction === "down" && (
        <div className={`w-0.5 h-6 bg-gradient-to-b from-primary/60 to-primary/20 ${dashed ? "border-l-2 border-dashed border-primary/40 w-0 bg-transparent" : ""}`} />
      )}
      {direction === "horizontal-left" && (
        <div className={`h-0.5 w-full bg-gradient-to-l from-primary/60 to-primary/20 ${dashed ? "border-t-2 border-dashed border-primary/40 h-0 bg-transparent" : ""}`} />
      )}
      {direction === "horizontal-right" && (
        <div className={`h-0.5 w-full bg-gradient-to-r from-primary/60 to-primary/20 ${dashed ? "border-t-2 border-dashed border-primary/40 h-0 bg-transparent" : ""}`} />
      )}
    </motion.div>
  );
}

export default function EcosystemMap() {
  const [selected, setSelected] = useState<EcoNode | null>(null);

  return (
    <div className="relative w-full">
      <div className="text-center mb-6">
        <p className="text-muted-foreground tracking-widest-custom text-sm uppercase mb-2 font-heading">Ecosystem Map</p>
        <h2 className="text-4xl font-bold font-heading text-gradient-gold">PROJXON</h2>
      </div>

      <div className="flex items-center justify-center gap-1.5 mb-6 text-muted-foreground text-xs">
        <MousePointerClick size={13} />
        <span>Click any node to view details</span>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* PROJXON top center */}
        <div className="flex justify-center mb-2">
          <div className="w-56">
            <NodeBox node={projxonNode} onClick={() => setSelected(projxonNode)} delay={0.1} />
          </div>
        </div>

        {/* Connection lines down from PROJXON to 3 columns */}
        <div className="grid grid-cols-3 gap-8 px-4">
          <div className="flex flex-col items-center">
            <ConnectionLine direction="down" delay={0.3} />
          </div>
          <div className="flex flex-col items-center">
            <ConnectionLine direction="down" delay={0.3} />
          </div>
          <div className="flex flex-col items-center">
            <ConnectionLine direction="down" delay={0.3} />
          </div>
        </div>

        {/* Zone labels */}
        <div className="grid grid-cols-3 gap-8 px-4 mb-2">
          <p className="text-eco-blue-light tracking-widest-custom text-[10px] uppercase font-heading text-center">B2C · Talent</p>
          <div />
          <p className="text-eco-green-light tracking-widest-custom text-[10px] uppercase font-heading text-center">B2B · Business</p>
        </div>

        {/* Main 3-column layout: B2C | MOMENTUM | B2B */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 px-4 items-center">
          {/* B2C Column */}
          <div className="space-y-2">
            {b2cNodes.map((node, i) => (
              <div key={node.id}>
                <NodeBox node={node} onClick={() => setSelected(node)} delay={0.2 + i * 0.08} />
                {i < b2cNodes.length - 1 && (
                  <div className="flex justify-center">
                    <ConnectionLine direction="down" dashed delay={0.4 + i * 0.08} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Center: MOMENTUM with horizontal connections */}
          <div className="flex flex-col items-center justify-center gap-2">
            {/* Horizontal lines to left/right */}
            <div className="flex items-center gap-2 w-full">
              <ConnectionLine direction="horizontal-left" delay={0.5} />
              <div className="w-52 shrink-0">
                <NodeBox node={momentumNode} onClick={() => setSelected(momentumNode)} delay={0.3} />
              </div>
              <ConnectionLine direction="horizontal-right" delay={0.5} />
            </div>
          </div>

          {/* B2B Column */}
          <div className="space-y-2">
            {b2bNodes.map((node, i) => (
              <div key={node.id}>
                <NodeBox node={node} onClick={() => setSelected(node)} delay={0.2 + i * 0.08} />
                {i < b2bNodes.length - 1 && (
                  <div className="flex justify-center">
                    <ConnectionLine direction="down" dashed={i === b2bNodes.length - 2} delay={0.4 + i * 0.08} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Connection down from MOMENTUM to MOP */}
        <div className="flex justify-center my-2">
          <ConnectionLine direction="down" delay={0.7} />
        </div>

        {/* MOP bottom center */}
        <div className="flex justify-center">
          <div className="w-64">
            <NodeBox node={mopNode} onClick={() => setSelected(mopNode)} delay={0.8} />
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
