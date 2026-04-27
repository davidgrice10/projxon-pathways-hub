import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import EyebrowLabel from "./EyebrowLabel";

const items = [
  "Companies scale from small teams into full operations",
  "Students transition directly into career opportunities",
  "Internships become structured hiring pipelines",
];

const cardStyle: React.CSSProperties = {
  boxShadow: "inset 0 1px 0 0 rgba(255,210,80,0.07)",
};

export default function ImpactSummary() {
  return (
    <section
      style={cardStyle}
      className="rounded-2xl border border-amber-400/15 hover:border-amber-400/35 bg-card p-6 md:p-8 transition-all duration-300 ease-out"
    >
      <div className="text-center mb-6 flex flex-col items-center gap-3">
        <EyebrowLabel>Ecosystem Impact</EyebrowLabel>
        <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground leading-tight">
          What This Means
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            style={cardStyle}
            className="rounded-xl border border-amber-400/15 hover:border-amber-400/35 bg-card/60 p-5 flex flex-col gap-2 transition-all duration-300 ease-out"
          >
            <div className="rounded-lg p-2 w-9 h-9 flex items-center justify-center bg-amber-400/10 text-amber-400">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <p className="text-sm font-medium text-foreground leading-snug">
              {item}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
