import { motion } from "framer-motion";

export default function PageSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Header line */}
        <div className="h-px w-full bg-amber-400/30" />

        {/* Two tall blocks */}
        <div className="space-y-6">
          <div className="h-40 md:h-48 rounded-2xl bg-muted/50 animate-pulse" />
          <div className="h-64 md:h-80 rounded-2xl bg-muted/50 animate-pulse" />
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 rounded-xl bg-muted/50 animate-pulse" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
