import { motion } from "framer-motion";
import { Network } from "lucide-react";
import EyebrowLabel from "./EyebrowLabel";

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
      className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3"
    >
      {eyebrow && <EyebrowLabel icon={Network}>{eyebrow}</EyebrowLabel>}
      <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-sm text-muted-foreground leading-relaxed max-w-prose mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}
