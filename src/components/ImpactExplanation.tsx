import { motion } from "framer-motion";
import { Users, Briefcase, GraduationCap, TrendingUp, DollarSign, type LucideIcon } from "lucide-react";
import EyebrowLabel from "./EyebrowLabel";

type IconColor = "gold" | "blue" | "green" | "orange";
const iconColorMap: Record<IconColor, string> = {
  gold: "bg-amber-400/10 text-amber-400",
  blue: "bg-blue-400/10 text-blue-400",
  green: "bg-emerald-400/10 text-emerald-400",
  orange: "bg-orange-400/10 text-orange-400",
};

const items: { title: string; description: string; icon: LucideIcon; color: IconColor }[] = [
  {
    title: "People Impacted",
    description:
      "Measured by individuals who engage with our ecosystem through programs, events, and career placement opportunities.",
    icon: Users,
    color: "blue",
  },
  {
    title: "Employment Partners",
    description:
      "Organizations that build their teams through PROJXON programs and talent pipelines.",
    icon: Briefcase,
    color: "orange",
  },
  {
    title: "University Partnerships",
    description:
      "Institutions connected into a unified system for preparing students for real-world careers.",
    icon: GraduationCap,
    color: "green",
  },
  {
    title: "Team Growth",
    description:
      "We enable organizations to scale from small teams into fully developed operations.",
    icon: TrendingUp,
    color: "gold",
  },
  {
    title: "Revenue",
    description: "A reflection of ecosystem scale, not the primary driver of impact.",
    icon: DollarSign,
    color: "gold",
  },
];

const cardStyle: React.CSSProperties = {
  boxShadow: "inset 0 1px 0 0 rgba(255,210,80,0.07)",
};

export default function ImpactExplanation() {
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <EyebrowLabel>Why These Numbers Matter</EyebrowLabel>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            whileHover={{ x: 4, transition: { duration: 0.2 } }}
            style={cardStyle}
            className="group flex items-start gap-4 rounded-2xl border border-amber-400/15 hover:border-amber-400/35 bg-card p-5 border-l-2 border-l-amber-400/30 pl-4 transition-all duration-300 ease-out"
          >
            <div className={`shrink-0 rounded-lg p-2 w-9 h-9 flex items-center justify-center ${iconColorMap[item.color]} group-hover:scale-110 transition-transform`}>
              <item.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-foreground mb-1 font-heading">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
