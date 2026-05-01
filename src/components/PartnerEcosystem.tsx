import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { partnerCategories, type PartnerColor } from "@/data/partnerData";

const labelColor: Record<PartnerColor, string> = {
  blue: "text-blue-400",
  gold: "text-amber-400",
  green: "text-emerald-400",
  orange: "text-orange-400",
};

const cardBorderHover: Record<PartnerColor, string> = {
  blue: "hover:border-blue-400/40",
  gold: "hover:border-amber-400/40",
  green: "hover:border-emerald-400/40",
  orange: "hover:border-orange-400/40",
};

const cardGlowHover: Record<PartnerColor, string> = {
  blue: "hover:shadow-[0_4px_20px_-6px_hsl(210,60%,55%,0.3)]",
  gold: "hover:shadow-[0_4px_20px_-6px_hsl(43,72%,55%,0.3)]",
  green: "hover:shadow-[0_4px_20px_-6px_hsl(145,45%,50%,0.3)]",
  orange: "hover:shadow-[0_4px_20px_-6px_hsl(30,65%,55%,0.3)]",
};

export default function PartnerEcosystem() {
  return (
    <div className="relative">
      {/* Decorative top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none animate-shimmer"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)",
          backgroundSize: "200% 100%",
        }}
      />

      {/* Header */}
      <div className="flex flex-col items-center text-center pt-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/20 bg-amber-400/5 text-[10px] font-bold tracking-[0.2em] uppercase text-amber-400/75">
          <Building2 size={10} />
          Partner Ecosystem
        </span>
        <h2 className="font-bold text-2xl md:text-3xl font-heading text-foreground text-center mt-2">
          Our Partner Network
        </h2>
        <p className="text-sm text-muted-foreground text-center mt-2 max-w-xl mx-auto">
          Universities, organizations, and platforms driving the PROJXON ecosystem forward.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        {partnerCategories.map((category, colIndex) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.55, delay: colIndex * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            <div
              className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-3 px-1 ${labelColor[category.color]}`}
            >
              {category.label}
            </div>

            {category.partners.map((partner, cardIndex) => {
              const isComingSoon = category.id === "coming_soon";
              return (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px" }}
                  transition={{
                    duration: 0.4,
                    delay: colIndex * 0.12 + cardIndex * 0.06,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -2, transition: { duration: 0.18 } }}
                  className={`rounded-xl border bg-card px-4 py-3 cursor-default transition-all duration-200 ${
                    isComingSoon ? "border-dashed border-border/60 opacity-70" : "border-border"
                  } ${cardBorderHover[category.color]} ${cardGlowHover[category.color]}`}
                >
                  <div className="text-sm font-semibold text-foreground leading-tight">
                    {partner.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-tight">
                    {partner.subtitle}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <p className="text-xs text-muted-foreground/70 text-center mt-8 italic">
        Partner network actively growing — updated quarterly.
      </p>
    </div>
  );
}
