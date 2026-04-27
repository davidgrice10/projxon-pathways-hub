import { motion } from "framer-motion";
import { DollarSign, Users, GraduationCap, Briefcase, UserCheck, UserCog, type LucideIcon } from "lucide-react";
import EyebrowLabel from "./EyebrowLabel";

type IconColor = "gold" | "blue" | "green" | "orange";
const iconColorMap: Record<IconColor, string> = {
  gold: "bg-amber-400/10 text-amber-400",
  blue: "bg-blue-400/10 text-blue-400",
  green: "bg-emerald-400/10 text-emerald-400",
  orange: "bg-orange-400/10 text-orange-400",
};

const metrics: { label: string; value: string; icon: LucideIcon; color: IconColor }[] = [
  { label: "People Impacted", value: "5,000,000+", icon: Users, color: "blue" },
  { label: "Employment Partners", value: "50,000+", icon: Briefcase, color: "orange" },
  { label: "University Partners", value: "500+", icon: GraduationCap, color: "green" },
  { label: "Team Members", value: "500", icon: UserCheck, color: "gold" },
  { label: "Full-Time Staff", value: "50", icon: UserCog, color: "blue" },
  { label: "Projected Revenue", value: "$500M+", icon: DollarSign, color: "gold" },
];

const cardStyle: React.CSSProperties = {
  boxShadow: "inset 0 1px 0 0 rgba(255,210,80,0.07)",
};

export default function KpiGrid() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <EyebrowLabel>Impact &amp; Scale</EyebrowLabel>
        <span className="text-xs text-muted-foreground italic border border-border rounded-full px-3 py-1">Long-term targets</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            style={cardStyle}
            className="rounded-xl border border-amber-400/15 hover:border-amber-400/35 bg-card p-5 text-center transition-all duration-300 ease-out"
          >
            <div className={`rounded-lg p-2 w-9 h-9 flex items-center justify-center mx-auto mb-3 ${iconColorMap[m.color]}`}>
              <m.icon className="w-4 h-4" />
            </div>
            <p className="text-3xl md:text-4xl font-bold text-amber-400 tabular-nums leading-none">{m.value}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-2">{m.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
