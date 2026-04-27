import { motion } from "framer-motion";
import { Network } from "lucide-react";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function SectionLabel({ eyebrow, title, description }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-2xl mx-auto"
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-primary/30 bg-primary/10">
          <Network className="text-primary" size={14} />
          <span className="text-[10px] uppercase tracking-widest-custom font-heading text-primary">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-sm md:text-base mt-2 leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
