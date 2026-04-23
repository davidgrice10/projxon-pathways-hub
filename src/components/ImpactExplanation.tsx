import { motion } from "framer-motion";
import { Users, Briefcase, GraduationCap, TrendingUp, DollarSign } from "lucide-react";

const items = [
  {
    title: "People Impacted",
    description:
      "Measured by individuals who engage with our ecosystem through programs, events, and career placement opportunities.",
    icon: Users,
    color: "text-eco-blue-light",
    bg: "bg-eco-blue-light/10",
  },
  {
    title: "Employment Partners",
    description:
      "Organizations that build their teams through PROJXON programs and talent pipelines.",
    icon: Briefcase,
    color: "text-eco-orange-light",
    bg: "bg-eco-orange-light/10",
  },
  {
    title: "University Partnerships",
    description:
      "Institutions connected into a unified system for preparing students for real-world careers.",
    icon: GraduationCap,
    color: "text-eco-green-light",
    bg: "bg-eco-green-light/10",
  },
  {
    title: "Team Growth",
    description:
      "We enable organizations to scale from small teams into fully developed operations.",
    icon: TrendingUp,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Revenue",
    description: "A reflection of ecosystem scale, not the primary driver of impact.",
    icon: DollarSign,
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

export default function ImpactExplanation() {
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <p className="text-muted-foreground tracking-widest-custom text-xs uppercase font-heading">
          Why These Numbers Matter
        </p>
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
            className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-colors"
          >
            <div
              className={`shrink-0 w-11 h-11 rounded-lg flex items-center justify-center ${item.bg} group-hover:scale-110 transition-transform`}
            >
              <item.icon className={item.color} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-semibold font-heading text-foreground mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
