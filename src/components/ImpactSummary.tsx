import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const items = [
  "Companies scale from small teams into full operations",
  "Students transition directly into career opportunities",
  "Internships become structured hiring pipelines",
];

export default function ImpactSummary() {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="text-center mb-6">
        <p className="text-muted-foreground tracking-widest-custom text-xs uppercase mb-2 font-heading">
          Ecosystem Impact
        </p>
        <h2 className="text-2xl md:text-3xl font-bold font-heading text-gradient-gold">
          What This Means
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="rounded-xl border-[1.5px] border-primary/40 bg-gradient-to-br from-card to-background p-5 flex items-start gap-3"
            style={{ boxShadow: "0 0 24px -16px hsl(43, 72%, 55%, 0.4)" }}
          >
            <ArrowUpRight size={18} className="text-primary shrink-0 mt-0.5" />
            <p className="text-sm md:text-base text-foreground leading-snug font-medium">
              {item}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
