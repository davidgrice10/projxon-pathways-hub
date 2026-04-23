import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ValueBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent px-6 py-5 md:px-8 md:py-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,hsl(var(--primary)/0.18),transparent_60%)] pointer-events-none" />
      <div className="relative flex items-center gap-4">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Sparkles className="text-primary" size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-heading font-bold text-lg md:text-xl text-foreground leading-tight">
            We Build Talent Pipelines That Scale Teams
          </h2>
          <p className="text-muted-foreground text-sm mt-1 leading-snug">
            PROJXON connects training, internships, and employers into one system that turns talent into workforce-ready teams.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
