import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, type LucideIcon } from "lucide-react";

interface WidgetPanelProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  items: string[];
  color?: "gold" | "blue" | "green" | "orange";
  description?: string;
}

const iconColorMap = {
  gold: "bg-amber-400/10 text-amber-400",
  blue: "bg-blue-400/10 text-blue-400",
  green: "bg-emerald-400/10 text-emerald-400",
  orange: "bg-orange-400/10 text-orange-400",
};

const cardStyle: React.CSSProperties = {
  boxShadow: "inset 0 1px 0 0 rgba(255,210,80,0.07)",
};

export default function WidgetPanel({ title, subtitle, icon: Icon, items, color = "gold" }: WidgetPanelProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.015, transition: { duration: 0.2 } }}
      style={cardStyle}
      className="rounded-2xl border border-amber-400/15 bg-card hover:border-amber-400/35 transition-all duration-300 ease-out cursor-pointer py-4 px-5"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center gap-3">
        <div className={`shrink-0 rounded-lg p-2 w-9 h-9 flex items-center justify-center ${iconColorMap[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <h3 className="font-semibold text-sm text-foreground truncate">{title}</h3>
          {subtitle && (
            <span className="shrink-0 text-[10px] tracking-widest text-amber-400 border border-amber-400/30 px-2 py-0.5 rounded-full">
              {subtitle}
            </span>
          )}
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-auto opacity-60"
        >
          <ChevronDown size={16} className="text-muted-foreground" />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <ul className="mt-3 space-y-2">
              {items.slice(0, 3).map((item, i) => (
                <li key={i} className="flex items-start text-xs text-muted-foreground leading-snug">
                  <span className="text-amber-400 mr-2 select-none">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
