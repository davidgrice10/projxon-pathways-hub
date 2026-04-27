import { motion } from "framer-motion";

const cardStyle: React.CSSProperties = {
  boxShadow: "inset 0 1px 0 0 rgba(255,210,80,0.07)",
};

export default function ValueBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={cardStyle}
      className="relative overflow-hidden rounded-2xl border border-amber-400/15 hover:border-amber-400/35 bg-card px-6 py-8 md:px-10 md:py-12 text-center transition-all duration-300 ease-out"
    >
      {/* Decorative top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)",
        }}
      />
      <div className="relative max-w-3xl mx-auto">
        <h2 className="font-heading font-bold text-2xl md:text-4xl text-foreground leading-tight tracking-tight">
          We Build Workforce Systems That Scale Teams
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mt-3 leading-relaxed max-w-prose mx-auto">
          PROJXON connects training, internships, and employers into one unified system that produces real hiring outcomes.
        </p>
      </div>
    </motion.section>
  );
}
