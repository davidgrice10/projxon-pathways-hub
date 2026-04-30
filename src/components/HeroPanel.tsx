import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import EyebrowLabel from "./EyebrowLabel";

const cardStyle: React.CSSProperties = {
  boxShadow: "inset 0 1px 0 0 rgba(255,210,80,0.07)",
};

export default function HeroPanel() {
  const outcomes: { stat: string; rest: string }[] = [
    { stat: "500M+", rest: " projected ecosystem revenue" },
    { stat: "5M+", rest: " individuals impacted" },
    { stat: "Global", rest: " network of universities and employers" },
    { stat: "End-to-end", rest: " talent development platform" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.005 }}
      style={cardStyle}
      className="relative overflow-hidden rounded-2xl border border-amber-400/15 hover:border-amber-400/35 bg-card p-8 md:p-10 transition-all duration-300 ease-out"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-lg p-2 w-9 h-9 flex items-center justify-center bg-amber-400/10 text-amber-400">
            <Rocket className="w-4 h-4" />
          </div>
          <EyebrowLabel>Overview</EyebrowLabel>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground leading-tight mb-4">
          Building the Future of<br />Workforce Development
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-prose mb-8 leading-relaxed">
          PROJXON connects talent, education, and companies to create scalable career pathways.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {outcomes.map((o, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
              className="flex items-start gap-2 text-sm text-foreground"
            >
              <span className="text-amber-400 leading-snug select-none">•</span>
              <span><span className="text-amber-400 font-semibold">{o.stat}</span>{o.rest}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
