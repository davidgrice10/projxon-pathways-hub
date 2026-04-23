import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, type LucideIcon } from "lucide-react";

interface WidgetPanelProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  items: string[];
  color?: "gold" | "blue" | "green" | "orange";
  description?: string;
}

const borderColorMap = {
  gold: "border-primary/30 hover:border-primary/60",
  blue: "border-eco-blue/30 hover:border-eco-blue/60",
  green: "border-eco-green/30 hover:border-eco-green/60",
  orange: "border-eco-orange/30 hover:border-eco-orange/60",
};

const dotColorMap = {
  gold: "bg-primary",
  blue: "bg-eco-blue",
  green: "bg-eco-green",
  orange: "bg-eco-orange",
};

export default function WidgetPanel({ title, subtitle, icon: Icon, items, color = "gold", description }: WidgetPanelProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={`rounded-xl border bg-card p-5 transition-colors cursor-pointer ${borderColorMap[color]}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${dotColorMap[color]}/20`}>
            <Icon size={18} className={color === "gold" ? "text-primary" : color === "blue" ? "text-eco-blue-light" : color === "green" ? "text-eco-green-light" : "text-eco-orange-light"} />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-sm text-foreground">{title}</h3>
          </div>
        </div>
        {expanded ? <ChevronUp size={16} className="text-muted-foreground mt-1" /> : <ChevronDown size={16} className="text-muted-foreground mt-1" />}
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {subtitle && <p className="text-xs text-muted-foreground italic mt-2 mb-1">{subtitle}</p>}
            <ul className="mt-3 space-y-2">
              {items.slice(0, 3).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground leading-snug">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${dotColorMap[color]}`} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
