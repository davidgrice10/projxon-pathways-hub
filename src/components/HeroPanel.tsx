import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export default function HeroPanel() {
  const outcomes = [
    "500M+ projected ecosystem revenue",
    "5M+ individuals impacted",
    "Global network of universities and employers",
    "End-to-end talent development platform",
  ];

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12 glow-gold">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Rocket className="text-primary" size={20} />
          </div>
          <span className="text-muted-foreground tracking-widest-custom text-xs uppercase font-heading">Overview</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold font-heading text-gradient-gold leading-tight mb-4">
          Building the Future of<br />Workforce Development
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mb-8">
          PROJXON connects talent, education, and companies to create scalable career pathways.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {outcomes.map((o, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-2 text-sm text-foreground"
            >
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              {o}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
