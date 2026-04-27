import { motion } from "framer-motion";
import { DollarSign, Users, GraduationCap, Briefcase, UserCheck, UserCog } from "lucide-react";

const metrics = [
  { label: "People Impacted", value: "5,000,000+", icon: Users, color: "text-eco-blue-light" },
  { label: "Employment Partners", value: "50,000+", icon: Briefcase, color: "text-eco-orange-light" },
  { label: "University Partners", value: "500+", icon: GraduationCap, color: "text-eco-green-light" },
  { label: "Team Members", value: "500", icon: UserCheck, color: "text-primary" },
  { label: "Full-Time Staff", value: "50", icon: UserCog, color: "text-eco-blue-light" },
  { label: "Revenue (Scale Indicator)", value: "$500M+", icon: DollarSign, color: "text-primary" },
];

export default function KpiGrid() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <p className="text-muted-foreground tracking-widest-custom text-xs uppercase font-heading">Impact & Scale</p>
        <span className="text-xs text-muted-foreground italic border border-border rounded-full px-3 py-1">Long-term targets</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="rounded-xl border border-border bg-card p-4 text-center hover:border-primary/40 transition-colors"
          >
            <m.icon className={`mx-auto mb-2 ${m.color}`} size={22} />
            <p className="text-2xl font-bold font-heading text-foreground">{m.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
