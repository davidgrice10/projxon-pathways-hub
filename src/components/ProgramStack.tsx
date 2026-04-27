import { motion } from "framer-motion";
import { Layers, Sparkles, BookOpen, Monitor, type LucideIcon } from "lucide-react";
import EyebrowLabel from "./EyebrowLabel";

type IconColor = "gold" | "blue" | "green" | "orange";
const iconColorMap: Record<IconColor, string> = {
  gold: "bg-amber-400/10 text-amber-400",
  blue: "bg-blue-400/10 text-blue-400",
  green: "bg-emerald-400/10 text-emerald-400",
  orange: "bg-orange-400/10 text-orange-400",
};

const layers: { name: string; icon: LucideIcon; items: string[]; color: IconColor }[] = [
  { name: "Experiences", icon: Sparkles, items: ["Large-scale conventions (Las Vegas flagship)", "Workshops and in-person events"], color: "orange" },
  { name: "Programs", icon: BookOpen, items: ["Internship programs (MIP)", "Workforce training pathways"], color: "blue" },
  { name: "Digital", icon: Monitor, items: ["Online courses", "Video and educational content"], color: "green" },
];

const cardStyle: React.CSSProperties = {
  boxShadow: "inset 0 1px 0 0 rgba(255,210,80,0.07)",
};

export default function ProgramStack() {
  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-lg p-2 w-9 h-9 flex items-center justify-center bg-amber-400/10 text-amber-400">
          <Layers className="w-4 h-4" />
        </div>
        <EyebrowLabel>Program &amp; Experience Stack</EyebrowLabel>
      </div>
      <div className="space-y-3">
        {layers.map((layer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: i * 0.12, duration: 0.4 }}
            style={cardStyle}
            className="rounded-2xl border border-amber-400/15 hover:border-amber-400/35 bg-card p-5 transition-all duration-300 ease-out"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`rounded-lg p-2 w-9 h-9 flex items-center justify-center ${iconColorMap[layer.color]}`}>
                <layer.icon className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-sm text-foreground font-heading">{layer.name}</h4>
            </div>
            <ul className="space-y-1.5 pl-12">
              {layer.items.map((item, j) => (
                <li key={j} className="flex items-start text-xs text-muted-foreground leading-relaxed">
                  <span className="text-amber-400 mr-2 select-none">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
