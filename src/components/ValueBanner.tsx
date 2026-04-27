import { motion } from "framer-motion";

export default function ValueBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent px-6 py-8 md:px-10 md:py-12 text-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.18),transparent_65%)] pointer-events-none" />
      <div className="relative max-w-3xl mx-auto">
        <h2 className="font-heading font-bold text-2xl md:text-4xl text-foreground leading-tight tracking-tight">
          We Build Workforce Systems That Scale Teams
        </h2>
        <p className="text-muted-foreground text-base md:text-lg mt-3 leading-relaxed">
          PROJXON connects training, internships, and employers into one unified system that produces real hiring outcomes.
        </p>
      </div>
    </motion.section>
  );
}
